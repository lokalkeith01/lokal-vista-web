import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

interface BetterStackResponse {
  data: BetterStackMonitor[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("BETTERSTACK_API_TOKEN");
    if (!apiToken) {
      throw new Error("BETTERSTACK_API_TOKEN is not configured");
    }

    const response = await fetch("https://uptime.betterstack.com/api/v2/monitors", {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`BetterStack API error [${response.status}]: ${errorText}`);
    }

    const data: BetterStackResponse = await response.json();

    // Transform monitors into a simpler format
    const monitors = data.data.map((monitor) => ({
      id: monitor.id,
      name: monitor.attributes.pronounceable_name,
      url: monitor.attributes.url,
      type: monitor.attributes.monitor_type,
      status: monitor.attributes.status,
      lastChecked: monitor.attributes.last_checked_at,
      paused: monitor.attributes.paused,
    }));

    // Calculate overall status
    const activeMonitors = monitors.filter((m) => !m.paused);
    const upCount = activeMonitors.filter((m) => m.status === "up").length;
    const downCount = activeMonitors.filter((m) => m.status === "down").length;
    
    let overallStatus: "healthy" | "degraded" | "down" = "healthy";
    if (downCount === activeMonitors.length && activeMonitors.length > 0) {
      overallStatus = "down";
    } else if (downCount > 0) {
      overallStatus = "degraded";
    }

    return new Response(
      JSON.stringify({
        status: overallStatus,
        monitors,
        summary: {
          total: activeMonitors.length,
          up: upCount,
          down: downCount,
        },
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("BetterStack status error:", error);
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
