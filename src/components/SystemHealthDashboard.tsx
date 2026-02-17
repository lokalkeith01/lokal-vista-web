import { useState, useEffect } from "react";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Activity,
  HardDrive,
  Zap,
  Users,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { StorageMetrics } from "@/components/health/StorageMetrics";
import { PerformanceMetrics } from "@/components/health/PerformanceMetrics";
import { UserActivityMetrics } from "@/components/health/UserActivityMetrics";
import { ErrorTracking } from "@/components/health/ErrorTracking";
import { WebVitalsCard } from "@/components/health/WebVitalsCard";

interface Monitor {
  id: string;
  name: string;
  url: string;
  type: string;
  status: string;
  lastChecked: string;
  paused: boolean;
  responseTimes: number[];
  avgResponseTime: number | null;
  availability: number;
}

interface Incident {
  id: string;
  name: string;
  cause: string;
  startedAt: string;
  resolvedAt: string | null;
  isResolved: boolean;
}

interface R2StorageData {
  bucketName?: string;
  totalObjects?: number;
  totalSize?: number;
  totalSizeMB?: number;
  folders?: Array<{
    name: string;
    files: number;
    size: number;
    sizeMB: number;
  }>;
  error?: string;
}

interface SystemMetricsData {
  uptime: {
    status: "healthy" | "degraded" | "down";
    monitors: Monitor[];
    summary: {
      total: number;
      up: number;
      down: number;
    };
    incidents: Incident[];
  };
  storage: {
    buckets: Array<{
      name: string;
      files: number;
      size: number;
      error?: string;
    }>;
    database: {
      estimatedSize: string;
      profiles: number;
      content: number;
      businesses: number;
    } | null;
    limits: {
      database: number;
      storage: number;
    };
    error?: string;
  };
  r2Storage?: R2StorageData;
  userActivity: {
    data: Array<{
      date: string;
      daily_active_users: number | null;
      total_sessions: number | null;
      total_video_views: number | null;
      avg_session_duration_seconds: number | null;
      avg_video_completion_rate: number | null;
    }>;
    summary: {
      totalDAU: number;
      avgSessionDuration: number;
      totalVideoViews: number;
      avgCompletionRate: number;
    } | null;
    error?: string;
  };
  platformStats: {
    totalUsers: number;
    totalBusinesses: number;
    totalContent: number;
    totalCampaigns: number;
    error?: string;
  };
  errors: {
    recentErrors: Array<{
      timestamp: string;
      message: string;
      type: string;
    }>;
    errorRate: number;
    note: string;
  };
  timestamp: string;
  error?: string;
}

const BETTERSTACK_DASHBOARD = "https://uptime.betterstack.com/team/327279/monitors";

export function SystemHealthDashboard() {
  const [data, setData] = useState<SystemMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: metricsData, error: fnError } = await supabase.functions.invoke(
        "system-metrics"
      );

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (metricsData.error) {
        throw new Error(metricsData.error);
      }

      setData(metricsData);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch system metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "up":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "degraded":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "down":
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "down":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getOverallStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-8 w-8 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case "down":
      case "error":
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Activity className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <CardTitle className="text-lg font-semibold">System Health Dashboard</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Uptime, Storage, Performance & User Activity • Last updated:{" "}
                    {lastRefresh.toLocaleTimeString()}
                  </CardDescription>
                </div>
              </button>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              {data?.uptime && (
                <Badge className={getStatusColor(data.uptime.status)}>
                  {data.uptime.status.toUpperCase()}
                </Badge>
              )}
              <Button variant="outline" size="sm" asChild>
                <a
                  href={BETTERSTACK_DASHBOARD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  BetterStack
                </a>
              </Button>
              <Button variant="ghost" size="icon" onClick={fetchMetrics} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Overall Status */}
            <div className="rounded-lg border p-4">
              {loading && !data ? (
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center gap-4">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="font-medium text-red-500">Connection Error</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
              ) : data?.uptime ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getOverallStatusIcon(data.uptime.status)}
                    <div>
                      <p className="font-semibold capitalize">
                        All Systems{" "}
                        {data.uptime.status === "healthy" ? "Operational" : data.uptime.status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {data.uptime.summary.up} of {data.uptime.summary.total} monitors up
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {/* Quick Stats */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{data.storage?.database?.estimatedSize || "N/A"} DB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{data.platformStats?.totalUsers || 0} users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{data.uptime.incidents?.length || 0} incidents</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Quick Status Cards - Monitors */}
            {data?.uptime?.monitors && data.uptime.monitors.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data.uptime.monitors.slice(0, 4).map((monitor) => (
                  <Card key={monitor.id} className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide truncate">
                        {monitor.type}
                      </span>
                      {getStatusIcon(monitor.status)}
                    </div>
                    <p className="text-sm font-medium truncate" title={monitor.name}>
                      {monitor.name}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {monitor.avgResponseTime ? `${monitor.avgResponseTime}ms` : "N/A"}
                      </span>
                      <span className="text-xs text-green-500">{monitor.availability}%</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Frontend Performance - Web Vitals */}
            <WebVitalsCard compact />

            {/* Detailed Tabs */}
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="performance" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span className="hidden sm:inline">Performance</span>
                </TabsTrigger>
                <TabsTrigger value="storage" className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  <span className="hidden sm:inline">Storage</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger value="errors" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span className="hidden sm:inline">Errors</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="mt-4">
                <PerformanceMetrics
                  monitors={data?.uptime?.monitors || []}
                  loading={loading && !data}
                />
              </TabsContent>

              <TabsContent value="storage" className="mt-4">
                <StorageMetrics 
                  data={data?.storage || null} 
                  r2Data={data?.r2Storage || null}
                  loading={loading && !data} 
                />
              </TabsContent>

              <TabsContent value="users" className="mt-4">
                <UserActivityMetrics
                  activityData={data?.userActivity || null}
                  platformStats={data?.platformStats || null}
                  loading={loading && !data}
                />
              </TabsContent>

              <TabsContent value="errors" className="mt-4">
                <ErrorTracking
                  incidents={data?.uptime?.incidents || []}
                  errorData={data?.errors || null}
                  loading={loading && !data}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
