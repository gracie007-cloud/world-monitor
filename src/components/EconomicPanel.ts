import { Panel } from './Panel';
<<<<<<< HEAD
import type { FredSeries } from '@/services/fred';
import type { OilAnalytics } from '@/services/oil-analytics';
import type { SpendingSummary } from '@/services/usa-spending';
import { getChangeClass, formatChange } from '@/services/fred';
import { formatOilValue, getTrendIndicator, getTrendColor } from '@/services/oil-analytics';
import { formatAwardAmount, getAwardTypeIcon } from '@/services/usa-spending';
import { escapeHtml } from '@/utils/sanitize';

type TabId = 'indicators' | 'oil' | 'spending';
=======
import type { FredSeries, OilAnalytics, BisData } from '@/services/economic';
import { t } from '@/services/i18n';
import type { SpendingSummary } from '@/services/usa-spending';
import { getChangeClass, formatChange, formatOilValue, getTrendIndicator, getTrendColor } from '@/services/economic';
import { formatAwardAmount, getAwardTypeIcon } from '@/services/usa-spending';
import { escapeHtml } from '@/utils/sanitize';
import { isFeatureAvailable } from '@/services/runtime-config';
import { isDesktopRuntime } from '@/services/runtime';
import { getCSSColor } from '@/utils';

