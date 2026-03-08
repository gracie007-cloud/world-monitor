<<<<<<< HEAD
import { isDesktopRuntime } from './runtime';
=======
import { getApiBaseUrl, isDesktopRuntime } from './runtime';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
import { invokeTauri } from './tauri-bridge';

export type RuntimeSecretKey =
  | 'GROQ_API_KEY'
  | 'OPENROUTER_API_KEY'
  | 'FRED_API_KEY'
  | 'EIA_API_KEY'
  | 'CLOUDFLARE_API_TOKEN'
  | 'ACLED_ACCESS_TOKEN'
<<<<<<< HEAD
=======
  | 'URLHAUS_AUTH_KEY'
  | 'OTX_API_KEY'
  | 'ABUSEIPDB_API_KEY'
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  | 'WINGBITS_API_KEY'
  | 'WS_RELAY_URL'
  | 'VITE_OPENSKY_RELAY_URL'
  | 'OPENSKY_CLIENT_ID'
  | 'OPENSKY_CLIENT_SECRET'
<<<<<<< HEAD
  | 'AISSTREAM_API_KEY';
=======
  | 'AISSTREAM_API_KEY'
  | 'FINNHUB_API_KEY'
  | 'NASA_FIRMS_API_KEY'
  | 'UCDP_ACCESS_TOKEN'
  | 'OLLAMA_API_URL'
  | 'OLLAMA_MODEL'
  | 'WORLDMONITOR_API_KEY'
  | 'WTO_API_KEY'
  | 'AVIATIONSTACK_API'
  | 'ICAO_API_KEY';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export type RuntimeFeatureId =
  | 'aiGroq'
  | 'aiOpenRouter'
  | 'economicFred'
  | 'energyEia'
  | 'internetOutages'
  | 'acledConflicts'
<<<<<<< HEAD
  | 'wingbitsEnrichment'
  | 'aisRelay'
  | 'openskyRelay';
=======
  | 'abuseChThreatIntel'
  | 'alienvaultOtxThreatIntel'
  | 'abuseIpdbThreatIntel'
  | 'wingbitsEnrichment'
  | 'aisRelay'
  | 'openskyRelay'
  | 'finnhubMarkets'
  | 'nasaFirms'
  | 'aiOllama'
  | 'wtoTrade'
  | 'supplyChain'
  | 'newsPerFeedFallback'
  | 'aviationStack'
  | 'ucdpConflicts'
  | 'icaoNotams';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export interface RuntimeFeatureDefinition {
  id: RuntimeFeatureId;
  name: string;
  description: string;
  requiredSecrets: RuntimeSecretKey[];
<<<<<<< HEAD
=======
  desktopRequiredSecrets?: RuntimeSecretKey[];
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  fallback: string;
}

export interface RuntimeSecretState {
  value: string;
  source: 'env' | 'vault';
}

export interface RuntimeConfig {
  featureToggles: Record<RuntimeFeatureId, boolean>;
  secrets: Partial<Record<RuntimeSecretKey, RuntimeSecretState>>;
}

const TOGGLES_STORAGE_KEY = 'worldmonitor-runtime-feature-toggles';
<<<<<<< HEAD
=======
function getSidecarEnvUpdateUrl(): string {
  return `${getApiBaseUrl()}/api/local-env-update`;
}
function getSidecarEnvUpdateBatchUrl(): string {
  return `${getApiBaseUrl()}/api/local-env-update-batch`;
}
function getSidecarSecretValidateUrl(): string {
  return `${getApiBaseUrl()}/api/local-validate-secret`;
}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

