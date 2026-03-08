import type { PizzIntStatus, PizzIntLocation, PizzIntDefconLevel, GdeltTensionPair } from '@/types';
import { createCircuitBreaker } from '@/utils';
<<<<<<< HEAD

interface PizzIntApiResponse {
  success: boolean;
  data: Array<{
    place_id: string;
    name: string;
    address: string;
    current_popularity: number;
    percentage_of_usual: number | null;
    is_spike: boolean;
    spike_magnitude: number | null;
    data_source: string;
    recorded_at: string;
    data_freshness: 'fresh' | 'stale';
    is_closed_now?: boolean;
  }>;
}

interface GdeltApiResponse {
  [key: string]: Array<{ t: number; v: number }>;
}
=======
import { t } from '@/services/i18n';
import {
  IntelligenceServiceClient,
  type GetPizzintStatusResponse,
  type PizzintStatus as ProtoPizzintStatus,
  type PizzintLocation as ProtoLocation,
  type GdeltTensionPair as ProtoTensionPair,
} from '@/generated/client/worldmonitor/intelligence/v1/service_client';

// ---- Sebuf client ----

const client = new IntelligenceServiceClient('', { fetch: (...args) => globalThis.fetch(...args) });

// ---- Circuit breakers ----
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

const pizzintBreaker = createCircuitBreaker<PizzIntStatus>({
  name: 'PizzINT',
  maxFailures: 3,
  cooldownMs: 5 * 60 * 1000,
<<<<<<< HEAD
  cacheTtlMs: 2 * 60 * 1000
=======
  cacheTtlMs: 30 * 60 * 1000,
  persistCache: true,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
});

const gdeltBreaker = createCircuitBreaker<GdeltTensionPair[]>({
  name: 'GDELT Tensions',
  maxFailures: 3,
  cooldownMs: 5 * 60 * 1000,
<<<<<<< HEAD
  cacheTtlMs: 10 * 60 * 1000
});

const DEFCON_THRESHOLDS: Array<{ level: PizzIntDefconLevel; min: number; label: string }> = [
  { level: 1, min: 85, label: 'COCKED PISTOL • MAXIMUM READINESS' },
  { level: 2, min: 70, label: 'FAST PACE • ARMED FORCES READY' },
  { level: 3, min: 50, label: 'ROUND HOUSE • INCREASE FORCE READINESS' },
  { level: 4, min: 25, label: 'DOUBLE TAKE • INCREASED INTELLIGENCE WATCH' },
  { level: 5, min: 0, label: 'FADE OUT • LOWEST READINESS' },
];

function calculateDefcon(aggregateActivity: number, activeSpikes: number): { level: PizzIntDefconLevel; label: string } {
  let adjusted = aggregateActivity;
  if (activeSpikes > 0) adjusted += activeSpikes * 10;
  adjusted = Math.min(100, adjusted);

  for (const threshold of DEFCON_THRESHOLDS) {
    if (adjusted >= threshold.min) {
      return { level: threshold.level, label: threshold.label };
    }
  }
  return { level: 5, label: 'FADE OUT • LOWEST READINESS' };
}

function extractCoordinates(address: string): { lat?: number; lng?: number } {
  const match = address.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (match && match[1] && match[2]) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }
  return {};
}

const defaultStatus: PizzIntStatus = {
  defconLevel: 5,
  defconLabel: 'FADE OUT • LOWEST READINESS',
=======
  cacheTtlMs: 10 * 60 * 1000,
  persistCache: true,
});

// ---- Proto → legacy adapters ----

const DEFCON_LABELS: Record<number, string> = {
  1: 'components.pizzint.defconLabels.1',
  2: 'components.pizzint.defconLabels.2',
  3: 'components.pizzint.defconLabels.3',
  4: 'components.pizzint.defconLabels.4',
  5: 'components.pizzint.defconLabels.5',
};

