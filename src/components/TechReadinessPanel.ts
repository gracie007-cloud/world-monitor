import { Panel } from './Panel';
<<<<<<< HEAD
import { getTechReadinessRankings, type TechReadinessScore } from '@/services/worldbank';
=======
import { t } from '@/services/i18n';
import { getTechReadinessRankings, type TechReadinessScore } from '@/services/economic';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
import { escapeHtml } from '@/utils/sanitize';

const COUNTRY_FLAGS: Record<string, string> = {
  'USA': '🇺🇸', 'CHN': '🇨🇳', 'JPN': '🇯🇵', 'DEU': '🇩🇪', 'KOR': '🇰🇷',
  'GBR': '🇬🇧', 'IND': '🇮🇳', 'ISR': '🇮🇱', 'SGP': '🇸🇬', 'TWN': '🇹🇼',
  'FRA': '🇫🇷', 'CAN': '🇨🇦', 'SWE': '🇸🇪', 'NLD': '🇳🇱', 'CHE': '🇨🇭',
  'FIN': '🇫🇮', 'IRL': '🇮🇪', 'AUS': '🇦🇺', 'BRA': '🇧🇷', 'IDN': '🇮🇩',
  'ESP': '🇪🇸', 'ITA': '🇮🇹', 'MEX': '🇲🇽', 'RUS': '🇷🇺', 'TUR': '🇹🇷',
  'SAU': '🇸🇦', 'ARE': '🇦🇪', 'POL': '🇵🇱', 'THA': '🇹🇭', 'MYS': '🇲🇾',
  'VNM': '🇻🇳', 'PHL': '🇵🇭', 'NZL': '🇳🇿', 'AUT': '🇦🇹', 'BEL': '🇧🇪',
  'DNK': '🇩🇰', 'NOR': '🇳🇴', 'PRT': '🇵🇹', 'CZE': '🇨🇿', 'ZAF': '🇿🇦',
  'NGA': '🇳🇬', 'KEN': '🇰🇪', 'EGY': '🇪🇬', 'ARG': '🇦🇷', 'CHL': '🇨🇱',
  'COL': '🇨🇴', 'PAK': '🇵🇰', 'BGD': '🇧🇩', 'UKR': '🇺🇦', 'ROU': '🇷🇴',
  'EST': '🇪🇪', 'LVA': '🇱🇻', 'LTU': '🇱🇹', 'HUN': '🇭🇺', 'GRC': '🇬🇷',
  'QAT': '🇶🇦', 'BHR': '🇧🇭', 'KWT': '🇰🇼', 'OMN': '🇴🇲', 'JOR': '🇯🇴',
};

export class TechReadinessPanel extends Panel {
  private rankings: TechReadinessScore[] = [];
  private loading = false;
  private lastFetch = 0;
  private readonly REFRESH_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

  constructor() {
    super({
      id: 'tech-readiness',
<<<<<<< HEAD
      title: 'Tech Readiness Index',
      showCount: true,
      infoTooltip: `
        <strong>Global Tech Readiness</strong><br>
        Composite score (0-100) based on World Bank data:<br><br>
        <strong>Metrics shown:</strong><br>
        🌐 Internet Users (% of population)<br>
        📱 Mobile Subscriptions (per 100 people)<br>
        🔬 R&D Expenditure (% of GDP)<br><br>
        <strong>Weights:</strong> R&D (35%), Internet (30%), Broadband (20%), Mobile (15%)<br><br>
        <em>— = No recent data available</em><br>
        <em>Source: World Bank Open Data (2019-2024)</em>
      `,
=======
      title: t('panels.techReadiness'),
      showCount: true,
      infoTooltip: t('components.techReadiness.infoTooltip'),
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    });
  }