type TabId = 'indicators' | 'oil' | 'spending' | 'centralBanks';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export class EconomicPanel extends Panel {
  private fredData: FredSeries[] = [];
  private oilData: OilAnalytics | null = null;
  private spendingData: SpendingSummary | null = null;
<<<<<<< HEAD
=======
  private bisData: BisData | null = null;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  private lastUpdate: Date | null = null;
  private activeTab: TabId = 'indicators';

  constructor() {
<<<<<<< HEAD
    super({ id: 'economic', title: 'Economic Data' });
=======
    super({ id: 'economic', title: t('panels.economic') });
    this.content.addEventListener('click', (e) => {
      const tab = (e.target as HTMLElement).closest('.economic-tab') as HTMLElement | null;
      if (tab?.dataset.tab) {
        this.activeTab = tab.dataset.tab as TabId;
        this.render();
      }
    });
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public update(data: FredSeries[]): void {
    this.fredData = data;
    this.lastUpdate = new Date();
    this.render();
  }

  public updateOil(data: OilAnalytics): void {
    this.oilData = data;
    this.render();
  }

  public updateSpending(data: SpendingSummary): void {
    this.spendingData = data;
    this.render();
  }

<<<<<<< HEAD
=======
  public updateBis(data: BisData): void {
    this.bisData = data;
    this.render();
  }

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  public setLoading(loading: boolean): void {
    if (loading) {
      this.showLoading();
    }
  }

  private render(): void {
    const hasOil = this.oilData && (this.oilData.wtiPrice || this.oilData.brentPrice);
    const hasSpending = this.spendingData && this.spendingData.awards.length > 0;
<<<<<<< HEAD
=======
    const hasBis = this.bisData && this.bisData.policyRates.length > 0;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    // Build tabs HTML
    const tabsHtml = `
      <div class="economic-tabs">
        <button class="economic-tab ${this.activeTab === 'indicators' ? 'active' : ''}" data-tab="indicators">
<<<<<<< HEAD
          📊 Indicators
        </button>
        ${hasOil ? `
          <button class="economic-tab ${this.activeTab === 'oil' ? 'active' : ''}" data-tab="oil">
            🛢️ Oil
=======
          📊 ${t('components.economic.indicators')}
        </button>
        ${hasOil ? `
          <button class="economic-tab ${this.activeTab === 'oil' ? 'active' : ''}" data-tab="oil">
            🛢️ ${t('components.economic.oil')}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
          </button>
        ` : ''}
        ${hasSpending ? `
          <button class="economic-tab ${this.activeTab === 'spending' ? 'active' : ''}" data-tab="spending">
<<<<<<< HEAD
            🏛️ Gov
=======
            🏛️ ${t('components.economic.gov')}
          </button>
        ` : ''}
        ${hasBis ? `
          <button class="economic-tab ${this.activeTab === 'centralBanks' ? 'active' : ''}" data-tab="centralBanks">
            🏦 ${t('components.economic.centralBanks')}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
          </button>
        ` : ''}
      </div>
    `;

    let contentHtml = '';

    switch (this.activeTab) {
      case 'indicators':
        contentHtml = this.renderIndicators();
        break;
      case 'oil':
        contentHtml = this.renderOil();
        break;
      case 'spending':
        contentHtml = this.renderSpending();
        break;
<<<<<<< HEAD
=======
      case 'centralBanks':
        contentHtml = this.renderCentralBanks();
        break;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }

    const updateTime = this.lastUpdate
      ? this.lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    this.setContent(`
      ${tabsHtml}
      <div class="economic-content">
        ${contentHtml}
      </div>
      <div class="economic-footer">
        <span class="economic-source">${this.getSourceLabel()} • ${updateTime}</span>
      </div>
    `);

<<<<<<< HEAD
    // Bind tab click events
    this.content.querySelectorAll('.economic-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = (e.target as HTMLElement).dataset.tab as TabId;
        if (tabId) {
          this.activeTab = tabId;
          this.render();
        }
      });
    });
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  private getSourceLabel(): string {
    switch (this.activeTab) {
      case 'indicators': return 'FRED';
      case 'oil': return 'EIA';
      case 'spending': return 'USASpending.gov';
<<<<<<< HEAD
=======
      case 'centralBanks': return 'BIS';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }
  }

  private renderIndicators(): string {
    if (this.fredData.length === 0) {
<<<<<<< HEAD
      return '<div class="economic-empty">No economic data available</div>';
=======
      if (isDesktopRuntime() && !isFeatureAvailable('economicFred')) {
        return `<div class="economic-empty">${t('components.economic.fredKeyMissing')}</div>`;
      }
      return `<div class="economic-empty">${t('components.economic.noIndicatorData')}</div>`;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }

    return `
      <div class="economic-indicators">
        ${this.fredData.map(series => {
<<<<<<< HEAD
          const changeClass = getChangeClass(series.change);
          const changeStr = formatChange(series.change, series.unit);
          const arrow = series.change !== null
            ? (series.change > 0 ? '▲' : series.change < 0 ? '▼' : '–')
            : '';

          return `
=======
      const changeClass = getChangeClass(series.change);
      const changeStr = formatChange(series.change, series.unit);
      const arrow = series.change !== null
        ? (series.change > 0 ? '▲' : series.change < 0 ? '▼' : '–')
        : '';

      return `
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <div class="economic-indicator" data-series="${escapeHtml(series.id)}">
              <div class="indicator-header">
                <span class="indicator-name">${escapeHtml(series.name)}</span>
                <span class="indicator-id">${escapeHtml(series.id)}</span>
              </div>
              <div class="indicator-value">
                <span class="value">${escapeHtml(String(series.value !== null ? series.value : 'N/A'))}${escapeHtml(series.unit)}</span>
                <span class="change ${escapeHtml(changeClass)}">${escapeHtml(arrow)} ${escapeHtml(changeStr)}</span>
              </div>
              <div class="indicator-date">${escapeHtml(series.date)}</div>
            </div>
          `;
<<<<<<< HEAD
        }).join('')}
=======
    }).join('')}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      </div>
    `;
  }

  private renderOil(): string {
    if (!this.oilData) {
<<<<<<< HEAD
      return '<div class="economic-empty">Oil data not available</div>';
=======
      return `<div class="economic-empty">${t('components.economic.noOilDataRetry')}</div>`;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }

    const metrics = [
      this.oilData.wtiPrice,
      this.oilData.brentPrice,
      this.oilData.usProduction,
      this.oilData.usInventory,
    ].filter(Boolean);

    if (metrics.length === 0) {
<<<<<<< HEAD
      return '<div class="economic-empty">No oil metrics available. Add EIA_API_KEY to enable.</div>';
=======
      return `<div class="economic-empty">${t('components.economic.noOilMetrics')}</div>`;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }

    return `
      <div class="economic-indicators oil-metrics">
        ${metrics.map(metric => {
<<<<<<< HEAD
          if (!metric) return '';
          const trendIcon = getTrendIndicator(metric.trend);
          const trendColor = getTrendColor(metric.trend, metric.name.includes('Production'));

          return `
=======
      if (!metric) return '';
      const trendIcon = getTrendIndicator(metric.trend);
      const trendColor = getTrendColor(metric.trend, metric.name.includes('Production'));

      return `
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <div class="economic-indicator oil-metric">
              <div class="indicator-header">
                <span class="indicator-name">${escapeHtml(metric.name)}</span>
              </div>
              <div class="indicator-value">
                <span class="value">${escapeHtml(formatOilValue(metric.current, metric.unit))} ${escapeHtml(metric.unit)}</span>
                <span class="change" style="color: ${escapeHtml(trendColor)}">
                  ${escapeHtml(trendIcon)} ${escapeHtml(String(metric.changePct > 0 ? '+' : ''))}${escapeHtml(String(metric.changePct))}%
                </span>
              </div>
<<<<<<< HEAD
              <div class="indicator-date">vs previous week</div>
            </div>
          `;
        }).join('')}
=======
              <div class="indicator-date">${t('components.economic.vsPreviousWeek')}</div>
            </div>
          `;
    }).join('')}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      </div>
    `;
  }

  private renderSpending(): string {
    if (!this.spendingData || this.spendingData.awards.length === 0) {
<<<<<<< HEAD
      return '<div class="economic-empty">No recent government awards</div>';
=======
      return `<div class="economic-empty">${t('components.economic.noSpending')}</div>`;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }

    const { awards, totalAmount, periodStart, periodEnd } = this.spendingData;

    return `
      <div class="spending-summary">
        <div class="spending-total">
<<<<<<< HEAD
          ${escapeHtml(formatAwardAmount(totalAmount))} in ${escapeHtml(String(awards.length))} awards
=======
          ${escapeHtml(formatAwardAmount(totalAmount))} ${t('components.economic.in')} ${escapeHtml(String(awards.length))} ${t('components.economic.awards')}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
          <span class="spending-period">${escapeHtml(periodStart)} – ${escapeHtml(periodEnd)}</span>
        </div>
      </div>
      <div class="spending-list">
        ${awards.slice(0, 8).map(award => `
          <div class="spending-award">
            <div class="award-header">
              <span class="award-icon">${escapeHtml(getAwardTypeIcon(award.awardType))}</span>
              <span class="award-amount">${escapeHtml(formatAwardAmount(award.amount))}</span>
            </div>
            <div class="award-recipient">${escapeHtml(award.recipientName)}</div>
            <div class="award-agency">${escapeHtml(award.agency)}</div>
            ${award.description ? `<div class="award-desc">${escapeHtml(award.description.slice(0, 100))}${award.description.length > 100 ? '...' : ''}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
<<<<<<< HEAD
=======
  }

  private renderCentralBanks(): string {
    if (!this.bisData || this.bisData.policyRates.length === 0) {
      return `<div class="economic-empty">${t('components.economic.noBisData')}</div>`;
    }

    const greenColor = getCSSColor('--semantic-normal');
    const redColor = getCSSColor('--semantic-critical');
    const neutralColor = getCSSColor('--text-dim');

    // Policy Rates — sorted by rate descending
    const sortedRates = [...this.bisData.policyRates].sort((a, b) => b.rate - a.rate);
    const policyHtml = `
      <div class="bis-section">
        <div class="bis-section-title">${t('components.economic.policyRate')}</div>
        <div class="economic-indicators">
          ${sortedRates.map(r => {
      const diff = r.rate - r.previousRate;
      const color = diff < 0 ? greenColor : diff > 0 ? redColor : neutralColor;
      const label = diff < 0 ? t('components.economic.cut') : diff > 0 ? t('components.economic.hike') : t('components.economic.hold');
      const arrow = diff < 0 ? '▼' : diff > 0 ? '▲' : '–';
      return `
              <div class="economic-indicator">
                <div class="indicator-header">
                  <span class="indicator-name">${escapeHtml(r.centralBank)}</span>
                  <span class="indicator-id">${escapeHtml(r.countryCode)}</span>
                </div>
                <div class="indicator-value">
                  <span class="value">${escapeHtml(String(r.rate))}%</span>
                  <span class="change" style="color: ${escapeHtml(color)}">${escapeHtml(arrow)} ${escapeHtml(label)}</span>
                </div>
                <div class="indicator-date">${escapeHtml(r.date)}</div>
              </div>`;
    }).join('')}
        </div>
      </div>
    `;

    // Exchange Rates
    let eerHtml = '';
    if (this.bisData.exchangeRates.length > 0) {
      eerHtml = `
        <div class="bis-section">
          <div class="bis-section-title">${t('components.economic.realEer')}</div>
          <div class="economic-indicators">
            ${this.bisData.exchangeRates.map(r => {
        const color = r.realChange > 0 ? redColor : r.realChange < 0 ? greenColor : neutralColor;
        const arrow = r.realChange > 0 ? '▲' : r.realChange < 0 ? '▼' : '–';
        return `
                <div class="economic-indicator">
                  <div class="indicator-header">
                    <span class="indicator-name">${escapeHtml(r.countryName)}</span>
                    <span class="indicator-id">${escapeHtml(r.countryCode)}</span>
                  </div>
                  <div class="indicator-value">
                    <span class="value">${escapeHtml(String(r.realEer))}</span>
                    <span class="change" style="color: ${escapeHtml(color)}">${escapeHtml(arrow)} ${escapeHtml(String(r.realChange > 0 ? '+' : ''))}${escapeHtml(String(r.realChange))}%</span>
                  </div>
                  <div class="indicator-date">${escapeHtml(r.date)}</div>
                </div>`;
      }).join('')}
          </div>
        </div>
      `;
    }

    // Credit-to-GDP
    let creditHtml = '';
    if (this.bisData.creditToGdp.length > 0) {
      const sortedCredit = [...this.bisData.creditToGdp].sort((a, b) => b.creditGdpRatio - a.creditGdpRatio);
      creditHtml = `
        <div class="bis-section">
          <div class="bis-section-title">${t('components.economic.creditToGdp')}</div>
          <div class="economic-indicators">
            ${sortedCredit.map(r => {
        const diff = r.creditGdpRatio - r.previousRatio;
        const color = diff > 0 ? redColor : diff < 0 ? greenColor : neutralColor;
        const arrow = diff > 0 ? '▲' : diff < 0 ? '▼' : '–';
        const changeStr = diff !== 0 ? `${diff > 0 ? '+' : ''}${(Math.round(diff * 10) / 10)}pp` : '–';
        return `
                <div class="economic-indicator">
                  <div class="indicator-header">
                    <span class="indicator-name">${escapeHtml(r.countryName)}</span>
                    <span class="indicator-id">${escapeHtml(r.countryCode)}</span>
                  </div>
                  <div class="indicator-value">
                    <span class="value">${escapeHtml(String(r.creditGdpRatio))}%</span>
                    <span class="change" style="color: ${escapeHtml(color)}">${escapeHtml(arrow)} ${escapeHtml(changeStr)}</span>
                  </div>
                  <div class="indicator-date">${escapeHtml(r.date)}</div>
                </div>`;
      }).join('')}
          </div>
        </div>
      `;
    }

    return policyHtml + eerHtml + creditHtml;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }
}
