
'use client';

import { distanceBetween, geohashQueryBounds, geohashForLocation } from 'geofire-common';
import { collection, query, where, orderBy, getDocs, Query, DocumentData, startAt, endAt } from 'firebase/firestore';
import { firestore } from '@/firebase'; // Assumes you have a way to get the firestore instance

// Defines the structure of the location data stored in Firestore.
interface BookLocation {
    lat: number;
    lng: number;
    city: string;
    geohash: string;
}

// Defines the structure of the book data as stored in Firestore.
export interface BookDocument {
    id: string;
    title: string;
    author: string;
    status: 'available' | 'in-swap' | 'swapped';
    ownerId: string;
    location: BookLocation;
    // other fields...
}

const MAX_SEARCH_RADIUS_KM = 50; // Set a reasonable maximum radius to prevent overly broad queries.

/**
 * Searches for available books within a specified radius from a user's location.
 *
 * This function performs a geospatial query using geohashes to efficiently find documents
 * within a bounding box, then filters the results in-client to get an exact radius match.
 *
 * @param userLat The latitude of the user's current location.
 * @param userLng The longitude of the user's current location.
 * @param radiusInKm The search radius in kilometers. Will be capped at MAX_SEARCH_RADIUS_KM.
 * @returns A promise that resolves to an array of BookDocument objects within the radius,
 *          each with an added `distanceKm` property.
 */
export async function searchBooksNearby(userLat: number, userLng: number, radiusInKm: number): Promise<(BookDocument & { distanceKm: number })[]> {
    if (!firestore) {
        console.error("Firestore is not initialized.");
        return [];
    }

    const effectiveRadiusInKm = Math.min(radiusInKm, MAX_SEARCH_RADIUS_KM);
    const center: [number, number] = [userLat, userLng];
    const radiusInM = effectiveRadiusInKm * 1000;

    // Get the geohash query bounds for the given radius.
    // This creates one or more bounding boxes to query against.
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises: Promise<DocumentData[]>[] = [];

    const booksCollection = collection(firestore, 'books');

    // Construct a query for each bound.
    for (const b of bounds) {
        const q = query(
            booksCollection,
            where('status', '==', 'available'),
            orderBy('location.geohash'),
            startAt(b[0]),
            endAt(b[1])
        );

        promises.push(getDocs(q).then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookDocument))));
    }

    // Execute all queries in parallel.
    const snapshots = await Promise.all(promises);
    const potentialMatches: { [key: string]: BookDocument } = {};

    // Merge results and remove duplicates.
    for (const snap of snapshots) {
        for (const doc of snap) {
            potentialMatches[doc.id] = doc;
        }
    }

    const finalResults: (BookDocument & { distanceKm: number })[] = [];
    const centerLatLng: [number, number] = [userLat, userLng];

    // Client-side filtering: calculate the precise distance and filter out results
    // that were in the bounding box but not in the actual radius.
    for (const id in potentialMatches) {
        const book = potentialMatches[id];
        const bookLatLng: [number, number] = [book.location.lat, book.location.lng];

        const distanceInKm = distanceBetween(bookLatLng, centerLatLng);
        
        if (distanceInKm <= effectiveRadiusInKm) {
            finalResults.push({ ...book, distanceKm: distanceInKm });
        }
    }
    
    // Optional: Sort results by distance.
    finalResults.sort((a, b) => a.distanceKm - b.distanceKm);

    return finalResults;
}


/**
 * Generates a geohash for a given latitude and longitude.
 * To be used when creating or updating a book's location.
 * 
 * @param lat Latitude
 * @param lng Longitude
 * @returns The generated geohash string.
 */
export function generateGeohash(lat: number, lng: number): string {
    return geohashForLocation([lat, lng]);
}


/**
 * Firestore Indexes Needed:
 * 
 * To run the queries in `searchBooksNearby`, you must create the following composite index in your
 * Firestore console. Without it, the queries will fail.
 * 
 * 1. Collection ID: `books`
 *    Fields to Index:
 *    - `status` (Ascending)
 *    - `location.geohash` (Ascending)
 *    Query Scope: Collection
 * 
 * You can create this by going to your Firestore database > Indexes > Composite > Create Index.
 */

