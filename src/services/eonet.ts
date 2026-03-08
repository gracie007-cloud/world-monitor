import type { NaturalEvent, NaturalEventCategory } from '@/types';
<<<<<<< HEAD
import { fetchGDACSEvents, type GDACSEvent } from './gdacs';

interface EonetGeometry {
  magnitudeValue?: number;
  magnitudeUnit?: string;
  date: string;
  type: string;
  coordinates: [number, number];
}

interface EonetSource {
  id: string;
  url: string;
}

interface EonetCategory {
  id: string;
  title: string;
}

interface EonetEvent {
  id: string;
  title: string;
  description: string | null;
  closed: string | null;
  categories: EonetCategory[];
  sources: EonetSource[];
  geometry: EonetGeometry[];
}

interface EonetResponse {
  title: string;
  events: EonetEvent[];
}

const EONET_API_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events';
=======
import { NATURAL_EVENT_CATEGORIES } from '@/types';
import {
  NaturalServiceClient,
  type ListNaturalEventsResponse,
} from '@/generated/client/worldmonitor/natural/v1/service_client';
import { createCircuitBreaker } from '@/utils';
import { getHydratedData } from '@/services/bootstrap';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

const CATEGORY_ICONS: Record<NaturalEventCategory, string> = {
  severeStorms: '🌀',
  wildfires: '🔥',
  volcanoes: '🌋',
  earthquakes: '🔴',
  floods: '🌊',
  landslides: '⛰️',
  drought: '☀️',
  dustHaze: '🌫️',
  snow: '❄️',
  tempExtremes: '🌡️',
  seaLakeIce: '🧊',
  waterColor: '🦠',
  manmade: '⚠️',
};

export function getNaturalEventIcon(category: NaturalEventCategory): string {
  return CATEGORY_ICONS[category] || '⚠️';
}

<<<<<<< HEAD
// Wildfires older than 48 hours are filtered out (stale data)
const WILDFIRE_MAX_AGE_MS = 48 * 60 * 60 * 1000;

const GDACS_TO_CATEGORY: Record<string, NaturalEventCategory> = {
  EQ: 'earthquakes',
  FL: 'floods',
  TC: 'severeStorms',
  VO: 'volcanoes',
  WF: 'wildfires',
  DR: 'drought',
};

function convertGDACSToNaturalEvent(gdacs: GDACSEvent): NaturalEvent {
  const category = GDACS_TO_CATEGORY[gdacs.eventType] || 'manmade';
  return {
    id: gdacs.id,
    title: `${gdacs.alertLevel === 'Red' ? '🔴 ' : gdacs.alertLevel === 'Orange' ? '🟠 ' : ''}${gdacs.name}`,
    description: `${gdacs.description}${gdacs.severity ? ` - ${gdacs.severity}` : ''}`,
    category,
    categoryTitle: gdacs.description,
    lat: gdacs.coordinates[1],
    lon: gdacs.coordinates[0],
    date: gdacs.fromDate,
    sourceUrl: gdacs.url,
    sourceName: 'GDACS',
    closed: false,
  };
}

export async function fetchNaturalEvents(days = 30): Promise<NaturalEvent[]> {
  const [eonetEvents, gdacsEvents] = await Promise.all([
    fetchEonetEvents(days),
    fetchGDACSEvents(),
  ]);

  console.log(`[NaturalEvents] EONET: ${eonetEvents.length}, GDACS: ${gdacsEvents.length}`);
  const gdacsConverted = gdacsEvents.map(convertGDACSToNaturalEvent);
  const seenLocations = new Set<string>();
  const merged: NaturalEvent[] = [];

  for (const event of gdacsConverted) {
    const key = `${event.lat.toFixed(1)}-${event.lon.toFixed(1)}-${event.category}`;
    if (!seenLocations.has(key)) {
      seenLocations.add(key);
      merged.push(event);
    }
  }

  for (const event of eonetEvents) {
    const key = `${event.lat.toFixed(1)}-${event.lon.toFixed(1)}-${event.category}`;
    if (!seenLocations.has(key)) {
      seenLocations.add(key);
      merged.push(event);
    }
  }

  return merged;
}

async function fetchEonetEvents(days: number): Promise<NaturalEvent[]> {
  try {
    const url = `${EONET_API_URL}?status=open&days=${days}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`EONET API error: ${response.status}`);
    }

    const data: EonetResponse = await response.json();
    const events: NaturalEvent[] = [];
    const now = Date.now();

    for (const event of data.events) {
      const category = event.categories[0];
      if (!category) continue;

      // Skip earthquakes - USGS provides better data for seismic events
      if (category.id === 'earthquakes') continue;

      // Get most recent geometry point
      const latestGeo = event.geometry[event.geometry.length - 1];
      if (!latestGeo || latestGeo.type !== 'Point') continue;

      const eventDate = new Date(latestGeo.date);
      const [lon, lat] = latestGeo.coordinates;
      const source = event.sources[0];

      // Filter out wildfires older than 48 hours
      if (category.id === 'wildfires' && now - eventDate.getTime() > WILDFIRE_MAX_AGE_MS) {
        continue;
      }

      events.push({
        id: event.id,
        title: event.title,
        description: event.description || undefined,
        category: category.id as NaturalEventCategory,
        categoryTitle: category.title,
        lat,
        lon,
        date: eventDate,
        magnitude: latestGeo.magnitudeValue,
        magnitudeUnit: latestGeo.magnitudeUnit,
        sourceUrl: source?.url,
        sourceName: source?.id,
        closed: event.closed !== null,
      });
    }

    return events;
  } catch (error) {
    console.error('[EONET] Failed to fetch natural events:', error);
    return [];
  }
=======
function normalizeNaturalCategory(category: string | undefined): NaturalEventCategory {
  if (!category) return 'manmade';
  return NATURAL_EVENT_CATEGORIES.has(category as NaturalEventCategory)
    ? (category as NaturalEventCategory)
    : 'manmade';
}

const client = new NaturalServiceClient('', { fetch: (...args) => globalThis.fetch(...args) });
const breaker = createCircuitBreaker<ListNaturalEventsResponse>({ name: 'NaturalEvents', cacheTtlMs: 30 * 60 * 1000, persistCache: true });

const emptyFallback: ListNaturalEventsResponse = { events: [] };

function toNaturalEvent(e: ListNaturalEventsResponse['events'][number]): NaturalEvent {
  return {
    id: e.id,
    title: e.title,
    description: e.description || undefined,
    category: normalizeNaturalCategory(e.category),
    categoryTitle: e.categoryTitle,
    lat: e.lat,
    lon: e.lon,
    date: new Date(e.date),
    magnitude: e.magnitude ?? undefined,
    magnitudeUnit: e.magnitudeUnit ?? undefined,
    sourceUrl: e.sourceUrl || undefined,
    sourceName: e.sourceName || undefined,
    closed: e.closed,
  };
}

export async function fetchNaturalEvents(_days = 30): Promise<NaturalEvent[]> {
  const hydrated = getHydratedData('naturalEvents') as ListNaturalEventsResponse | undefined;
  const response = (hydrated?.events?.length ? hydrated : null) ?? await breaker.execute(async () => {
    return client.listNaturalEvents({ days: 30 });
  }, emptyFallback);

  return (response.events || []).map(toNaturalEvent);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}
