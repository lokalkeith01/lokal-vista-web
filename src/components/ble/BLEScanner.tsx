import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bluetooth, Radio, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BLEDevice {
  name: string;
  id: string;
  rssi?: number;
}

export const BLEScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<BLEDevice[]>([]);
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const checkBLESupport = () => {
    if (!navigator.bluetooth) {
      toast({
        title: "Bluetooth Not Supported",
        description: "Web Bluetooth API is not available in this browser. Try Chrome, Edge, or Opera.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const startScanning = async () => {
    if (!checkBLESupport()) return;

    setScanning(true);
    try {
      // Request BLE device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'device_information']
      });

      console.log('BLE Device found:', device.name, device.id);

      // Add device to list
      setDevices(prev => [...prev, {
        name: device.name || 'Unknown Device',
        id: device.id,
      }]);

      // Listen for advertisements (if supported)
      if ('watchAdvertisements' in device) {
        device.addEventListener('advertisementreceived', async (event: any) => {
          const rssi = event.rssi;
          const distance = Math.pow(10, ((-69 - rssi) / (10 * 2)));

          console.log(`RSSI: ${rssi}, Distance: ${distance.toFixed(2)}m`);

          // Insert detection into database
          // Note: You'll need to create a beacon in the beacons table first
          // and map the device.id to your beacon's UUID
          const { data: beaconData } = await supabase
            .from('beacons')
            .select('id')
            .eq('mac_address', device.id)
            .single();

          if (beaconData) {
            await supabase.from('beacon_detections').insert({
              beacon_id: beaconData.id,
              device_fingerprint: `web_${device.id}`,
              signal_strength: rssi,
              distance_meters: parseFloat(distance.toFixed(2)),
              detection_type: 'ble',
              metadata: {
                device_name: device.name || 'Unknown',
                source: 'web_bluetooth',
              },
            });
          }

          setDevices(prev => prev.map(d => 
            d.id === device.id ? { ...d, rssi } : d
          ));
        });

        await device.watchAdvertisements();
        setConnected(true);

        toast({
          title: "Connected",
          description: `Now monitoring ${device.name || 'BLE device'}`,
        });
      }

    } catch (error) {
      console.error('BLE scanning error:', error);
      toast({
        title: "Scanning Failed",
        description: error instanceof Error ? error.message : "Failed to scan for BLE devices",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setConnected(false);
    setDevices([]);
    toast({
      title: "Disconnected",
      description: "Stopped monitoring BLE devices",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bluetooth className="h-5 w-5" />
          BLE Device Scanner
        </CardTitle>
        <CardDescription>
          Connect to real BLE beacons using Web Bluetooth API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={startScanning}
            disabled={scanning || connected}
            className="flex-1"
          >
            {scanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Radio className="mr-2 h-4 w-4" />
                Scan for Devices
              </>
            )}
          </Button>
          {connected && (
            <Button onClick={stopScanning} variant="destructive">
              Stop
            </Button>
          )}
        </div>

        {devices.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Detected Devices:</p>
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.id}</p>
                </div>
                {device.rssi && (
                  <Badge variant="outline">
                    {device.rssi} dBm
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};