import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
<<<<<<< HEAD
import type { ClimateAnomaly } from '@/types';
import { getSeverityColor, getSeverityIcon, formatDelta } from '@/services/climate';
=======
import { type ClimateAnomaly, getSeverityIcon, formatDelta } from '@/services/climate';
import { t } from '@/services/i18n';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export class ClimateAnomalyPanel extends Panel {
  private anomalies: ClimateAnomaly[] = [];
  private onZoneClick?: (lat: number, lon: number) => void;

  constructor() {
    super({
      id: 'climate',
<<<<<<< HEAD
      title: 'Climate Anomalies',
      showCount: true,
      trackActivity: true,
      infoTooltip: `<strong>Climate Anomaly Monitor</strong>
        Temperature and precipitation deviations from 30-day baseline.
        Data from Open-Meteo (ERA5 reanalysis).
        <ul>
          <li><strong>Extreme</strong>: >5°C or >80mm/day deviation</li>
          <li><strong>Moderate</strong>: >3°C or >40mm/day deviation</li>
        </ul>
        Monitors 15 conflict/disaster-prone zones.`,
    });
    this.showLoading('Loading climate data');
=======
      title: t('panels.climate'),
      showCount: true,
      trackActivity: true,
      infoTooltip: t('components.climate.infoTooltip'),
    });
    this.showLoading(t('common.loadingClimateData'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public setZoneClickHandler(handler: (lat: number, lon: number) => void): void {
    this.onZoneClick = handler;
  }

  public setAnomalies(anomalies: ClimateAnomaly[]): void {
    this.anomalies = anomalies;
    this.setCount(anomalies.length);
    this.renderContent();
  }

  private renderContent(): void {
    if (this.anomalies.length === 0) {
<<<<<<< HEAD
      this.setContent('<div class="panel-empty">No significant anomalies detected</div>');
=======
      this.setContent(`<div class="panel-empty">${t('components.climate.noAnomalies')}</div>`);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    const sorted = [...this.anomalies].sort((a, b) => {
      const severityOrder = { extreme: 0, moderate: 1, normal: 2 };
      return (severityOrder[a.severity] || 2) - (severityOrder[b.severity] || 2);
    });

<<<<<<< HEAD
    const listHtml = sorted.map(a => {
      const color = getSeverityColor(a);
      const icon = getSeverityIcon(a);
      const bgColor = a.severity === 'extreme'
        ? (a.type === 'cold' ? 'rgba(68,136,255,0.1)' : 'rgba(255,68,68,0.1)')
        : 'transparent';

      return `
        <div class="climate-zone" data-lat="${a.lat}" data-lon="${a.lon}" style="background:${bgColor}">
          <div class="climate-zone-header">
            <span class="climate-icon">${icon}</span>
            <span class="climate-name">${escapeHtml(a.zone)}</span>
            <span class="climate-severity" style="color:${color}">${a.severity.toUpperCase()}</span>
          </div>
          <div class="climate-deltas">
            <span class="climate-temp" style="color:${a.tempDelta > 0 ? '#ff6644' : '#4488ff'}">${formatDelta(a.tempDelta, '°C')}</span>
            <span class="climate-precip" style="color:${a.precipDelta > 0 ? '#4488ff' : '#ff8844'}">${formatDelta(a.precipDelta, 'mm')}</span>
          </div>
        </div>`;
    }).join('');

    this.setContent(`<div class="climate-list">${listHtml}</div>`);

    this.content.querySelectorAll('.climate-zone').forEach(el => {
=======
    const rows = sorted.map(a => {
      const icon = getSeverityIcon(a);
      const tempClass = a.tempDelta > 0 ? 'climate-warm' : 'climate-cold';
      const precipClass = a.precipDelta > 0 ? 'climate-wet' : 'climate-dry';
      const sevClass = `severity-${a.severity}`;
      const rowClass = a.severity === 'extreme' ? ' climate-extreme-row' : '';

      return `<tr class="climate-row${rowClass}" data-lat="${a.lat}" data-lon="${a.lon}">
        <td class="climate-zone"><span class="climate-icon">${icon}</span>${escapeHtml(a.zone)}</td>
        <td class="climate-num ${tempClass}">${formatDelta(a.tempDelta, '°C')}</td>
        <td class="climate-num ${precipClass}">${formatDelta(a.precipDelta, 'mm')}</td>
        <td><span class="climate-badge ${sevClass}">${t(`components.climate.severity.${a.severity}`)}</span></td>
      </tr>`;
    }).join('');

    this.setContent(`
      <div class="climate-panel-content">
        <table class="climate-table">
          <thead>
            <tr>
              <th>${t('components.climate.zone')}</th>
              <th>${t('components.climate.temp')}</th>
              <th>${t('components.climate.precip')}</th>
              <th>${t('components.climate.severityLabel')}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);

    this.content.querySelectorAll('.climate-row').forEach(el => {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      el.addEventListener('click', () => {
        const lat = Number((el as HTMLElement).dataset.lat);
        const lon = Number((el as HTMLElement).dataset.lon);
        if (Number.isFinite(lat) && Number.isFinite(lon)) this.onZoneClick?.(lat, lon);
      });
    });
  }
}