const defaultToggles: Record<RuntimeFeatureId, boolean> = {
  aiGroq: true,
  aiOpenRouter: true,
  economicFred: true,
  energyEia: true,
  internetOutages: true,
  acledConflicts: true,
<<<<<<< HEAD
  wingbitsEnrichment: true,
  aisRelay: true,
  openskyRelay: true,
=======
  ucdpConflicts: true,
  abuseChThreatIntel: true,
  alienvaultOtxThreatIntel: true,
  abuseIpdbThreatIntel: true,
  wingbitsEnrichment: true,
  aisRelay: true,
  openskyRelay: true,
  finnhubMarkets: true,
  nasaFirms: true,
  aiOllama: true,
  wtoTrade: true,
  supplyChain: true,
  newsPerFeedFallback: false,
  aviationStack: true,
  icaoNotams: true,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
};

export const RUNTIME_FEATURES: RuntimeFeatureDefinition[] = [
  {
<<<<<<< HEAD
=======
    id: 'aiOllama',
    name: 'Ollama local summarization',
    description: 'Local LLM provider via OpenAI-compatible endpoint (Ollama or LM Studio, desktop-first).',
    requiredSecrets: ['OLLAMA_API_URL', 'OLLAMA_MODEL'],
    fallback: 'Falls back to Groq, then OpenRouter, then local browser model.',
  },
  {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    id: 'aiGroq',
    name: 'Groq summarization',
    description: 'Primary fast LLM provider used for AI summary generation.',
    requiredSecrets: ['GROQ_API_KEY'],
    fallback: 'Falls back to OpenRouter, then local browser model.',
  },
  {
    id: 'aiOpenRouter',
    name: 'OpenRouter summarization',
    description: 'Secondary LLM provider for AI summary fallback.',
    requiredSecrets: ['OPENROUTER_API_KEY'],
    fallback: 'Falls back to local browser model only.',
  },
  {
    id: 'economicFred',
    name: 'FRED economic indicators',
    description: 'Macro indicators from Federal Reserve Economic Data.',
    requiredSecrets: ['FRED_API_KEY'],
    fallback: 'Economic panel remains available with non-FRED metrics.',
  },
  {
    id: 'energyEia',
    name: 'EIA oil analytics',
    description: 'US Energy Information Administration oil metrics.',
    requiredSecrets: ['EIA_API_KEY'],
    fallback: 'Oil analytics cards show disabled state.',
  },
  {
    id: 'internetOutages',
    name: 'Cloudflare outage radar',
    description: 'Internet outages from Cloudflare Radar annotations API.',
    requiredSecrets: ['CLOUDFLARE_API_TOKEN'],
    fallback: 'Outage layer is disabled and map continues with other feeds.',
  },
  {
    id: 'acledConflicts',
    name: 'ACLED conflicts & protests',
    description: 'Conflict and protest event feeds from ACLED.',
    requiredSecrets: ['ACLED_ACCESS_TOKEN'],
    fallback: 'Conflict/protest overlays are hidden.',
  },
  {
<<<<<<< HEAD
=======
    id: 'ucdpConflicts',
    name: 'UCDP conflict events',
    description: 'Armed conflict georeferenced event data from Uppsala Conflict Data Program.',
    requiredSecrets: ['UCDP_ACCESS_TOKEN'],
    fallback: 'UCDP conflict layer is disabled.',
  },
  {
    id: 'abuseChThreatIntel',
    name: 'abuse.ch cyber IOC feeds',
    description: 'URLhaus and ThreatFox IOC ingestion for the cyber threat layer.',
    requiredSecrets: ['URLHAUS_AUTH_KEY'],
    fallback: 'URLhaus/ThreatFox IOC ingestion is disabled.',
  },
  {
    id: 'alienvaultOtxThreatIntel',
    name: 'AlienVault OTX threat intel',
    description: 'Optional OTX IOC ingestion for cyber threat enrichment.',
    requiredSecrets: ['OTX_API_KEY'],
    fallback: 'OTX IOC enrichment is disabled.',
  },
  {
    id: 'abuseIpdbThreatIntel',
    name: 'AbuseIPDB threat intel',
    description: 'Optional AbuseIPDB IOC/reputation enrichment for the cyber threat layer.',
    requiredSecrets: ['ABUSEIPDB_API_KEY'],
    fallback: 'AbuseIPDB enrichment is disabled.',
  },
  {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    id: 'wingbitsEnrichment',
    name: 'Wingbits aircraft enrichment',
    description: 'Military flight operator/aircraft enrichment metadata.',
    requiredSecrets: ['WINGBITS_API_KEY'],
    fallback: 'Flight map still renders with heuristic-only classification.',
  },
  {
    id: 'aisRelay',
<<<<<<< HEAD
    name: 'AIS vessel relay',
    description: 'Live vessel ingestion via relay endpoint and AIS key.',
    requiredSecrets: ['WS_RELAY_URL', 'AISSTREAM_API_KEY'],
=======
    name: 'AIS vessel tracking',
    description: 'Live vessel ingestion via AISStream WebSocket.',
    requiredSecrets: ['WS_RELAY_URL', 'AISSTREAM_API_KEY'],
    desktopRequiredSecrets: ['AISSTREAM_API_KEY'],
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    fallback: 'AIS layer is disabled.',
  },
  {
    id: 'openskyRelay',
<<<<<<< HEAD
    name: 'OpenSky military flights relay',
    description: 'Relay credentials for OpenSky OAuth client credentials flow.',
    requiredSecrets: ['VITE_OPENSKY_RELAY_URL', 'OPENSKY_CLIENT_ID', 'OPENSKY_CLIENT_SECRET'],
    fallback: 'Military flights fall back to limited/no data.',
  },
=======
    name: 'OpenSky military flights',
    description: 'OpenSky OAuth credentials for military flight data.',
    requiredSecrets: ['VITE_OPENSKY_RELAY_URL', 'OPENSKY_CLIENT_ID', 'OPENSKY_CLIENT_SECRET'],
    desktopRequiredSecrets: ['OPENSKY_CLIENT_ID', 'OPENSKY_CLIENT_SECRET'],
    fallback: 'Military flights fall back to limited/no data.',
  },
  {
    id: 'finnhubMarkets',
    name: 'Finnhub market data',
    description: 'Real-time stock quotes and market data from Finnhub.',
    requiredSecrets: ['FINNHUB_API_KEY'],
    fallback: 'Stock ticker uses limited free data.',
  },
  {
    id: 'nasaFirms',
    name: 'NASA FIRMS fire data',
    description: 'Fire Information for Resource Management System satellite data.',
    requiredSecrets: ['NASA_FIRMS_API_KEY'],
    fallback: 'FIRMS fire layer uses public VIIRS feed.',
  },
  {
    id: 'wtoTrade',
    name: 'WTO trade policy data',
    description: 'Trade restrictions, tariff trends, barriers, and flows from WTO.',
    requiredSecrets: ['WTO_API_KEY'],
    fallback: 'Trade policy panel shows disabled state.',
  },
  {
    id: 'supplyChain',
    name: 'Supply Chain Intelligence',
    description: 'Shipping rates via FRED Baltic Dry Index. Chokepoints and minerals use public data.',
    requiredSecrets: ['FRED_API_KEY'],
    fallback: 'Chokepoints and minerals always available; shipping requires FRED key.',
  },
  {
    id: 'newsPerFeedFallback',
    name: 'News per-feed fallback',
    description: 'If digest aggregation is unavailable, use stale headlines first and optionally fetch a limited feed subset.',
    requiredSecrets: [],
    fallback: 'Stale headlines remain available; limited per-feed fallback is disabled.',
  },
  {
    id: 'aviationStack',
    name: 'AviationStack flight delays',
    description: 'Real-time international airport delay data from AviationStack API.',
    requiredSecrets: ['AVIATIONSTACK_API'],
    fallback: 'Non-US airports use simulated delay data.',
  },
  {
    id: 'icaoNotams',
    name: 'ICAO NOTAM closures (Middle East)',
    description: 'Airport closure detection for MENA airports from ICAO NOTAM data service.',
    requiredSecrets: ['ICAO_API_KEY'],
    fallback: 'Closures detected only via AviationStack flight cancellation data.',
  },
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
];

