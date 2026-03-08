/**
 * CountryIntelModal - Shows AI-generated intelligence brief when user clicks a country
 */
<<<<<<< HEAD
import { escapeHtml, sanitizeUrl } from '@/utils/sanitize';
import type { CountryScore } from '@/services/country-instability';
import type { PredictionMarket } from '@/types';
=======
import { escapeHtml } from '@/utils/sanitize';
import { t } from '@/services/i18n';
import { sanitizeUrl } from '@/utils/sanitize';
import { getCSSColor } from '@/utils';
import type { CountryScore } from '@/services/country-instability';
import type { PredictionMarket } from '@/services/prediction';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

interface CountryIntelData {
  brief: string;
  country: string;
  code: string;
  cached?: boolean;
  generatedAt?: string;
  error?: string;
}

export interface StockIndexData {
  available: boolean;
  code: string;
  symbol: string;
  indexName: string;
  price: string;
  weekChangePercent: string;
  currency: string;
  cached?: boolean;
}

interface ActiveSignals {
  protests: number;
  militaryFlights: number;
  militaryVessels: number;
  outages: number;
  earthquakes: number;
}

export class CountryIntelModal {
  private overlay: HTMLElement;
  private contentEl: HTMLElement;
  private headerEl: HTMLElement;
  private onCloseCallback?: () => void;
  private onShareStory?: (code: string, name: string) => void;
  private currentCode: string | null = null;
  private currentName: string | null = null;
  private keydownHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'country-intel-overlay';
    this.overlay.innerHTML = `
      <div class="country-intel-modal">
        <div class="country-intel-header">
          <div class="country-intel-title"></div>
<<<<<<< HEAD
          <button class="country-intel-close">×</button>
=======
          <button class="country-intel-close" aria-label="Close">×</button>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        </div>
        <div class="country-intel-content"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.headerEl = this.overlay.querySelector('.country-intel-title')!;
    this.contentEl = this.overlay.querySelector('.country-intel-content')!;

    this.overlay.querySelector('.country-intel-close')?.addEventListener('click', () => this.hide());
    this.overlay.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('country-intel-overlay')) this.hide();
    });
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.hide();
    };
  }

  private countryFlag(code: string): string {
    try {
      return code
        .toUpperCase()
        .split('')
        .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
        .join('');
    } catch {
      return '🌍';
    }
  }

  private levelBadge(level: string): string {
<<<<<<< HEAD
    const colors: Record<string, string> = {
      critical: '#ff4444',
      high: '#ff8800',
      elevated: '#ffaa00',
      normal: '#44aa44',
      low: '#3388ff',
    };
    const color = colors[level] || '#888';
=======
    const varMap: Record<string, string> = {
      critical: '--semantic-critical',
      high: '--semantic-high',
      elevated: '--semantic-elevated',
      normal: '--semantic-normal',
      low: '--semantic-low',
    };
    const color = getCSSColor(varMap[level] || '--text-dim');
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    return `<span class="cii-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${level.toUpperCase()}</span>`;
  }

  private scoreBar(score: number): string {
    const pct = Math.min(100, Math.max(0, score));
<<<<<<< HEAD
    const color = pct >= 70 ? '#ff4444' : pct >= 50 ? '#ff8800' : pct >= 30 ? '#ffaa00' : '#44aa44';
=======
    const color = pct >= 70 ? getCSSColor('--semantic-critical') : pct >= 50 ? getCSSColor('--semantic-high') : pct >= 30 ? getCSSColor('--semantic-elevated') : getCSSColor('--semantic-normal');
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    return `
      <div class="cii-score-bar">
        <div class="cii-score-fill" style="width:${pct}%;background:${color}"></div>
      </div>
      <span class="cii-score-value">${score}/100</span>
    `;
  }

  public showLoading(): void {
    this.currentCode = '__loading__';
    document.addEventListener('keydown', this.keydownHandler);
    this.headerEl.innerHTML = `
      <span class="country-flag">🌍</span>
<<<<<<< HEAD
      <span class="country-name">Identifying country...</span>
=======
      <span class="country-name">${t('modals.countryIntel.identifying')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    `;
    this.contentEl.innerHTML = `
      <div class="intel-brief-section">
        <div class="intel-brief-loading">
          <div class="intel-skeleton"></div>
          <div class="intel-skeleton short"></div>
<<<<<<< HEAD
          <span class="intel-loading-text">Locating region...</span>
=======
          <span class="intel-loading-text">${t('modals.countryIntel.locating')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        </div>
      </div>
    `;
    this.overlay.classList.add('active');
  }

