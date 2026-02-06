import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BetterStackMonitor {
  id: string;
  type: string;
  attributes: {
    url: string;
    pronounceable_name: string;
    monitor_type: string;
    status: string;
    last_checked_at: string;
    check_frequency: number;
    paused: boolean;
  };
}

interface BetterStackIncident {
  id: string;
  attributes: {
    name: string;
    cause: string;
    started_at: string;
    resolved_at: string | null;
    acknowledged_at: string | null;
  };
}

interface ResponseTimeData {
  data: Array<{
    attributes: {
      response_time: number;
      checked_at: string;
    };
  }>;
}

interface SLAData {
  data: {
    attributes: {
      availability: number;
    };
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("BETTERSTACK_API_TOKEN");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!apiToken) {
      throw new Error("BETTERSTACK_API_TOKEN is not configured");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all data in parallel
    const [
      monitorsRes,
      incidentsRes,
      storageData,
      dailyAnalytics,
      userStats,
      edgeFunctionLogs,
    ] = await Promise.all([
      // BetterStack monitors
      fetch("https://uptime.betterstack.com/api/v2/monitors", {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }),
      // BetterStack incidents
      fetch("https://uptime.betterstack.com/api/v2/incidents?per_page=10", {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }),
      // Storage bucket stats
      getStorageMetrics(supabase),
      // Daily analytics
      getDailyAnalytics(supabase),
      // User stats
      getUserStats(supabase),
      // Edge function error rates
      getEdgeFunctionMetrics(supabase),
    ]);

    if (!monitorsRes.ok) {
      throw new Error(`BetterStack monitors API error: ${monitorsRes.status}`);
    }

    const monitorsData = await monitorsRes.json();
    const incidentsData = incidentsRes.ok ? await incidentsRes.json() : { data: [] };

    // Fetch response times and SLA for each monitor (in parallel)
    const monitors = monitorsData.data || [];
    const monitorDetails = await Promise.all(
      monitors.slice(0, 10).map(async (monitor: BetterStackMonitor) => {
        const [responseTimesRes, slaRes] = await Promise.all([
          fetch(
            `https://uptime.betterstack.com/api/v2/monitors/${monitor.id}/response-times?from=${getISODate24HoursAgo()}`,
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            `https://uptime.betterstack.com/api/v2/monitors/${monitor.id}/sla`,
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "application/json",
              },
            }
          ),
        ]);

        let responseTimes: number[] = [];
        let availability = 100;

        try {
          if (responseTimesRes.ok) {
            const rtData = await responseTimesRes.json();
            const rtArray = Array.isArray(rtData.data) ? rtData.data : [];
            responseTimes = rtArray
              .slice(0, 24)
              .map((d: { attributes?: { response_time?: number } }) => d?.attributes?.response_time || 0)
              .filter((t: number) => t > 0);
          }
        } catch (e) {
          console.error(`Error parsing response times for ${monitor.id}:`, e);
        }

        try {
          if (slaRes.ok) {
            const slaData = await slaRes.json();
            availability = slaData?.data?.attributes?.availability || 100;
          }
        } catch (e) {
          console.error(`Error parsing SLA for ${monitor.id}:`, e);
        }

        return {
          id: monitor.id,
          name: monitor.attributes.pronounceable_name,
          url: monitor.attributes.url,
          type: monitor.attributes.monitor_type,
          status: monitor.attributes.status,
          lastChecked: monitor.attributes.last_checked_at,
          paused: monitor.attributes.paused,
          responseTimes,
          avgResponseTime:
            responseTimes.length > 0
              ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
              : null,
          availability: Math.round(availability * 100) / 100,
        };
      })
    );

    // Calculate overall status
    const activeMonitors = monitorDetails.filter((m) => !m.paused);
    const upCount = activeMonitors.filter((m) => m.status === "up").length;
    const downCount = activeMonitors.filter((m) => m.status === "down").length;

    let overallStatus: "healthy" | "degraded" | "down" = "healthy";
    if (downCount === activeMonitors.length && activeMonitors.length > 0) {
      overallStatus = "down";
    } else if (downCount > 0) {
      overallStatus = "degraded";
    }

    // Format incidents
    const incidents = (incidentsData.data || []).map((incident: BetterStackIncident) => ({
      id: incident.id,
      name: incident.attributes.name,
      cause: incident.attributes.cause,
      startedAt: incident.attributes.started_at,
      resolvedAt: incident.attributes.resolved_at,
      isResolved: !!incident.attributes.resolved_at,
    }));

    return new Response(
      JSON.stringify({
        uptime: {
          status: overallStatus,
          monitors: monitorDetails,
          summary: {
            total: activeMonitors.length,
            up: upCount,
            down: downCount,
          },
          incidents,
        },
        storage: storageData,
        userActivity: dailyAnalytics,
        platformStats: userStats,
        errors: edgeFunctionLogs,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("System metrics error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        status: "error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function getISODate24HoursAgo(): string {
  const date = new Date();
  date.setHours(date.getHours() - 24);
  return date.toISOString();
}

async function getStorageMetrics(supabase: ReturnType<typeof createClient>) {
  try {
    // Get list of buckets and their sizes
    const buckets = ["videos", "ad-assets", "avatars", "business-images", "music-tracks"];
    const bucketStats = await Promise.all(
      buckets.map(async (bucket) => {
        try {
          const { data, error } = await supabase.storage.from(bucket).list("", {
            limit: 1000,
          });
          
          if (error) {
            return { name: bucket, files: 0, size: 0, error: error.message };
          }

          // Calculate total size - need to get file metadata
          let totalSize = 0;
          let fileCount = 0;

          if (data) {
            fileCount = data.length;
            // Note: We can't easily get file sizes from list, estimate from known data
          }

          return {
            name: bucket,
            files: fileCount,
            size: totalSize,
          };
        } catch (e) {
          return { name: bucket, files: 0, size: 0, error: String(e) };
        }
      })
    );

    // Get database size estimate from profiles count (proxy metric)
    const { count: profileCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: contentCount } = await supabase
      .from("content")
      .select("*", { count: "exact", head: true });

    const { count: businessCount } = await supabase
      .from("businesses")
      .select("*", { count: "exact", head: true });

    return {
      buckets: bucketStats,
      database: {
        estimatedSize: "29 MB", // Known from plan
        profiles: profileCount || 0,
        content: contentCount || 0,
        businesses: businessCount || 0,
      },
      // Storage limits (Supabase free tier)
      limits: {
        database: 500, // 500 MB
        storage: 1000, // 1 GB
      },
    };
  } catch (error) {
    console.error("Storage metrics error:", error);
    return { error: String(error), buckets: [], database: null };
  }
}

async function getDailyAnalytics(supabase: ReturnType<typeof createClient>) {
  try {
    const { data, error } = await supabase
      .from("daily_analytics")
      .select("*")
      .order("date", { ascending: false })
      .limit(7);

    if (error) {
      console.error("Daily analytics error:", error);
      return { error: error.message, data: [] };
    }

    return {
      data: data || [],
      summary: {
        totalDAU: data?.reduce((sum, d) => sum + (d.daily_active_users || 0), 0) || 0,
        avgSessionDuration:
          data && data.length > 0
            ? Math.round(
                data.reduce((sum, d) => sum + (d.avg_session_duration_seconds || 0), 0) /
                  data.length
              )
            : 0,
        totalVideoViews: data?.reduce((sum, d) => sum + (d.total_video_views || 0), 0) || 0,
        avgCompletionRate:
          data && data.length > 0
            ? Math.round(
                (data.reduce((sum, d) => sum + (d.avg_video_completion_rate || 0), 0) /
                  data.length) *
                  100
              ) / 100
            : 0,
      },
    };
  } catch (error) {
    console.error("Daily analytics error:", error);
    return { error: String(error), data: [], summary: null };
  }
}

async function getUserStats(supabase: ReturnType<typeof createClient>) {
  try {
    const [profilesRes, businessesRes, contentRes, campaignsRes] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("businesses").select("*", { count: "exact", head: true }),
      supabase.from("content").select("*", { count: "exact", head: true }),
      supabase.from("campaigns").select("*", { count: "exact", head: true }),
    ]);

    return {
      totalUsers: profilesRes.count || 0,
      totalBusinesses: businessesRes.count || 0,
      totalContent: contentRes.count || 0,
      totalCampaigns: campaignsRes.count || 0,
    };
  } catch (error) {
    console.error("User stats error:", error);
    return { error: String(error) };
  }
}

async function getEdgeFunctionMetrics(_supabase: ReturnType<typeof createClient>) {
  // Note: Edge function logs are accessed via Supabase analytics API
  // For now, return a placeholder structure
  return {
    recentErrors: [],
    errorRate: 0,
    note: "Edge function logs available in Supabase dashboard",
  };
}
