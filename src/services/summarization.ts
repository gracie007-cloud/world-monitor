/**
 * Summarization Service with Fallback Chain
 * Server-side Redis caching handles cross-user deduplication
<<<<<<< HEAD
 * Fallback: Groq -> OpenRouter -> Browser T5
=======
 * Fallback: Ollama -> Groq -> OpenRouter -> Browser T5
 *
 * Uses NewsServiceClient.summarizeArticle() RPC instead of legacy
 * per-provider fetch endpoints.
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
 */

import { mlWorker } from './ml-worker';
import { SITE_VARIANT } from '@/config';
<<<<<<< HEAD
import { isFeatureAvailable } from './runtime-config';

export type SummarizationProvider = 'groq' | 'openrouter' | 'browser' | 'cache';
=======
import { BETA_MODE } from '@/config/beta';
import { isFeatureAvailable, type RuntimeFeatureId } from './runtime-config';
import { trackLLMUsage, trackLLMFailure } from './analytics';
import { getCurrentLanguage } from './i18n';
import { NewsServiceClient, type SummarizeArticleResponse } from '@/generated/client/worldmonitor/news/v1/service_client';
import { createCircuitBreaker } from '@/utils';
import { buildSummaryCacheKey } from '@/utils/summary-cache-key';

export type SummarizationProvider = 'ollama' | 'groq' | 'openrouter' | 'browser' | 'cache';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export interface SummarizationResult {
  summary: string;
  provider: SummarizationProvider;
<<<<<<< HEAD
=======
  model: string;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  cached: boolean;
}

export type ProgressCallback = (step: number, total: number, message: string) => void;

