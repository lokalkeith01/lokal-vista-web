import { useState, useEffect } from "react";
import { RefreshCw, CheckCircle2, XCircle, AlertTriangle, ExternalLink, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface Monitor {
  id: string;
  name: string;
  url: string;
  type: string;
  status: string;
  lastChecked: string;
  paused: boolean;
}

interface HealthData {
  status: "healthy" | "degraded" | "down" | "error";
  monitors: Monitor[];
  summary: {
    total: number;
    up: number;
    down: number;
  };
  timestamp: string;
  error?: string;
}

const BETTERSTACK_DASHBOARD = "https://uptime.betterstack.com/team/327279/monitors";

export function BetterStackHealth() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("betterstack-status");
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setHealthData(data);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch health data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg font-semibold">System Health</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Powered by BetterStack • Last updated: {lastRefresh.toLocaleTimeString()}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={BETTERSTACK_DASHBOARD} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Dashboard
              </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={fetchHealth} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Status */}
        <div className="rounded-lg border p-4">
          {loading && !healthData ? (
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
          ) : healthData ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getOverallStatusIcon(healthData.status)}
                <div>
                  <p className="font-semibold capitalize">
                    All Systems {healthData.status === "healthy" ? "Operational" : healthData.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {healthData.summary.up} of {healthData.summary.total} monitors up
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(healthData.status)}>
                {healthData.status.toUpperCase()}
              </Badge>
            </div>
          ) : null}
        </div>

        {/* Individual Monitors */}
        {healthData && healthData.monitors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {healthData.monitors.map((monitor) => (
              <Card key={monitor.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {monitor.type}
                  </span>
                  {getStatusIcon(monitor.status)}
                </div>
                <div>
                  <p className="text-sm font-medium truncate" title={monitor.name}>
                    {monitor.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {monitor.status === "up" ? (
                      <span className="text-green-500">Operational</span>
                    ) : monitor.status === "down" ? (
                      <span className="text-red-500">Down</span>
                    ) : (
                      <span className="text-yellow-500">{monitor.status}</span>
                    )}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
