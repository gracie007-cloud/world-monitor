<<<<<<< HEAD
import type { SocialUnrestEvent, MilitaryFlight, MilitaryVessel, ClusteredEvent, InternetOutage } from '@/types';
import { INTEL_HOTSPOTS, CONFLICT_ZONES, STRATEGIC_WATERWAYS } from '@/config/geo';
import { TIER1_COUNTRIES } from '@/config/countries';
import { focalPointDetector } from './focal-point-detector';
import type { ConflictEvent } from './conflicts';
import type { UcdpConflictStatus } from './ucdp';
import type { HapiConflictSummary } from './hapi';
import type { CountryDisplacement, ClimateAnomaly } from '@/types';
=======
import type { SocialUnrestEvent, MilitaryFlight, MilitaryVessel, ClusteredEvent, InternetOutage, AisDisruptionEvent, CyberThreat } from '@/types';
import type { AirportDelayAlert } from '@/services/aviation';
import type { SecurityAdvisory } from '@/services/security-advisories';
import type { TemporalAnomaly } from '@/services/temporal-baseline';
import { tokenizeForMatch, matchKeyword } from '@/utils/keyword-match';
import { INTEL_HOTSPOTS, CONFLICT_ZONES, STRATEGIC_WATERWAYS } from '@/config/geo';
import { CURATED_COUNTRIES, DEFAULT_BASELINE_RISK, DEFAULT_EVENT_MULTIPLIER, getHotspotCountries } from '@/config/countries';
import { focalPointDetector } from './focal-point-detector';
import type { ConflictEvent, UcdpConflictStatus, HapiConflictSummary } from './conflict';
import type { CountryDisplacement } from '@/services/displacement';
import type { ClimateAnomaly } from '@/services/climate';
import type { GpsJamHex } from '@/services/gps-interference';
import { getCountryAtCoordinates, iso3ToIso2Code, nameToCountryCode, getCountryNameByCode, matchCountryNamesInText, ME_STRIKE_BOUNDS, resolveCountryFromBounds } from './country-geometry';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export interface CountryScore {
  code: string;
  name: string;
  score: number;
  level: 'low' | 'normal' | 'elevated' | 'high' | 'critical';
  trend: 'rising' | 'stable' | 'falling';
  change24h: number;
  components: ComponentScores;
  lastUpdated: Date;
}

export interface ComponentScores {
  unrest: number;
  conflict: number;
  security: number;
  information: number;
}

interface CountryData {
  protests: SocialUnrestEvent[];
  conflicts: ConflictEvent[];
  ucdpStatus: UcdpConflictStatus | null;
  hapiSummary: HapiConflictSummary | null;
  militaryFlights: MilitaryFlight[];
  militaryVessels: MilitaryVessel[];
  newsEvents: ClusteredEvent[];
  outages: InternetOutage[];
<<<<<<< HEAD
  displacementOutflow: number;
  climateStress: number;
}

// Re-export for backwards compatibility
export { TIER1_COUNTRIES } from '@/config/countries';

// Learning Mode - warmup period for reliable data (bypassed when cached scores exist)
const LEARNING_DURATION_MS = 15 * 60 * 1000; // 15 minutes
let learningStartTime: number | null = null;
let isLearningComplete = false;
let hasCachedScoresAvailable = false;
=======
  strikes: Array<{ severity: string; timestamp: number; lat: number; lon: number; title: string; id: string }>;
  aviationDisruptions: AirportDelayAlert[];
  displacementOutflow: number;
  climateStress: number;
  orefAlertCount: number;
  orefHistoryCount24h: number;
  advisoryMaxLevel: SecurityAdvisory['level'] | null;
  advisoryCount: number;
  advisorySources: Set<string>;
  gpsJammingHighCount: number;
  gpsJammingMediumCount: number;
  aisDisruptionHighCount: number;
  aisDisruptionElevatedCount: number;
  aisDisruptionLowCount: number;
  satelliteFireCount: number;
  satelliteFireHighCount: number;
  cyberThreatCriticalCount: number;
  cyberThreatHighCount: number;
  cyberThreatMediumCount: number;
  temporalAnomalyCount: number;
  temporalAnomalyCriticalCount: number;
}

export { TIER1_COUNTRIES } from '@/config/countries';

const LEARNING_DURATION_MS = 15 * 60 * 1000;
let learningStartTime: number | null = null;
let isLearningComplete = false;
let hasCachedScoresAvailable = false;
let intelligenceSignalsLoaded = false;

export function setIntelligenceSignalsLoaded(): void {
  intelligenceSignalsLoaded = true;
}

export function hasIntelligenceSignalsLoaded(): boolean {
  return intelligenceSignalsLoaded;
}

export function hasAnyIntelligenceData(): boolean {
  for (const data of countryDataMap.values()) {
    if (
      data.conflicts.length > 0 ||
      data.protests.length > 0 ||
      data.strikes.length > 0 ||
      data.militaryFlights.length > 0 ||
      data.militaryVessels.length > 0 ||
      data.outages.length > 0 ||
      data.ucdpStatus !== null ||
      data.hapiSummary !== null ||
      data.climateStress > 0 ||
      data.gpsJammingHighCount > 0 ||
      data.gpsJammingMediumCount > 0 ||
      data.aisDisruptionHighCount > 0 ||
      data.aisDisruptionElevatedCount > 0 ||
      data.aisDisruptionLowCount > 0
    ) {
      return true;
    }
  }
  return false;
}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export function setHasCachedScores(hasScores: boolean): void {
  hasCachedScoresAvailable = hasScores;
  if (hasScores) {
<<<<<<< HEAD
    isLearningComplete = true; // Skip learning when cached scores available
=======
    isLearningComplete = true;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }
}

export function startLearning(): void {
  if (learningStartTime === null) {
    learningStartTime = Date.now();
  }
}

export function isInLearningMode(): boolean {
<<<<<<< HEAD
  if (hasCachedScoresAvailable) return false; // Bypass if backend has cached scores
=======
  if (hasCachedScoresAvailable) return false;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  if (isLearningComplete) return false;
  if (learningStartTime === null) return true;

  const elapsed = Date.now() - learningStartTime;
  if (elapsed >= LEARNING_DURATION_MS) {
    isLearningComplete = true;
    return false;
  }
  return true;
}

export function getLearningProgress(): { inLearning: boolean; remainingMinutes: number; progress: number } {
  if (hasCachedScoresAvailable || isLearningComplete) {
    return { inLearning: false, remainingMinutes: 0, progress: 100 };
  }
  if (learningStartTime === null) {
    return { inLearning: true, remainingMinutes: 15, progress: 0 };
  }

  const elapsed = Date.now() - learningStartTime;
  const remaining = Math.max(0, LEARNING_DURATION_MS - elapsed);
  const progress = Math.min(100, (elapsed / LEARNING_DURATION_MS) * 100);

  return {
    inLearning: remaining > 0,
    remainingMinutes: Math.ceil(remaining / 60000),
    progress: Math.round(progress),
  };
}

