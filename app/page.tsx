'use client';

import React from 'react';
import MapWrapper from '../components/MapWrapper';
import { MapState } from '../types';

export default function Home() {
  const [mapState, setMapState] = React.useState<MapState>({
    selectedProvider: null,
    selectedClinic: null,
    zoom: 12,
    center: [34.0522, -118.2437], // Los Angeles coordinates
  });

  const handleMapStateChange = (newState: Partial<MapState>) => {
    setMapState(prev => ({ ...prev, ...newState }));
  };

  return (
    <main className="min-h-screen">
      <header className="h-16 bg-white shadow-sm flex items-center px-4">
        <h1 className="text-xl font-semibold text-gray-800">Provider Map</h1>
      </header>
      <MapWrapper mapState={mapState} onMapStateChange={handleMapStateChange} />
    </main>
  );
} 