function readEnvSecret(key: RuntimeSecretKey): string {
  const envValue = (import.meta as { env?: Record<string, unknown> }).env?.[key];
  return typeof envValue === 'string' ? envValue.trim() : '';
}

function readStoredToggles(): Record<RuntimeFeatureId, boolean> {
  try {
    const stored = localStorage.getItem(TOGGLES_STORAGE_KEY);
    if (!stored) return { ...defaultToggles };
    const parsed = JSON.parse(stored) as Partial<Record<RuntimeFeatureId, boolean>>;
    return { ...defaultToggles, ...parsed };
  } catch {
    return { ...defaultToggles };
  }
}

<<<<<<< HEAD
function validateSecretValue(value: string): boolean {
  return value.trim().length >= 8;
}

=======
const URL_SECRET_KEYS = new Set<RuntimeSecretKey>([
  'WS_RELAY_URL',
  'VITE_OPENSKY_RELAY_URL',
  'OLLAMA_API_URL',
]);

export interface SecretVerificationResult {
  valid: boolean;
  message: string;
}

export function validateSecret(key: RuntimeSecretKey, value: string): { valid: boolean; hint?: string } {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, hint: 'Value is required' };

  if (URL_SECRET_KEYS.has(key)) {
    try {
      const parsed = new URL(trimmed);
      if (key === 'OLLAMA_API_URL') {
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          return { valid: false, hint: 'Must be an http(s) URL' };
        }
        return { valid: true };
      }
      if (!['http:', 'https:', 'ws:', 'wss:'].includes(parsed.protocol)) {
        return { valid: false, hint: 'Must be an http(s) or ws(s) URL' };
      }
      return { valid: true };
    } catch {
      return { valid: false, hint: 'Must be a valid URL' };
    }
  }

  if (key === 'WORLDMONITOR_API_KEY') {
    if (trimmed.length < 16) return { valid: false, hint: 'API key must be at least 16 characters' };
    return { valid: true };
  }

  return { valid: true };
}