<<<<<<< HEAD
  public setShareStoryHandler(handler: (code: string, name: string) => void): void {
    this.onShareStory = handler;
  }

=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  public show(country: string, code: string, score: CountryScore | null, signals?: ActiveSignals): void {
    this.currentCode = code;
    this.currentName = country;
    const flag = this.countryFlag(code);
<<<<<<< HEAD
=======
    let html = '';
    document.addEventListener('keydown', this.keydownHandler);
    this.overlay.classList.add('active');

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    this.headerEl.innerHTML = `
      <span class="country-flag">${flag}</span>
      <span class="country-name">${escapeHtml(country)}</span>
      ${score ? this.levelBadge(score.level) : ''}
<<<<<<< HEAD
      <button class="country-intel-share-btn" title="Share story"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg></button>
    `;
    this.headerEl.querySelector('.country-intel-share-btn')?.addEventListener('click', () => {
      if (this.onShareStory && this.currentCode && this.currentName) {
        this.onShareStory(this.currentCode, this.currentName);
      }
    });

    // Show loading state + any immediate data
    let html = '';
=======
      <button class="country-intel-share-btn" title="${t('modals.story.shareTitle')}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg></button>
    `;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    if (score) {
      html += `
        <div class="cii-section">
<<<<<<< HEAD
          <div class="cii-label">Instability Index ${this.scoreBar(score.score)}</div>
          <div class="cii-components">
            <span title="Unrest">📢 ${score.components.unrest.toFixed(0)}</span>
            <span title="Conflict">⚔ ${score.components.conflict.toFixed(0)}</span>
            <span title="Security">🛡️ ${score.components.security.toFixed(0)}</span>
            <span title="Information">📡 ${score.components.information.toFixed(0)}</span>
=======
          <div class="cii-label">${t('modals.countryIntel.instabilityIndex')} ${this.scoreBar(score.score)}</div>
          <div class="cii-components">
            <span title="${t('common.unrest')}">📢 ${score.components.unrest.toFixed(0)}</span>
            <span title="${t('common.conflict')}">⚔ ${score.components.conflict.toFixed(0)}</span>
            <span title="${t('common.security')}">🛡️ ${score.components.security.toFixed(0)}</span>
            <span title="${t('common.information')}">📡 ${score.components.information.toFixed(0)}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <span class="cii-trend ${score.trend}">${score.trend === 'rising' ? '↗' : score.trend === 'falling' ? '↘' : '→'} ${score.trend}</span>
          </div>
        </div>
      `;
    }

    const chips: string[] = [];
    if (signals) {
<<<<<<< HEAD
      if (signals.protests > 0) chips.push(`<span class="signal-chip protest">📢 ${signals.protests} protests</span>`);
      if (signals.militaryFlights > 0) chips.push(`<span class="signal-chip military">✈️ ${signals.militaryFlights} mil. aircraft</span>`);
      if (signals.militaryVessels > 0) chips.push(`<span class="signal-chip military">⚓ ${signals.militaryVessels} mil. vessels</span>`);
      if (signals.outages > 0) chips.push(`<span class="signal-chip outage">🌐 ${signals.outages} outages</span>`);
      if (signals.earthquakes > 0) chips.push(`<span class="signal-chip quake">🌍 ${signals.earthquakes} earthquakes</span>`);
    }
    chips.push(`<span class="signal-chip stock-loading">📈 Loading index...</span>`);
    html += `<div class="active-signals">${chips.join('')}</div>`;

    html += `<div class="country-markets-section"><span class="intel-loading-text">Loading prediction markets...</span></div>`;
=======
      if (signals.protests > 0) chips.push(`<span class="signal-chip protest">📢 ${signals.protests} ${t('modals.countryIntel.protests')}</span>`);
      if (signals.militaryFlights > 0) chips.push(`<span class="signal-chip military">✈️ ${signals.militaryFlights} ${t('modals.countryIntel.militaryAircraft')}</span>`);
      if (signals.militaryVessels > 0) chips.push(`<span class="signal-chip military">⚓ ${signals.militaryVessels} ${t('modals.countryIntel.militaryVessels')}</span>`);
      if (signals.outages > 0) chips.push(`<span class="signal-chip outage">🌐 ${signals.outages} ${t('modals.countryIntel.outages')}</span>`);
      if (signals.earthquakes > 0) chips.push(`<span class="signal-chip quake">🌍 ${signals.earthquakes} ${t('modals.countryIntel.earthquakes')}</span>`);
    }
    chips.push(`<span class="signal-chip stock-loading">📈 ${t('modals.countryIntel.loadingIndex')}</span>`);
    html += `<div class="active-signals">${chips.join('')}</div>`;

    html += `<div class="country-markets-section"><span class="intel-loading-text">${t('modals.countryIntel.loadingMarkets')}</span></div>`;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    html += `
      <div class="intel-brief-section">
        <div class="intel-brief-loading">
          <div class="intel-skeleton"></div>
          <div class="intel-skeleton short"></div>
          <div class="intel-skeleton"></div>
          <div class="intel-skeleton short"></div>
<<<<<<< HEAD
          <span class="intel-loading-text">Generating intelligence brief...</span>
=======
          <span class="intel-loading-text">${t('modals.countryIntel.generatingBrief')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        </div>
      </div>
    `;

    this.contentEl.innerHTML = html;
<<<<<<< HEAD
    this.overlay.classList.add('active');
  }

  public updateBrief(data: CountryIntelData & { skipped?: boolean; reason?: string; fallback?: boolean }): void {
    if (data.code !== this.currentCode) return;
=======

    const shareBtn = this.headerEl.querySelector('.country-intel-share-btn');
    shareBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.currentCode && this.currentName && this.onShareStory) {
        this.onShareStory(this.currentCode, this.currentName);
      }
    });
  }

  public updateBrief(data: CountryIntelData & { skipped?: boolean; reason?: string; fallback?: boolean }): void {
    if (this.currentCode !== data.code && this.currentCode !== '__loading__') return;

    // If modal closed, don't update
    if (!this.isVisible()) return;

    if (data.error || data.skipped || !data.brief) {
      const msg = data.error || data.reason || t('modals.countryIntel.unavailable');
      const briefSection = this.contentEl.querySelector('.intel-brief-section');
      if (briefSection) {
        briefSection.innerHTML = `<div class="intel-error">${escapeHtml(msg)}</div>`;
      }
      return;
    }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    const briefSection = this.contentEl.querySelector('.intel-brief-section');
    if (!briefSection) return;

<<<<<<< HEAD
    if (data.error || data.skipped || !data.brief) {
      const msg = data.error || data.reason || 'AI brief unavailable — configure GROQ_API_KEY in Settings.';
      briefSection.innerHTML = `<div class="intel-error">${escapeHtml(msg)}</div>`;
      return;
    }

    // Convert markdown-like formatting to HTML
    const formatted = this.formatBrief(data.brief);

    briefSection.innerHTML = `
      <div class="intel-brief">${formatted}</div>
      <div class="intel-footer">
        ${data.cached ? '<span class="intel-cached">📋 Cached</span>' : '<span class="intel-fresh">✨ Fresh</span>'}
=======
    const formatted = this.formatBrief(data.brief);
    briefSection.innerHTML = `
      <div class="intel-brief">${formatted}</div>
      <div class="intel-footer">
        ${data.cached ? `<span class="intel-cached">📋 ${t('modals.countryIntel.cached')}</span>` : `<span class="intel-fresh">✨ ${t('modals.countryIntel.fresh')}</span>`}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        <span class="intel-timestamp">${data.generatedAt ? new Date(data.generatedAt).toLocaleTimeString() : ''}</span>
      </div>
    `;
  }

  public updateMarkets(markets: PredictionMarket[]): void {
    const section = this.contentEl.querySelector('.country-markets-section');
    if (!section) return;

    if (markets.length === 0) {
<<<<<<< HEAD
      section.innerHTML = '<span class="intel-loading-text" style="opacity:0.5">No prediction markets found</span>';
      return;
    }

    const items = markets.map(m => {
      const pct = Math.round(m.yesPrice);
      const noPct = 100 - pct;
      const vol = m.volume ? `$${(m.volume / 1000).toFixed(0)}k vol` : '';
      const safeUrl = sanitizeUrl(m.url || '');
      const link = safeUrl ? ` <a href="${safeUrl}" target="_blank" rel="noopener" class="market-link">↗</a>` : '';
      return `
        <div class="market-item">
          <div class="market-title">${escapeHtml(m.title.slice(0, 80))}${link}</div>
          <div class="market-bar">
            <div class="market-yes" style="width:${pct}%">${pct}%</div>
            <div class="market-no" style="width:${noPct}%">${noPct > 15 ? noPct + '%' : ''}</div>
          </div>
          ${vol ? `<div class="market-vol">${vol}</div>` : ''}
        </div>
      `;
    }).join('');

    section.innerHTML = `<div class="markets-label">📊 Prediction Markets</div>${items}`;
=======
      section.innerHTML = `<span class="intel-loading-text" style="opacity:0.5">${t('modals.countryIntel.noMarkets')}</span>`;
      return;
    }

    const items = markets.map(market => {
      const href = sanitizeUrl(market.url || '#') || '#';
      return `
      <div class="market-item">
        <a href="${href}" target="_blank" rel="noopener noreferrer" class="prediction-market-card">
        <div class="market-provider">Polymarket</div>
        <div class="market-question">${escapeHtml(market.title)}</div>
        <div class="market-prob">${market.yesPrice.toFixed(1)}%</div>
      </a>
    `;
    }).join('');

    section.innerHTML = `<div class="markets-label">📊 ${t('modals.countryIntel.predictionMarkets')}</div>${items}`;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public updateStock(data: StockIndexData): void {
    const el = this.contentEl.querySelector('.stock-loading');
    if (!el) return;

    if (!data.available) {
      el.remove();
      return;
    }

    const pct = parseFloat(data.weekChangePercent);
    const sign = pct >= 0 ? '+' : '';
    const cls = pct >= 0 ? 'stock-up' : 'stock-down';
    const arrow = pct >= 0 ? '📈' : '📉';
    el.className = `signal-chip stock ${cls}`;
    el.innerHTML = `${arrow} ${escapeHtml(data.indexName)}: ${sign}${data.weekChangePercent}% (1W)`;
  }

  private formatBrief(text: string): string {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  public hide(): void {
    this.overlay.classList.remove('active');
    document.removeEventListener('keydown', this.keydownHandler);
    this.currentCode = null;
    this.onCloseCallback?.();
  }

  public onClose(cb: () => void): void {
    this.onCloseCallback = cb;
  }

  public isVisible(): boolean {
    return this.overlay.classList.contains('active');
  }
}
