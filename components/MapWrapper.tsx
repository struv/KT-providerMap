'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapState } from '../types';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
});

interface MapWrapperProps {
  mapState: MapState;
  onMapStateChange: (newState: Partial<MapState>) => void;
}

export default function MapWrapper({ mapState, onMapStateChange }: MapWrapperProps) {
  return <Map mapState={mapState} onMapStateChange={onMapStateChange} />;
} 