let secretsReadyResolve!: () => void;
export const secretsReady = new Promise<void>(r => { secretsReadyResolve = r; });

if (!isDesktopRuntime()) secretsReadyResolve();

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
const listeners = new Set<() => void>();

const runtimeConfig: RuntimeConfig = {
  featureToggles: readStoredToggles(),
  secrets: {},
};

<<<<<<< HEAD
=======
let localApiTokenPromise: Promise<string | null> | null = null;

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
function notifyConfigChanged(): void {
  for (const listener of listeners) listener();
}

function seedSecretsFromEnvironment(): void {
  if (isDesktopRuntime()) return;

  const keys = new Set<RuntimeSecretKey>(RUNTIME_FEATURES.flatMap(feature => feature.requiredSecrets));
  for (const key of keys) {
    const value = readEnvSecret(key);
    if (value) {
      runtimeConfig.secrets[key] = { value, source: 'env' };
    }
  }
}

seedSecretsFromEnvironment();

<<<<<<< HEAD
=======
// Listen for cross-window state updates (settings ↔ main).
// When one window saves secrets or toggles features, the `storage` event fires in other same-origin windows.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'wm-secrets-updated') {
      void loadDesktopSecrets();
    } else if (e.key === TOGGLES_STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue) as Partial<Record<RuntimeFeatureId, boolean>>;
        Object.assign(runtimeConfig.featureToggles, parsed);
        notifyConfigChanged();
      } catch { /* ignore malformed JSON */ }
    }
  });
}

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
export function subscribeRuntimeConfig(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getRuntimeConfigSnapshot(): RuntimeConfig {
  return {
    featureToggles: { ...runtimeConfig.featureToggles },
    secrets: { ...runtimeConfig.secrets },
  };
}

export function isFeatureEnabled(featureId: RuntimeFeatureId): boolean {
  return runtimeConfig.featureToggles[featureId] !== false;
}

export function getSecretState(key: RuntimeSecretKey): { present: boolean; valid: boolean; source: 'env' | 'vault' | 'missing' } {
  const state = runtimeConfig.secrets[key];
  if (!state) return { present: false, valid: false, source: 'missing' };
<<<<<<< HEAD
  return { present: true, valid: validateSecretValue(state.value), source: state.source };
=======
  return { present: true, valid: validateSecret(key, state.value).valid, source: state.source };
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}

export function isFeatureAvailable(featureId: RuntimeFeatureId): boolean {
  if (!isFeatureEnabled(featureId)) return false;

  // Cloud/web deployments validate credentials server-side.
  // Desktop runtime validates local secrets client-side for capability gating.
  if (!isDesktopRuntime()) {
    return true;
  }

  const feature = RUNTIME_FEATURES.find(item => item.id === featureId);
  if (!feature) return false;
<<<<<<< HEAD
  return feature.requiredSecrets.every(secretKey => getSecretState(secretKey).valid);
=======
  const secrets = feature.desktopRequiredSecrets ?? feature.requiredSecrets;
  return secrets.every(secretKey => getSecretState(secretKey).valid);
}

export function getEffectiveSecrets(feature: RuntimeFeatureDefinition): RuntimeSecretKey[] {
  return (isDesktopRuntime() && feature.desktopRequiredSecrets) ? feature.desktopRequiredSecrets : feature.requiredSecrets;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}

export function setFeatureToggle(featureId: RuntimeFeatureId, enabled: boolean): void {
  runtimeConfig.featureToggles[featureId] = enabled;
  localStorage.setItem(TOGGLES_STORAGE_KEY, JSON.stringify(runtimeConfig.featureToggles));
  notifyConfigChanged();
}

export async function setSecretValue(key: RuntimeSecretKey, value: string): Promise<void> {
  if (!isDesktopRuntime()) {
    console.warn('[runtime-config] Ignoring secret write outside desktop runtime');
    return;
  }

  const sanitized = value.trim();
  if (sanitized) {
    await invokeTauri<void>('set_secret', { key, value: sanitized });
    runtimeConfig.secrets[key] = { value: sanitized, source: 'vault' };
  } else {
    await invokeTauri<void>('delete_secret', { key });
    delete runtimeConfig.secrets[key];
  }

<<<<<<< HEAD
  // Push to sidecar so handlers pick it up immediately
  pushSecretToSidecar(key, sanitized || '');
=======
  // Push to sidecar so handlers pick it up immediately.
  // This is best-effort: keyring persistence is the source of truth.
  try {
    await pushSecretToSidecar(key, sanitized || '');
  } catch (error) {
    console.warn(`[runtime-config] Failed to sync ${key} to sidecar`, error);
  }

  // Signal other windows (main ↔ settings) to reload secrets from keychain.
  // The `storage` event fires in all same-origin windows except the one that wrote.
  try {
    localStorage.setItem('wm-secrets-updated', String(Date.now()));
  } catch { /* localStorage may be unavailable */ }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

  notifyConfigChanged();
}

<<<<<<< HEAD
function pushSecretToSidecar(key: string, value: string): void {
  fetch('http://127.0.0.1:46123/api/local-env-update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value: value || null }),
  }).catch(() => { /* sidecar not running */ });
=======
async function getLocalApiToken(): Promise<string | null> {
  if (!localApiTokenPromise) {
    localApiTokenPromise = invokeTauri<string>('get_local_api_token')
      .then((token) => token.trim() || null)
      .catch((error) => {
        // Allow retries on subsequent calls if bridge/token is temporarily unavailable.
        localApiTokenPromise = null;
        throw error;
      });
  }
  return localApiTokenPromise;
}

async function pushSecretToSidecar(key: string, value: string): Promise<void> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const token = await getLocalApiToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(getSidecarEnvUpdateUrl(), {
    method: 'POST',
    headers,
    body: JSON.stringify({ key, value: value || null }),
  });

  if (!response.ok) {
    let detail = '';
    try {
      detail = await response.text();
    } catch { /* ignore non-readable body */ }
    throw new Error(`Sidecar secret sync failed (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ''}`);
  }
}

