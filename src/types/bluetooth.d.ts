// Web Bluetooth API type declarations
interface BluetoothDevice {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
  watchAdvertisements?(): Promise<void>;
  addEventListener(type: 'advertisementreceived', listener: (event: any) => void): void;
}

interface Navigator {
  bluetooth: {
    requestDevice(options?: any): Promise<BluetoothDevice>;
  };
}