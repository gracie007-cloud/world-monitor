import { Panel } from './Panel';
<<<<<<< HEAD
import { escapeHtml } from '@/utils/sanitize';
import { calculateCII, type CountryScore } from '@/services/country-instability';
=======
import { getCSSColor } from '@/utils';
import { calculateCII, type CountryScore } from '@/services/country-instability';
import { t } from '../services/i18n';
import { h, replaceChildren, rawHtml } from '@/utils/dom-utils';
import type { CachedRiskScores } from '@/services/cached-risk-scores';
import { toCountryScore } from '@/services/cached-risk-scores';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export class CIIPanel extends Panel {
  private scores: CountryScore[] = [];
  private focalPointsReady = false;
<<<<<<< HEAD
  private onShareStory?: (code: string, name: string) => void;
=======
  private hasCachedRender = false;
  private onShareStory?: (code: string, name: string) => void;
  private onCountryClick?: (code: string) => void;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

  constructor() {
    super({
      id: 'cii',
<<<<<<< HEAD
      title: 'Country Instability Index',
      showCount: true,
      trackActivity: true,
      infoTooltip: `<strong>CII Methodology</strong>
        Score (0-100) per country based on:
        <ul>
          <li>40% baseline geopolitical risk</li>
          <li><strong>U</strong>nrest: protests, fatalities, internet outages</li>
          <li><strong>S</strong>ecurity: military flights/vessels over territory</li>
          <li><strong>I</strong>nformation: news velocity and focal point correlation</li>
          <li>Hotspot proximity boost (strategic locations)</li>
        </ul>
        <em>U:S:I values show component scores.</em>
        Focal Point Detection correlates news entities with map signals for accurate scoring.`,
    });
    this.showLoading('Scanning intelligence feeds');
=======
      title: t('panels.cii'),
      infoTooltip: t('components.cii.infoTooltip'),
    });
    this.showLoading(t('common.loading'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public setShareStoryHandler(handler: (code: string, name: string) => void): void {
    this.onShareStory = handler;
  }

<<<<<<< HEAD
  private getLevelColor(level: CountryScore['level']): string {
    switch (level) {
      case 'critical': return '#ff4444';
      case 'high': return '#ff8800';
      case 'elevated': return '#ffaa00';
      case 'normal': return '#88aa44';
      case 'low': return '#22aa88';
=======
  public setCountryClickHandler(handler: (code: string) => void): void {
    this.onCountryClick = handler;
  }

  private getLevelColor(level: CountryScore['level']): string {
    switch (level) {
      case 'critical': return getCSSColor('--semantic-critical');
      case 'high': return getCSSColor('--semantic-high');
      case 'elevated': return getCSSColor('--semantic-elevated');
      case 'normal': return getCSSColor('--semantic-normal');
      case 'low': return getCSSColor('--semantic-low');
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }
  }

  private getLevelEmoji(level: CountryScore['level']): string {
    switch (level) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'elevated': return '🟡';
      case 'normal': return '🟢';
      case 'low': return '⚪';
    }
  }

<<<<<<< HEAD
  private getTrendArrow(trend: CountryScore['trend'], change: number): string {
    if (trend === 'rising') return `<span class="trend-up">↑${change > 0 ? change : ''}</span>`;
    if (trend === 'falling') return `<span class="trend-down">↓${Math.abs(change)}</span>`;
    return '<span class="trend-stable">→</span>';
  }

  private renderCountry(country: CountryScore): string {
    const barWidth = country.score;
    const color = this.getLevelColor(country.level);
    const emoji = this.getLevelEmoji(country.level);
    const trend = this.getTrendArrow(country.trend, country.change24h);

    return `
      <div class="cii-country" data-code="${escapeHtml(country.code)}">
        <div class="cii-header">
          <span class="cii-emoji">${emoji}</span>
          <span class="cii-name">${escapeHtml(country.name)}</span>
          <span class="cii-score">${country.score}</span>
          ${trend}
          <button class="cii-share-btn" data-code="${escapeHtml(country.code)}" data-name="${escapeHtml(country.name)}" title="Share story"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg></button>
        </div>
        <div class="cii-bar-container">
          <div class="cii-bar" style="width: ${barWidth}%; background: ${color};"></div>
        </div>
        <div class="cii-components">
          <span title="Unrest">U:${country.components.unrest}</span>
          <span title="Conflict">C:${country.components.conflict}</span>
          <span title="Security">S:${country.components.security}</span>
          <span title="Information">I:${country.components.information}</span>
        </div>
      </div>
    `;
  }

  private bindShareButtons(): void {
    if (!this.onShareStory) return;
=======
  private static readonly SHARE_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>';

  private buildTrendArrow(trend: CountryScore['trend'], change: number): HTMLElement {
    if (trend === 'rising') return h('span', { className: 'trend-up' }, `↑${change > 0 ? change : ''}`);
    if (trend === 'falling') return h('span', { className: 'trend-down' }, `↓${Math.abs(change)}`);
    return h('span', { className: 'trend-stable' }, '→');
  }

  private buildCountry(country: CountryScore): HTMLElement {
    const color = this.getLevelColor(country.level);
    const emoji = this.getLevelEmoji(country.level);

    const shareBtn = h('button', {
      className: 'cii-share-btn',
      dataset: { code: country.code, name: country.name },
      title: t('common.shareStory'),
    });
    shareBtn.appendChild(rawHtml(CIIPanel.SHARE_SVG));

    return h('div', { className: 'cii-country', dataset: { code: country.code } },
      h('div', { className: 'cii-header' },
        h('span', { className: 'cii-emoji' }, emoji),
        h('span', { className: 'cii-name' }, country.name),
        h('span', { className: 'cii-score' }, String(country.score)),
        this.buildTrendArrow(country.trend, country.change24h),
        shareBtn,
      ),
      h('div', { className: 'cii-bar-container' },
        h('div', { className: 'cii-bar', style: `width: ${country.score}%; background: ${color};` }),
      ),
      h('div', { className: 'cii-components' },
        h('span', { title: t('common.unrest') }, `U:${country.components.unrest}`),
        h('span', { title: t('common.conflict') }, `C:${country.components.conflict}`),
        h('span', { title: t('common.security') }, `S:${country.components.security}`),
        h('span', { title: t('common.information') }, `I:${country.components.information}`),
      ),
    );
  }

  private bindShareButtons(): void {
    if (!this.onShareStory && !this.onCountryClick) return;

    this.content.querySelectorAll('.cii-country').forEach(el => {
      el.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const code = target.dataset.code;
        if (code && this.onCountryClick) {
          this.onCountryClick(code);
        }
      });
    });

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    this.content.querySelectorAll('.cii-share-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const el = e.currentTarget as HTMLElement;
        const code = el.dataset.code || '';
        const name = el.dataset.name || '';
<<<<<<< HEAD
        if (code && name) this.onShareStory!(code, name);
=======
        if (code && name && this.onShareStory) this.onShareStory(code, name);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      });
    });
  }

  public async refresh(forceLocal = false): Promise<void> {
    if (!this.focalPointsReady && !forceLocal) {
      return;
    }

    if (forceLocal) {
      this.focalPointsReady = true;
      console.log('[CIIPanel] Focal points ready, calculating scores...');
    }

<<<<<<< HEAD
    this.showLoading();
=======
    if (!this.hasCachedRender) this.showLoading();
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    try {
      const localScores = calculateCII();
      const localWithData = localScores.filter(s => s.score > 0).length;
      this.scores = localScores;
      console.log(`[CIIPanel] Calculated ${localWithData} countries with focal point intelligence`);

      const withData = this.scores.filter(s => s.score > 0);
      this.setCount(withData.length);

      if (withData.length === 0) {
<<<<<<< HEAD
        this.content.innerHTML = '<div class="empty-state">No instability signals detected</div>';
        return;
      }

      const html = withData.map(s => this.renderCountry(s)).join('');
      this.content.innerHTML = `<div class="cii-list">${html}</div>`;
      this.bindShareButtons();
    } catch (error) {
      console.error('[CIIPanel] Refresh error:', error);
      this.showError('Failed to calculate CII');
    }
  }

=======
        replaceChildren(this.content, h('div', { className: 'empty-state' }, t('components.cii.noSignals')));
        return;
      }

      const listEl = h('div', { className: 'cii-list' }, ...withData.map(s => this.buildCountry(s)));
      replaceChildren(this.content, listEl);
      this.bindShareButtons();
    } catch (error) {
      console.error('[CIIPanel] Refresh error:', error);
      this.showError(t('common.failedCII'));
    }
  }

  public renderFromCached(cached: CachedRiskScores): void {
    const scores = cached.cii.map(toCountryScore).filter(s => s.score > 0);
    if (scores.length === 0) return;
    this.scores = scores;
    this.hasCachedRender = true;
    this.setCount(scores.length);
    const listEl = h('div', { className: 'cii-list' }, ...scores.map(s => this.buildCountry(s)));
    replaceChildren(this.content, listEl);
    this.bindShareButtons();
    console.log(`[CIIPanel] Rendered ${scores.length} countries from cached/bootstrap data`);
  }

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  public getScores(): CountryScore[] {
    return this.scores;
  }
}