async function callSidecarWithAuth(url: string, init: RequestInit): Promise<Response> {
  const headers = new Headers(init.headers ?? {});
  const token = await getLocalApiToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(url, { ...init, headers });
}

export async function verifySecretWithApi(
  key: RuntimeSecretKey,
  value: string,
  context: Partial<Record<RuntimeSecretKey, string>> = {},
): Promise<SecretVerificationResult> {
  const localValidation = validateSecret(key, value);
  if (!localValidation.valid) {
    return { valid: false, message: localValidation.hint || 'Invalid value' };
  }

  if (!isDesktopRuntime()) {
    return { valid: true, message: 'Saved' };
  }

  try {
    const response = await callSidecarWithAuth(getSidecarSecretValidateUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: value.trim(), context }),
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch { /* non-JSON response */ }

    if (!response.ok) {
      const message = payload && typeof payload === 'object'
        ? String(
          (payload as Record<string, unknown>).message
          || (payload as Record<string, unknown>).error
          || 'Secret validation failed'
        )
        : `Secret validation failed (${response.status})`;
      return { valid: false, message };
    }

    if (!payload || typeof payload !== 'object') {
      return { valid: false, message: 'Secret validation returned an invalid response' };
    }

    const valid = Boolean((payload as Record<string, unknown>).valid);
    const message = String((payload as Record<string, unknown>).message || (valid ? 'Verified' : 'Verification failed'));
    return { valid, message };
  } catch (error) {
    // Network errors reaching the sidecar should NOT block saving.
    // Only explicit 401/403 from the provider means the key is invalid.
    const message = error instanceof Error ? error.message : 'Secret validation failed';
    return { valid: true, message: `Saved (could not verify – ${message})` };
  }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}