const FRESHNESS_REVERSE: Record<string, 'fresh' | 'stale'> = {
  DATA_FRESHNESS_FRESH: 'fresh',
  DATA_FRESHNESS_STALE: 'stale',
};

const TREND_REVERSE: Record<string, 'rising' | 'stable' | 'falling'> = {
  TREND_DIRECTION_RISING: 'rising',
  TREND_DIRECTION_STABLE: 'stable',
  TREND_DIRECTION_FALLING: 'falling',
};

function toLocation(proto: ProtoLocation): PizzIntLocation {
  return {
    place_id: proto.placeId,
    name: proto.name,
    address: proto.address,
    current_popularity: proto.currentPopularity,
    percentage_of_usual: proto.percentageOfUsual || null,
    is_spike: proto.isSpike,
    spike_magnitude: proto.spikeMagnitude || null,
    data_source: proto.dataSource,
    recorded_at: proto.recordedAt,
    data_freshness: FRESHNESS_REVERSE[proto.dataFreshness] || 'stale',
    is_closed_now: proto.isClosedNow,
    lat: proto.lat || undefined,
    lng: proto.lng || undefined,
  };
}

function toStatus(proto: ProtoPizzintStatus): PizzIntStatus {
  const level = (proto.defconLevel >= 1 && proto.defconLevel <= 5 ? proto.defconLevel : 5) as PizzIntDefconLevel;
  return {
    defconLevel: level,
    defconLabel: t(DEFCON_LABELS[level] ?? DEFCON_LABELS[5]!),
    aggregateActivity: proto.aggregateActivity,
    activeSpikes: proto.activeSpikes,
    locationsMonitored: proto.locationsMonitored,
    locationsOpen: proto.locationsOpen,
    lastUpdate: proto.updatedAt ? new Date(proto.updatedAt) : new Date(),
    dataFreshness: FRESHNESS_REVERSE[proto.dataFreshness] || 'stale',
    locations: proto.locations.map(toLocation),
  };
}

function toTensionPair(proto: ProtoTensionPair): GdeltTensionPair {
  return {
    id: proto.id,
    countries: [proto.countries[0] || '', proto.countries[1] || ''] as [string, string],
    label: proto.label,
    score: proto.score,
    trend: TREND_REVERSE[proto.trend] || 'stable',
    changePercent: proto.changePercent,
    region: proto.region,
  };
}

// ---- Default / fallback values ----

const defaultStatus: PizzIntStatus = {
  defconLevel: 5,
  defconLabel: t('components.pizzint.defconLabels.5'),
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  aggregateActivity: 0,
  activeSpikes: 0,
  locationsMonitored: 0,
  locationsOpen: 0,
  lastUpdate: new Date(),
  dataFreshness: 'stale',
  locations: []
};

<<<<<<< HEAD
export async function fetchPizzIntStatus(): Promise<PizzIntStatus> {
  return pizzintBreaker.execute(async () => {
    const response = await fetch('/api/pizzint/dashboard-data');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: PizzIntApiResponse = await response.json();
    if (!data.success || !data.data) throw new Error('Invalid response');

    const locations: PizzIntLocation[] = data.data.map(loc => ({
      ...loc,
      is_closed_now: loc.is_closed_now ?? false,
      ...extractCoordinates(loc.address)
    }));

    const openLocations = locations.filter(l => !l.is_closed_now);

    // Use percentage_of_usual (comparison to baseline) as primary metric
    // This matches PizzINT's calculation which compares current to expected activity
    // Cap at 100 since values can exceed 100% (e.g., 200% = 2x normal)
    const locationsWithUsual = locations.filter(l => l.percentage_of_usual !== null && l.percentage_of_usual > 0);
    const aggregateActivity = locationsWithUsual.length > 0
      ? Math.round(locationsWithUsual.reduce((sum, l) => sum + Math.min(l.percentage_of_usual ?? 0, 100), 0) / locationsWithUsual.length)
      : openLocations.length > 0
        ? Math.round(openLocations.reduce((sum, l) => sum + l.current_popularity, 0) / openLocations.length)
        : 0;

    const activeSpikes = locations.filter(l => l.is_spike).length;
    const freshness = locations.some(l => l.data_freshness === 'fresh') ? 'fresh' : 'stale';

    const { level, label } = calculateDefcon(aggregateActivity, activeSpikes);

    const latestUpdate = locations.reduce((latest, loc) => {
      const locDate = new Date(loc.recorded_at);
      return locDate > latest ? locDate : latest;
    }, new Date(0));

    return {
      defconLevel: level,
      defconLabel: label,
      aggregateActivity,
      activeSpikes,
      locationsMonitored: locations.length,
      locationsOpen: openLocations.length,
      lastUpdate: latestUpdate,
      dataFreshness: freshness,
      locations
    };
  }, defaultStatus);
}

