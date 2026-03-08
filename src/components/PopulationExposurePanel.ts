import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
import type { PopulationExposure } from '@/types';
import { formatPopulation } from '@/services/population-exposure';
<<<<<<< HEAD
=======
import { t } from '@/services/i18n';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export class PopulationExposurePanel extends Panel {
  private exposures: PopulationExposure[] = [];

  constructor() {
    super({
      id: 'population-exposure',
<<<<<<< HEAD
      title: 'Population Exposure',
      showCount: true,
      trackActivity: true,
      infoTooltip: `<strong>Population Exposure Estimates</strong>
        Estimated population within event impact radius.
        Based on WorldPop country density data.
        <ul>
          <li>Conflict: 50km radius</li>
          <li>Earthquake: 100km radius</li>
          <li>Flood: 100km radius</li>
          <li>Wildfire: 30km radius</li>
        </ul>`,
    });
    this.showLoading('Calculating exposure');
=======
      title: t('panels.populationExposure'),
      showCount: true,
      trackActivity: true,
      infoTooltip: t('components.populationExposure.infoTooltip'),
    });
    this.showLoading(t('common.calculatingExposure'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public setExposures(exposures: PopulationExposure[]): void {
    this.exposures = exposures;
    this.setCount(exposures.length);
    this.renderContent();
  }

  private renderContent(): void {
    if (this.exposures.length === 0) {
<<<<<<< HEAD
      this.setContent('<div class="panel-empty">No exposure data available</div>');
=======
      this.setContent(`<div class="panel-empty">${t('common.noDataAvailable')}</div>`);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    const totalAffected = this.exposures.reduce((sum, e) => sum + e.exposedPopulation, 0);

<<<<<<< HEAD
    const summaryHtml = `
      <div class="popexp-summary">
        <span class="popexp-total">Total Affected: <strong>${formatPopulation(totalAffected)}</strong></span>
      </div>
    `;

    const listHtml = this.exposures.slice(0, 30).map(e => {
      const typeIcon = this.getTypeIcon(e.eventType);
      return `
        <div class="popexp-event">
          <span class="popexp-icon">${typeIcon}</span>
          <span class="popexp-name">${escapeHtml(e.eventName.substring(0, 60))}</span>
          <span class="popexp-pop">${formatPopulation(e.exposedPopulation)}</span>
          <span class="popexp-radius">${e.exposureRadiusKm}km</span>
        </div>`;
    }).join('');

    this.setContent(`${summaryHtml}<div class="popexp-list">${listHtml}</div>`);
=======
    const cards = this.exposures.slice(0, 30).map(e => {
      const typeIcon = this.getTypeIcon(e.eventType);
      const popClass = e.exposedPopulation >= 1_000_000 ? ' popexp-pop-large' : '';
      return `<div class="popexp-card">
        <div class="popexp-card-name">${typeIcon} ${escapeHtml(e.eventName)}</div>
        <div class="popexp-card-meta">
          <span class="popexp-card-pop${popClass}">${t('components.populationExposure.affectedCount', { count: formatPopulation(e.exposedPopulation) })}</span>
          <span class="popexp-card-radius">${t('components.populationExposure.radiusKm', { km: String(e.exposureRadiusKm) })}</span>
        </div>
      </div>`;
    }).join('');

    this.setContent(`
      <div class="popexp-panel-content">
        <div class="popexp-summary">
          <span class="popexp-label">${t('components.populationExposure.totalAffected')}</span>
          <span class="popexp-total">${formatPopulation(totalAffected)}</span>
        </div>
        <div class="popexp-list">${cards}</div>
      </div>
    `);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  private getTypeIcon(type: string): string {
    switch (type) {
      case 'state-based':
      case 'non-state':
      case 'one-sided':
      case 'conflict':
      case 'battle':
<<<<<<< HEAD
        return '⚔️';
      case 'earthquake':
        return '🌍';
      case 'flood':
        return '🌊';
      case 'fire':
      case 'wildfire':
        return '🔥';
      default:
        return '📍';
=======
        return '\u2694\uFE0F';
      case 'earthquake':
        return '\uD83C\uDF0D';
      case 'flood':
        return '\uD83C\uDF0A';
      case 'fire':
      case 'wildfire':
        return '\uD83D\uDD25';
      default:
        return '\uD83D\uDCCD';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }
  }
}
