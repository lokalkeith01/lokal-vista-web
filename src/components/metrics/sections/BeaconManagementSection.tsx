import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Plus, MapPin, Signal, Clock, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, formatDistanceToNow } from "date-fns";

const BeaconManagementSection = () => {
  const { data: beacons, isLoading } = useQuery({
    queryKey: ['all-beacons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beacons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: recentDetections } = useQuery({
    queryKey: ['recent-detections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('beacon_detections')
        .select('*, beacons(name, location_name)')
        .order('detected_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data || [];
    },
  });

  const activeBeacons = beacons?.filter(b => b.is_active) || [];
  const totalDetections = recentDetections?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Beacon Management</h2>
          <p className="text-muted-foreground">Monitor and manage BLE beacons across locations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Beacon
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Radio className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{beacons?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Beacons</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeBeacons.length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Signal className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalDetections}</p>
                <p className="text-sm text-muted-foreground">Recent Detections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {new Set(beacons?.map(b => b.location_name)).size || 0}
                </p>
                <p className="text-sm text-muted-foreground">Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Beacons List */}
        <Card>
          <CardHeader>
            <CardTitle>All Beacons</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : beacons && beacons.length > 0 ? (
              <div className="space-y-3">
                {beacons.map((beacon) => (
                  <div key={beacon.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg ${beacon.is_active ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Radio className={`h-5 w-5 ${beacon.is_active ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{beacon.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {beacon.location_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={beacon.is_active ? 'default' : 'secondary'}>
                        {beacon.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      {beacon.last_seen_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(beacon.last_seen_at), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Radio className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No beacons configured</p>
                <p className="text-sm">Add your first beacon to start tracking</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Detections */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Detections</CardTitle>
          </CardHeader>
          <CardContent>
            {recentDetections && recentDetections.length > 0 ? (
              <div className="space-y-3">
                {recentDetections.map((detection) => (
                  <div key={detection.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Signal className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {detection.beacons?.name || 'Unknown Beacon'}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Signal: {detection.signal_strength} dBm
                        {detection.distance_meters && ` • ${detection.distance_meters.toFixed(1)}m`}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {detection.detected_at && formatDistanceToNow(new Date(detection.detected_at), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Signal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent detections</p>
                <p className="text-sm">Detections will appear here in real-time</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BeaconManagementSection;
