export interface Provider {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface MapState {
  selectedProvider: Provider | null;
  selectedClinic: Clinic | null;
  zoom: number;
  center: [number, number];
} 