export async function loadDesktopSecrets(): Promise<void> {
  if (!isDesktopRuntime()) return;

  try {
<<<<<<< HEAD
    const keys = await invokeTauri<RuntimeSecretKey[]>('list_supported_secret_keys');

    await Promise.all(keys.map(async (key) => {
      const value = await invokeTauri<string | null>('get_secret', { key });
      if (value && value.trim()) {
        runtimeConfig.secrets[key] = { value: value.trim(), source: 'vault' };
        pushSecretToSidecar(key, value.trim());
      }
    }));
=======
    const allSecrets = await invokeTauri<Record<string, string>>('get_all_secrets');

    const entries: { key: string; value: string }[] = [];
    for (const [key, value] of Object.entries(allSecrets)) {
      if (value && value.trim().length > 0) {
        runtimeConfig.secrets[key as RuntimeSecretKey] = { value, source: 'vault' };
        entries.push({ key, value });
      }
    }

    if (entries.length > 0) {
      try {
        await pushSecretBatchToSidecar(entries);
      } catch {
        // Batch endpoint unavailable (older sidecar) — fall back to individual pushes
        await Promise.allSettled(
          entries.map(({ key, value }) =>
            pushSecretToSidecar(key as RuntimeSecretKey, value).catch((error) => {
              console.warn(`[runtime-config] Failed to sync ${key} to sidecar`, error);
            })
          )
        );
      }
    }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    notifyConfigChanged();
  } catch (error) {
    console.warn('[runtime-config] Failed to load desktop secrets from vault', error);
<<<<<<< HEAD
=======
  } finally {
    secretsReadyResolve();
  }
}

async function pushSecretBatchToSidecar(entries: { key: string; value: string }[]): Promise<void> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const token = await getLocalApiToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(getSidecarEnvUpdateBatchUrl(), {
    method: 'POST',
    headers,
    body: JSON.stringify({ entries }),
  });

  if (!response.ok) {
    throw new Error(`Batch env update failed (${response.status})`);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }
}