<<<<<<< HEAD
const COUNTRY_KEYWORDS: Record<string, string[]> = {
  US: ['united states', 'usa', 'america', 'washington', 'biden', 'trump', 'pentagon'],
  RU: ['russia', 'moscow', 'kremlin', 'putin'],
  CN: ['china', 'beijing', 'xi jinping', 'prc'],
  UA: ['ukraine', 'kyiv', 'zelensky', 'donbas'],
  IR: ['iran', 'tehran', 'khamenei', 'irgc'],
  IL: ['israel', 'tel aviv', 'netanyahu', 'idf', 'gaza'],
  TW: ['taiwan', 'taipei'],
  KP: ['north korea', 'pyongyang', 'kim jong'],
  SA: ['saudi arabia', 'riyadh', 'mbs'],
  TR: ['turkey', 'ankara', 'erdogan'],
  PL: ['poland', 'warsaw'],
  DE: ['germany', 'berlin'],
  FR: ['france', 'paris', 'macron'],
  GB: ['britain', 'uk', 'london', 'starmer'],
  IN: ['india', 'delhi', 'modi'],
  PK: ['pakistan', 'islamabad'],
  SY: ['syria', 'damascus', 'assad'],
  YE: ['yemen', 'sanaa', 'houthi'],
  MM: ['myanmar', 'burma', 'rangoon'],
  VE: ['venezuela', 'caracas', 'maduro'],
};

// Geopolitical baseline risk scores (0-50)
// Reflects inherent instability regardless of current events
const BASELINE_RISK: Record<string, number> = {
  US: 5,    // Stable democracy, high media coverage inflates event counts
  RU: 35,   // Authoritarian, active in Ukraine conflict
  CN: 25,   // Authoritarian, Taiwan tensions, internal repression
  UA: 50,   // Active war zone
  IR: 40,   // Authoritarian, regional tensions, under-reported
  IL: 45,   // Active conflict with Gaza/Lebanon
  TW: 30,   // China tensions, invasion risk
  KP: 45,   // Rogue state, nuclear threat, near-zero reporting
  SA: 20,   // Regional tensions but relatively stable
  TR: 25,   // Regional involvement, internal tensions
  PL: 10,   // NATO frontline but stable
  DE: 5,    // Stable democracy
  FR: 10,   // Social tensions but stable
  GB: 5,    // Stable democracy
  IN: 20,   // Regional tensions, internal issues
  PK: 35,   // Nuclear state, instability, terrorism
  SY: 50,   // Active civil war
  YE: 50,   // Active civil war
  MM: 45,   // Military coup, civil conflict
  VE: 40,   // Economic collapse, authoritarian
};

// Event significance multipliers
// Higher = each event is more significant (authoritarian states where events are suppressed)
// Lower = events are common/expected (open democracies with high media coverage)
const EVENT_MULTIPLIER: Record<string, number> = {
  US: 0.3,  // Many protests normal, over-reported
  RU: 2.0,  // Protests rare and significant
  CN: 2.5,  // Any protest is major (heavily suppressed)
  UA: 0.8,  // War context, events expected
  IR: 2.0,  // Protests suppressed, significant when occur
  IL: 0.7,  // Frequent conflict, well-documented
  TW: 1.5,  // Events significant
  KP: 3.0,  // Almost no reporting, any event = major
  SA: 2.0,  // Suppressed
  TR: 1.2,  // Some suppression
  PL: 0.8,  // Open democracy
  DE: 0.5,  // Protests normal
  FR: 0.6,  // Protests common
  GB: 0.5,  // Open democracy
  IN: 0.8,  // Large democracy, many events
  PK: 1.5,  // Some suppression
  SY: 0.7,  // War zone, events expected
  YE: 0.7,  // War zone, events expected
  MM: 1.8,  // Military suppression
  VE: 1.8,  // Suppressed
};
=======
let processedCount = 0;
let unmappedCount = 0;

export function getIngestStats(): { processed: number; unmapped: number; rate: number } {
  const rate = processedCount > 0 ? unmappedCount / processedCount : 0;
  return { processed: processedCount, unmapped: unmappedCount, rate };
}

export function resetIngestStats(): void {
  processedCount = 0;
  unmappedCount = 0;
}

function ensureISO2(code: string): string | null {
  const upper = code.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(upper)) return upper;
  const iso2 = iso3ToIso2Code(upper);
  if (iso2) return iso2;
  const fromName = nameToCountryCode(code);
  if (fromName) return fromName;
  return null;
}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

const countryDataMap = new Map<string, CountryData>();
const previousScores = new Map<string, number>();

function initCountryData(): CountryData {
<<<<<<< HEAD
  return { protests: [], conflicts: [], ucdpStatus: null, hapiSummary: null, militaryFlights: [], militaryVessels: [], newsEvents: [], outages: [], displacementOutflow: 0, climateStress: 0 };
}

export function clearCountryData(): void {
  countryDataMap.clear();
  hotspotActivityMap.clear();
}

function normalizeCountryName(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [code, keywords] of Object.entries(COUNTRY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) return code;
  }
  for (const [code, countryName] of Object.entries(TIER1_COUNTRIES)) {
    if (lower.includes(countryName.toLowerCase())) return code;
  }
  return null;
}

