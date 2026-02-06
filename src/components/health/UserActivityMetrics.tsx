import { Users, Play, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { format, parseISO } from "date-fns";

interface DailyAnalytics {
  date: string;
  daily_active_users: number | null;
  total_sessions: number | null;
  total_video_views: number | null;
  avg_session_duration_seconds: number | null;
  avg_video_completion_rate: number | null;
}

interface UserActivityData {
  data: DailyAnalytics[];
  summary: {
    totalDAU: number;
    avgSessionDuration: number;
    totalVideoViews: number;
    avgCompletionRate: number;
  } | null;
  error?: string;
}

interface PlatformStats {
  totalUsers: number;
  totalBusinesses: number;
  totalContent: number;
  totalCampaigns: number;
  error?: string;
}

interface UserActivityMetricsProps {
  activityData: UserActivityData | null;
  platformStats: PlatformStats | null;
  loading?: boolean;
}

export function UserActivityMetrics({ activityData, platformStats, loading }: UserActivityMetricsProps) {
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

  // Prepare chart data
  const chartData = activityData?.data
    ?.slice()
    .reverse()
    .map((d) => ({
      date: format(parseISO(d.date), "MMM d"),
      dau: d.daily_active_users || 0,
      sessions: d.total_sessions || 0,
      views: d.total_video_views || 0,
      duration: Math.round((d.avg_session_duration_seconds || 0) / 60),
      completion: Math.round((d.avg_video_completion_rate || 0) * 100),
    })) || [];

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{platformStats?.totalUsers || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Businesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{platformStats?.totalBusinesses || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Play className="h-3 w-3" />
              Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{platformStats?.totalContent || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{platformStats?.totalCampaigns || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      {activityData?.summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-primary/5">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">7-Day DAU Total</p>
              <p className="text-xl font-bold">{activityData.summary.totalDAU}</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Avg Session Duration</p>
              <p className="text-xl font-bold">
                {formatDuration(activityData.summary.avgSessionDuration)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">7-Day Video Views</p>
              <p className="text-xl font-bold">{activityData.summary.totalVideoViews}</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Avg Completion Rate</p>
              <p className="text-xl font-bold">
                {(activityData.summary.avgCompletionRate * 100).toFixed(0)}%
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DAU Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Daily Active Users (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="dau"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorDau)"
                    strokeWidth={2}
                    name="DAU"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Views Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Video Views & Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="views"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                    name="Views"
                  />
                  <Bar
                    dataKey="completion"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                    name="Completion %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
