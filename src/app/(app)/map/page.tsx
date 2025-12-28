
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import { MapView } from '@/components/map/map-view';
import { useDoc, useUser, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { getNearbyLocations, LocationWithDistance } from '@/app/actions/location';
import { Skeleton } from '@/components/ui/skeleton';

type UserProfile = {
  profile?: {
    primaryCity?: { lat: number; lng: number; name: string };
    secondaryCity?: { lat: number; lng: number; name: string };
    activeCity?: 'primary' | 'secondary';
  };
};

const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function MapPage() {
  const { user } = useUser();
  const firestore = getFirestore();
  
  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  const [radius, setRadius] = useState(10);
  const [locations, setLocations] = useState<LocationWithDistance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  const activeCity = useMemo(() => {
    if (!userProfile?.profile) return null;
    const { primaryCity, secondaryCity, activeCity } = userProfile.profile;
    return activeCity === 'secondary' && secondaryCity ? secondaryCity : primaryCity;
  }, [userProfile]);

  useEffect(() => {
    if (activeCity) {
      setCenter({ lat: activeCity.lat, lng: activeCity.lng });
    }
  }, [activeCity]);

  useEffect(() => {
    if (center) {
      setIsLoading(true);
      getNearbyLocations({ center, radiusKm: radius })
        .then(setLocations)
        .finally(() => setIsLoading(false));
    }
  }, [center, radius]);

  if (isProfileLoading || !center) {
    return <MapPageSkeleton />;
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-10rem)] gap-4">
      <aside className="w-full md:w-1/3 lg:w-1/4">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Luoghi Vicini</CardTitle>
            <div className="flex gap-2 pt-2">
              <Select value={String(radius)} onValueChange={(val) => setRadius(Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Raggio" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 5, 10, 20].map(r => <SelectItem key={r} value={String(r)}>{r} km</SelectItem>)}
                </SelectContent>
              </Select>
              {/* Add other filters here */}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <div className="space-y-2">
                {locations.map(loc => (
                  <div key={loc.id} className="p-3 rounded-lg border hover:bg-muted/50">
                    <h3 className="font-semibold">{loc.name}</h3>
                    <p className="text-sm text-muted-foreground">{loc.city}</p>
                    <p className="text-xs font-bold text-primary">{loc.distanceKm.toFixed(1)} km</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </aside>
      <main className="flex-1 h-full rounded-lg overflow-hidden">
        <Wrapper apiKey={MAP_API_KEY} render={ErrorComponent}>
          <MapView
            center={center}
            zoom={12}
            locations={locations}
          />
        </Wrapper>
      </main>
    </div>
  );
}

function MapPageSkeleton() {
    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-10rem)] gap-4">
            <aside className="w-full md:w-1/3 lg:w-1/4">
                <Card className="h-full flex flex-col">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                    </div>
                </CardContent>
                </Card>
            </aside>
            <main className="flex-1 h-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </main>
        </div>
    );
}


const ErrorComponent: React.FC = () => (
  <div className="h-full w-full bg-destructive/10 flex items-center justify-center text-destructive">
    <p>Error loading map. Please check the API key and configuration.</p>
  </div>
);
