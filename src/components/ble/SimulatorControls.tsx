import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const SimulatorControls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedBeacon, setSelectedBeacon] = useState<string>('');
  const [beacons, setBeacons] = useState<any[]>([]);
  const { toast } = useToast();

  // Fetch beacons
  const fetchBeacons = async () => {
    const { data } = await supabase
      .from('beacons')
      .select('*')
      .eq('is_active', true);
    
    if (data) {
      setBeacons(data);
      if (data.length > 0 && !selectedBeacon) {
        setSelectedBeacon(data[0].id);
      }
    }
  };

  useEffect(() => {
    void fetchBeacons();
  }, []);

  const startSimulation = async () => {
    if (!selectedBeacon) {
      toast({
        title: "No Beacon Selected",
        description: "Please select a beacon to simulate detections",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRunning(true);
      
      const { data, error } = await supabase.functions.invoke('ble-simulator', {
        body: {
          action: 'start',
          beaconId: selectedBeacon,
          intensity,
        },
      });

      if (error) throw error;

      toast({
        title: "Simulation Started",
        description: `Generating ${intensity} intensity detections`,
      });
    } catch (error) {
      console.error('Simulation error:', error);
      toast({
        title: "Simulation Failed",
        description: error instanceof Error ? error.message : "Failed to start simulation",
        variant: "destructive",
      });
      setIsRunning(false);
    }
  };

  const stopSimulation = async () => {
    try {
      await supabase.functions.invoke('ble-simulator', {
        body: {
          action: 'stop',
          beaconId: selectedBeacon,
        },
      });

      setIsRunning(false);
      toast({
        title: "Simulation Stopped",
        description: "No longer generating detections",
      });
    } catch (error) {
      console.error('Stop error:', error);
      toast({
        title: "Error",
        description: "Failed to stop simulation",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Simulator Controls
        </CardTitle>
        <CardDescription>
          Generate simulated BLE beacon detections for testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Beacon</label>
          <Select value={selectedBeacon} onValueChange={setSelectedBeacon}>
            <SelectTrigger>
              <SelectValue placeholder="Select a beacon" />
            </SelectTrigger>
            <SelectContent>
              {beacons.map((beacon) => (
                <SelectItem key={beacon.id} value={beacon.id}>
                  {beacon.name} - {beacon.location_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Intensity</label>
          <Select
            value={intensity}
            onValueChange={(v) => setIntensity(v as 'low' | 'medium' | 'high')}
            disabled={isRunning}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (2 detections/5s)</SelectItem>
              <SelectItem value="medium">Medium (5 detections/3s)</SelectItem>
              <SelectItem value="high">High (10 detections/1.5s)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={isRunning ? stopSimulation : startSimulation}
          variant={isRunning ? "destructive" : "default"}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Square className="mr-2 h-4 w-4" />
              Stop Simulation
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start Simulation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};