const TENSION_PAIRS = [
  { id: 'usa_russia', countries: ['USA', 'Russia'] as [string, string], label: 'USA ↔ Russia', region: 'europe' },
  { id: 'russia_ukraine', countries: ['Russia', 'Ukraine'] as [string, string], label: 'Russia ↔ Ukraine', region: 'europe' },
  { id: 'usa_china', countries: ['USA', 'China'] as [string, string], label: 'USA ↔ China', region: 'asia' },
  { id: 'china_taiwan', countries: ['China', 'Taiwan'] as [string, string], label: 'China ↔ Taiwan', region: 'asia' },
  { id: 'usa_iran', countries: ['USA', 'Iran'] as [string, string], label: 'USA ↔ Iran', region: 'middle_east' },
  { id: 'usa_venezuela', countries: ['USA', 'Venezuela'] as [string, string], label: 'USA ↔ Venezuela', region: 'americas' },
];

export async function fetchGdeltTensions(): Promise<GdeltTensionPair[]> {
  return gdeltBreaker.execute(async () => {
    const pairs = TENSION_PAIRS.map(p => p.id).join(',');
    const endDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).replace(/-/g, '');

    const response = await fetch(`/api/pizzint/gdelt/batch?pairs=${pairs}&method=gpr&dateStart=${startDate}&dateEnd=${endDate}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: GdeltApiResponse = await response.json();

    return TENSION_PAIRS.map(pair => {
      const pairData = data[pair.id] || [];
      const recent = pairData.slice(-7);
      const older = pairData.slice(-14, -7);

      const recentAvg = recent.length > 0 ? recent.reduce((s, d) => s + d.v, 0) / recent.length : 0;
      const olderAvg = older.length > 0 ? older.reduce((s, d) => s + d.v, 0) / older.length : recentAvg;

      const changePercent = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
      const trend = changePercent > 5 ? 'rising' : changePercent < -5 ? 'falling' : 'stable';

      return {
        id: pair.id,
        countries: pair.countries,
        label: pair.label,
        score: Math.round(recentAvg * 100) / 100,
        trend,
        changePercent: Math.round(changePercent * 10) / 10,
        region: pair.region
      };
    });
=======
// ---- Public API ----

export async function fetchPizzIntStatus(): Promise<PizzIntStatus> {
  return pizzintBreaker.execute(async () => {
    const resp: GetPizzintStatusResponse = await client.getPizzintStatus({ includeGdelt: false });
    if (!resp.pizzint) throw new Error('No PizzINT data');
    return toStatus(resp.pizzint);
  }, defaultStatus);
}

export async function fetchGdeltTensions(): Promise<GdeltTensionPair[]> {
  return gdeltBreaker.execute(async () => {
    const resp: GetPizzintStatusResponse = await client.getPizzintStatus({ includeGdelt: true });
    return resp.tensionPairs.map(toTensionPair);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }, []);
}

export function getPizzIntStatus(): string {
  return pizzintBreaker.getStatus();
}

export function getGdeltStatus(): string {
  return gdeltBreaker.getStatus();
}
