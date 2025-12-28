
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LocationWithDistance } from '@/app/actions/location';

interface MapViewProps {
  center: { lat: number; lng: number };
  zoom: number;
  locations: LocationWithDistance[];
}

export const MapView: React.FC<MapViewProps> = ({ center, zoom, locations }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: false,
        streetViewControl: false,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);
  
  // Update map center when props change
  useEffect(() => {
    if(map && center) {
        map.panTo(center);
    }
  }, [map, center]);


  // Update markers when locations change
  useEffect(() => {
    if (map) {
      // Clear old markers
      markers.forEach(marker => marker.setMap(null));
      
      const newMarkers = locations.map(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.geo.lat, lng: location.geo.lng },
          map: map,
          title: location.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div><strong>${location.name}</strong><br/>${location.city}</div>`,
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
        
        return marker;
      });

      setMarkers(newMarkers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, locations]);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};