export function ingestProtestsForCII(events: SocialUnrestEvent[]): void {
  for (const e of events) {
    const code = normalizeCountryName(e.country);
    if (!code || !TIER1_COUNTRIES[code]) continue;
=======
  return {
    protests: [],
    conflicts: [],
    ucdpStatus: null,
    hapiSummary: null,
    militaryFlights: [],
    militaryVessels: [],
    newsEvents: [],
    outages: [],
    strikes: [],
    aviationDisruptions: [],
    displacementOutflow: 0,
    climateStress: 0,
    orefAlertCount: 0,
    orefHistoryCount24h: 0,
    advisoryMaxLevel: null,
    advisoryCount: 0,
    advisorySources: new Set(),
    gpsJammingHighCount: 0,
    gpsJammingMediumCount: 0,
    aisDisruptionHighCount: 0,
    aisDisruptionElevatedCount: 0,
    aisDisruptionLowCount: 0,
    satelliteFireCount: 0,
    satelliteFireHighCount: 0,
    cyberThreatCriticalCount: 0,
    cyberThreatHighCount: 0,
    cyberThreatMediumCount: 0,
    temporalAnomalyCount: 0,
    temporalAnomalyCriticalCount: 0,
  };
}

const newsEventIndexMap = new Map<string, Map<string, number>>();

export function clearCountryData(): void {
  countryDataMap.clear();
  hotspotActivityMap.clear();
  newsEventIndexMap.clear();
  intelligenceSignalsLoaded = false;
}

export function getCountryData(code: string): CountryData | undefined {
  return countryDataMap.get(code);
}

export function getPreviousScores(): Map<string, number> {
  return previousScores;
}

export type { CountryData };

function normalizeCountryName(name: string): string | null {
  const tokens = tokenizeForMatch(name);
  for (const [code, cfg] of Object.entries(CURATED_COUNTRIES)) {
    if (cfg.scoringKeywords.some(kw => matchKeyword(tokens, kw))) return code;
  }
  return nameToCountryCode(name.toLowerCase());
}

export function ingestProtestsForCII(events: SocialUnrestEvent[]): void {
  for (const [, data] of countryDataMap) data.protests = [];
  for (const e of events) {
    processedCount++;
    const code = normalizeCountryName(e.country);
    if (!code) { unmappedCount++; continue; }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.protests.push(e);
    trackHotspotActivity(e.lat, e.lon, e.severity === 'high' ? 2 : 1);
  }
}

export function ingestConflictsForCII(events: ConflictEvent[]): void {
<<<<<<< HEAD
  for (const e of events) {
    const code = normalizeCountryName(e.country);
    if (!code || !TIER1_COUNTRIES[code]) continue;
=======
  for (const [, data] of countryDataMap) data.conflicts = [];
  for (const e of events) {
    processedCount++;
    const code = normalizeCountryName(e.country);
    if (!code) { unmappedCount++; continue; }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.conflicts.push(e);
    trackHotspotActivity(e.lat, e.lon, e.fatalities > 0 ? 3 : 2);
  }
}

export function ingestUcdpForCII(classifications: Map<string, UcdpConflictStatus>): void {
  for (const [code, status] of classifications) {
<<<<<<< HEAD
    if (!TIER1_COUNTRIES[code]) continue;
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.ucdpStatus = status;
=======
    processedCount++;
    const iso2 = ensureISO2(code);
    if (!iso2) { unmappedCount++; continue; }
    if (!countryDataMap.has(iso2)) countryDataMap.set(iso2, initCountryData());
    countryDataMap.get(iso2)!.ucdpStatus = status;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }
}

export function ingestHapiForCII(summaries: Map<string, HapiConflictSummary>): void {
  for (const [code, summary] of summaries) {
<<<<<<< HEAD
    if (!TIER1_COUNTRIES[code]) continue;
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.hapiSummary = summary;
  }
}

const ISO3_TO_ISO2: Record<string, string> = {
  AFG: 'AF', SYR: 'SY', UKR: 'UA', SDN: 'SD', SSD: 'SS', SOM: 'SO',
  COD: 'CD', MMR: 'MM', YEM: 'YE', ETH: 'ET', VEN: 'VE', IRQ: 'IQ',
  COL: 'CO', NGA: 'NG', PSE: 'PS', TUR: 'TR', PAK: 'PK', IRN: 'IR',
  IND: 'IN', CHN: 'CN', RUS: 'RU', ISR: 'IL', SAU: 'SA', USA: 'US',
  TWN: 'TW', PRK: 'KP', POL: 'PL', DEU: 'DE', FRA: 'FR', GBR: 'GB',
};

const COUNTRY_NAME_TO_ISO: Record<string, string> = {
  'Afghanistan': 'AF', 'Syria': 'SY', 'Ukraine': 'UA', 'Sudan': 'SD',
  'South Sudan': 'SS', 'Somalia': 'SO', 'DR Congo': 'CD', 'Myanmar': 'MM',
  'Yemen': 'YE', 'Ethiopia': 'ET', 'Venezuela': 'VE', 'Iraq': 'IQ',
  'Colombia': 'CO', 'Nigeria': 'NG', 'Palestine': 'PS', 'Turkey': 'TR',
  'Pakistan': 'PK', 'Iran': 'IR', 'India': 'IN', 'China': 'CN',
  'Russia': 'RU', 'Israel': 'IL', 'Saudi Arabia': 'SA',
};

=======
    processedCount++;
    const iso2 = ensureISO2(code);
    if (!iso2) { unmappedCount++; continue; }
    if (!countryDataMap.has(iso2)) countryDataMap.set(iso2, initCountryData());
    countryDataMap.get(iso2)!.hapiSummary = summary;
  }
}

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
export function ingestDisplacementForCII(countries: CountryDisplacement[]): void {
  for (const data of countryDataMap.values()) {
    data.displacementOutflow = 0;
  }

  for (const c of countries) {
<<<<<<< HEAD
    const code = c.code?.length === 3
      ? ISO3_TO_ISO2[c.code] || c.code.substring(0, 2)
      : COUNTRY_NAME_TO_ISO[c.name] || c.code;
    if (!code || !TIER1_COUNTRIES[code]) continue;
=======
    processedCount++;
    let code: string | null = null;
    if (c.code?.length === 3) {
      code = iso3ToIso2Code(c.code);
    } else if (c.code?.length === 2) {
      code = c.code.toUpperCase();
    }
    if (!code) {
      code = nameToCountryCode(c.name);
    }
    if (!code) { unmappedCount++; continue; }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const outflow = c.refugees + c.asylumSeekers;
    countryDataMap.get(code)!.displacementOutflow = outflow;
  }
}

const ZONE_COUNTRY_MAP: Record<string, string[]> = {
  'Ukraine': ['UA'], 'Middle East': ['IR', 'IL', 'SA', 'SY', 'YE'],
  'South Asia': ['PK', 'IN'], 'Myanmar': ['MM'],
};

export function ingestClimateForCII(anomalies: ClimateAnomaly[]): void {
  for (const data of countryDataMap.values()) {
    data.climateStress = 0;
  }

  for (const a of anomalies) {
    if (a.severity === 'normal') continue;
    const codes = ZONE_COUNTRY_MAP[a.zone] || [];
    for (const code of codes) {
<<<<<<< HEAD
      if (!TIER1_COUNTRIES[code]) continue;
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
      const stress = a.severity === 'extreme' ? 15 : 8;
      countryDataMap.get(code)!.climateStress = Math.max(countryDataMap.get(code)!.climateStress, stress);
    }
  }
}

<<<<<<< HEAD
// Country bounding boxes for location-based attribution [minLat, maxLat, minLon, maxLon]
const COUNTRY_BOUNDS: Record<string, [number, number, number, number]> = {
  IR: [25, 40, 44, 63],      // Iran
  IL: [29, 34, 34, 36],      // Israel
  UA: [44, 53, 22, 40],      // Ukraine
  TW: [21, 26, 119, 122],    // Taiwan
  KP: [37, 43, 124, 131],    // North Korea
  SY: [32, 37, 35, 42],      // Syria
  YE: [12, 19, 42, 54],      // Yemen
  SA: [16, 32, 34, 56],      // Saudi Arabia
  TR: [36, 42, 26, 45],      // Turkey
  PK: [23, 37, 60, 77],      // Pakistan
  IN: [6, 36, 68, 97],       // India
  CN: [18, 54, 73, 135],     // China
  RU: [41, 82, 19, 180],     // Russia (simplified)
};