  public async refresh(): Promise<void> {
    if (this.loading) return;
    if (Date.now() - this.lastFetch < this.REFRESH_INTERVAL && this.rankings.length > 0) {
      return;
    }

    this.loading = true;
    this.showFetchingState();

    try {
      this.rankings = await getTechReadinessRankings();
<<<<<<< HEAD
=======
      if (!this.element?.isConnected) return;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      this.lastFetch = Date.now();
      this.setCount(this.rankings.length);
      this.render();
    } catch (error) {
<<<<<<< HEAD
      console.error('[TechReadinessPanel] Error fetching data:', error);
      this.showError('Failed to load tech readiness data');
=======
      if (!this.element?.isConnected) return;
      console.error('[TechReadinessPanel] Error fetching data:', error);
      this.showError(t('common.failedTechReadiness'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    } finally {
      this.loading = false;
    }
  }

  private showFetchingState(): void {
    this.setContent(`
      <div class="tech-fetch-progress">
        <div class="tech-fetch-icon">
          <div class="tech-globe-ring"></div>
          <span class="tech-globe">🌐</span>
        </div>
<<<<<<< HEAD
        <div class="tech-fetch-title">Fetching World Bank Data</div>
        <div class="tech-fetch-indicators">
          <div class="tech-indicator-item" style="animation-delay: 0s">
            <span class="tech-indicator-icon">🌐</span>
            <span class="tech-indicator-name">Internet Users</span>
=======
        <div class="tech-fetch-title">${t('components.techReadiness.fetchingData')}</div>
        <div class="tech-fetch-indicators">
          <div class="tech-indicator-item" style="animation-delay: 0s">
            <span class="tech-indicator-icon">🌐</span>
            <span class="tech-indicator-name">${t('components.techReadiness.internetUsersIndicator')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <span class="tech-indicator-status"></span>
          </div>
          <div class="tech-indicator-item" style="animation-delay: 0.2s">
            <span class="tech-indicator-icon">📱</span>
<<<<<<< HEAD
            <span class="tech-indicator-name">Mobile Subscriptions</span>
=======
            <span class="tech-indicator-name">${t('components.techReadiness.mobileSubscriptionsIndicator')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <span class="tech-indicator-status"></span>
          </div>
          <div class="tech-indicator-item" style="animation-delay: 0.4s">
            <span class="tech-indicator-icon">📡</span>
<<<<<<< HEAD
            <span class="tech-indicator-name">Broadband Access</span>
=======
            <span class="tech-indicator-name">${t('components.techReadiness.broadbandAccess')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <span class="tech-indicator-status"></span>
          </div>
          <div class="tech-indicator-item" style="animation-delay: 0.6s">
            <span class="tech-indicator-icon">🔬</span>
<<<<<<< HEAD
            <span class="tech-indicator-name">R&D Expenditure</span>
            <span class="tech-indicator-status"></span>
          </div>
        </div>
        <div class="tech-fetch-note">Analyzing 200+ countries...</div>
=======
            <span class="tech-indicator-name">${t('components.techReadiness.rdExpenditure')}</span>
            <span class="tech-indicator-status"></span>
          </div>
        </div>
        <div class="tech-fetch-note">${t('components.techReadiness.analyzingCountries')}</div>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      </div>
    `);
  }

  private getFlag(countryCode: string): string {
    return COUNTRY_FLAGS[countryCode] || '🌐';
  }

  private getScoreClass(score: number): string {
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }

  private formatComponent(value: number | null): string {
    if (value === null) return '—';
    return Math.round(value).toString();
  }

  private render(): void {
    if (this.rankings.length === 0) {
<<<<<<< HEAD
      this.showError('No data available');
=======
      this.showError(t('common.noDataAvailable'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    // Show top 25 countries
    const top = this.rankings.slice(0, 25);

    const html = `
      <div class="tech-readiness-list">
        ${top.map(country => {
<<<<<<< HEAD
          const scoreClass = this.getScoreClass(country.score);
          return `
=======
      const scoreClass = this.getScoreClass(country.score);
      return `
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
            <div class="readiness-item ${scoreClass}" data-country="${escapeHtml(country.country)}">
              <div class="readiness-rank">#${country.rank}</div>
              <div class="readiness-flag">${this.getFlag(country.country)}</div>
              <div class="readiness-info">
                <div class="readiness-name">${escapeHtml(country.countryName)}</div>
                <div class="readiness-components">
<<<<<<< HEAD
                  <span title="Internet Users">🌐${this.formatComponent(country.components.internet)}</span>
                  <span title="Mobile Subscriptions">📱${this.formatComponent(country.components.mobile)}</span>
                  <span title="R&D Spending">🔬${this.formatComponent(country.components.rdSpend)}</span>
=======
                  <span title="${t('components.techReadiness.internetUsers')}">🌐${this.formatComponent(country.components.internet)}</span>
                  <span title="${t('components.techReadiness.mobileSubscriptions')}">📱${this.formatComponent(country.components.mobile)}</span>
                  <span title="${t('components.techReadiness.rdSpending')}">🔬${this.formatComponent(country.components.rdSpend)}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
                </div>
              </div>
              <div class="readiness-score ${scoreClass}">${country.score}</div>
            </div>
          `;
<<<<<<< HEAD
        }).join('')}
      </div>
      <div class="readiness-footer">
        <span class="readiness-source">Source: World Bank</span>
        <span class="readiness-updated">Updated: ${new Date(this.lastFetch).toLocaleDateString()}</span>
=======
    }).join('')}
      </div>
      <div class="readiness-footer">
        <span class="readiness-source">${t('components.techReadiness.source')}</span>
        <span class="readiness-updated">${t('components.techReadiness.updated', { date: new Date(this.lastFetch).toLocaleDateString() })}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      </div>
    `;

    this.setContent(html);
  }
}
