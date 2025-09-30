import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BLEScanner } from '@/components/ble/BLEScanner';
import { LiveMetricsDashboard } from '@/components/ble/LiveMetricsDashboard';
import { SimulatorControls } from '@/components/ble/SimulatorControls';
import { Radio, BarChart3, Zap } from 'lucide-react';

const LiveBLE = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Live BLE Monitoring</h1>
            <p className="text-muted-foreground">
              Real-time beacon detection and visitor analytics
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="scanner" className="flex items-center gap-2">
                <Radio className="h-4 w-4" />
                BLE Scanner
              </TabsTrigger>
              <TabsTrigger value="simulator" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Simulator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <LiveMetricsDashboard />
            </TabsContent>

            <TabsContent value="scanner" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BLEScanner />
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">About Web Bluetooth</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      The Web Bluetooth API allows websites to communicate with Bluetooth Low Energy devices.
                    </p>
                    <p className="font-medium text-foreground">Requirements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Chrome, Edge, or Opera browser</li>
                      <li>HTTPS connection (or localhost)</li>
                      <li>BLE beacon in range</li>
                      <li>User permission granted</li>
                    </ul>
                    <p className="mt-4">
                      Click "Scan for Devices" to discover nearby BLE beacons. 
                      Once connected, detections will appear in real-time on the dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulator" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SimulatorControls />
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Simulation Features</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      The simulator generates realistic BLE beacon detections for testing and demonstrations.
                    </p>
                    <p className="font-medium text-foreground">Capabilities:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Configurable traffic intensity</li>
                      <li>Realistic signal strength (-50 to -90 dBm)</li>
                      <li>Distance calculation from RSSI</li>
                      <li>Automatic visitor session tracking</li>
                      <li>Campaign attribution simulation</li>
                    </ul>
                    <p className="mt-4">
                      Perfect for demos, testing analytics, and showcasing the platform's capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiveBLE;