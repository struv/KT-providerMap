import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { MapState } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  mapState: MapState;
  onMapStateChange: (newState: Partial<MapState>) => void;
}

function MapEvents({ onMapStateChange }: { onMapStateChange: (newState: Partial<MapState>) => void }) {
  const map = useMap();
  
  React.useEffect(() => {
    map.on('zoomend', () => {
      onMapStateChange({ zoom: map.getZoom() });
    });
    map.on('moveend', () => {
      const center = map.getCenter();
      onMapStateChange({ center: [center.lat, center.lng] });
    });
  }, [map, onMapStateChange]);

  return null;
}

export default function Map({ mapState, onMapStateChange }: MapProps) {
  return (
    <MapContainer
      center={mapState.center}
      zoom={mapState.zoom}
      style={{ height: 'calc(100vh - 64px)', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onMapStateChange={onMapStateChange} />
    </MapContainer>
  );
} 