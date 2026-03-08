import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
<<<<<<< HEAD
import type { UnhcrSummary, CountryDisplacement } from '@/types';
import { formatPopulation, getDisplacementBadge } from '@/services/unhcr';
=======
import type { UnhcrSummary, CountryDisplacement } from '@/services/displacement';
import { formatPopulation } from '@/services/displacement';
import { t } from '@/services/i18n';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

type DisplacementTab = 'origins' | 'hosts';

export class DisplacementPanel extends Panel {
  private data: UnhcrSummary | null = null;
  private activeTab: DisplacementTab = 'origins';
  private onCountryClick?: (lat: number, lon: number) => void;

  constructor() {
    super({
      id: 'displacement',
<<<<<<< HEAD
      title: 'UNHCR Displacement',
      showCount: true,
      trackActivity: true,
      infoTooltip: `<strong>UNHCR Displacement Data</strong>
        Global refugee, asylum seeker, and IDP counts from UNHCR.
        <ul>
          <li><strong>Origins</strong>: Countries people flee FROM</li>
          <li><strong>Hosts</strong>: Countries hosting refugees</li>
          <li>Crisis badges: 🔴 >1M | 🟠 >500K displaced</li>
        </ul>
        Data updates yearly. CC BY 4.0 license.`,
    });
    this.showLoading('Loading displacement data');
=======
      title: t('panels.displacement'),
      showCount: true,
      trackActivity: true,
      infoTooltip: t('components.displacement.infoTooltip'),
    });
    this.showLoading(t('common.loadingDisplacement'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public setCountryClickHandler(handler: (lat: number, lon: number) => void): void {
    this.onCountryClick = handler;
  }

  public setData(data: UnhcrSummary): void {
    this.data = data;
    this.setCount(data.countries.length);
    this.renderContent();
  }

  private renderContent(): void {
    if (!this.data) return;

    const g = this.data.globalTotals;
<<<<<<< HEAD
    const summaryHtml = `
      <div class="displacement-summary">
        <span class="disp-stat"><strong>${formatPopulation(g.refugees)}</strong> refugees</span>
        <span class="disp-stat"><strong>${formatPopulation(g.asylumSeekers)}</strong> asylum seekers</span>
        <span class="disp-stat"><strong>${formatPopulation(g.idps)}</strong> IDPs</span>
        <span class="disp-total">${formatPopulation(g.total)} total</span>
      </div>
    `;

    const tabsHtml = `
      <div class="displacement-tabs">
        <button class="panel-tab ${this.activeTab === 'origins' ? 'active' : ''}" data-tab="origins">Origins</button>
        <button class="panel-tab ${this.activeTab === 'hosts' ? 'active' : ''}" data-tab="hosts">Hosts</button>
=======

    const stats = [
      { label: t('components.displacement.refugees'), value: formatPopulation(g.refugees), cls: 'disp-stat-refugees' },
      { label: t('components.displacement.asylumSeekers'), value: formatPopulation(g.asylumSeekers), cls: 'disp-stat-asylum' },
      { label: t('components.displacement.idps'), value: formatPopulation(g.idps), cls: 'disp-stat-idps' },
      { label: t('components.displacement.total'), value: formatPopulation(g.total), cls: 'disp-stat-total' },
    ];

    const statsHtml = stats.map(s =>
      `<div class="disp-stat-box ${s.cls}">
        <span class="disp-stat-value">${s.value}</span>
        <span class="disp-stat-label">${s.label}</span>
      </div>`
    ).join('');

    const tabsHtml = `
      <div class="disp-tabs" role="tablist" aria-label="Displacement data view">
        <button class="disp-tab ${this.activeTab === 'origins' ? 'disp-tab-active' : ''}" data-tab="origins" role="tab" aria-selected="${this.activeTab === 'origins'}" id="disp-tab-origins" aria-controls="disp-tab-panel">${t('components.displacement.origins')}</button>
        <button class="disp-tab ${this.activeTab === 'hosts' ? 'disp-tab-active' : ''}" data-tab="hosts" role="tab" aria-selected="${this.activeTab === 'hosts'}" id="disp-tab-hosts" aria-controls="disp-tab-panel">${t('components.displacement.hosts')}</button>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      </div>
    `;

    let countries: CountryDisplacement[];
    if (this.activeTab === 'origins') {
      countries = [...this.data.countries]
        .filter(c => c.refugees + c.asylumSeekers > 0)
        .sort((a, b) => (b.refugees + b.asylumSeekers) - (a.refugees + a.asylumSeekers));
    } else {
      countries = [...this.data.countries]
        .filter(c => (c.hostTotal || 0) > 0)
        .sort((a, b) => (b.hostTotal || 0) - (a.hostTotal || 0));
    }

    const displayed = countries.slice(0, 30);
<<<<<<< HEAD
    const listHtml = displayed.length === 0
      ? '<div class="panel-empty">No data</div>'
      : displayed.map(c => {
        const hostTotal = c.hostTotal || 0;
        const badge = getDisplacementBadge(this.activeTab === 'origins' ? c.totalDisplaced : hostTotal);
        const badgeHtml = badge.label
          ? `<span class="disp-badge" style="background:${badge.color}">${badge.label}</span>`
          : '';
        const primary = this.activeTab === 'origins'
          ? formatPopulation(c.refugees + c.asylumSeekers)
          : formatPopulation(hostTotal);

        return `
          <div class="disp-country" data-lat="${c.lat || ''}" data-lon="${c.lon || ''}">
            <span class="disp-name">${escapeHtml(c.name)}</span>
            ${badgeHtml}
            <span class="disp-count">${primary}</span>
          </div>`;
      }).join('');

    this.setContent(`${summaryHtml}${tabsHtml}<div class="displacement-list">${listHtml}</div>`);

    this.content.querySelectorAll('.panel-tab').forEach(btn => {
=======
    let tableHtml: string;

    if (displayed.length === 0) {
      tableHtml = `<div class="panel-empty">${t('common.noDataShort')}</div>`;
    } else {
      const rows = displayed.map(c => {
        const hostTotal = c.hostTotal || 0;
        const count = this.activeTab === 'origins' ? c.refugees + c.asylumSeekers : hostTotal;
        const total = this.activeTab === 'origins' ? c.totalDisplaced : hostTotal;
        const badgeCls = total >= 1_000_000 ? 'disp-crisis'
          : total >= 500_000 ? 'disp-high'
            : total >= 100_000 ? 'disp-elevated'
              : '';
        const badgeLabel = total >= 1_000_000 ? t('components.displacement.badges.crisis')
          : total >= 500_000 ? t('components.displacement.badges.high')
            : total >= 100_000 ? t('components.displacement.badges.elevated')
              : '';
        const badgeHtml = badgeLabel
          ? `<span class="disp-badge ${badgeCls}">${badgeLabel}</span>`
          : '';

        return `<tr class="disp-row" data-lat="${c.lat || ''}" data-lon="${c.lon || ''}">
          <td class="disp-name">${escapeHtml(c.name)}</td>
          <td class="disp-status">${badgeHtml}</td>
          <td class="disp-count">${formatPopulation(count)}</td>
        </tr>`;
      }).join('');

      tableHtml = `
        <table class="disp-table">
          <thead>
            <tr>
              <th>${t('components.displacement.country')}</th>
              <th>${t('components.displacement.status')}</th>
              <th>${t('components.displacement.count')}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>`;
    }

    this.setContent(`
      <div class="disp-panel-content">
        <div class="disp-stats-grid">${statsHtml}</div>
        ${tabsHtml}
        <div id="disp-tab-panel" role="tabpanel" aria-labelledby="disp-tab-${this.activeTab}">
          ${tableHtml}
        </div>
      </div>
    `);

    this.content.querySelectorAll('.disp-tab').forEach(btn => {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      btn.addEventListener('click', () => {
        this.activeTab = (btn as HTMLElement).dataset.tab as DisplacementTab;
        this.renderContent();
      });
    });

<<<<<<< HEAD
    this.content.querySelectorAll('.disp-country').forEach(el => {
=======
    this.content.querySelectorAll('.disp-row').forEach(el => {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      el.addEventListener('click', () => {
        const lat = Number((el as HTMLElement).dataset.lat);
        const lon = Number((el as HTMLElement).dataset.lon);
        if (Number.isFinite(lat) && Number.isFinite(lon)) this.onCountryClick?.(lat, lon);
      });
    });
  }
}
