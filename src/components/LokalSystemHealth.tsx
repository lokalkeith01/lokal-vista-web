import { useState, useEffect } from "react";
import { RefreshCw, Database, HardDrive, Cloud, CheckCircle2, XCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SOURCE_LINKS = {
  dashboard: "https://supabase.com/dashboard/project/rvwdjqxyxivejtuhigxr",
  database: "https://supabase.com/dashboard/project/rvwdjqxyxivejtuhigxr/editor",
  storage: "https://supabase.com/dashboard/project/rvwdjqxyxivejtuhigxr/storage/buckets",
  functions: "https://supabase.com/dashboard/project/rvwdjqxyxivejtuhigxr/functions",
};

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'down';
  checks: {
    database: boolean;
    storage: boolean;
    r2: boolean;
  };
  responseTime: number;
  timestamp: string;
  details?: {
    dbResponseTime?: number;
    storageResponseTime?: number;
    r2ResponseTime?: number;
    bucketCount?: number;
  };
}

const LOKAL_HEALTH_URL = "https://rvwdjqxyxivejtuhigxr.supabase.co/functions/v1/health-check";

export function LokalSystemHealth() {
  const [healthData, setHealthData] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(LOKAL_HEALTH_URL);
      const data = await response.json();
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
      case 'healthy': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'degraded': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'down': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (isHealthy: boolean) => {
    return isHealthy ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getOverallStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="h-8 w-8 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case 'down': return <XCircle className="h-8 w-8 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Lokal App System Health</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={SOURCE_LINKS.dashboard} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Dashboard
              </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={fetchHealth} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Overall Status */}
      <CardContent className="space-y-4">
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
                    System {healthData.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Response time: {healthData.responseTime}ms
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(healthData.status)}>
                {healthData.status.toUpperCase()}
              </Badge>
            </div>
          ) : null}
        </div>

        {/* Service Status Cards */}
        <div className="grid grid-cols-3 gap-3">
          <a href={SOURCE_LINKS.database} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
            <Card className="p-3 h-full">
              <div className="flex items-center justify-between mb-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  {healthData && getStatusIcon(healthData.checks.database)}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">
                  {healthData?.checks.database ? (
                    <span className="text-green-500">Connected</span>
                  ) : (
                    <span className="text-red-500">Disconnected</span>
                  )}
                </p>
                {healthData?.details?.dbResponseTime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {healthData.details.dbResponseTime}ms
                  </p>
                )}
              </div>
            </Card>
          </a>

          <a href={SOURCE_LINKS.storage} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
            <Card className="p-3 h-full">
              <div className="flex items-center justify-between mb-2">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  {healthData && getStatusIcon(healthData.checks.storage)}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Storage</p>
                <p className="text-xs text-muted-foreground">
                  {healthData?.checks.storage ? (
                    <span className="text-green-500">Available</span>
                  ) : (
                    <span className="text-red-500">Unavailable</span>
                  )}
                </p>
                {healthData?.details?.bucketCount !== undefined && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {healthData.details.bucketCount} buckets
                  </p>
                )}
              </div>
            </Card>
          </a>

          <a href={SOURCE_LINKS.functions} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
            <Card className="p-3 h-full">
              <div className="flex items-center justify-between mb-2">
                <Cloud className="h-5 w-5 text-muted-foreground" />
                <div className="flex items-center gap-1">
                  {healthData && getStatusIcon(healthData.checks.r2)}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">R2 CDN</p>
                <p className="text-xs text-muted-foreground">
                  {healthData?.checks.r2 ? (
                    <span className="text-green-500">Reachable</span>
                  ) : (
                    <span className="text-red-500">Unreachable</span>
                  )}
                </p>
                {healthData?.details?.r2ResponseTime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {healthData.details.r2ResponseTime}ms
                  </p>
                )}
              </div>
            </Card>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
