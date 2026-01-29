import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, Calendar, BarChart3, PieChart, LineChart, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const ReportsSection = () => {
  const { data: dailyAnalytics, isLoading } = useQuery({
    queryKey: ['daily-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);
      
      if (error) throw error;
      return data?.reverse() || [];
    },
  });

  const { data: pageAnalytics } = useQuery({
    queryKey: ['page-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_page_analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      
      // Aggregate by page
      const pageMap = new Map();
      data?.forEach(row => {
        const existing = pageMap.get(row.page_name) || { visits: 0, visitors: 0 };
        pageMap.set(row.page_name, {
          page: row.page_name,
          visits: existing.visits + (row.total_visits || 0),
          visitors: existing.visitors + (row.unique_visitors || 0),
        });
      });
      
      return Array.from(pageMap.values()).slice(0, 10);
    },
  });

  const chartData = dailyAnalytics?.map(day => ({
    date: format(new Date(day.date), 'MMM d'),
    users: day.daily_active_users || 0,
    sessions: day.total_sessions || 0,
    views: day.total_video_views || 0,
  })) || [];

  const totalUsers = dailyAnalytics?.reduce((sum, d) => sum + (d.daily_active_users || 0), 0) || 0;
  const totalSessions = dailyAnalytics?.reduce((sum, d) => sum + (d.total_sessions || 0), 0) || 0;
  const avgSessionDuration = dailyAnalytics?.length 
    ? Math.round(dailyAnalytics.reduce((sum, d) => sum + (d.avg_session_duration_seconds || 0), 0) / dailyAnalytics.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Platform performance and engagement insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalSessions.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <LineChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.floor(avgSessionDuration / 60)}m {avgSessionDuration % 60}s</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <PieChart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pageAnalytics?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Pages Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="sessions" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No analytics data yet</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {pageAnalytics && pageAnalytics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pageAnalytics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="page" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No page analytics yet</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h4 className="font-medium">User Engagement Report</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Daily active users, session duration, and retention metrics
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <FileText className="h-8 w-8 text-green-600 mb-3" />
              <h4 className="font-medium">Content Performance</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Video views, completion rates, and engagement by content type
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <FileText className="h-8 w-8 text-purple-600 mb-3" />
              <h4 className="font-medium">Campaign ROI Analysis</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Budget utilization, impressions, clicks, and conversion data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
