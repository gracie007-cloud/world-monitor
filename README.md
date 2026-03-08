# World Monitor

**Real-time global intelligence dashboard** — AI-powered news aggregation, geopolitical monitoring, and infrastructure tracking in a unified situational awareness interface.

[![GitHub stars](https://img.shields.io/github/stars/koala73/worldmonitor?style=social)](https://github.com/koala73/worldmonitor/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/koala73/worldmonitor?style=social)](https://github.com/koala73/worldmonitor/network/members)
<<<<<<< HEAD
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
=======
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Last commit](https://img.shields.io/github/last-commit/koala73/worldmonitor)](https://github.com/koala73/worldmonitor/commits/main)
[![Latest release](https://img.shields.io/github/v/release/koala73/worldmonitor?style=flat)](https://github.com/koala73/worldmonitor/releases/latest)

<p align="center">
<<<<<<< HEAD
  <a href="https://worldmonitor.app"><strong>Live Demo</strong></a> &nbsp;·&nbsp;
  <a href="https://tech.worldmonitor.app"><strong>Tech Variant</strong></a> &nbsp;·&nbsp;
  <a href="./docs/DOCUMENTATION.md"><strong>Full Documentation</strong></a>
</p>

![World Monitor Dashboard](new-world-monitor.png)

---

## Why World Monitor?

| Problem | Solution |
|---------|----------|
| News scattered across 100+ sources | **Single unified dashboard** with 100+ curated feeds |
| No geospatial context for events | **Interactive map** with 25+ toggleable data layers |
| Information overload | **AI-synthesized briefs** with focal point detection |
| Crypto/macro signal noise | **7-signal market radar** with composite BUY/CASH verdict |
| Expensive OSINT tools ($$$) | **100% free & open source** |
| Static news feeds | **Real-time updates** with live video streams |
| Web-only dashboards | **Native desktop app** (Tauri) + installable PWA with offline map support |
| Flat 2D maps | **3D WebGL globe** with deck.gl rendering and 29+ toggleable data layers |

---

## Live Demos

| Variant | URL | Focus |
|---------|-----|-------|
| **World Monitor** | [worldmonitor.app](https://worldmonitor.app) | Geopolitics, military, conflicts, infrastructure |
| **Tech Monitor** | [tech.worldmonitor.app](https://tech.worldmonitor.app) | Startups, AI/ML, cloud, cybersecurity |

Both variants run from a single codebase — switch between them with one click.

---

## Key Features

### Interactive 3D Globe
- **WebGL-accelerated rendering** — deck.gl + MapLibre GL JS for smooth 60fps performance with thousands of concurrent markers. Switchable between **3D globe** (with pitch/rotation) and **flat map** mode via `VITE_MAP_INTERACTION_MODE`
- **29+ data layers** — conflicts, military bases, nuclear facilities, undersea cables, pipelines, satellite fire detection, protests, natural disasters, datacenters, displacement flows, climate anomalies, and more
- **Smart clustering** — Supercluster groups markers at low zoom, expands on zoom in. Cluster thresholds adapt to zoom level
- **Progressive disclosure** — detail layers (bases, nuclear, datacenters) appear only when zoomed in; zoom-adaptive opacity fades markers from 0.2 at world view to 1.0 at street level
- **Label deconfliction** — overlapping labels (e.g., multiple BREAKING badges) are automatically suppressed by priority, highest-severity first
- **8 regional presets** — Global, Americas, Europe, MENA, Asia, Africa, Oceania, Latin America
- **Time filtering** — 1h, 6h, 24h, 48h, 7d event windows
- **URL state sharing** — map center, zoom, active layers, and time range are encoded in the URL for shareable views (`?view=mena&zoom=4&layers=conflicts,bases`)

### AI-Powered Intelligence
- **World Brief** — LLM-synthesized summary of top global developments (Groq Llama 3.1, Redis-cached)
- **Hybrid Threat Classification** — instant keyword classifier with async LLM override for higher-confidence results
- **Focal Point Detection** — correlates entities across news, military activity, protests, outages, and markets to identify convergence
- **Country Instability Index** — real-time stability scores for 20 monitored nations using weighted multi-signal blend
- **Strategic Posture Assessment** — composite risk score combining all intelligence modules with trend detection

### Real-Time Data Layers

<details>
<summary><strong>Geopolitical</strong></summary>

- Active conflict zones with escalation tracking (UCDP + ACLED)
- Intelligence hotspots with news correlation
- Social unrest events (dual-source: ACLED protests + GDELT geo-events, Haversine-deduplicated)
- Natural disasters from 3 sources (USGS earthquakes M4.5+, GDACS alerts, NASA EONET events)
- Sanctions regimes
- Weather alerts and severe conditions

</details>

<details>
<summary><strong>Military & Strategic</strong></summary>

- 220+ military bases from 9 operators
- Live military flight tracking (ADS-B)
- Naval vessel monitoring (AIS)
- Nuclear facilities & gamma irradiators
- APT cyber threat actor attribution
- Spaceports & launch facilities

</details>

<details>
<summary><strong>Infrastructure</strong></summary>

- Undersea cables with landing points
- Oil & gas pipelines
- AI datacenters (111 major clusters)
- Internet outages (Cloudflare Radar)
- Critical mineral deposits
- NASA FIRMS satellite fire detection (VIIRS thermal hotspots)

</details>

<details>
<summary><strong>Market & Crypto Intelligence</strong></summary>

- 7-signal macro radar with composite BUY/CASH verdict
- BTC spot ETF flow tracker (IBIT, FBTC, GBTC, and 7 more)
- Stablecoin peg health monitor (USDT, USDC, DAI, FDUSD, USDe)
- Fear & Greed Index with 30-day history
- Bitcoin technical trend (SMA50, SMA200, VWAP, Mayer Multiple)
- JPY liquidity signal, QQQ/XLP macro regime, BTC hash rate
- Inline SVG sparklines and donut gauges for visual trends

</details>

<details>
<summary><strong>Tech Ecosystem</strong> (Tech variant)</summary>

- Tech company HQs (Big Tech, unicorns, public)
- Startup hubs with funding data
- Cloud regions (AWS, Azure, GCP)
- Accelerators (YC, Techstars, 500)
- Upcoming tech conferences

</details>

### Live News & Video
- **100+ RSS feeds** across geopolitics, defense, energy, tech — domain-allowlisted proxy prevents CORS issues
- **8 live video streams** — Bloomberg, Sky News, Al Jazeera, Euronews, DW, France24, CNBC, Al Arabiya — with automatic live detection that scrapes YouTube channel pages every 5 minutes to find active streams
- **Desktop embed bridge** — YouTube's IFrame API restricts playback in native webviews (error 153). The dashboard detects this and transparently routes through a cloud-hosted embed proxy with bidirectional message passing (play/pause/mute/unmute/loadVideo)
- **Idle-aware playback** — video players pause and are removed from the DOM after 5 minutes of inactivity, resuming when the user returns. Tab visibility changes also suspend/resume streams
- **Custom monitors** — Create keyword-based alerts for any topic, color-coded with persistent storage
- **Entity extraction** — Auto-links countries, leaders, organizations
- **Virtual scrolling** — news panels render only visible DOM elements, handling thousands of items without browser lag

### Signal Aggregation & Anomaly Detection
- **Multi-source signal fusion** — internet outages, military flights, naval vessels, protests, AIS disruptions, and satellite fires are aggregated into a unified intelligence picture with per-country and per-region clustering
- **Temporal baseline anomaly detection** — Welford's online algorithm computes streaming mean/variance per event type, region, weekday, and month over a 90-day window. Z-score thresholds (1.5/2.0/3.0) flag deviations like "Military flights 3.2x normal for Thursday (January)" — stored in Redis via Upstash
- **Regional convergence scoring** — when multiple signal types spike in the same geographic area, the system identifies convergence zones and escalates severity

### Story Sharing & Social Export
- **Shareable intelligence stories** — generate country-level intelligence briefs with CII scores, threat counts, theater posture, and related prediction markets
- **Multi-platform export** — custom-formatted sharing for Twitter/X, LinkedIn, WhatsApp, Telegram, Reddit, and Facebook with platform-appropriate formatting
- **Deep links** — every story generates a unique URL (`/story?c=<country>&t=<type>`) with dynamic Open Graph meta tags for rich social previews
- **Canvas-based image generation** — stories render as PNG images for visual sharing, with QR codes linking back to the live dashboard

### Desktop Application (Tauri)
- **Native desktop app** for macOS and Windows — packages the full dashboard with a local Node.js sidecar that runs all 45+ API handlers locally
- **OS keychain integration** — API keys stored in the system credential manager (macOS Keychain, Windows Credential Manager), never in plaintext files
- **Token-authenticated sidecar** — a unique session token prevents other local processes from accessing the sidecar on localhost. Generated per launch using randomized hashing
- **Cloud fallback** — when a local API handler fails or is missing, requests transparently fall through to the cloud deployment (worldmonitor.app) with origin headers stripped
- **Settings window** — dedicated configuration UI (Cmd+,) for managing 15 API keys with validation, signup links, and feature-availability indicators
- **Verbose debug mode** — toggle traffic logging with persistent state across restarts. View the last 200 requests with timing, status codes, and error details
- **DevTools toggle** — Cmd+Alt+I opens the embedded web inspector for debugging

### Progressive Web App
- **Installable** — the dashboard can be installed to the home screen on mobile or as a standalone desktop app via Chrome's install prompt. Full-screen `standalone` display mode with custom theme color
- **Offline map support** — MapTiler tiles are cached using a CacheFirst strategy (up to 500 tiles, 30-day TTL), enabling map browsing without a network connection
- **Smart caching strategies** — APIs and RSS feeds use NetworkOnly (real-time data must always be fresh), while fonts (1-year TTL), images (7-day StaleWhileRevalidate), and static assets (1-year immutable) are aggressively cached
- **Auto-updating service worker** — checks for new versions every 60 minutes. Tauri desktop builds skip service worker registration entirely (uses native APIs instead)
- **Offline fallback** — a branded fallback page with retry button is served when the network is unavailable

### Additional Capabilities
- Signal intelligence with "Why It Matters" context
- Infrastructure cascade analysis with proximity correlation
- Maritime & aviation tracking with surge detection
- Prediction market integration (Polymarket) with 3-tier JA3 bypass (browser-direct → Tauri native TLS → cloud proxy)
- Service status monitoring (cloud providers, AI services)
- Shareable map state via URL parameters (view, zoom, coordinates, time range, active layers)
- Data freshness monitoring across 14 data sources with explicit intelligence gap reporting
- Per-feed circuit breakers with 5-minute cooldowns to prevent cascading failures
- Browser-side ML worker (Transformers.js) for NER and sentiment analysis without server dependency
- **Cmd+K search** — fuzzy search across 20+ result types: news headlines, countries, hotspots, markets, military bases, cables, pipelines, datacenters, nuclear facilities, tech companies, and more
- **Historical playback** — dashboard snapshots are stored in IndexedDB. A time slider allows rewinding to any saved state, with live updates paused during playback
- **Mobile detection** — screens below 768px receive a warning modal since the dashboard is designed for multi-panel desktop use
- **UCDP conflict classification** — countries with active wars (1,000+ battle deaths/year) receive automatic CII floor scores, preventing optimistic drift
- **HAPI humanitarian data** — UN OCHA humanitarian access metrics feed into country-level instability scoring
- **Idle-aware resource management** — animations pause after 2 minutes of inactivity and when the tab is hidden, preventing battery drain. Video streams are destroyed from the DOM and recreated on return

---

## Regression Testing

Map overlay behavior is validated in Playwright using the map harness (`/map-harness.html`).

- Cluster-state cache initialization guard:
  - `updates protest marker click payload after data refresh`
  - `initializes cluster movement cache on first protest cluster render`
- Run by variant:
  - `npm run test:e2e:full -- -g "updates protest marker click payload after data refresh|initializes cluster movement cache on first protest cluster render"`
  - `npm run test:e2e:tech -- -g "updates protest marker click payload after data refresh|initializes cluster movement cache on first protest cluster render"`

---

## How It Works

### Threat Classification Pipeline

Every news item passes through a two-stage classification pipeline:

1. **Keyword classifier** (instant) — pattern-matches against ~120 threat keywords organized by severity tier (critical → high → medium → low → info) and category (conflict, terrorism, cyber, disaster, etc.). Returns immediately with a confidence score.
2. **LLM classifier** (async) — fires in the background via a Vercel Edge Function calling Groq's Llama 3.1 8B at temperature 0. Results are cached in Redis (24h TTL) keyed by headline hash. When the LLM result arrives, it overrides the keyword result only if its confidence is higher.

This hybrid approach means the UI is never blocked waiting for AI — users see keyword results instantly, with LLM refinements arriving within seconds and persisting for all subsequent visitors.

### Country Instability Index (CII)

Each monitored country receives a real-time instability score (0–100) computed from:

| Component | Weight | Details |
|-----------|--------|---------|
| **Baseline risk** | 40% | Pre-configured per country reflecting structural fragility |
| **Unrest events** | 20% | Protests scored logarithmically for democracies (routine protests don't trigger), linearly for authoritarian states (every protest is significant). Boosted for fatalities and internet outages |
| **Security activity** | 20% | Military flights (3pts) + vessels (5pts) from own forces + foreign military presence (doubled weight) |
| **Information velocity** | 20% | News mention frequency weighted by event severity multiplier, log-scaled for high-volume countries |

Additional boosts apply for hotspot proximity, focal point urgency, and conflict-zone floors (e.g., Ukraine is pinned at ≥55, Syria at ≥50).

### Hotspot Escalation Scoring

Intelligence hotspots receive dynamic escalation scores blending four normalized signals (0–100):

- **News activity** (35%) — article count and severity in the hotspot's area
- **Country instability** (25%) — CII score of the host country
- **Geo-convergence alerts** (25%) — spatial binning detects 3+ event types (protests + military + earthquakes) co-occurring within 1° lat/lon cells
- **Military activity** (15%) — vessel clusters and flight density near the hotspot

The system blends static baseline risk (40%) with detected events (60%) and tracks trends via linear regression on 48-hour history. Signal emissions cool down for 2 hours to prevent alert fatigue.

### Geographic Convergence Detection

Events (protests, military flights, vessels, earthquakes) are binned into 1°×1° geographic cells within a 24-hour window. When 3+ distinct event types converge in one cell, a convergence alert fires. Scoring is based on type diversity (×25pts per unique type) plus event count bonuses (×2pts). Alerts are reverse-geocoded to human-readable names using conflict zones, waterways, and hotspot databases.

### Strategic Theater Posture Assessment

Nine operational theaters are continuously assessed for military posture escalation:

| Theater | Key Trigger |
|---------|-------------|
| Iran / Persian Gulf | Carrier groups, tanker activity, AWACS |
| Taiwan Strait | PLAAF sorties, USN carrier presence |
| Baltic / Kaliningrad | Russian Western Military District flights |
| Korean Peninsula | B-52/B-1 deployments, DPRK missile activity |
| Eastern Mediterranean | Multi-national naval exercises |
| Horn of Africa | Anti-piracy patrols, drone activity |
| South China Sea | Freedom of navigation operations |
| Arctic | Long-range aviation patrols |
| Black Sea | ISR flights, naval movements |

Posture levels escalate from NORMAL → ELEVATED → CRITICAL based on a composite of:
- **Aircraft count** in theater (both resident and transient)
- **Strike capability** — the presence of tankers + AWACS + fighters together indicates strike packaging, not routine training
- **Naval presence** — carrier groups and combatant formations
- **Country instability** — high CII scores for theater-adjacent countries amplify posture

Each theater is linked to 38+ military bases, enabling automatic correlation between observed flights and known operating locations.

### Military Surge & Foreign Presence Detection

The system monitors five operational theaters (Middle East, Eastern Europe, Western Europe, Western Pacific, Horn of Africa) with 38+ associated military bases. It classifies vessel clusters near hotspots by activity type:

- **Deployment** — carrier present with 5+ vessels
- **Exercise** — combatants present in formation
- **Transit** — vessels passing through

Foreign military presence is dual-credited: the operator's country is flagged for force projection, and the host location's country is flagged for foreign military threat. AIS gaps (dark ships) are flagged as potential signal discipline indicators.

### Infrastructure Cascade Modeling

Beyond proximity correlation, the system models how disruptions propagate through interconnected infrastructure. A dependency graph connects undersea cables, pipelines, ports, chokepoints, and countries with weighted edges representing capacity dependencies:

```
Disruption Event → Affected Node → Cascade Propagation (BFS, depth ≤ 3)
                                          │
                    ┌─────────────────────┤
                    ▼                     ▼
            Direct Impact         Indirect Impact
         (e.g., cable cut)    (countries served by cable)
```

**Impact calculation**: `strength = edge_weight × disruption_level × (1 − redundancy)`

Strategic chokepoint modeling captures real-world dependencies:
- **Strait of Hormuz** — 80% of Japan's oil, 70% of South Korea's, 60% of India's, 40% of China's
- **Suez Canal** — EU-Asia trade routes (Germany, Italy, UK, China)
- **Malacca Strait** — 80% of China's oil transit

Ports are weighted by type: oil/LNG terminals (0.9 — critical), container ports (0.7), naval bases (0.4 — geopolitical but less economic). This enables questions like "if the Strait of Hormuz closes, which countries face energy shortages within 30 days?"

### Related Assets & Proximity Correlation

When a news event is geo-located, the system automatically identifies critical infrastructure within a 600km radius — pipelines, undersea cables, data centers, military bases, and nuclear facilities — ranked by distance. This enables instant geopolitical context: a cable cut near a strategic chokepoint, a protest near a nuclear facility, or troop movements near a data center cluster.

### News Geo-Location

A 74-hub strategic location database infers geography from headlines via keyword matching. Hubs span capitals, conflict zones, strategic chokepoints (Strait of Hormuz, Suez Canal, Malacca Strait), and international organizations. Confidence scoring is boosted for critical-tier hubs and active conflict zones, enabling map-driven news placement without requiring explicit location metadata from RSS feeds.

### Temporal Baseline Anomaly Detection

Rather than relying on static thresholds, the system learns what "normal" looks like and flags deviations. Each event type (military flights, naval vessels, protests, news velocity, AIS gaps, satellite fires) is tracked per region with separate baselines for each weekday and month — because military activity patterns differ on Tuesdays vs. weekends, and January vs. July.

The algorithm uses **Welford's online method** for numerically stable streaming computation of mean and variance, stored in Redis with a 90-day rolling window. When a new observation arrives, its z-score is computed against the learned baseline. Thresholds:

| Z-Score | Severity | Example |
|---------|----------|---------|
| ≥ 1.5 | Low | Slightly elevated protest activity |
| ≥ 2.0 | Medium | Unusual naval presence |
| ≥ 3.0 | High/Critical | Military flights 3x above baseline |

A minimum of 10 historical samples is required before anomalies are reported, preventing false positives during the learning phase. Anomalies are ingested back into the signal aggregator, where they compound with other signals for convergence detection.

### Natural Disaster Monitoring

Three independent sources are merged into a unified disaster picture, then deduplicated on a 0.1° geographic grid:
=======
  <a href="https://worldmonitor.app"><img src="https://img.shields.io/badge/Web_App-worldmonitor.app-blue?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Web App"></a>&nbsp;
  <a href="https://tech.worldmonitor.app"><img src="https://img.shields.io/badge/Tech_Variant-tech.worldmonitor.app-0891b2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Tech Variant"></a>&nbsp;
  <a href="https://finance.worldmonitor.app"><img src="https://img.shields.io/badge/Finance_Variant-finance.worldmonitor.app-059669?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Finance Variant"></a>&nbsp;
  <a href="https://happy.worldmonitor.app"><img src="https://img.shields.io/badge/Happy_Variant-happy.worldmonitor.app-f59e0b?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Happy Variant"></a>
</p>

<p align="center">
  <a href="https://worldmonitor.app/api/download?platform=windows-exe"><img src="https://img.shields.io/badge/Download-Windows_(.exe)-0078D4?style=for-the-badge&logo=windows&logoColor=white" alt="Download Windows"></a>&nbsp;
  <a href="https://worldmonitor.app/api/download?platform=macos-arm64"><img src="https://img.shields.io/badge/Download-macOS_Apple_Silicon-000000?style=for-the-badge&logo=apple&logoColor=white" alt="Download macOS ARM"></a>&nbsp;
  <a href="https://worldmonitor.app/api/download?platform=macos-x64"><img src="https://img.shields.io/badge/Download-macOS_Intel-555555?style=for-the-badge&logo=apple&logoColor=white" alt="Download macOS Intel"></a>&nbsp;
  <a href="https://worldmonitor.app/api/download?platform=linux-appimage"><img src="https://img.shields.io/badge/Download-Linux_(.AppImage)-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Download Linux"></a>
</p>

<p align="center">
  <a href="./docs/DOCUMENTATION.md"><strong>Full Documentation</strong></a> &nbsp;·&nbsp;
  <a href="https://github.com/koala73/worldmonitor/releases/latest"><strong>All Releases</strong></a>
</p>

![World Monitor Dashboard](new-world-monitor.png)

---

## Why World Monitor?

| Problem                            | Solution                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| News scattered across 100+ sources | **Single unified dashboard** with 435+ curated feeds across 15 categories                                  |
| No geospatial context for events   | **Interactive map** with 45 toggleable data layers and CII country risk heatmap                             |
| Information overload               | **AI-synthesized briefs** with focal point detection and local LLM support                                 |
| Crypto/macro signal noise          | **7-signal market radar** with composite BUY/CASH verdict                                                  |
| Expensive OSINT tools ($$$)        | **100% free & open source**                                                                                |
| Static news feeds                  | **Real-time updates** with live video streams and AI-powered deductions                                    |
| Cloud-dependent AI tools           | **Run AI locally** with Ollama/LM Studio — no API keys, no data leaves your machine. Opt-in **Headline Memory** builds a local semantic index of every headline for RAG-powered queries |
| Web-only dashboards                | **Native desktop app** (Tauri) for macOS, Windows, and Linux + installable PWA with offline map support    |
| Flat 2D maps                       | **Dual map engine** — photorealistic 3D globe (globe.gl + Three.js) and WebGL flat map (deck.gl) with 45 toggleable data layers, runtime-switchable |
| English-only OSINT tools           | **21 languages** with native-language RSS feeds, AI-translated summaries, and RTL support for Arabic       |
| Siloed financial data              | **Finance variant** with 92 stock exchanges, 19 financial centers, 13 central banks, BIS data, WTO trade policy, and Gulf FDI tracking |
| Undocumented, fragile APIs         | **Proto-first API contracts** — 22 typed services with auto-generated clients, servers, and OpenAPI docs   |

---

## Live Demos

| Variant             | URL                                                          | Focus                                            |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| **World Monitor**   | [worldmonitor.app](https://worldmonitor.app)                 | Geopolitics, military, conflicts, infrastructure |
| **Tech Monitor**    | [tech.worldmonitor.app](https://tech.worldmonitor.app)       | Startups, AI/ML, cloud, cybersecurity            |
| **Finance Monitor** | [finance.worldmonitor.app](https://finance.worldmonitor.app) | Global markets, trading, central banks, Gulf FDI |
| **Happy Monitor**   | [happy.worldmonitor.app](https://happy.worldmonitor.app)     | Good news, positive trends, uplifting stories    |

All four variants run from a single codebase — switch between them with one click via the header bar.

---

## Key Features

### Maps & Visualization
- **Dual Map Engine** — 3D globe (globe.gl + Three.js) and WebGL flat map (deck.gl), runtime-switchable with 45 shared data layers. [Details →](./docs/MAP_ENGINE.md)
- **45 toggleable data layers** — conflicts, bases, cables, pipelines, flights, vessels, protests, fires, earthquakes, datacenters, and more across all variants
- **8 regional presets** — Global, Americas, Europe, MENA, Asia, Africa, Oceania, Latin America with time filtering (1h–7d)
- **CII choropleth heatmap** — five-stop color gradient paints every country by instability score on both map engines
- **URL state sharing** — map center, zoom, active layers, and time range encoded in shareable URLs

### AI & Intelligence
- **World Brief** — LLM-synthesized summary with 4-tier fallback: Ollama (local) → Groq → OpenRouter → browser T5. [Details →](./docs/AI_INTELLIGENCE.md)
- **AI Deduction & Forecasting** — free-text geopolitical analysis grounded in live headlines. [Details →](./docs/AI_INTELLIGENCE.md#ai-deduction--forecasting)
- **Headline Memory (RAG)** — opt-in browser-local semantic index using ONNX embeddings in IndexedDB. [Details →](./docs/AI_INTELLIGENCE.md#client-side-headline-memory-rag)
- **Threat Classification** — instant keyword classifier with async ML and LLM override. [Details →](./docs/AI_INTELLIGENCE.md#threat-classification-pipeline)
- **Country Brief Pages** — full-page intelligence dossiers with CII scores, AI analysis, timelines, and prediction markets. [Details →](./docs/AI_INTELLIGENCE.md#country-brief-pages)

### Data Layers

<details>
<summary><strong>Geopolitical</strong> — conflicts, hotspots, protests, disasters, sanctions, cyber IOCs, GPS jamming, Iran events</summary>

[Full details →](./docs/DATA_SOURCES.md#data-layers)
</details>

<details>
<summary><strong>Military & Strategic</strong> — 210+ bases, live flights (ADS-B), naval vessels (AIS), nuclear facilities, spaceports</summary>

[Full details →](./docs/DATA_SOURCES.md#data-layers)
</details>

<details>
<summary><strong>Infrastructure</strong> — undersea cables, pipelines, 111 AI datacenters, 83 strategic ports, 107 airports, trade routes</summary>

[Full details →](./docs/DATA_SOURCES.md#data-layers)
</details>

<details>
<summary><strong>Market & Crypto</strong> — 7-signal macro radar, market watchlist, Gulf economies, crypto, prediction markets, stablecoins, ETF flows</summary>

[Full details →](./docs/DATA_SOURCES.md#data-layers)
</details>

<details>
<summary><strong>Tech Ecosystem</strong> — company HQs, startup hubs, cloud regions, accelerators, conferences</summary>

[Full details →](./docs/DATA_SOURCES.md#data-layers)
</details>

<details>
<summary><strong>Finance & Markets</strong> — 92 stock exchanges, 19 financial centers, 13 central banks, BIS data, WTO trade policy, Gulf FDI</summary>

[Full details →](./docs/FINANCE_DATA.md)
</details>

### Live News & Video
- **435+ RSS feeds** across geopolitics, defense, energy, tech, and finance with server-side aggregation (95% fewer edge invocations). [Details →](./docs/DATA_SOURCES.md#server-side-aggregation)
- **30+ live video streams** — Bloomberg, Sky News, Al Jazeera, and more with HLS native streaming, idle-aware playback, and fullscreen mode
- **22 live webcams** — geopolitical hotspot streams across 5 regions with Iran/Attacks dedicated tab
- **Custom keyword monitors** — user-defined alerts with word-boundary matching and auto-coloring

### Scoring & Detection
- **Country Instability Index (CII)** — real-time stability scores using weighted multi-signal blend across 23 tier-1 nations + universal scoring for all countries. [Details →](./docs/ALGORITHMS.md#country-instability-index-cii)
- **Hotspot Escalation** — dynamic scoring blending news activity, CII, geo-convergence, and military signals. [Details →](./docs/ALGORITHMS.md#hotspot-escalation-scoring)
- **Strategic Risk Score** — composite geopolitical risk from convergence, CII, infrastructure, theater, and breaking news. [Details →](./docs/ALGORITHMS.md#strategic-risk-score-algorithm)
- **Signal Aggregation** — multi-source fusion with temporal baseline anomaly detection (Welford's algorithm). [Details →](./docs/ALGORITHMS.md#signal-aggregation)
- **Cross-Stream Correlation** — 14 signal types detecting patterns across news, markets, military, and predictions. [Details →](./docs/ALGORITHMS.md#cross-stream-correlation-engine)

### Finance & Markets
- **Macro Signal Analysis** — 7-signal market radar with composite BUY/CASH verdict. [Details →](./docs/FINANCE_DATA.md#macro-signal-analysis-market-radar)
- **Gulf FDI** — 64 Saudi/UAE investments plotted globally. [Details →](./docs/FINANCE_DATA.md#gulf-fdi-investment-database)
- **Stablecoin & BTC ETF** — peg health monitoring and spot ETF flow tracking. [Details →](./docs/FINANCE_DATA.md)
- **Oil & Energy** — WTI/Brent prices, production, inventory via EIA. [Details →](./docs/FINANCE_DATA.md#oil--energy-analytics)
- **BIS & WTO** — central bank rates, trade policy intelligence. [Details →](./docs/FINANCE_DATA.md)

### Desktop & Mobile
- **Native desktop app** (Tauri) — macOS, Windows, Linux with OS keychain, local sidecar, and cloud fallback. [Details →](./docs/DESKTOP_APP.md)
- **Progressive Web App** — installable with offline map support (CacheFirst tiles, 500-tile cap)
- **Mobile-optimized map** — touch pan with inertia, pinch-to-zoom, bottom-sheet popups, GPS centering
- **Responsive layout** — ultra-wide L-shaped layout on 2000px+, collapsible panels, mobile search sheet

### Platform Features
- **21 languages** — lazy-loaded bundles with native-language RSS feeds, AI translation, and RTL support
- **Cmd+K command palette** — fuzzy search across 24 result types, layer presets, ~250 country commands
- **Proto-first API contracts** — 92 proto files, 22 services, auto-generated TypeScript + OpenAPI docs
- **Dark/light theme** — persistent toggle with 20+ semantic color variables
- **Story sharing** — intelligence briefs exportable to Twitter/X, LinkedIn, WhatsApp, Telegram, Reddit with OG images

---

## How It Works

### AI & Analysis Pipeline

**AI Summarization** — 4-tier provider chain (Ollama → Groq → OpenRouter → browser T5) with headline deduplication, variant-aware prompting, and Redis caching (24h TTL). [Details →](./docs/AI_INTELLIGENCE.md#ai-summarization-chain)

**AI Deduction** — interactive geopolitical forecasting grounded in 15 most recent headlines, cached 1 hour by query hash. [Details →](./docs/AI_INTELLIGENCE.md#ai-deduction--forecasting)

**Headline Memory** — opt-in ONNX-powered RAG system storing 5,000 headline vectors in IndexedDB for semantic search. [Details →](./docs/AI_INTELLIGENCE.md#client-side-headline-memory-rag)

**Threat Classification** — three-stage pipeline: instant keyword → browser ML → batched LLM, each improving confidence. [Details →](./docs/AI_INTELLIGENCE.md#threat-classification-pipeline)

**Browser-Side ML** — Transformers.js runs NER, sentiment, and embeddings entirely in the browser via Web Workers. [Details →](./docs/AI_INTELLIGENCE.md#browser-side-ml-pipeline)

### Scoring Algorithms

**Country Instability Index** — 0–100 score from baseline risk (40%), unrest (20%), security (20%), and information velocity (20%), with conflict-zone floors and travel advisory boosts. [Details →](./docs/ALGORITHMS.md#country-instability-index-cii)

**Hotspot Escalation** — blends news (35%), CII (25%), geo-convergence (25%), and military (15%) with 48-hour trend regression. [Details →](./docs/ALGORITHMS.md#hotspot-escalation-scoring)

**Strategic Theater Posture** — 9 operational theaters assessed for NORMAL → ELEVATED → CRITICAL based on aircraft, strike capability, naval presence, and regional CII. [Details →](./docs/ALGORITHMS.md#strategic-theater-posture-assessment)

**Geographic Convergence** — 1°×1° spatial binning detects 3+ event types co-occurring within 24 hours. [Details →](./docs/ALGORITHMS.md#geographic-convergence-detection)

**Trending Keywords** — 2-hour rolling window vs 7-day baseline flags surging terms with CVE/APT extraction. [Details →](./docs/ALGORITHMS.md#trending-keyword-spike-detection)

### Data Collection

**435+ RSS feeds** with 4-tier source credibility, server-side aggregation, and per-feed circuit breakers. [Details →](./docs/DATA_SOURCES.md)

**Military tracking** — ADS-B flights, AIS vessels, USNI fleet reports, Wingbits aircraft enrichment. [Details →](./docs/DATA_SOURCES.md#intelligence-feeds)

**Telegram OSINT** — 26 channels via MTProto with dedup and topic classification. [Details →](./docs/DATA_SOURCES.md#telegram-osint-intelligence-feed)

**OREF rocket alerts** — Israel Home Front Command sirens via residential proxy. [Details →](./docs/DATA_SOURCES.md#oref-rocket-alert-integration)

**Prediction markets** — Polymarket contracts with 4-tier fetch and country matching. [Details →](./docs/DATA_SOURCES.md#prediction-markets)

### Architecture Overview

**Vanilla TypeScript** — no framework, direct DOM manipulation, custom Panel/VirtualList classes. The entire app shell weighs less than React's runtime. [Details →](./docs/ARCHITECTURE.md)

**Proto-first APIs** — 22 typed service domains with auto-generated clients, servers, and OpenAPI docs. [Details →](./docs/ARCHITECTURE.md#proto-first-api-contracts)

**Edge functions** — 60+ Vercel Edge Functions split into per-domain thin entry points (~85% cold-start reduction). [Details →](./docs/ARCHITECTURE.md#edge-functions--deployment)

**3-tier caching** — in-memory → Redis → upstream with cache stampede prevention and stale-on-error fallback. [Details →](./docs/ARCHITECTURE.md#bandwidth--caching)

**Bootstrap hydration** — 15 Redis keys pre-fetched in a single pipeline call for sub-second first render. [Details →](./docs/ARCHITECTURE.md#bootstrap-hydration)

**SmartPollLoop** — adaptive refresh with exponential backoff, hidden-tab throttle, and circuit breaker integration. [Details →](./docs/ARCHITECTURE.md#smartpollloop--adaptive-data-refresh)

---

## Tri-Variant Architecture

A single codebase produces four specialized dashboards, each with distinct feeds, panels, map layers, and branding:

| Aspect                | World Monitor                                        | Tech Monitor                                    | Finance Monitor                                  | Happy Monitor                                         |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| **Domain**            | worldmonitor.app                                     | tech.worldmonitor.app                           | finance.worldmonitor.app                         | happy.worldmonitor.app                                |
| **Focus**             | Geopolitics, military, conflicts                     | AI/ML, startups, cybersecurity                  | Markets, trading, central banks                  | Good news, conservation, human progress               |
| **RSS Feeds**         | 15 categories, 200+ feeds (politics, MENA, Africa, think tanks) | 21 categories, 152 feeds (AI, VC blogs, startups, GitHub) | 14 categories, 55 feeds (forex, bonds, commodities, IPOs) | 5 categories, 21 positive-news sources (GNN, Positive.News, Upworthy) |
| **Panels**            | 45 (strategic posture, CII, cascade, trade policy, airline intel, predictions) | 28 (AI labs, unicorns, accelerators, tech readiness) | 27 (forex, bonds, derivatives, trade policy, gulf economies) | 10 (good news, breakthroughs, conservation, renewables, giving) |
| **Unique Map Layers** | Military bases, nuclear facilities, hotspots         | Tech HQs, cloud regions, startup hubs           | Stock exchanges, central banks, Gulf investments | Positive events, kindness, species recovery, renewables |
| **Desktop App**       | World Monitor.app / .exe / .AppImage                 | Tech Monitor.app / .exe / .AppImage             | Finance Monitor.app / .exe / .AppImage           | (web-only)                                            |

Single-deployment consolidation — all four variants serve from one Vercel deployment, determined by hostname. Build-time `VITE_VARIANT` tree-shakes unused data. Runtime variant selector in the header bar.

---

## Programmatic API Access

Every data endpoint is accessible programmatically via `api.worldmonitor.app`. The API uses the same edge functions that power the dashboard, with the same caching and rate limiting:

```bash
# Fetch market quotes
curl -s 'https://api.worldmonitor.app/api/market/v1/list-market-quotes?symbols=AAPL,MSFT,GOOGL'

# Get airport delays
curl -s 'https://api.worldmonitor.app/api/aviation/v1/list-airport-delays'

# Fetch climate anomalies
curl -s 'https://api.worldmonitor.app/api/climate/v1/list-climate-anomalies'

# Get earthquake data
curl -s 'https://api.worldmonitor.app/api/seismology/v1/list-earthquakes'

# Company enrichment (GitHub, SEC filings, HN mentions)
curl -s 'https://api.worldmonitor.app/api/enrichment/company?domain=stripe.com'

# Company signal discovery (funding, hiring, exec changes)
curl -s 'https://api.worldmonitor.app/api/enrichment/signals?company=Stripe&domain=stripe.com'
```

All 22 service domains are available as REST endpoints following the pattern `POST /api/{domain}/v1/{rpc-name}`. GET requests with query parameters are supported for read-only RPCs. Responses include `X-Cache` headers (`HIT`, `REDIS-HIT`, `MISS`) for cache debugging and `Cache-Control` headers for CDN integration.

> **Note**: Use `api.worldmonitor.app`, not `worldmonitor.app` — the main domain requires browser origin headers and returns 403 for programmatic access.
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

| Source | Coverage | Types | Update Frequency |
|--------|----------|-------|------------------|
| **USGS** | Global earthquakes M4.5+ | Earthquakes | 5 minutes |
| **GDACS** | UN-coordinated disaster alerts | Earthquakes, floods, cyclones, volcanoes, wildfires, droughts | Real-time |
| **NASA EONET** | Earth observation events | 13 natural event categories (30-day open events) | Real-time |

<<<<<<< HEAD
GDACS events carry color-coded alert levels (Red = critical, Orange = high) and are filtered to exclude low-severity Green alerts. EONET wildfires are filtered to events within 48 hours to prevent stale data. Earthquakes from EONET are excluded since USGS provides higher-quality seismological data.

The merged output feeds into the signal aggregator for geographic convergence detection — e.g., an earthquake near a pipeline triggers an infrastructure cascade alert.

### Dual-Source Protest Tracking

Protest data is sourced from two independent providers to reduce single-source bias:

1. **ACLED** (Armed Conflict Location & Event Data) — 30-day window, tokenized API with Redis caching (10-minute TTL). Covers protests, riots, strikes, and demonstrations with actor attribution and fatality counts.
2. **GDELT** (Global Database of Events, Language, and Tone) — 7-day geospatial event feed filtered to protest keywords. Events with mention count ≥5 are included; those above 30 are marked as `validated`.

Events from both sources are **Haversine-deduplicated** on a 0.5° grid (~50km) with same-day matching. ACLED events take priority due to higher editorial confidence. Severity is classified as:
- **High** — fatalities present or riot/clash keywords
- **Medium** — standard protest/demonstration
- **Low** — default

Protest scoring is regime-aware: democratic countries use logarithmic scaling (routine protests don't trigger instability), while authoritarian states use linear scoring (every protest is significant). Fatalities and concurrent internet outages apply severity boosts.

### Browser-Side ML Pipeline

The dashboard runs a full ML pipeline in the browser via Transformers.js, with no server dependency for core intelligence. This is automatically disabled on mobile devices to conserve memory.

| Capability | Model | Use |
|-----------|-------|-----|
| **Text embeddings** | sentence-similarity | Semantic clustering of news headlines |
| **Sequence classification** | threat-classifier | Threat severity and category detection |
| **Summarization** | T5-small | Fallback when Groq and OpenRouter are unavailable |
| **Named Entity Recognition** | NER pipeline | Country, organization, and leader extraction |

**Hybrid clustering** combines fast Jaccard similarity (n-gram overlap, threshold 0.4) with ML-refined semantic similarity (cosine similarity, threshold 0.78). Jaccard runs instantly on every refresh; semantic refinement runs when the ML worker is loaded and merges clusters that are textually different but semantically identical (e.g., "NATO expands missile shield" and "Alliance deploys new air defense systems").

News velocity is tracked per cluster — when multiple Tier 1–2 sources converge on the same story within a short window, the cluster is flagged as a breaking alert with `sourcesPerHour` as the velocity metric.

### Signal Aggregation

All real-time data sources feed into a central signal aggregator that builds a unified geospatial intelligence picture. Signals are clustered by country and region, with each signal carrying a severity (low/medium/high), geographic coordinates, and metadata. The aggregator:

1. **Clusters by country** — groups signals from diverse sources (flights, vessels, protests, fires, outages) into per-country profiles
2. **Detects regional convergence** — identifies when multiple signal types spike in the same geographic corridor (e.g., military flights + protests + satellite fires in Eastern Mediterranean)
3. **Feeds downstream analysis** — the CII, hotspot escalation, focal point detection, and AI insights modules all consume the aggregated signal picture rather than raw data

### Data Freshness & Intelligence Gaps

A singleton tracker monitors 14 data sources (GDELT, RSS, AIS, military flights, earthquakes, weather, outages, ACLED, Polymarket, economic indicators, NASA FIRMS, and more) with status categorization: fresh (<15 min), stale (1h), very_stale (6h), no_data, error, disabled. It explicitly reports **intelligence gaps** — what analysts can't see — preventing false confidence when critical data sources are down or degraded.

### Prediction Markets as Leading Indicators

Polymarket geopolitical markets are queried using tag-based filters (Ukraine, Iran, China, Taiwan, etc.) with 5-minute caching. Market probability shifts are correlated with news volume: if a prediction market moves significantly before matching news arrives, this is flagged as a potential early-warning signal.

**Cloudflare JA3 bypass** — Polymarket's API is protected by Cloudflare TLS fingerprinting (JA3) that blocks all server-side requests. The system uses a 3-tier fallback:

| Tier | Method | When It Works |
|------|--------|---------------|
| **1** | Browser-direct fetch | Always (browser TLS passes Cloudflare) |
| **2** | Tauri native TLS (reqwest) | Desktop app (Rust TLS fingerprint differs from Node.js) |
| **3** | Vercel edge proxy | Rarely (edge runtime sometimes passes) |

Once browser-direct succeeds, the system caches this state and skips fallback tiers on subsequent requests. Country-specific markets are fetched by mapping countries to Polymarket tags with name-variant matching (e.g., "Russia" matches titles containing "Russian", "Moscow", "Kremlin", "Putin").

Markets are filtered to exclude sports and entertainment (100+ exclusion keywords), require meaningful price divergence from 50% or volume above $50K, and are ranked by trading volume. Each variant gets different tag sets — geopolitical focus queries politics/world/ukraine/middle-east tags, while tech focus queries ai/crypto/business tags.

### Macro Signal Analysis (Market Radar)

The Market Radar panel computes a composite BUY/CASH verdict from 7 independent signals sourced entirely from free APIs (Yahoo Finance, mempool.space, alternative.me):

| Signal | Computation | Bullish When |
|--------|------------|--------------|
| **Liquidity** | JPY/USD 30-day rate of change | ROC > -2% (no yen squeeze) |
| **Flow Structure** | BTC 5-day return vs QQQ 5-day return | Gap < 5% (aligned) |
| **Macro Regime** | QQQ 20-day ROC vs XLP 20-day ROC | QQQ outperforming (risk-on) |
| **Technical Trend** | BTC vs SMA50 + 30-day VWAP | Above both (bullish) |
| **Hash Rate** | Bitcoin mining hashrate 30-day change | Growing > 3% |
| **Mining Cost** | BTC price vs hashrate-implied cost | Price > $60K (profitable) |
| **Fear & Greed** | alternative.me sentiment index | Value > 50 |

The overall verdict requires ≥57% of known signals to be bullish (BUY), otherwise CASH. Signals with unknown data are excluded from the denominator.

**VWAP Calculation** — Volume-Weighted Average Price is computed from aligned price/volume pairs over a 30-day window. Pairs where either price or volume is null are excluded together to prevent index misalignment:

```
VWAP = Σ(price × volume) / Σ(volume)    for last 30 trading days
```

The **Mayer Multiple** (BTC price / SMA200) provides a long-term valuation context — historically, values above 2.4 indicate overheating, while values below 0.8 suggest deep undervaluation.

### Stablecoin Peg Monitoring

Five major stablecoins (USDT, USDC, DAI, FDUSD, USDe) are monitored via the CoinGecko API with 2-minute caching. Each coin's deviation from the $1.00 peg determines its health status:

| Deviation | Status | Indicator |
|-----------|--------|-----------|
| ≤ 0.5% | ON PEG | Green |
| 0.5% – 1.0% | SLIGHT DEPEG | Yellow |
| > 1.0% | DEPEGGED | Red |

The panel aggregates total stablecoin market cap, 24h volume, and an overall health status (HEALTHY / CAUTION / WARNING). The `coins` query parameter accepts a comma-separated list of CoinGecko IDs, validated against a `[a-z0-9-]+` regex to prevent injection.

### BTC ETF Flow Estimation

Ten spot Bitcoin ETFs are tracked via Yahoo Finance's 5-day chart API (IBIT, FBTC, ARKB, BITB, GBTC, HODL, BRRR, EZBC, BTCO, BTCW). Since ETF flow data requires expensive terminal subscriptions, the system estimates flow direction from publicly available signals:

- **Price change** — daily close vs. previous close determines direction
- **Volume ratio** — current volume / trailing average volume measures conviction
- **Flow magnitude** — `volume × price × direction × 0.1` provides a rough dollar estimate

This is an approximation, not a substitute for official flow data, but it captures the direction and relative magnitude correctly. Results are cached for 15 minutes.

---

## Architecture Principles

| Principle | Implementation |
|-----------|---------------|
| **Speed over perfection** | Keyword classifier is instant; LLM refines asynchronously. Users never wait. |
| **Assume failure** | Per-feed circuit breakers with 5-minute cooldowns. AI fallback chain: Groq → OpenRouter → browser-side T5. Redis cache failures degrade gracefully. Every edge function returns stale cached data when upstream APIs are down. |
| **Show what you can't see** | Intelligence gap tracker explicitly reports data source outages rather than silently hiding them. |
| **Browser-first compute** | Analysis (clustering, instability scoring, surge detection) runs client-side — no backend compute dependency for core intelligence. |
| **Multi-signal correlation** | No single data source is trusted alone. Focal points require convergence across news + military + markets + protests before escalating to critical. |
| **Geopolitical grounding** | Hard-coded conflict zones, baseline country risk, and strategic chokepoints prevent statistical noise from generating false alerts in low-data regions. |
| **Defense in depth** | CORS origin allowlist, domain-allowlisted RSS proxy, server-side API key isolation, token-authenticated desktop sidecar, input sanitization with output encoding, IP rate limiting on AI endpoints. |
| **Cache everything, trust nothing** | Three-tier caching (in-memory → Redis → upstream) with versioned cache keys and stale-on-error fallback. Every API response includes `X-Cache` header for debugging. CDN layer (`s-maxage`) absorbs repeated requests before they reach edge functions. |
| **Bandwidth efficiency** | Gzip compression on all relay responses (80% reduction). Content-hash static assets with 1-year immutable cache. Staggered polling intervals prevent synchronized API storms. Animations and polling pause on hidden tabs. |
| **Run anywhere** | Same codebase deploys to Vercel (web), Railway (relay), Tauri (desktop), and PWA (installable). Desktop sidecar mirrors all cloud API handlers locally. Service worker caches map tiles for offline use while keeping intelligence data always-fresh (NetworkOnly). |
=======
## Security Model

| Layer                          | Mechanism                                                                                                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CORS origin allowlist**      | Only `worldmonitor.app`, `tech.worldmonitor.app`, `finance.worldmonitor.app`, and `localhost:*` can call API endpoints. All others receive 403. Implemented in `api/_cors.js`.                                                                     |
| **RSS domain allowlist**       | The RSS proxy only fetches from explicitly listed domains (~90+). Requests for unlisted domains are rejected with 403.                                                                                                                             |
| **Railway domain allowlist**   | The Railway relay has a separate, smaller domain allowlist for feeds that need the alternate origin.                                                                                                                                               |
| **API key isolation**          | All API keys live server-side in Vercel environment variables. The browser never sees Groq, OpenRouter, ACLED, Finnhub, or other credentials.                                                                                                      |
| **Input sanitization**         | User-facing content passes through `escapeHtml()` (prevents XSS) and `sanitizeUrl()` (blocks `javascript:` and `data:` URIs). URLs use `escapeAttr()` for attribute context encoding.                                                              |
| **Query parameter validation** | API endpoints validate input formats (e.g., stablecoin coin IDs must match `[a-z0-9-]+`, bounding box params are numeric).                                                                                                                         |
| **IP rate limiting**           | AI endpoints use Upstash Redis-backed rate limiting to prevent abuse of Groq/OpenRouter quotas.                                                                                                                                                    |
| **Desktop sidecar auth**       | The local API sidecar requires a per-session `Bearer` token generated at launch. The token is stored in Rust state and injected into the sidecar environment — only the Tauri frontend can retrieve it via IPC. Health check endpoints are exempt. |
| **OS keychain storage**        | Desktop API keys are stored in the operating system's credential manager (macOS Keychain, Windows Credential Manager), never in plaintext files or environment variables on disk.                                                                  |
| **SSRF protection**            | Two-phase URL validation: protocol allowlist, private IP rejection, DNS rebinding detection, and TOCTOU-safe address pinning.                                                                                                                     |
| **IPC window hardening**       | All sensitive Tauri IPC commands gate on `require_trusted_window()` with a `TRUSTED_WINDOWS` allowlist.                                                                                                                                            |
| **Bot protection middleware**  | Edge Middleware blocks crawlers from `/api/*` routes. Social preview bots are selectively allowed on `/api/story` and `/api/og-story`.                                                                                                             |

---

## Regression Testing

The test suite includes **30 test files** with **554 individual test cases** across **147 describe blocks**, covering server handlers, caching behavior, data integrity, and map overlays.

**Unit & integration tests** (`npm test`) validate:

| Area | Test Files | Coverage |
| --- | --- | --- |
| **Server handlers** | `server-handlers`, `supply-chain-handlers`, `supply-chain-v2` | All 22 proto service handler imports, route registration, response schemas |
| **Caching** | `redis-caching`, `route-cache-tier`, `flush-stale-refreshes` | Cache key construction, TTL tiers, stale refresh coalescing, stampede prevention |
| **Data integrity** | `bootstrap`, `deploy-config`, `edge-functions` | Bootstrap key sync between `cache-keys.ts` and `bootstrap.js`, all 57 edge function self-containment (no `../server/` imports), version sync across package.json/tauri.conf.json/Cargo.toml |
| **Intelligence** | `military-classification`, `clustering`, `insights-loader`, `summarize-reasoning` | Military confidence scoring, news clustering algorithms, AI brief generation, LLM reasoning chain parsing |
| **Map & geo** | `countries-geojson`, `globe-2d-3d-parity`, `map-locale`, `geo-keyword-matching` | GeoJSON polygon validity, flat/globe layer parity, locale-aware map labels, 217-hub keyword matching |
| **Protocols** | `oref-proxy`, `oref-locations`, `oref-breaking`, `live-news-hls` | OREF alert parsing, 1480 Hebrew→English location translations, HLS stream detection |
| **Circuit breakers** | `hapi-gdelt-circuit-breakers`, `tech-readiness-circuit-breakers`, `smart-poll-loop` | Per-source failure isolation, adaptive backoff, hidden-tab throttling |
| **Data sources** | `gulf-fdi-data`, `ttl-acled-ais-guards`, `urlState` | Gulf FDI coordinate validation, ACLED/AIS TTL guards, URL state encoding/decoding |

**E2E map tests** use Playwright with the map harness (`/tests/map-harness.html`) for overlay behavior validation.

---

## Quick Start

```bash
# Clone and run
git clone https://github.com/koala73/worldmonitor.git
cd worldmonitor
npm install
vercel dev       # Runs frontend + all 60+ API edge functions
```

Open [http://localhost:3000](http://localhost:3000)

> **Note**: `vercel dev` requires the [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`). If you use `npm run dev` instead, only the frontend starts — news feeds and API-dependent panels won't load. See [Self-Hosting](#self-hosting) for details.

### Environment Variables (Optional)

The dashboard works without any API keys — panels for unconfigured services simply won't appear. For full functionality, copy the example file and fill in the keys you need:

```bash
cp .env.example .env.local
```

The `.env.example` file documents every variable with descriptions and registration links, organized by deployment target (Vercel vs Railway). Key groups:

| Group             | Variables                                                                  | Free Tier                                  |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| **AI (Local)**    | `OLLAMA_API_URL`, `OLLAMA_MODEL`                                           | Free (runs on your hardware)               |
| **AI (Cloud)**    | `GROQ_API_KEY`, `OPENROUTER_API_KEY`                                       | 14,400 req/day (Groq), 50/day (OpenRouter) |
| **Cache**         | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                       | 10K commands/day                           |
| **Markets**       | `FINNHUB_API_KEY`, `FRED_API_KEY`, `EIA_API_KEY`                           | All free tier                              |
| **Tracking**      | `WINGBITS_API_KEY`, `AISSTREAM_API_KEY`                                    | Free                                       |
| **Geopolitical**  | `ACLED_ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, `NASA_FIRMS_API_KEY`         | Free for researchers                       |
| **Relay**         | `WS_RELAY_URL`, `VITE_WS_RELAY_URL`, `OPENSKY_CLIENT_ID/SECRET`            | Self-hosted                                |
| **UI**            | `VITE_VARIANT`, `VITE_MAP_INTERACTION_MODE` (`flat` or `3d`, default `3d`) | N/A                                        |
| **Observability** | `VITE_SENTRY_DSN` (optional, empty disables reporting)                     | N/A                                        |

See [`.env.example`](./.env.example) for the complete list with registration links.

---

## Self-Hosting

World Monitor relies on **60+ Vercel Edge Functions** in the `api/` directory for RSS proxying, data caching, and API key isolation. Running `npm run dev` alone starts only the Vite frontend — the edge functions won't execute, and most panels (news feeds, markets, AI summaries) will be empty.

### Option 1: Deploy to Vercel (Recommended)

The simplest path — Vercel runs the edge functions natively on their free tier:
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

```bash
npm install -g vercel
vercel          # Follow prompts to link/create project
```

<<<<<<< HEAD
## Source Credibility & Feed Tiering

Every RSS feed is assigned a source tier reflecting editorial reliability:

| Tier | Description | Examples |
|------|-------------|---------|
| **Tier 1** | Wire services, official government sources | Reuters, AP, BBC, DOD |
| **Tier 2** | Major established outlets | CNN, NYT, The Guardian, Al Jazeera |
| **Tier 3** | Specialized/niche outlets | Defense One, Breaking Defense, The War Zone |
| **Tier 4** | Aggregators and blogs | Google News, individual analyst blogs |

Feeds also carry a **propaganda risk rating** and **state affiliation flag**. State-affiliated sources (RT, Xinhua, IRNA) are included for completeness but visually tagged so analysts can factor in editorial bias. Threat classification confidence is weighted by source tier — a Tier 1 breaking alert carries more weight than a Tier 4 blog post in the focal point detection algorithm.

---

## Edge Function Architecture

World Monitor uses 45+ Vercel Edge Functions as a lightweight API layer. Each edge function handles a single data source concern — proxying, caching, or transforming external APIs. This architecture avoids a monolithic backend while keeping API keys server-side:

- **RSS Proxy** — domain-allowlisted proxy for 100+ feeds, preventing CORS issues and hiding origin servers. Feeds from domains that block Vercel IPs are automatically routed through the Railway relay.
- **AI Pipeline** — Groq and OpenRouter edge functions with Redis deduplication, so identical headlines across concurrent users only trigger one LLM call. The classify-event endpoint pauses its queue on 500 errors to avoid wasting API quota.
- **Data Adapters** — GDELT, ACLED, OpenSky, USGS, NASA FIRMS, FRED, Yahoo Finance, CoinGecko, mempool.space, and others each have dedicated edge functions that normalize responses into consistent schemas
- **Market Intelligence** — macro signals, ETF flows, and stablecoin monitors compute derived analytics server-side (VWAP, SMA, peg deviation, flow estimates) and cache results in Redis
- **Temporal Baseline** — Welford's algorithm state is persisted in Redis across requests, building statistical baselines without a traditional database
- **Custom Scrapers** — sources without RSS feeds (FwdStart, GitHub Trending, tech events) are scraped and transformed into RSS-compatible formats

All edge functions include circuit breaker logic and return cached stale data when upstream APIs are unavailable, ensuring the dashboard never shows blank panels.

---

## Multi-Platform Architecture

World Monitor runs on three platforms that work together:

```
┌─────────────────────────────────────┐
│          Vercel (Edge)              │
│  45+ edge functions · static SPA   │
│  CORS allowlist · Redis cache       │
│  AI pipeline · market analytics     │
│  CDN caching (s-maxage) · PWA host  │
└──────────┬─────────────┬────────────┘
           │             │ fallback
           │             ▼
           │  ┌───────────────────────────────────┐
           │  │     Tauri Desktop (Rust + Node)    │
           │  │  OS keychain · Token-auth sidecar  │
           │  │  45+ local API handlers · gzip     │
           │  │  Cloud fallback · Traffic logging   │
           │  └───────────────────────────────────┘
           │
           │ https:// (server-side)
           │ wss://   (client-side)
           ▼
┌─────────────────────────────────────┐
│       Railway (Relay Server)        │
│  WebSocket relay · OpenSky OAuth2   │
│  RSS proxy for blocked domains      │
│  AIS vessel stream · gzip all resp  │
└─────────────────────────────────────┘
```

**Why two platforms?** Several upstream APIs (OpenSky Network, CNN RSS, UN News, CISA, IAEA) actively block requests from Vercel's IP ranges. The Railway relay server acts as an alternate origin, handling:

- **AIS vessel tracking** — maintains a persistent WebSocket connection to AISStream.io and multiplexes it to all connected browser clients, avoiding per-user connection limits
- **OpenSky aircraft data** — authenticates via OAuth2 client credentials flow (Vercel IPs get 403'd by OpenSky without auth tokens)
- **RSS feeds** — proxies feeds from domains that block Vercel IPs, with a separate domain allowlist for security

The Vercel edge functions connect to Railway via `WS_RELAY_URL` (server-side, HTTPS) while browser clients connect via `VITE_WS_RELAY_URL` (client-side, WSS). This separation keeps the relay URL configurable per deployment without leaking server-side configuration to the browser.

All Railway relay responses are gzip-compressed (zlib `gzipSync`) when the client accepts it and the payload exceeds 1KB, reducing egress by ~80% for JSON and XML responses.

---

## Desktop Application Architecture

The Tauri desktop app wraps the dashboard in a native window with a local Node.js sidecar that runs all API handlers without cloud dependency:

```
┌─────────────────────────────────────────────────┐
│              Tauri (Rust)                        │
│  Window management · OS keychain · Menu bar      │
│  Token generation · Log management               │
│  Polymarket native TLS bridge                    │
└─────────────────────┬───────────────────────────┘
                      │ spawn + env vars
                      ▼
┌─────────────────────────────────────────────────┐
│         Node.js Sidecar (port 46123)            │
│  45+ API handlers · Gzip compression            │
│  Cloud fallback · Traffic logging                │
│  Verbose debug mode · Circuit breakers           │
└─────────────────────┬───────────────────────────┘
                      │ fetch (on local failure)
                      ▼
┌─────────────────────────────────────────────────┐
│         Cloud (worldmonitor.app)                 │
│  Transparent fallback when local handlers fail   │
└─────────────────────────────────────────────────┘
```

### Secret Management

API keys are stored in the operating system's credential manager (macOS Keychain, Windows Credential Manager) — never in plaintext config files. At sidecar launch, all 15 supported secrets are read from the keyring, trimmed, and injected as environment variables. Empty or whitespace-only values are skipped.

Secrets can also be updated at runtime without restarting the sidecar: saving a key in the Settings window triggers a `POST /api/local-env-update` call that hot-patches `process.env` and clears the module cache so handlers pick up the new value immediately.

### Sidecar Authentication

A unique 32-character hex token is generated per app launch using randomized hash state (`RandomState` from Rust's standard library). The token is:
1. Injected into the sidecar as `LOCAL_API_TOKEN`
2. Retrieved by the frontend via the `get_local_api_token` Tauri command (lazy-loaded on first API request)
3. Attached as `Authorization: Bearer <token>` to every local request

The `/api/service-status` health check endpoint is exempt from token validation to support monitoring tools.

### Cloud Fallback

When a local API handler is missing, throws an error, or returns a 5xx status, the sidecar transparently proxies the request to the cloud deployment. Endpoints that fail are marked as `cloudPreferred` — subsequent requests skip the local handler and go directly to the cloud until the sidecar is restarted. Origin and Referer headers are stripped before proxying to maintain server-to-server parity.

### Observability

- **Traffic log** — a ring buffer of the last 200 requests with method, path, status, and duration (ms), accessible via `GET /api/local-traffic-log`
- **Verbose mode** — togglable via `POST /api/local-debug-toggle`, persists across sidecar restarts in `verbose-mode.json`
- **Dual log files** — `desktop.log` captures Rust-side events (startup, secret injection counts, menu actions), while `local-api.log` captures Node.js stdout/stderr
- **DevTools** — `Cmd+Alt+I` toggles the embedded web inspector

---

## Bandwidth Optimization

The system minimizes egress costs through layered caching and compression across all three deployment targets:

### Vercel CDN Headers

Every API edge function includes `Cache-Control` headers that enable Vercel's CDN to serve cached responses without hitting the origin:

| Data Type | `s-maxage` | `stale-while-revalidate` | Rationale |
|-----------|-----------|--------------------------|-----------|
| Classification results | 3600s (1h) | 600s (10min) | Headlines don't reclassify often |
| Country intelligence | 3600s (1h) | 600s (10min) | Briefs change slowly |
| Risk scores | 300s (5min) | 60s (1min) | Near real-time, low latency |
| Market data | 3600s (1h) | 600s (10min) | Intraday granularity sufficient |
| Fire detection | 600s (10min) | 120s (2min) | VIIRS updates every ~12 hours |
| Economic indicators | 3600s (1h) | 600s (10min) | Monthly/quarterly releases |

Static assets use content-hash filenames with 1-year immutable cache headers. The service worker file (`sw.js`) is never cached (`max-age=0, must-revalidate`) to ensure update detection.

### Railway Relay Compression

All relay server responses pass through `gzipSync` when the client accepts gzip and the payload exceeds 1KB. This applies to OpenSky aircraft JSON, RSS XML feeds, UCDP event data, AIS snapshots, and health checks — reducing wire size by approximately 80%.

### Frontend Polling Intervals

Panels refresh at staggered intervals to avoid synchronized API storms:

| Panel | Interval | Rationale |
|-------|----------|-----------|
| AIS maritime snapshot | 10s | Real-time vessel positions |
| Service status | 60s | Health check cadence |
| Market signals / ETF / Stablecoins | 180s (3min) | Market hours granularity |
| Risk scores / Theater posture | 300s (5min) | Composite scores change slowly |

All animations and polling pause when the tab is hidden or after 2 minutes of inactivity, preventing wasted requests from background tabs.

---

## Caching Architecture

Every external API call passes through a three-tier cache with stale-on-error fallback:

```
Request → [1] In-Memory Cache → [2] Redis (Upstash) → [3] Upstream API
                                                              │
            ◄──── stale data served on error ────────────────┘
```

| Tier | Scope | TTL | Purpose |
|------|-------|-----|---------|
| **In-memory** | Per edge function instance | Varies (60s–900s) | Eliminates Redis round-trips for hot paths |
| **Redis (Upstash)** | Cross-user, cross-instance | Varies (120s–900s) | Deduplicates API calls across all visitors |
| **Upstream** | Source of truth | N/A | External API (Yahoo Finance, CoinGecko, etc.) |

Cache keys are versioned (`opensky:v2:lamin=...`, `macro-signals:v2:default`) so schema changes don't serve stale formats. Every response includes an `X-Cache` header (`HIT`, `REDIS-HIT`, `MISS`, `REDIS-STALE`, `REDIS-ERROR-FALLBACK`) for debugging.

The AI summarization pipeline adds content-based deduplication: headlines are hashed and checked against Redis before calling Groq, so the same breaking news viewed by 1,000 concurrent users triggers exactly one LLM call.

---

## Security Model

| Layer | Mechanism |
|-------|-----------|
| **CORS origin allowlist** | Only `worldmonitor.app`, `tech.worldmonitor.app`, and `localhost:*` can call API endpoints. All others receive 403. Implemented in `api/_cors.js`. |
| **RSS domain allowlist** | The RSS proxy only fetches from explicitly listed domains (~90+). Requests for unlisted domains are rejected with 403. |
| **Railway domain allowlist** | The Railway relay has a separate, smaller domain allowlist for feeds that need the alternate origin. |
| **API key isolation** | All API keys live server-side in Vercel environment variables. The browser never sees Groq, OpenRouter, ACLED, Finnhub, or other credentials. |
| **Input sanitization** | User-facing content passes through `escapeHtml()` (prevents XSS) and `sanitizeUrl()` (blocks `javascript:` and `data:` URIs). URLs use `escapeAttr()` for attribute context encoding. |
| **Query parameter validation** | API endpoints validate input formats (e.g., stablecoin coin IDs must match `[a-z0-9-]+`, bounding box params are numeric). |
| **IP rate limiting** | AI endpoints use Upstash Redis-backed rate limiting to prevent abuse of Groq/OpenRouter quotas. |
| **Desktop sidecar auth** | The local API sidecar requires a per-session `Bearer` token generated at launch. The token is stored in Rust state and injected into the sidecar environment — only the Tauri frontend can retrieve it via IPC. Health check endpoints are exempt. |
| **OS keychain storage** | Desktop API keys are stored in the operating system's credential manager (macOS Keychain, Windows Credential Manager), never in plaintext files or environment variables on disk. |
| **No debug endpoints** | The `api/debug-env.js` endpoint returns 404 in production — it exists only as a disabled placeholder. |

---

## Quick Start

```bash
# Clone and run
git clone https://github.com/koala73/worldmonitor.git
cd worldmonitor
npm install
vercel dev       # Runs frontend + all 45+ API edge functions
```

Open [http://localhost:3000](http://localhost:3000)

> **Note**: `vercel dev` requires the [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`). If you use `npm run dev` instead, only the frontend starts — news feeds and API-dependent panels won't load. See [Self-Hosting](#self-hosting) for details.

### Environment Variables (Optional)

The dashboard works without any API keys — panels for unconfigured services simply won't appear. For full functionality, copy the example file and fill in the keys you need:

```bash
cp .env.example .env.local
```

The `.env.example` file documents every variable with descriptions and registration links, organized by deployment target (Vercel vs Railway). Key groups:

| Group | Variables | Free Tier |
|-------|-----------|-----------|
| **AI** | `GROQ_API_KEY`, `OPENROUTER_API_KEY` | 14,400 req/day (Groq), 50/day (OpenRouter) |
| **Cache** | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | 10K commands/day |
| **Markets** | `FINNHUB_API_KEY`, `FRED_API_KEY`, `EIA_API_KEY` | All free tier |
| **Tracking** | `WINGBITS_API_KEY`, `AISSTREAM_API_KEY` | Free |
| **Geopolitical** | `ACLED_ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, `NASA_FIRMS_API_KEY` | Free for researchers |
| **Relay** | `WS_RELAY_URL`, `VITE_WS_RELAY_URL`, `OPENSKY_CLIENT_ID/SECRET` | Self-hosted |
| **UI** | `VITE_VARIANT`, `VITE_MAP_INTERACTION_MODE` (`flat` or `3d`, default `3d`) | N/A |

See [`.env.example`](./.env.example) for the complete list with registration links.

---

## Self-Hosting

World Monitor relies on **45+ Vercel Edge Functions** in the `api/` directory for RSS proxying, data caching, and API key isolation. Running `npm run dev` alone starts only the Vite frontend — the edge functions won't execute, and most panels (news feeds, markets, AI summaries) will be empty.

### Option 1: Deploy to Vercel (Recommended)

The simplest path — Vercel runs the edge functions natively on their free tier:

```bash
npm install -g vercel
vercel          # Follow prompts to link/create project
```

Add your API keys in the Vercel dashboard under **Settings → Environment Variables**, then visit your deployment URL. The free Hobby plan supports all 45+ edge functions.

### Option 2: Local Development with Vercel CLI

To run everything locally (frontend + edge functions):

```bash
npm install -g vercel
cp .env.example .env.local   # Add your API keys
vercel dev                    # Starts on http://localhost:3000
=======
Add your API keys in the Vercel dashboard under **Settings → Environment Variables**, then visit your deployment URL. The free Hobby plan supports all 60+ edge functions.

### Option 2: Local Development with Vercel CLI

To run everything locally (frontend + edge functions):

```bash
npm install -g vercel
cp .env.example .env.local   # Add your API keys
vercel dev                   # Starts on http://localhost:3000
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
```

> **Important**: Use `vercel dev` instead of `npm run dev`. The Vercel CLI emulates the edge runtime locally so all `api/` endpoints work. Plain `npm run dev` only starts Vite and the API layer won't be available.

### Option 3: Static Frontend Only

If you only want the map and client-side features (no news feeds, no AI, no market data):

```bash
npm run dev    # Vite dev server on http://localhost:5173
```

This runs the frontend without the API layer. Panels that require server-side proxying will show "No data available". The interactive map, static data layers (bases, cables, pipelines), and browser-side ML models still work.

### Platform Notes

<<<<<<< HEAD
| Platform | Status | Notes |
|----------|--------|-------|
| **Vercel** | Full support | Recommended deployment target |
| **Linux x86_64** | Works with `vercel dev` | Full local development |
| **macOS** | Works with `vercel dev` | Full local development |
| **Raspberry Pi / ARM** | Partial | `vercel dev` edge runtime emulation may not work on ARM. Use Option 1 (deploy to Vercel) or Option 3 (static frontend) instead |
| **Docker** | Planned | See [Roadmap](#roadmap) |

### Railway Relay (Optional)

For live AIS vessel tracking and OpenSky aircraft data, deploy the WebSocket relay on Railway:
=======
| Platform               | Status                  | Notes                                                                                                                          |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Vercel**             | Full support            | Recommended deployment target                                                                                                  |
| **Linux x86_64**       | Full support            | Works with `vercel dev` for local development. Desktop .AppImage available for x86_64. WebKitGTK rendering uses DMA-BUF with fallback to SHM for GPU compatibility. Font stack includes DejaVu Sans Mono and Liberation Mono for consistent rendering across distros |
| **macOS**              | Works with `vercel dev` | Full local development                                                                                                         |
| **Raspberry Pi / ARM** | Partial                 | `vercel dev` edge runtime emulation may not work on ARM. Use Option 1 (deploy to Vercel) or Option 3 (static frontend) instead |
| **Docker**             | Planned                 | See [Roadmap](#roadmap)                                                                                                        |

### Railway Relay (Optional)

The Railway relay is a multi-protocol gateway that handles data sources requiring persistent connections, residential proxying, or upstream APIs that block Vercel's edge runtime:
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

```bash
# On Railway, deploy with:
node scripts/ais-relay.cjs
```

<<<<<<< HEAD
Set `WS_RELAY_URL` (server-side, HTTPS) and `VITE_WS_RELAY_URL` (client-side, WSS) in your environment. Without the relay, AIS and OpenSky layers won't show live data, but all other features work normally.
=======
| Service                 | Protocol        | Purpose                                                              |
| ----------------------- | --------------- | -------------------------------------------------------------------- |
| **AIS Vessel Tracking** | WebSocket       | Live AIS maritime data with chokepoint detection and density grids   |
| **OpenSky Aircraft**    | REST (polling)  | Military flight tracking across merged query regions                 |
| **Telegram OSINT**      | MTProto (GramJS)| 26 OSINT channels polled on 60s cycle with FLOOD_WAIT handling       |
| **OREF Rocket Alerts**  | curl + proxy    | Israel Home Front Command sirens via residential proxy (Akamai WAF)  |
| **Polymarket Proxy**    | HTTPS           | JA3 fingerprint bypass with request queuing and cache deduplication   |
| **ICAO NOTAM**          | REST            | Airport/airspace closure detection for 46 MENA airports              |

Set `WS_RELAY_URL` (server-side, HTTPS) and `VITE_WS_RELAY_URL` (client-side, WSS) in your environment. Without the relay, AIS, OpenSky, Telegram, and OREF layers won't show live data, but all other features work normally.
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

---

## Tech Stack

<<<<<<< HEAD
| Category | Technologies |
|----------|--------------|
| **Frontend** | TypeScript, Vite, deck.gl (WebGL 3D globe), MapLibre GL, vite-plugin-pwa (service worker + manifest) |
| **Desktop** | Tauri 2 (Rust) with Node.js sidecar, OS keychain integration (keyring crate), native TLS (reqwest) |
| **AI/ML** | Groq (Llama 3.1 8B), OpenRouter (fallback), Transformers.js (browser-side T5, NER, embeddings) |
| **Caching** | Redis (Upstash) — 3-tier cache with in-memory + Redis + upstream, cross-user AI deduplication. Vercel CDN (s-maxage). Service worker (Workbox) |
| **Geopolitical APIs** | OpenSky, GDELT, ACLED, UCDP, HAPI, USGS, GDACS, NASA EONET, NASA FIRMS, Polymarket, Cloudflare Radar |
| **Market APIs** | Yahoo Finance (equities, forex, crypto), CoinGecko (stablecoins), mempool.space (BTC hashrate), alternative.me (Fear & Greed) |
| **Economic APIs** | FRED (Federal Reserve), EIA (Energy), Finnhub (stock quotes) |
| **Deployment** | Vercel Edge Functions (45+ endpoints) + Railway (WebSocket relay) + Tauri (desktop) + PWA (installable) |
| **Data** | 100+ RSS feeds, ADS-B transponders, AIS maritime data, VIIRS satellite imagery, 8 live YouTube streams |

---

## Documentation

Full documentation including algorithms, data sources, and system architecture:

**[docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)**

Key sections:
- [Signal Intelligence](./docs/DOCUMENTATION.md#signal-intelligence)
- [Country Instability Index](./docs/DOCUMENTATION.md#country-instability-index-cii)
- [Military Tracking](./docs/DOCUMENTATION.md#military-tracking)
- [Infrastructure Analysis](./docs/DOCUMENTATION.md#infrastructure-cascade-analysis)
- [API Dependencies](./docs/DOCUMENTATION.md#api-dependencies)
- [System Architecture](./docs/DOCUMENTATION.md#system-architecture)

---

## Contributing

Contributions welcome! See [CONTRIBUTING](./docs/DOCUMENTATION.md#contributing) for guidelines.

```bash
# Development
npm run dev          # Full variant (worldmonitor.app)
npm run dev:tech     # Tech variant (tech.worldmonitor.app)

# Production builds
npm run build:full   # Build full variant
npm run build:tech   # Build tech variant

# Quality
npm run typecheck    # TypeScript type checking

# Desktop packaging
npm run desktop:package:macos:full     # .app + .dmg (World Monitor)
npm run desktop:package:macos:tech     # .app + .dmg (Tech Monitor)
npm run desktop:package:windows:full   # .exe + .msi (World Monitor)
npm run desktop:package:windows:tech   # .exe + .msi (Tech Monitor)
=======
| Category              | Technologies                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**          | Vanilla TypeScript (no framework), Vite, globe.gl + Three.js (3D globe), deck.gl + MapLibre GL (flat map), vite-plugin-pwa (service worker + manifest) |
| **Desktop**           | Tauri 2 (Rust) with Node.js sidecar, OS keychain integration (keyring crate), native TLS (reqwest)                                             |
| **AI/ML**             | Ollama / LM Studio (local, OpenAI-compatible), Groq (Llama 3.1 8B), OpenRouter (fallback), Transformers.js (browser-side T5, NER, embeddings), IndexedDB vector store (5K headline RAG) |
| **Caching**           | Redis (Upstash) — 3-tier cache with in-memory + Redis + upstream, cross-user AI deduplication. Vercel CDN (s-maxage). Service worker (Workbox) |
| **Geopolitical APIs** | OpenSky, GDELT, ACLED, UCDP, HAPI, USGS, GDACS, NASA EONET, NASA FIRMS, Polymarket, Cloudflare Radar, WorldPop, OREF (Israel sirens), gpsjam.org (GPS interference), Telegram MTProto (26 OSINT channels) |
| **Market APIs**       | Yahoo Finance (equities, forex, crypto), CoinGecko (stablecoins), mempool.space (BTC hashrate), alternative.me (Fear & Greed)                  |
| **Threat Intel APIs** | abuse.ch (Feodo Tracker, URLhaus), AlienVault OTX, AbuseIPDB, C2IntelFeeds                                                                     |
| **Economic APIs**     | FRED (Federal Reserve), EIA (Energy), Finnhub (stock quotes)                                                                                   |
| **Localization**      | i18next (21 languages: en, bg, ro, fr, de, es, it, pl, pt, nl, sv, ru, ar, zh, ja, tr, th, vi, cs, el, ko), RTL support, lazy-loaded bundles, native-language feeds for 21 locales with one-time locale boost |
| **API Contracts**     | Protocol Buffers (92 proto files, 22 services), sebuf HTTP annotations, buf CLI (lint + breaking checks), auto-generated TypeScript clients/servers + OpenAPI 3.1.0 docs |
| **Analytics**         | Vercel Analytics (privacy-first, lightweight web vitals and page view tracking)                                                                 |
| **Deployment**        | Vercel Edge Functions (60+ endpoints) + Railway (WebSocket relay + Telegram + OREF + Polymarket proxy + NOTAM) + Tauri (macOS/Windows/Linux) + PWA (installable) |
| **Finance Data**      | 92 stock exchanges, 19 financial centers, 13 central banks, 10 commodity hubs, 64 Gulf FDI investments                                         |
| **Data**              | 435+ RSS feeds across all 4 variants, ADS-B transponders, AIS maritime data, VIIRS satellite imagery, 30+ live video channels (8+ default YouTube + 18+ HLS native), 26 Telegram OSINT channels |

---

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines, including the Sebuf RPC framework workflow, how to add data sources and RSS feeds, and our AI-assisted development policy. The project also maintains a [Code of Conduct](./CODE_OF_CONDUCT.md) and [Security Policy](./SECURITY.md) for responsible vulnerability disclosure.

```bash
# Development
npm run dev          # Full variant (worldmonitor.app)
npm run dev:tech     # Tech variant (tech.worldmonitor.app)
npm run dev:finance  # Finance variant (finance.worldmonitor.app)
npm run dev:happy    # Happy variant (happy.worldmonitor.app)

# Production builds
npm run build:full      # Build full variant
npm run build:tech      # Build tech variant
npm run build:finance   # Build finance variant
npm run build:happy     # Build happy variant

# Quality (also runs automatically on PRs via GitHub Actions)
npm run typecheck    # TypeScript type checking (tsc --noEmit)

# Desktop packaging
npm run desktop:package:macos:full      # .app + .dmg (World Monitor)
npm run desktop:package:macos:tech      # .app + .dmg (Tech Monitor)
npm run desktop:package:macos:finance   # .app + .dmg (Finance Monitor)
npm run desktop:package:windows:full    # .exe + .msi (World Monitor)
npm run desktop:package:windows:tech    # .exe + .msi (Tech Monitor)
npm run desktop:package:windows:finance # .exe + .msi (Finance Monitor)
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

# Generic packaging runner
npm run desktop:package -- --os macos --variant full

# Signed packaging (same targets, requires signing env vars)
npm run desktop:package:macos:full:sign
npm run desktop:package:windows:full:sign
```

Desktop release details, signing hooks, variant outputs, and clean-machine validation checklist:
<<<<<<< HEAD
=======

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
- [docs/RELEASE_PACKAGING.md](./docs/RELEASE_PACKAGING.md)

---

## Roadmap

<<<<<<< HEAD
- [x] 45+ API edge functions for programmatic access
- [x] Dual-site variant system (geopolitical + tech)
- [x] Market intelligence (macro signals, ETF flows, stablecoin peg monitoring)
- [x] Railway relay for WebSocket and blocked-domain proxying
- [x] CORS origin allowlist and security hardening
- [x] Native desktop application (Tauri) with OS keychain + authenticated sidecar
- [x] Progressive Web App with offline map support and installability
- [x] Bandwidth optimization (CDN caching, gzip relay, staggered polling)
- [x] 3D WebGL globe visualization (deck.gl)
- [x] Natural disaster monitoring (USGS + GDACS + NASA EONET)
- [x] Historical playback via IndexedDB snapshots
- [x] Live YouTube stream detection with desktop embed bridge
=======
**Completed highlights** — 4 variant dashboards, 60+ edge functions, dual map engine, native desktop app (Tauri), 21 languages, proto-first API contracts, AI summarization + deduction + RAG, 30+ live video streams, Telegram OSINT, OREF rocket alerts, CII scoring, cross-stream correlation, and much more.

**Upcoming:**

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
- [ ] Mobile-optimized views
- [ ] Push notifications for critical alerts
- [ ] Self-hosted Docker image

See [full roadmap](./docs/DOCUMENTATION.md#roadmap).

---

## Support the Project

If you find World Monitor useful:

- **Star this repo** to help others discover it
- **Share** with colleagues interested in OSINT
- **Contribute** code, data sources, or documentation
- **Report issues** to help improve the platform

---

## License

<<<<<<< HEAD
MIT License — see [LICENSE](LICENSE) for details.
=======
GNU Affero General Public License v3.0 (AGPL-3.0) — see [LICENSE](LICENSE) for details.
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

---

## Author

**Elie Habib** — [GitHub](https://github.com/koala73)

---

<<<<<<< HEAD
<p align="center">
  <a href="https://worldmonitor.app">worldmonitor.app</a> &nbsp;·&nbsp;
  <a href="https://tech.worldmonitor.app">tech.worldmonitor.app</a>
</p>


=======
## Contributors

<a href="https://github.com/koala73/worldmonitor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=koala73/worldmonitor" />
</a>

---

## Security Acknowledgments

We thank the following researchers for responsibly disclosing security issues:

- **Cody Richard** — Disclosed three security findings covering IPC command exposure via DevTools in production builds, renderer-to-sidecar trust boundary analysis, and the global fetch patch credential injection architecture (2025)

If you discover a vulnerability, please see our [Security Policy](./SECURITY.md) for responsible disclosure guidelines.

---

<p align="center">
  <a href="https://worldmonitor.app">worldmonitor.app</a> &nbsp;·&nbsp;
  <a href="https://tech.worldmonitor.app">tech.worldmonitor.app</a> &nbsp;·&nbsp;
  <a href="https://finance.worldmonitor.app">finance.worldmonitor.app</a>
</p>

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
## Star History

<a href="https://api.star-history.com/svg?repos=koala73/worldmonitor&type=Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=koala73/worldmonitor&type=Date&type=Date&theme=dark" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=koala73/worldmonitor&type=Date&type=Date" />
 </picture>
</a>
