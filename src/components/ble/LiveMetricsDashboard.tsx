import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Clock, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MetricsData {
  totalVisitors: number;
  activeVisitors: number;
  avgDwellTime: number;
  campaignConversions: number;
}

export const LiveMetricsDashboard = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    totalVisitors: 0,
    activeVisitors: 0,
    avgDwellTime: 0,
    campaignConversions: 0,
  });

  const [recentDetections, setRecentDetections] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Fetch initial metrics
    fetchMetrics();

    // Subscribe to real-time updates
    const detectionChannel = supabase
      .channel('beacon-detections-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'beacon_detections'
        },
        (payload) => {
          console.log('New detection:', payload.new);
          setRecentDetections(prev => [payload.new, ...prev.slice(0, 9)]);
          fetchMetrics(); // Refresh metrics
        }
      )
      .subscribe();

    const sessionChannel = supabase
      .channel('visitor-sessions-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitor_sessions'
        },
        () => {
          fetchMetrics(); // Refresh metrics on session changes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(detectionChannel);
      supabase.removeChannel(sessionChannel);
    };
  }, []);

  const fetchMetrics = async () => {
    try {
      // Total visitors today
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const { count: totalVisitors } = await supabase
        .from('visitor_sessions')
        .select('*', { count: 'exact', head: true })
        .gte('session_start', startOfDay.toISOString());

      // Active visitors
      const { count: activeVisitors } = await supabase
        .from('visitor_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Average dwell time
      const { data: sessions } = await supabase
        .from('visitor_sessions')
        .select('total_dwell_time_seconds')
        .not('total_dwell_time_seconds', 'is', null)
        .gte('session_start', startOfDay.toISOString());

      const avgDwellTime = sessions && sessions.length > 0
        ? sessions.reduce((sum, s) => sum + (s.total_dwell_time_seconds || 0), 0) / sessions.length
        : 0;

      // Campaign conversions
      const { count: campaignConversions } = await supabase
        .from('campaign_attributions')
        .select('*', { count: 'exact', head: true })
        .gte('attributed_at', startOfDay.toISOString());

      setMetrics({
        totalVisitors: totalVisitors || 0,
        activeVisitors: activeVisitors || 0,
        avgDwellTime: Math.round(avgDwellTime / 60), // Convert to minutes
        campaignConversions: campaignConversions || 0,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const metricCards = [
    {
      title: 'Total Visitors Today',
      value: metrics.totalVisitors,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Visitors',
      value: metrics.activeVisitors,
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Avg. Dwell Time',
      value: `${metrics.avgDwellTime}m`,
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      title: 'Campaign Conversions',
      value: metrics.campaignConversions,
      icon: Target,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Metrics</h2>
        <Badge variant={isLive ? "default" : "secondary"}>
          {isLive ? "● Live" : "Paused"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{metric.value}</span>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Detections</CardTitle>
          <CardDescription>Live stream of BLE beacon detections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentDetections.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Waiting for detections...
              </p>
            ) : (
              recentDetections.map((detection, idx) => (
                <div
                  key={detection.id || idx}
                  className="flex items-center justify-between p-3 border rounded-lg animate-in fade-in slide-in-from-top-2"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {detection.device_fingerprint}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(detection.detected_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {detection.signal_strength} dBm
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {detection.distance_meters}m
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};