function getCountryFromLocation(lat: number, lon: number): string | null {
  for (const [code, [minLat, maxLat, minLon, maxLon]] of Object.entries(COUNTRY_BOUNDS)) {
    if (lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon) {
      return code;
    }
  }
  return null;
=======
function getCountryFromLocation(lat: number, lon: number): string | null {
  const precise = getCountryAtCoordinates(lat, lon);
  return precise?.code ?? null;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

<<<<<<< HEAD
const HOTSPOT_COUNTRY_MAP: Record<string, string> = {
  tehran: 'IR', moscow: 'RU', beijing: 'CN', kyiv: 'UA', taipei: 'TW',
  telaviv: 'IL', pyongyang: 'KP', riyadh: 'SA', ankara: 'TR', damascus: 'SY',
  sanaa: 'YE', caracas: 'VE', dc: 'US', london: 'GB', brussels: 'FR',
  baghdad: 'IR', beirut: 'IR', doha: 'SA', abudhabi: 'SA',
};

const hotspotActivityMap = new Map<string, number>();

=======
const hotspotActivityMap = new Map<string, number>();

export function resetHotspotActivity(): void {
  hotspotActivityMap.clear();
}

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
function trackHotspotActivity(lat: number, lon: number, weight: number = 1): void {
  for (const hotspot of INTEL_HOTSPOTS) {
    const dist = haversineKm(lat, lon, hotspot.lat, hotspot.lon);
    if (dist < 150) {
<<<<<<< HEAD
      const countryCode = HOTSPOT_COUNTRY_MAP[hotspot.id];
      if (countryCode && TIER1_COUNTRIES[countryCode]) {
=======
      const countryCodes = getHotspotCountries(hotspot.id);
      for (const countryCode of countryCodes) {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        const current = hotspotActivityMap.get(countryCode) || 0;
        hotspotActivityMap.set(countryCode, current + weight);
      }
    }
  }
  for (const zone of CONFLICT_ZONES) {
    const [zoneLon, zoneLat] = zone.center;
    const dist = haversineKm(lat, lon, zoneLat, zoneLon);
    if (dist < 300) {
      const zoneCountries: Record<string, string[]> = {
        ukraine: ['UA', 'RU'], gaza: ['IL', 'IR'], sudan: ['SA'], myanmar: ['MM'],
      };
      const countries = zoneCountries[zone.id] || [];
      for (const code of countries) {
<<<<<<< HEAD
        if (TIER1_COUNTRIES[code]) {
          const current = hotspotActivityMap.get(code) || 0;
          hotspotActivityMap.set(code, current + weight * 2);
        }
=======
        const current = hotspotActivityMap.get(code) || 0;
        hotspotActivityMap.set(code, current + weight * 2);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      }
    }
  }
  for (const waterway of STRATEGIC_WATERWAYS) {
    const dist = haversineKm(lat, lon, waterway.lat, waterway.lon);
    if (dist < 200) {
      const waterwayCountries: Record<string, string[]> = {
        taiwan_strait: ['TW', 'CN'], hormuz_strait: ['IR', 'SA'],
        bab_el_mandeb: ['YE', 'SA'], suez: ['IL'], bosphorus: ['TR'],
      };
      const countries = waterwayCountries[waterway.id] || [];
      for (const code of countries) {
<<<<<<< HEAD
        if (TIER1_COUNTRIES[code]) {
          const current = hotspotActivityMap.get(code) || 0;
          hotspotActivityMap.set(code, current + weight * 1.5);
        }
=======
        const current = hotspotActivityMap.get(code) || 0;
        hotspotActivityMap.set(code, current + weight * 1.5);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      }
    }
  }
}

function getHotspotBoost(countryCode: string): number {
  const activity = hotspotActivityMap.get(countryCode) || 0;
<<<<<<< HEAD
  return Math.min(10, activity * 1.5);  // Reduced from 30 max to 10 max
}

export function ingestMilitaryForCII(flights: MilitaryFlight[], vessels: MilitaryVessel[]): void {
  // Track foreign military activity per country
  const foreignMilitaryByCountry = new Map<string, { flights: number; vessels: number }>();

  for (const f of flights) {
    // 1. Credit operator country (their own military activity)
    const operatorCode = normalizeCountryName(f.operatorCountry);
    if (operatorCode && TIER1_COUNTRIES[operatorCode]) {
      if (!countryDataMap.has(operatorCode)) countryDataMap.set(operatorCode, initCountryData());
      countryDataMap.get(operatorCode)!.militaryFlights.push(f);
    }

    // 2. Credit LOCATION country if different (foreign military over their territory = threat)
    const locationCode = getCountryFromLocation(f.lat, f.lon);
    if (locationCode && TIER1_COUNTRIES[locationCode] && locationCode !== operatorCode) {
=======
  return Math.min(10, activity * 1.5);
}

export function ingestMilitaryForCII(flights: MilitaryFlight[], vessels: MilitaryVessel[]): void {
  for (const [, data] of countryDataMap) { data.militaryFlights = []; data.militaryVessels = []; }
  const foreignMilitaryByCountry = new Map<string, { flights: number; vessels: number }>();

  for (const f of flights) {
    processedCount++;
    const operatorCode = normalizeCountryName(f.operatorCountry);
    if (operatorCode) {
      if (!countryDataMap.has(operatorCode)) countryDataMap.set(operatorCode, initCountryData());
      countryDataMap.get(operatorCode)!.militaryFlights.push(f);
    } else {
      unmappedCount++;
    }

    const locationCode = getCountryFromLocation(f.lat, f.lon);
    if (locationCode && locationCode !== operatorCode) {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      if (!foreignMilitaryByCountry.has(locationCode)) {
        foreignMilitaryByCountry.set(locationCode, { flights: 0, vessels: 0 });
      }
      foreignMilitaryByCountry.get(locationCode)!.flights++;
    }
    trackHotspotActivity(f.lat, f.lon, 1.5);
  }

  for (const v of vessels) {
<<<<<<< HEAD
    // 1. Credit operator country
    const operatorCode = normalizeCountryName(v.operatorCountry);
    if (operatorCode && TIER1_COUNTRIES[operatorCode]) {
      if (!countryDataMap.has(operatorCode)) countryDataMap.set(operatorCode, initCountryData());
      countryDataMap.get(operatorCode)!.militaryVessels.push(v);
    }

    // 2. Credit LOCATION country if different (foreign naval presence = threat)
    const locationCode = getCountryFromLocation(v.lat, v.lon);
    if (locationCode && TIER1_COUNTRIES[locationCode] && locationCode !== operatorCode) {
=======
    processedCount++;
    const operatorCode = normalizeCountryName(v.operatorCountry);
    if (operatorCode) {
      if (!countryDataMap.has(operatorCode)) countryDataMap.set(operatorCode, initCountryData());
      countryDataMap.get(operatorCode)!.militaryVessels.push(v);
    } else {
      unmappedCount++;
    }

    const locationCode = getCountryFromLocation(v.lat, v.lon);
    if (locationCode && locationCode !== operatorCode) {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      if (!foreignMilitaryByCountry.has(locationCode)) {
        foreignMilitaryByCountry.set(locationCode, { flights: 0, vessels: 0 });
      }
      foreignMilitaryByCountry.get(locationCode)!.vessels++;
    }
    trackHotspotActivity(v.lat, v.lon, 2);
  }

<<<<<<< HEAD
  // Store foreign military counts for security calculation
  for (const [code, counts] of foreignMilitaryByCountry) {
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    // Add synthetic entries to represent foreign military presence
    // Each foreign flight/vessel counts MORE than own military (it's a threat)
=======
  for (const [code, counts] of foreignMilitaryByCountry) {
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    for (let i = 0; i < counts.flights * 2; i++) {
      data.militaryFlights.push({} as MilitaryFlight);
    }
    for (let i = 0; i < counts.vessels * 2; i++) {
      data.militaryVessels.push({} as MilitaryVessel);
    }
  }
}

export function ingestNewsForCII(events: ClusteredEvent[]): void {
  for (const e of events) {
<<<<<<< HEAD
    const title = e.primaryTitle.toLowerCase();
    for (const [code] of Object.entries(TIER1_COUNTRIES)) {
      const keywords = COUNTRY_KEYWORDS[code] || [];
      if (keywords.some(kw => title.includes(kw))) {
        if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
        countryDataMap.get(code)!.newsEvents.push(e);
=======
    const tokens = tokenizeForMatch(e.primaryTitle);
    const matched = new Set<string>();

    for (const [code, cfg] of Object.entries(CURATED_COUNTRIES)) {
      if (cfg.scoringKeywords.some(kw => matchKeyword(tokens, kw))) {
        matched.add(code);
      }
    }

    for (const code of matchCountryNamesInText(e.primaryTitle.toLowerCase())) {
      matched.add(code);
    }

    for (const code of matched) {
      if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
      const cd = countryDataMap.get(code)!;
      if (!newsEventIndexMap.has(code)) newsEventIndexMap.set(code, new Map());
      const idx = newsEventIndexMap.get(code)!;
      const existingIdx = idx.get(e.id);
      if (existingIdx !== undefined) {
        cd.newsEvents[existingIdx] = e;
      } else {
        idx.set(e.id, cd.newsEvents.length);
        cd.newsEvents.push(e);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      }
    }
  }
}

<<<<<<< HEAD
export function ingestOutagesForCII(outages: InternetOutage[]): void {
  for (const o of outages) {
    const code = normalizeCountryName(o.country);
    if (!code || !TIER1_COUNTRIES[code]) continue;
=======
function coordsToBoundsCountry(lat: number, lon: number): string | null {
  return resolveCountryFromBounds(lat, lon, ME_STRIKE_BOUNDS);
}

export function ingestStrikesForCII(events: Array<{
  id: string; category: string; severity: string;
  latitude: number; longitude: number; timestamp: number;
  title: string; locationName: string;
}>): void {
  for (const [, data] of countryDataMap) data.strikes = [];

  const seen = new Set<string>();
  for (const e of events) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    const code = getCountryAtCoordinates(e.latitude, e.longitude)?.code
      ?? coordsToBoundsCountry(e.latitude, e.longitude);
    if (!code || code === 'XX') continue;
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.strikes.push({
      severity: e.severity,
      timestamp: e.timestamp < 1e12 ? e.timestamp * 1000 : e.timestamp,
      lat: e.latitude, lon: e.longitude,
      title: e.title || e.locationName, id: e.id,
    });
  }
}

export function ingestOutagesForCII(outages: InternetOutage[]): void {
  for (const [, data] of countryDataMap) data.outages = [];
  for (const o of outages) {
    processedCount++;
    const code = normalizeCountryName(o.country);
    if (!code) { unmappedCount++; continue; }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.outages.push(o);
  }
}

<<<<<<< HEAD
function calcUnrestScore(data: CountryData, countryCode: string): number {
  const protestCount = data.protests.length;
  const multiplier = EVENT_MULTIPLIER[countryCode] ?? 1.0;
=======
export function ingestOrefForCII(alertCount: number, historyCount24h: number): void {
  if (!countryDataMap.has('IL')) countryDataMap.set('IL', initCountryData());
  const data = countryDataMap.get('IL')!;
  data.orefAlertCount = alertCount;
  data.orefHistoryCount24h = historyCount24h;
}

function getOrefBlendBoost(code: string, data: CountryData): number {
  if (code !== 'IL') return 0;
  return (data.orefAlertCount > 0 ? 15 : 0) + (data.orefHistoryCount24h >= 10 ? 10 : data.orefHistoryCount24h >= 3 ? 5 : 0);
}

export function ingestAviationForCII(alerts: AirportDelayAlert[]): void {
  for (const [, data] of countryDataMap) data.aviationDisruptions = [];
  for (const a of alerts) {
    processedCount++;
    const code = normalizeCountryName(a.country);
    if (!code) { unmappedCount++; continue; }
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    countryDataMap.get(code)!.aviationDisruptions.push(a);
  }
}

const TRAVEL_ADVISORY_SOURCES = new Set(['US', 'AU', 'UK', 'NZ']);
const ADVISORY_LEVEL_RANK: Record<string, number> = { 'do-not-travel': 4, 'reconsider': 3, 'caution': 2, 'normal': 1, 'info': 0 };

export function ingestAdvisoriesForCII(advisories: SecurityAdvisory[]): void {
  for (const data of countryDataMap.values()) {
    data.advisoryMaxLevel = null;
    data.advisoryCount = 0;
    data.advisorySources = new Set();
  }

  const travelAdvisories = advisories.filter(a =>
    a.country && TRAVEL_ADVISORY_SOURCES.has(a.sourceCountry) && a.level && a.level !== 'info'
  );

  for (const a of travelAdvisories) {
    const code = a.country!;
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    data.advisoryCount++;
    data.advisorySources.add(a.sourceCountry);
    const currentRank = ADVISORY_LEVEL_RANK[data.advisoryMaxLevel || ''] || 0;
    const newRank = ADVISORY_LEVEL_RANK[a.level!] || 0;
    if (newRank > currentRank) data.advisoryMaxLevel = a.level!;
  }
}

function getAdvisoryBoost(data: CountryData): number {
  if (!data.advisoryMaxLevel) return 0;
  let boost = 0;
  switch (data.advisoryMaxLevel) {
    case 'do-not-travel': boost = 15; break;
    case 'reconsider': boost = 10; break;
    case 'caution': boost = 5; break;
    default: return 0;
  }
  if (data.advisorySources.size >= 3) boost += 5;
  else if (data.advisorySources.size >= 2) boost += 3;
  return boost;
}

function getAdvisoryFloor(data: CountryData): number {
  if (data.advisoryMaxLevel === 'do-not-travel') return 60;
  if (data.advisoryMaxLevel === 'reconsider') return 50;
  return 0;
}

function getSupplementalSignalBoost(data: CountryData): number {
  const aisBoost = Math.min(
    10,
    data.aisDisruptionHighCount * 2.5 + data.aisDisruptionElevatedCount * 1.5 + data.aisDisruptionLowCount * 0.5,
  );
  const fireBoost = Math.min(
    8,
    data.satelliteFireHighCount * 1.5 + Math.min(20, data.satelliteFireCount) * 0.25,
  );
  const cyberBoost = Math.min(
    12,
    data.cyberThreatCriticalCount * 3 + data.cyberThreatHighCount * 1.8 + data.cyberThreatMediumCount * 0.9,
  );
  const temporalBoost = Math.min(
    6,
    data.temporalAnomalyCriticalCount * 2 + data.temporalAnomalyCount * 0.75,
  );
  return aisBoost + fireBoost + cyberBoost + temporalBoost;
}

const h3CountryCache = new Map<string, string>();

export function ingestGpsJammingForCII(hexes: GpsJamHex[]): void {
  for (const [, data] of countryDataMap) {
    data.gpsJammingHighCount = 0;
    data.gpsJammingMediumCount = 0;
  }

  for (const hex of hexes) {
    let code = h3CountryCache.get(hex.h3);
    if (!code) {
      const hit = getCountryAtCoordinates(hex.lat, hex.lon);
      if (hit) {
        code = hit.code;
        h3CountryCache.set(hex.h3, code);
      } else {
        continue;
      }
    }

    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    if (hex.level === 'high') data.gpsJammingHighCount++;
    else data.gpsJammingMediumCount++;
  }
}

function resolveCountryForSignal(countryHint: string | undefined, lat: number, lon: number): string | null {
  if (countryHint) {
    const iso2 = ensureISO2(countryHint);
    if (iso2) return iso2;
    const fromName = normalizeCountryName(countryHint);
    if (fromName) return fromName;
  }
  return getCountryAtCoordinates(lat, lon)?.code
    ?? coordsToBoundsCountry(lat, lon);
}

export function ingestAisDisruptionsForCII(events: AisDisruptionEvent[]): void {
  for (const [, data] of countryDataMap) {
    data.aisDisruptionHighCount = 0;
    data.aisDisruptionElevatedCount = 0;
    data.aisDisruptionLowCount = 0;
  }

  for (const e of events) {
    processedCount++;
    const code = resolveCountryForSignal(e.region, e.lat, e.lon);
    if (!code) { unmappedCount++; continue; }
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    if (e.severity === 'high') data.aisDisruptionHighCount++;
    else if (e.severity === 'elevated') data.aisDisruptionElevatedCount++;
    else data.aisDisruptionLowCount++;
  }
}

export function ingestSatelliteFiresForCII(fires: Array<{
  lat: number;
  lon: number;
  brightness: number;
  frp: number;
  region?: string;
}>): void {
  for (const [, data] of countryDataMap) {
    data.satelliteFireCount = 0;
    data.satelliteFireHighCount = 0;
  }

  for (const fire of fires) {
    processedCount++;
    const code = resolveCountryForSignal(fire.region, fire.lat, fire.lon);
    if (!code) { unmappedCount++; continue; }
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    data.satelliteFireCount++;
    if (fire.brightness >= 360 || fire.frp >= 50) {
      data.satelliteFireHighCount++;
    }
  }
}

export function ingestCyberThreatsForCII(threats: CyberThreat[]): void {
  for (const [, data] of countryDataMap) {
    data.cyberThreatCriticalCount = 0;
    data.cyberThreatHighCount = 0;
    data.cyberThreatMediumCount = 0;
  }

  for (const threat of threats) {
    processedCount++;
    const code = resolveCountryForSignal(threat.country, threat.lat, threat.lon);
    if (!code) { unmappedCount++; continue; }
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    if (threat.severity === 'critical') data.cyberThreatCriticalCount++;
    else if (threat.severity === 'high') data.cyberThreatHighCount++;
    else if (threat.severity === 'medium') data.cyberThreatMediumCount++;
  }
}

export function ingestTemporalAnomaliesForCII(anomalies: TemporalAnomaly[]): void {
  for (const [, data] of countryDataMap) {
    data.temporalAnomalyCount = 0;
    data.temporalAnomalyCriticalCount = 0;
  }

  for (const anomaly of anomalies) {
    const region = anomaly.region.trim();
    if (!region || region.toLowerCase() === 'global') continue;
    processedCount++;

    const code = ensureISO2(region) || normalizeCountryName(region);
    if (!code) { unmappedCount++; continue; }
    if (!countryDataMap.has(code)) countryDataMap.set(code, initCountryData());
    const data = countryDataMap.get(code)!;
    data.temporalAnomalyCount++;
    if (anomaly.severity === 'critical') data.temporalAnomalyCriticalCount++;
  }
}

function calcUnrestScore(data: CountryData, countryCode: string): number {
  const protestCount = data.protests.length;
  const multiplier = CURATED_COUNTRIES[countryCode]?.eventMultiplier ?? DEFAULT_EVENT_MULTIPLIER;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

  let baseScore = 0;
  let fatalityBoost = 0;
  let severityBoost = 0;

  if (protestCount > 0) {
    const fatalities = data.protests.reduce((sum, p) => sum + (p.fatalities || 0), 0);
    const highSeverity = data.protests.filter(p => p.severity === 'high').length;

<<<<<<< HEAD
    // For democracies with frequent protests (low multiplier), use log scaling
    // This prevents routine protests from triggering instability alerts
    const isHighVolume = multiplier < 0.7;
    const adjustedCount = isHighVolume
      ? Math.log2(protestCount + 1) * multiplier * 5  // Log scale for democracies
=======
    const isHighVolume = multiplier < 0.7;
    const adjustedCount = isHighVolume
      ? Math.log2(protestCount + 1) * multiplier * 5
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      : protestCount * multiplier;

    baseScore = Math.min(50, adjustedCount * 8);

<<<<<<< HEAD
    // Fatalities and high severity always matter, but scaled by multiplier
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    fatalityBoost = Math.min(30, fatalities * 5 * multiplier);
    severityBoost = Math.min(20, highSeverity * 10 * multiplier);
  }

<<<<<<< HEAD
  // Internet outages are a MAJOR signal of instability
  // Governments cut internet during crackdowns, conflicts, coups
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  let outageBoost = 0;
  if (data.outages.length > 0) {
    const totalOutages = data.outages.filter(o => o.severity === 'total').length;
    const majorOutages = data.outages.filter(o => o.severity === 'major').length;
    const partialOutages = data.outages.filter(o => o.severity === 'partial').length;

<<<<<<< HEAD
    // Total blackout = major red flag (30 points)
    // Major outage = significant (15 points)
    // Partial = moderate (5 points)
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    outageBoost = Math.min(50, totalOutages * 30 + majorOutages * 15 + partialOutages * 5);
  }

  return Math.min(100, baseScore + fatalityBoost + severityBoost + outageBoost);
}

<<<<<<< HEAD
function calcConflictScore(data: CountryData, countryCode: string): number {
  const events = data.conflicts;
  const multiplier = EVENT_MULTIPLIER[countryCode] ?? 1.0;

  if (events.length === 0 && !data.hapiSummary) return 0;

  const battleCount = events.filter(e => e.eventType === 'battle').length;
  const explosionCount = events.filter(e => e.eventType === 'explosion' || e.eventType === 'remote_violence').length;
  const civilianCount = events.filter(e => e.eventType === 'violence_against_civilians').length;
  const totalFatalities = events.reduce((sum, e) => sum + e.fatalities, 0);

  const eventScore = Math.min(50, (battleCount * 3 + explosionCount * 4 + civilianCount * 5) * multiplier);
  const fatalityScore = Math.min(40, Math.sqrt(totalFatalities) * 5 * multiplier);
  const civilianBoost = civilianCount > 0 ? Math.min(10, civilianCount * 3) : 0;

  // HAPI fallback: if no ACLED conflict events but HAPI shows political violence
  let hapiFallback = 0;
  if (events.length === 0 && data.hapiSummary) {
    const h = data.hapiSummary;
    hapiFallback = Math.min(60, (h.eventsPoliticalViolence * 2 + h.eventsCivilianTargeting * 3) * multiplier);
  }

  return Math.min(100, Math.max(eventScore + fatalityScore + civilianBoost, hapiFallback));
=======
function calcNewsConflictFloor(data: CountryData, multiplier: number, now = Date.now()): number {
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const cutoff = now - SIX_HOURS;

  const recentConflictNews = data.newsEvents.filter(e =>
    e.isAlert &&
    e.threat &&
    (e.threat.category === 'conflict' || e.threat.category === 'military') &&
    e.firstSeen.getTime() >= cutoff
  );

  if (recentConflictNews.length < 2) return 0;

  const domains = new Set<string>();
  let hasTrustedSource = false;
  for (const e of recentConflictNews) {
    if (e.topSources) {
      for (const s of e.topSources) {
        domains.add(s.name);
        if (s.tier <= 2) hasTrustedSource = true;
      }
    }
  }

  if (domains.size < 2 || !hasTrustedSource) return 0;

  return Math.min(70, 60 * multiplier);
}

function calcConflictScore(data: CountryData, countryCode: string): number {
  const events = data.conflicts;
  const multiplier = CURATED_COUNTRIES[countryCode]?.eventMultiplier ?? DEFAULT_EVENT_MULTIPLIER;

  let acledScore = 0;
  if (events.length > 0) {
    const battleCount = events.filter(e => e.eventType === 'battle').length;
    const explosionCount = events.filter(e => e.eventType === 'explosion' || e.eventType === 'remote_violence').length;
    const civilianCount = events.filter(e => e.eventType === 'violence_against_civilians').length;
    const totalFatalities = events.reduce((sum, e) => sum + e.fatalities, 0);

    const eventScore = Math.min(50, (battleCount * 3 + explosionCount * 4 + civilianCount * 5) * multiplier);
    const fatalityScore = Math.min(40, Math.sqrt(totalFatalities) * 5 * multiplier);
    const civilianBoost = civilianCount > 0 ? Math.min(10, civilianCount * 3) : 0;
    acledScore = eventScore + fatalityScore + civilianBoost;
  }

  let hapiFallback = 0;
  if (events.length === 0 && data.hapiSummary) {
    const h = data.hapiSummary;
    hapiFallback = Math.min(60, h.eventsPoliticalViolence * 3 * multiplier);
  }

  let newsFloor = 0;
  if (events.length === 0 && hapiFallback === 0) {
    newsFloor = calcNewsConflictFloor(data, multiplier);
  }

  let strikeBoost = 0;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentStrikes = data.strikes.filter(s => s.timestamp >= sevenDaysAgo);
  if (recentStrikes.length > 0) {
    const highCount = recentStrikes.filter(s =>
      s.severity.toLowerCase() === 'high' || s.severity.toLowerCase() === 'critical'
    ).length;
    strikeBoost = Math.min(50, recentStrikes.length * 3 + highCount * 5);
  }

  let orefBoost = 0;
  if (countryCode === 'IL' && data.orefAlertCount > 0) {
    orefBoost = 25 + Math.min(25, data.orefAlertCount * 5);
  }

  return Math.min(100, Math.max(acledScore, hapiFallback, newsFloor) + strikeBoost + orefBoost);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}

function getUcdpFloor(data: CountryData): number {
  const status = data.ucdpStatus;
  if (!status) return 0;
  switch (status.intensity) {
    case 'war': return 70;
    case 'minor': return 50;
    case 'none': return 0;
  }
}

function calcSecurityScore(data: CountryData): number {
  const flights = data.militaryFlights.length;
  const vessels = data.militaryVessels.length;
  const flightScore = Math.min(50, flights * 3);
  const vesselScore = Math.min(30, vessels * 5);
<<<<<<< HEAD
  return Math.min(100, flightScore + vesselScore);
=======

  let aviationScore = 0;
  for (const a of data.aviationDisruptions) {
    if (a.delayType === 'closure') aviationScore += 20;
    else if (a.severity === 'severe') aviationScore += 15;
    else if (a.severity === 'major') aviationScore += 10;
    else if (a.severity === 'moderate') aviationScore += 5;
  }
  aviationScore = Math.min(40, aviationScore);

  const gpsJammingScore = Math.min(35, data.gpsJammingHighCount * 5 + data.gpsJammingMediumCount * 2);

  return Math.min(100, flightScore + vesselScore + aviationScore + gpsJammingScore);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}

function calcInformationScore(data: CountryData, countryCode: string): number {
  const count = data.newsEvents.length;
  if (count === 0) return 0;

<<<<<<< HEAD
  const multiplier = EVENT_MULTIPLIER[countryCode] ?? 1.0;
  const velocitySum = data.newsEvents.reduce((sum, e) => sum + (e.velocity?.sourcesPerHour || 0), 0);
  const avgVelocity = velocitySum / count;

  // For high-volume countries (US, UK, DE, FR), use logarithmic scaling
  // This prevents routine news volume from triggering instability
  const isHighVolume = multiplier < 0.7;
  const adjustedCount = isHighVolume
    ? Math.log2(count + 1) * multiplier * 3  // Log scale for media-saturated countries
=======
  const multiplier = CURATED_COUNTRIES[countryCode]?.eventMultiplier ?? DEFAULT_EVENT_MULTIPLIER;
  const velocitySum = data.newsEvents.reduce((sum, e) => sum + (e.velocity?.sourcesPerHour || 0), 0);
  const avgVelocity = velocitySum / count;

  const isHighVolume = multiplier < 0.7;
  const adjustedCount = isHighVolume
    ? Math.log2(count + 1) * multiplier * 3
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    : count * multiplier;

  const baseScore = Math.min(40, adjustedCount * 5);

<<<<<<< HEAD
  // Velocity only matters if it's actually high (breaking news style)
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  const velocityThreshold = isHighVolume ? 5 : 2;
  const velocityBoost = avgVelocity > velocityThreshold
    ? Math.min(40, (avgVelocity - velocityThreshold) * 10 * multiplier)
    : 0;

<<<<<<< HEAD
  // Alert boost also scaled by multiplier
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  const alertBoost = data.newsEvents.some(e => e.isAlert) ? 20 * multiplier : 0;

  return Math.min(100, baseScore + velocityBoost + alertBoost);
}

function getLevel(score: number): CountryScore['level'] {
  if (score >= 81) return 'critical';
  if (score >= 66) return 'high';
  if (score >= 51) return 'elevated';
  if (score >= 31) return 'normal';
  return 'low';
}

function getTrend(code: string, current: number): CountryScore['trend'] {
  const prev = previousScores.get(code);
  if (prev === undefined) return 'stable';
  const diff = current - prev;
  if (diff >= 5) return 'rising';
  if (diff <= -5) return 'falling';
  return 'stable';
}

export function calculateCII(): CountryScore[] {
  const scores: CountryScore[] = [];
  const focalUrgencies = focalPointDetector.getCountryUrgencyMap();

<<<<<<< HEAD
  for (const [code, name] of Object.entries(TIER1_COUNTRIES)) {
    const data = countryDataMap.get(code) || initCountryData();
    const baselineRisk = BASELINE_RISK[code] ?? 20;
=======
  const countryCodes = new Set<string>([
    ...countryDataMap.keys(),
    ...Object.keys(CURATED_COUNTRIES),
  ]);

  for (const code of countryCodes) {
    const name = CURATED_COUNTRIES[code]?.name || getCountryNameByCode(code) || code;
    const data = countryDataMap.get(code) || initCountryData();
    const baselineRisk = CURATED_COUNTRIES[code]?.baselineRisk ?? DEFAULT_BASELINE_RISK;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    const components: ComponentScores = {
      unrest: Math.round(calcUnrestScore(data, code)),
      conflict: Math.round(calcConflictScore(data, code)),
      security: Math.round(calcSecurityScore(data)),
      information: Math.round(calcInformationScore(data, code)),
    };

<<<<<<< HEAD
    // Weighted components: conflict gets highest weight (armed conflict is strongest signal)
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    const eventScore = components.unrest * 0.25 + components.conflict * 0.30 + components.security * 0.20 + components.information * 0.25;

    const hotspotBoost = getHotspotBoost(code);
    const newsUrgencyBoost = components.information >= 70 ? 5
      : components.information >= 50 ? 3
      : 0;
    const focalUrgency = focalUrgencies.get(code);
    const focalBoost = focalUrgency === 'critical' ? 8
      : focalUrgency === 'elevated' ? 4
      : 0;

    const displacementBoost = data.displacementOutflow >= 1_000_000 ? 8
      : data.displacementOutflow >= 100_000 ? 4
      : 0;
    const climateBoost = data.climateStress;

<<<<<<< HEAD
    const blendedScore = baselineRisk * 0.4 + eventScore * 0.6 + hotspotBoost + newsUrgencyBoost + focalBoost + displacementBoost + climateBoost;

    // UCDP-derived conflict floor replaces hardcoded floors
    // war (1000+ deaths/yr) → 70, minor (25-999) → 50, none → 0
    const floor = getUcdpFloor(data);
=======
    const advisoryBoost = getAdvisoryBoost(data);
    const supplementalSignalBoost = getSupplementalSignalBoost(data);
    const blendedScore = baselineRisk * 0.4 + eventScore * 0.6 + hotspotBoost + newsUrgencyBoost + focalBoost + displacementBoost + climateBoost + getOrefBlendBoost(code, data) + advisoryBoost + supplementalSignalBoost;

    const floor = Math.max(getUcdpFloor(data), getAdvisoryFloor(data));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    const score = Math.round(Math.min(100, Math.max(floor, blendedScore)));

    const prev = previousScores.get(code) ?? score;

    scores.push({
      code,
      name,
      score,
      level: getLevel(score),
      trend: getTrend(code, score),
      change24h: score - prev,
      components,
      lastUpdated: new Date(),
    });

    previousScores.set(code, score);
  }

  return scores.sort((a, b) => b.score - a.score);
}

export function getTopUnstableCountries(limit = 10): CountryScore[] {
  return calculateCII().slice(0, limit);
}

export function getCountryScore(code: string): number | null {
  const data = countryDataMap.get(code);
  if (!data) return null;

<<<<<<< HEAD
  const baselineRisk = BASELINE_RISK[code] ?? 20;
=======
  const baselineRisk = CURATED_COUNTRIES[code]?.baselineRisk ?? DEFAULT_BASELINE_RISK;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  const components: ComponentScores = {
    unrest: calcUnrestScore(data, code),
    conflict: calcConflictScore(data, code),
    security: calcSecurityScore(data),
    information: calcInformationScore(data, code),
  };

  const eventScore = components.unrest * 0.25 + components.conflict * 0.30 + components.security * 0.20 + components.information * 0.25;
  const hotspotBoost = getHotspotBoost(code);
  const newsUrgencyBoost = components.information >= 70 ? 5
    : components.information >= 50 ? 3
    : 0;
  const focalUrgency = focalPointDetector.getCountryUrgency(code);
  const focalBoost = focalUrgency === 'critical' ? 8
    : focalUrgency === 'elevated' ? 4
    : 0;
  const displacementBoost = data.displacementOutflow >= 1_000_000 ? 8
    : data.displacementOutflow >= 100_000 ? 4
    : 0;
  const climateBoost = data.climateStress;
<<<<<<< HEAD
  const blendedScore = baselineRisk * 0.4 + eventScore * 0.6 + hotspotBoost + newsUrgencyBoost + focalBoost + displacementBoost + climateBoost;

  const floor = getUcdpFloor(data);
=======
  const advisoryBoost = getAdvisoryBoost(data);
  const supplementalSignalBoost = getSupplementalSignalBoost(data);
  const blendedScore = baselineRisk * 0.4 + eventScore * 0.6 + hotspotBoost + newsUrgencyBoost + focalBoost + displacementBoost + climateBoost + getOrefBlendBoost(code, data) + advisoryBoost + supplementalSignalBoost;

  const floor = Math.max(getUcdpFloor(data), getAdvisoryFloor(data));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  return Math.round(Math.min(100, Math.max(floor, blendedScore)));
}
