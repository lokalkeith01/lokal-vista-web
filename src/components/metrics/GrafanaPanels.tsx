import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Activity, Database, HardDrive, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface MonitorData {
  id: string;
  name: string;
  status: string;
  responseTimes: number[];
  avgResponseTime: number | null;
  availability: number;
}

interface MetricsPayload {
  uptime?: {
    monitors: MonitorData[];
    summary: { total: number; up: number; down: number };
  };
  storage?: {
    buckets: Array<{ name: string; files: number }>;
    database: { estimatedSize: string; profiles: number; content: number; businesses: number } | null;
  };
  r2Storage?: {
    totalSizeMB?: number;
    totalObjects?: number;
    folders?: Array<{ name: string; files: number; sizeMB: number }>;
  };
  userActivity?: {
    data: Array<{
      date: string;
      daily_active_users: number | null;
      total_sessions: number | null;
      total_video_views: number | null;
    }>;
  };
  platformStats?: {
    totalUsers: number;
    totalBusinesses: number;
    totalContent: number;
    totalCampaigns: number;
  };
}

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(210, 70%, 55%)",
  "hsl(150, 60%, 45%)",
  "hsl(35, 80%, 55%)",
  "hsl(280, 60%, 55%)",
];

const GrafanaPanels = () => {
  const [data, setData] = useState<MetricsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const { data: metricsData, error } = await supabase.functions.invoke("system-metrics");
      if (!error && metricsData && !metricsData.error) {
        setData(metricsData);
      }
    } catch {
      // silently fail — SystemHealthDashboard already handles errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 120000);
    return () => clearInterval(interval);
  }, []);

  // --- Chart data transforms ---
  const responseTimeData = (data?.uptime?.monitors || [])
    .filter((m) => m.responseTimes.length > 0)
    .map((m) => ({
      name: m.name.length > 18 ? m.name.slice(0, 16) + "…" : m.name,
      avgMs: m.avgResponseTime ?? 0,
      availability: m.availability,
    }));

  const activityData = (data?.userActivity?.data || [])
    .slice()
    .reverse()
    .map((d) => ({
      date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      DAU: d.daily_active_users ?? 0,
      Sessions: d.total_sessions ?? 0,
      Views: d.total_video_views ?? 0,
    }));

  const storagePieData = [
    ...(data?.storage?.buckets || []).map((b) => ({ name: b.name, value: b.files })),
    ...(data?.r2Storage?.folders || []).map((f) => ({ name: `R2/${f.name}`, value: f.files })),
  ].filter((d) => d.value > 0);

  const platformData = data?.platformStats
    ? [
        { name: "Users", value: data.platformStats.totalUsers },
        { name: "Businesses", value: data.platformStats.totalBusinesses },
        { name: "Content", value: data.platformStats.totalContent },
        { name: "Campaigns", value: data.platformStats.totalCampaigns },
      ]
    : [];

  if (loading && !data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Infrastructure Monitoring
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[220px] w-full rounded-md" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Infrastructure Monitoring
        </h2>
        <Button variant="ghost" size="icon" onClick={fetchMetrics} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Response Times */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Database className="w-4 h-4" />
              Monitor Response Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            {responseTimeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={responseTimeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" unit="ms" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [`${value} ms`, "Avg Response"]}
                  />
                  <Bar dataKey="avgMs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
                No monitor data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Active Users */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Daily User Activity (7d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={activityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="DAU"
                    stroke="hsl(var(--primary))"
                    fill="url(#dauGrad)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="Sessions"
                    stroke="hsl(210, 70%, 55%)"
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
                No activity data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Storage Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Storage Distribution (Files)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {storagePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={storagePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {storagePieData.map((_, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
                No storage data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Platform Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            {platformData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={platformData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {platformData.map((_, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
                No platform data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrafanaPanels;