<<<<<<< HEAD
async function tryGroq(headlines: string[], geoContext?: string): Promise<SummarizationResult | null> {
  if (!isFeatureAvailable('aiGroq')) return null;
  try {
    const response = await fetch('/api/groq-summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headlines, mode: 'brief', geoContext, variant: SITE_VARIANT }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      if (data.fallback) return null;
      throw new Error(`Groq error: ${response.status}`);
    }

    const data = await response.json();
    const provider = data.cached ? 'cache' : 'groq';
    console.log(`[Summarization] ${provider === 'cache' ? 'Redis cache hit' : 'Groq success'}:`, data.model);
    return {
      summary: data.summary,
      provider: provider as SummarizationProvider,
      cached: !!data.cached,
    };
  } catch (error) {
    console.warn('[Summarization] Groq failed:', error);
=======
export interface SummarizeOptions {
  skipCloudProviders?: boolean;  // true = skip Ollama/Groq/OpenRouter, go straight to browser T5
  skipBrowserFallback?: boolean; // true = skip browser T5 fallback
}

// ── Sebuf client (replaces direct fetch to /api/{provider}-summarize) ──

const newsClient = new NewsServiceClient('', { fetch: (...args) => globalThis.fetch(...args) });
const summaryBreaker = createCircuitBreaker<SummarizeArticleResponse>({ name: 'News Summarization', cacheTtlMs: 0 });

const emptySummaryFallback: SummarizeArticleResponse = { summary: '', provider: '', model: '', fallback: true, tokens: 0, error: '', errorType: '', status: 'SUMMARIZE_STATUS_UNSPECIFIED', statusDetail: '' };

// ── Provider definitions ──

interface ApiProviderDef {
  featureId: RuntimeFeatureId;
  provider: SummarizationProvider;
  label: string;
}

const API_PROVIDERS: ApiProviderDef[] = [
  { featureId: 'aiOllama',      provider: 'ollama',     label: 'Ollama' },
  { featureId: 'aiGroq',        provider: 'groq',       label: 'Groq AI' },
  { featureId: 'aiOpenRouter',  provider: 'openrouter', label: 'OpenRouter' },
];

let lastAttemptedProvider = 'none';

// ── Unified API provider caller (via SummarizeArticle RPC) ──

async function tryApiProvider(
  providerDef: ApiProviderDef,
  headlines: string[],
  geoContext?: string,
  lang?: string,
): Promise<SummarizationResult | null> {
  if (!isFeatureAvailable(providerDef.featureId)) return null;
  lastAttemptedProvider = providerDef.provider;
  try {
    const resp: SummarizeArticleResponse = await summaryBreaker.execute(async () => {
      return newsClient.summarizeArticle({
        provider: providerDef.provider,
        headlines,
        mode: 'brief',
        geoContext: geoContext || '',
        variant: SITE_VARIANT,
        lang: lang || 'en',
      });
    }, emptySummaryFallback);

    // Provider skipped (credentials missing) or signaled fallback
    if (resp.status === 'SUMMARIZE_STATUS_SKIPPED' || resp.fallback) return null;

    const summary = typeof resp.summary === 'string' ? resp.summary.trim() : '';
    if (!summary) return null;

    const cached = resp.status === 'SUMMARIZE_STATUS_CACHED';
    const resultProvider = cached ? 'cache' : providerDef.provider;
    return {
      summary,
      provider: resultProvider as SummarizationProvider,
      model: resp.model || providerDef.provider,
      cached,
    };
  } catch (error) {
    console.warn(`[Summarization] ${providerDef.label} failed:`, error);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    return null;
  }
}

<<<<<<< HEAD
async function tryOpenRouter(headlines: string[], geoContext?: string): Promise<SummarizationResult | null> {
  if (!isFeatureAvailable('aiOpenRouter')) return null;
  try {
    const response = await fetch('/api/openrouter-summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headlines, mode: 'brief', geoContext, variant: SITE_VARIANT }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      if (data.fallback) return null;
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    const provider = data.cached ? 'cache' : 'openrouter';
    console.log(`[Summarization] ${provider === 'cache' ? 'Redis cache hit' : 'OpenRouter success'}:`, data.model);
    return {
      summary: data.summary,
      provider: provider as SummarizationProvider,
      cached: !!data.cached,
    };
  } catch (error) {
    console.warn('[Summarization] OpenRouter failed:', error);
    return null;
  }
}

async function tryBrowserT5(headlines: string[]): Promise<SummarizationResult | null> {
  try {
    if (!mlWorker.isAvailable) {
      console.log('[Summarization] Browser ML not available');
      return null;
    }

    const combinedText = headlines.slice(0, 6).map(h => h.slice(0, 80)).join('. ');
    const prompt = `Summarize the main themes from these news headlines in 2 sentences: ${combinedText}`;

    const [summary] = await mlWorker.summarize([prompt]);

    if (!summary || summary.length < 20 || summary.toLowerCase().includes('summarize')) {
      return null;
    }

    console.log('[Summarization] Browser T5 success');
    return {
      summary,
      provider: 'browser',
=======
// ── Browser T5 provider (different interface -- no API call) ──

async function tryBrowserT5(headlines: string[], modelId?: string): Promise<SummarizationResult | null> {
  try {
    if (!mlWorker.isAvailable) {
      return null;
    }
    lastAttemptedProvider = 'browser';

    const lang = getCurrentLanguage();
    const combinedText = headlines.slice(0, 5).map(h => h.slice(0, 80)).join('. ');
    const prompt = lang === 'fr'
      ? `Résumez le titre le plus important en 2 phrases concises (moins de 60 mots) : ${combinedText}`
      : `Summarize the most important headline in 2 concise sentences (under 60 words): ${combinedText}`;

    const [summary] = await mlWorker.summarize([prompt], modelId);

    if (!summary || summary.length < 20 || summary.toLowerCase().includes('summarize') || summary.toLowerCase().includes('résumez')) {
      return null;
    }

    return {
      summary,
      provider: 'browser',
      model: modelId || 't5-small',
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      cached: false,
    };
  } catch (error) {
    console.warn('[Summarization] Browser T5 failed:', error);
    return null;
  }
}

<<<<<<< HEAD
/**
 * Generate a summary using the fallback chain: Groq -> OpenRouter -> Browser T5
 * Server-side Redis caching is handled by the API endpoints
=======
// ── Fallback chain runner ──

async function runApiChain(
  providers: ApiProviderDef[],
  headlines: string[],
  geoContext: string | undefined,
  lang: string | undefined,
  onProgress: ProgressCallback | undefined,
  stepOffset: number,
  totalSteps: number,
): Promise<SummarizationResult | null> {
  for (const [i, provider] of providers.entries()) {
    onProgress?.(stepOffset + i, totalSteps, `Connecting to ${provider.label}...`);
    const result = await tryApiProvider(provider, headlines, geoContext, lang);
    if (result) return result;
  }
  return null;
}

/**
 * Generate a summary using the fallback chain: Ollama -> Groq -> OpenRouter -> Browser T5
 * Server-side Redis caching is handled by the SummarizeArticle RPC handler
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
 * @param geoContext Optional geographic signal context to include in the prompt
 */
export async function generateSummary(
  headlines: string[],
  onProgress?: ProgressCallback,
<<<<<<< HEAD
  geoContext?: string
=======
  geoContext?: string,
  lang: string = 'en',
  options?: SummarizeOptions,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
): Promise<SummarizationResult | null> {
  if (!headlines || headlines.length < 2) {
    return null;
  }

<<<<<<< HEAD
  const totalSteps = 3;

  // Step 1: Try Groq (fast, 14.4K/day with 8b-instant + Redis cache)
  onProgress?.(1, totalSteps, 'Connecting to Groq AI...');
  const groqResult = await tryGroq(headlines, geoContext);
  if (groqResult) {
    return groqResult;
  }

  // Step 2: Try OpenRouter (fallback, 50/day + Redis cache)
  onProgress?.(2, totalSteps, 'Trying OpenRouter...');
  const openRouterResult = await tryOpenRouter(headlines, geoContext);
  if (openRouterResult) {
    return openRouterResult;
  }

  // Step 3: Try Browser T5 (local, unlimited but slower)
  onProgress?.(3, totalSteps, 'Loading local AI model...');
  const browserResult = await tryBrowserT5(headlines);
  if (browserResult) {
    return browserResult;
=======
  lastAttemptedProvider = 'none';
  const result = await generateSummaryInternal(headlines, onProgress, geoContext, lang, options);

  // Track at generateSummary return only (not inside tryApiProvider) to avoid
  // double-counting beta comparison traffic. Only the winning provider is recorded.
  if (result) {
    trackLLMUsage(result.provider, result.model, result.cached);
  } else {
    trackLLMFailure(lastAttemptedProvider);
  }

  return result;
}

async function generateSummaryInternal(
  headlines: string[],
  onProgress: ProgressCallback | undefined,
  geoContext: string | undefined,
  lang: string,
  options?: SummarizeOptions,
): Promise<SummarizationResult | null> {
  if (!options?.skipCloudProviders) {
    try {
      const cacheKey = buildSummaryCacheKey(headlines, 'brief', geoContext, SITE_VARIANT, lang);
      const cached = await newsClient.getSummarizeArticleCache({ cacheKey });
      if (cached.summary) {
        return { summary: cached.summary, provider: 'cache', model: cached.model || '', cached: true };
      }
    } catch { /* cache lookup failed — proceed to provider chain */ }
  }

  if (BETA_MODE) {
    const modelReady = mlWorker.isAvailable && mlWorker.isModelLoaded('summarization-beta');

    if (modelReady) {
      const totalSteps = 1 + API_PROVIDERS.length;
      // Model already loaded -- use browser T5-small first
      if (!options?.skipBrowserFallback) {
        onProgress?.(1, totalSteps, 'Running local AI model (beta)...');
        const browserResult = await tryBrowserT5(headlines, 'summarization-beta');
        if (browserResult) {
          const groqProvider = API_PROVIDERS.find(p => p.provider === 'groq');
          if (groqProvider && !options?.skipCloudProviders) tryApiProvider(groqProvider, headlines, geoContext).catch(() => {});

          return browserResult;
        }
      }

      // Warm model failed inference -- fallback through API providers
      if (!options?.skipCloudProviders) {
        const chainResult = await runApiChain(API_PROVIDERS, headlines, geoContext, undefined, onProgress, 2, totalSteps);
        if (chainResult) return chainResult;
      }
    } else {
      const totalSteps = API_PROVIDERS.length + 2;
      if (mlWorker.isAvailable && !options?.skipBrowserFallback) {
        mlWorker.loadModel('summarization-beta').catch(() => {});
      }

      // API providers while model loads
      if (!options?.skipCloudProviders) {
        const chainResult = await runApiChain(API_PROVIDERS, headlines, geoContext, undefined, onProgress, 1, totalSteps);
        if (chainResult) {
          return chainResult;
        }
      }

      // Last resort: try browser T5 (may have finished loading by now)
      if (mlWorker.isAvailable && !options?.skipBrowserFallback) {
        onProgress?.(API_PROVIDERS.length + 1, totalSteps, 'Waiting for local AI model...');
        const browserResult = await tryBrowserT5(headlines, 'summarization-beta');
        if (browserResult) return browserResult;
      }

      onProgress?.(totalSteps, totalSteps, 'No providers available');
    }

    console.warn('[BETA] All providers failed');
    return null;
  }

  // Normal mode: API chain -> Browser T5
  const totalSteps = API_PROVIDERS.length + 1;
  let chainResult: SummarizationResult | null = null;

  if (!options?.skipCloudProviders) {
    chainResult = await runApiChain(API_PROVIDERS, headlines, geoContext, lang, onProgress, 1, totalSteps);
  }
  if (chainResult) return chainResult;

  if (!options?.skipBrowserFallback) {
    onProgress?.(totalSteps, totalSteps, 'Loading local AI model...');
    const browserResult = await tryBrowserT5(headlines);
    if (browserResult) return browserResult;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  console.warn('[Summarization] All providers failed');
  return null;
}

<<<<<<< HEAD
=======

/**
 * Translate text using the fallback chain (via SummarizeArticle RPC with mode='translate')
 * @param text Text to translate
 * @param targetLang Target language code (e.g., 'fr', 'es')
 */
export async function translateText(
  text: string,
  targetLang: string,
  onProgress?: ProgressCallback
): Promise<string | null> {
  if (!text) return null;

  const totalSteps = API_PROVIDERS.length;
  for (const [i, providerDef] of API_PROVIDERS.entries()) {
    if (!isFeatureAvailable(providerDef.featureId)) continue;

    onProgress?.(i + 1, totalSteps, `Translating with ${providerDef.label}...`);
    try {
      const resp = await summaryBreaker.execute(async () => {
        return newsClient.summarizeArticle({
          provider: providerDef.provider,
          headlines: [text],
          mode: 'translate',
          geoContext: '',
          variant: targetLang,
          lang: '',
        });
      }, emptySummaryFallback);

      if (resp.fallback || resp.status === 'SUMMARIZE_STATUS_SKIPPED') continue;
      const summary = typeof resp.summary === 'string' ? resp.summary.trim() : '';
      if (summary) return summary;
    } catch (e) {
      console.warn(`${providerDef.label} translation failed`, e);
    }
  }

  return null;
}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
