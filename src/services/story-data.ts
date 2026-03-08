import { calculateCII, type CountryScore } from './country-instability';
import type { ClusteredEvent } from '@/types';
import type { ThreatLevel } from './threat-classifier';
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
=======
import { CURATED_COUNTRIES } from '@/config/countries';
import { tokenizeForMatch, matchKeyword } from '@/utils/keyword-match';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export interface StoryData {
  countryCode: string;
  countryName: string;
  cii: {
    score: number;
    level: CountryScore['level'];
    trend: CountryScore['trend'];
    components: CountryScore['components'];
    change24h: number;
  } | null;
  news: Array<{
    title: string;
    threatLevel: ThreatLevel;
    sourceCount: number;
  }>;
  theater: {
    theaterName: string;
    postureLevel: string;
    totalAircraft: number;
    totalVessels: number;
    fighters: number;
    tankers: number;
    awacs: number;
    strikeCapable: boolean;
  } | null;
  markets: Array<{
    title: string;
    yesPrice: number;
  }>;
  threats: {
    critical: number;
    high: number;
    medium: number;
    categories: string[];
  };
  signals: {
    protests: number;
    militaryFlights: number;
    militaryVessels: number;
    outages: number;
<<<<<<< HEAD
=======
    gpsJammingHexes: number;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  };
  convergence: {
    score: number;
    signalTypes: string[];
    regionalDescriptions: string[];
  } | null;
}

export function collectStoryData(
  countryCode: string,
  countryName: string,
  allNews: ClusteredEvent[],
  theaterPostures: Array<{ theaterId: string; theaterName: string; shortName: string; targetNation: string | null; postureLevel: string; totalAircraft: number; totalVessels: number; fighters: number; tankers: number; awacs: number; strikeCapable: boolean }>,
  predictionMarkets: Array<{ title: string; yesPrice: number }>,
<<<<<<< HEAD
  signals?: { protests: number; militaryFlights: number; militaryVessels: number; outages: number },
=======
  signals?: { protests: number; militaryFlights: number; militaryVessels: number; outages: number; gpsJammingHexes: number },
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  convergence?: { score: number; signalTypes: string[]; regionalDescriptions: string[] } | null,
): StoryData {
  const scores = calculateCII();
  const countryScore = scores.find(s => s.code === countryCode) || null;

<<<<<<< HEAD
  const keywords = COUNTRY_KEYWORDS[countryCode] || [countryName.toLowerCase()];
  const countryNews = allNews.filter(e => {
    const lower = e.primaryTitle.toLowerCase();
    return keywords.some(kw => lower.includes(kw));
=======
  const keywords = CURATED_COUNTRIES[countryCode]?.scoringKeywords || [countryName.toLowerCase()];
  const countryNews = allNews.filter(e => {
    const tokens = tokenizeForMatch(e.primaryTitle);
    return keywords.some(kw => matchKeyword(tokens, kw));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  });

  const sortedNews = [...countryNews].sort((a, b) => {
    const priorities: Record<string, number> = { critical: 5, high: 4, medium: 3, low: 2, info: 1 };
    const pa = priorities[a.threat?.level || 'info'] || 0;
    const pb = priorities[b.threat?.level || 'info'] || 0;
    return pb - pa;
  });

  const theater = theaterPostures.find(t =>
    t.targetNation?.toLowerCase() === countryName.toLowerCase() ||
    t.shortName?.toLowerCase() === countryCode.toLowerCase()
  ) || null;

  const countryMarkets = predictionMarkets.filter(m => {
<<<<<<< HEAD
    const lower = m.title.toLowerCase();
    return keywords.some(kw => lower.includes(kw));
=======
    const mTokens = tokenizeForMatch(m.title);
    return keywords.some(kw => matchKeyword(mTokens, kw));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  });

  const threatCounts = { critical: 0, high: 0, medium: 0, categories: new Set<string>() };
  for (const n of countryNews) {
    const level = n.threat?.level;
    if (level === 'critical') threatCounts.critical++;
    else if (level === 'high') threatCounts.high++;
    else if (level === 'medium') threatCounts.medium++;
    if (n.threat?.category && n.threat.category !== 'general') {
      threatCounts.categories.add(n.threat.category);
    }
  }

  return {
    countryCode,
    countryName,
    cii: countryScore ? {
      score: countryScore.score,
      level: countryScore.level,
      trend: countryScore.trend,
      components: countryScore.components,
      change24h: countryScore.change24h,
    } : null,
    news: sortedNews.slice(0, 5).map(n => ({
      title: n.primaryTitle,
      threatLevel: (n.threat?.level || 'info') as ThreatLevel,
      sourceCount: n.sourceCount,
    })),
    theater: theater ? {
      theaterName: theater.theaterName,
      postureLevel: theater.postureLevel,
      totalAircraft: theater.totalAircraft,
      totalVessels: theater.totalVessels,
      fighters: theater.fighters,
      tankers: theater.tankers,
      awacs: theater.awacs,
      strikeCapable: theater.strikeCapable,
    } : null,
    markets: countryMarkets.slice(0, 4).map(m => ({
      title: m.title,
      yesPrice: m.yesPrice,
    })),
    threats: {
      critical: threatCounts.critical,
      high: threatCounts.high,
      medium: threatCounts.medium,
      categories: [...threatCounts.categories],
    },
<<<<<<< HEAD
    signals: signals || { protests: 0, militaryFlights: 0, militaryVessels: 0, outages: 0 },
=======
    signals: signals || { protests: 0, militaryFlights: 0, militaryVessels: 0, outages: 0, gpsJammingHexes: 0 },
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    convergence: convergence || null,
  };
}

