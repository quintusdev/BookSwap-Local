
'use server';

import { getFirestore, collection, query, where, orderBy, startAt, endAt, getDocs, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { geohashQueryBounds, distanceBetween, geohashForLocation } from 'geofire-common';
import { initializeFirebase } from '@/firebase/server-init'; // Server-side initialization

export interface LocationWithDistance {
    id: string;
    name: string;
    city: string;
    geo: { lat: number, lng: number };
    distanceKm: number;
}

interface GetNearbyLocationsParams {
    center: { lat: number; lng: number };
    radiusKm: number;
    filters?: { type?: string; hubOnly?: boolean };
}


/**
 * Securely queries for locations within a given radius.
 * This function is designed to be called from the frontend as a Server Action.
 */
export async function getNearbyLocations({ center, radiusKm, filters = {} }: GetNearbyLocationsParams): Promise<LocationWithDistance[]> {
    const { firestore } = initializeFirebase();
    const locationsCollection = collection(firestore, 'locations');

    const radiusInM = radiusKm * 1000;
    const bounds = geohashQueryBounds([center.lat, center.lng], radiusInM);

    const promises = [];
    for (const b of bounds) {
        let q = query(
            locationsCollection,
            where('status', '==', 'active'),
            orderBy('geohash'),
            startAt(b[0]),
            endAt(b[1])
        );

        // Apply filters if they exist
        if (filters.type) {
            q = query(q, where('type', '==', filters.type));
        }
        if (filters.hubOnly) {
            q = query(q, where('milestoneLevel', '>=', 1));
        }

        promises.push(getDocs(q));
    }

    const snapshots = await Promise.all(promises);
    const potentialMatches: Map<string, any> = new Map();

    for (const snap of snapshots) {
        for (const document of snap.docs) {
            if (!potentialMatches.has(document.id)) {
                potentialMatches.set(document.id, { id: document.id, ...document.data() });
            }
        }
    }

    const finalResults: LocationWithDistance[] = [];
    for (const location of potentialMatches.values()) {
        const distanceInKm = distanceBetween([location.geo.lat, location.geo.lng], [center.lat, center.lng]);
        if (distanceInKm <= radiusKm) {
            finalResults.push({
                id: location.id,
                name: location.name,
                city: location.city,
                geo: location.geo,
                distanceKm: distanceInKm
            });
        }
    }
    
    finalResults.sort((a, b) => a.distanceKm - b.distanceKm);

    return finalResults.slice(0, 100); // Limit results
}


/**
 * Updates the geohash for a location document.
 * Simulates a server-side trigger (e.g., Cloud Function onWrite).
 */
export async function updateLocationGeohash(locationId: string, lat: number, lng: number): Promise<void> {
    const { firestore } = initializeFirebase();
    const locationRef = doc(firestore, 'locations', locationId);
    
    const newGeohash = geohashForLocation([lat, lng]);

    await updateDoc(locationRef, {
        geohash: newGeohash,
        'geo.lat': lat,
        'geo.lng': lng
    });
}
