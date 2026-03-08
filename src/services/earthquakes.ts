<<<<<<< HEAD
import type { Earthquake } from '@/types';
import { API_URLS } from '@/config';
import { createCircuitBreaker } from '@/utils';
import { getPersistentCache, setPersistentCache } from './persistent-cache';
=======
import {
  SeismologyServiceClient,
  type Earthquake,
  type ListEarthquakesResponse,
} from '@/generated/client/worldmonitor/seismology/v1/service_client';
import { createCircuitBreaker } from '@/utils';
import { getHydratedData } from '@/services/bootstrap';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

// Re-export the proto Earthquake type as the domain's public type
export type { Earthquake };

const client = new SeismologyServiceClient('', { fetch: (...args) => globalThis.fetch(...args) });
const breaker = createCircuitBreaker<ListEarthquakesResponse>({ name: 'Seismology', cacheTtlMs: 30 * 60 * 1000, persistCache: true });

<<<<<<< HEAD
const OVERLAY_CACHE_KEY = 'map-overlay:earthquakes';
const breaker = createCircuitBreaker<Earthquake[]>({ name: 'USGS Earthquakes' });

async function getFallbackEarthquakes(): Promise<Earthquake[]> {
  const entry = await getPersistentCache<Array<Omit<Earthquake, 'time'> & { time: string }>>(OVERLAY_CACHE_KEY);
  if (!entry?.data) return [];
  return entry.data.map(item => ({ ...item, time: new Date(item.time) }));
}

export async function fetchEarthquakes(): Promise<Earthquake[]> {
  const live = await breaker.execute(async () => {
    const response = await fetch(API_URLS.earthquakes);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: USGSResponse = await response.json();
    return data.features.map((feature) => ({
      id: feature.id,
      place: feature.properties.place || 'Unknown',
      magnitude: feature.properties.mag,
      lon: feature.geometry.coordinates[0],
      lat: feature.geometry.coordinates[1],
      depth: feature.geometry.coordinates[2],
      time: new Date(feature.properties.time),
      url: feature.properties.url,
    }));
  }, []);

  if (live.length > 0) {
    void setPersistentCache(
      OVERLAY_CACHE_KEY,
      live.map(item => ({ ...item, time: item.time.toISOString() }))
    );
    return live;
  }

  return getFallbackEarthquakes();
}

export function getEarthquakesStatus(): string {
  return breaker.getStatus();
}

export function getEarthquakesDataState() {
  return breaker.getDataState();
=======
const emptyFallback: ListEarthquakesResponse = { earthquakes: [] };

export async function fetchEarthquakes(): Promise<Earthquake[]> {
  const hydrated = getHydratedData('earthquakes') as ListEarthquakesResponse | undefined;
  if (hydrated?.earthquakes?.length) return hydrated.earthquakes;

  const response = await breaker.execute(async () => {
    return client.listEarthquakes({ minMagnitude: 0, start: 0, end: 0, pageSize: 0, cursor: '' });
  }, emptyFallback);
  return response.earthquakes;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}
