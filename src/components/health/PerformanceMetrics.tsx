import { Activity, Clock, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface Monitor {
  id: string;
  name: string;
  url: string;
  status: string;
  responseTimes: number[];
  avgResponseTime: number | null;
  availability: number;
}

interface PerformanceMetricsProps {
  monitors: Monitor[];
  loading?: boolean;
}

export function PerformanceMetrics({ monitors, loading }: PerformanceMetricsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  // Calculate overall stats
  const avgResponseTime = monitors.reduce((sum, m) => sum + (m.avgResponseTime || 0), 0) / monitors.length;
  const avgAvailability = monitors.reduce((sum, m) => sum + m.availability, 0) / monitors.length;
  const fastestMonitor = monitors.reduce((prev, curr) => 
    (curr.avgResponseTime || Infinity) < (prev.avgResponseTime || Infinity) ? curr : prev
  , monitors[0]);
  const slowestMonitor = monitors.reduce((prev, curr) => 
    (curr.avgResponseTime || 0) > (prev.avgResponseTime || 0) ? curr : prev
  , monitors[0]);

  // Prepare chart data - combine all response times
  const chartData = monitors[0]?.responseTimes.map((_, index) => {
    const point: Record<string, number | string> = { index: index + 1 };
    monitors.forEach((m) => {
      if (m.responseTimes[index]) {
        point[m.name] = m.responseTimes[index];
      }
    });
    return point;
  }) || [];

  const getResponseTimeColor = (ms: number | null) => {
    if (!ms) return "text-muted-foreground";
    if (ms < 200) return "text-green-500";
    if (ms < 500) return "text-yellow-500";
    return "text-red-500";
  };

  const getAvailabilityColor = (percent: number) => {
    if (percent >= 99.9) return "bg-green-500/10 text-green-500";
    if (percent >= 99) return "bg-yellow-500/10 text-yellow-500";
    return "bg-red-500/10 text-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Avg Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getResponseTimeColor(avgResponseTime)}`}>
              {Math.round(avgResponseTime)} ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Avg Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">
              {avgAvailability.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Fastest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium truncate">{fastestMonitor?.name}</p>
            <p className="text-xs text-muted-foreground">
              {fastestMonitor?.avgResponseTime || 0} ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Slowest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium truncate">{slowestMonitor?.name}</p>
            <p className="text-xs text-muted-foreground">
              {slowestMonitor?.avgResponseTime || 0} ms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Response Times (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="index" 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}ms`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value} ms`, '']}
                  />
                  {monitors.slice(0, 3).map((monitor, i) => (
                    <Area
                      key={monitor.id}
                      type="monotone"
                      dataKey={monitor.name}
                      stroke={`hsl(var(--chart-${i + 1}))`}
                      fill={i === 0 ? "url(#colorResponse)" : "none"}
                      strokeWidth={2}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monitor Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Monitor Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monitors.map((monitor) => (
              <div key={monitor.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{monitor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg: {monitor.avgResponseTime || 0} ms
                  </p>
                </div>
                <Badge className={getAvailabilityColor(monitor.availability)}>
                  {monitor.availability.toFixed(2)}% uptime
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
