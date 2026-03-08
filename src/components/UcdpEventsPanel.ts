import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
import type { UcdpGeoEvent, UcdpEventType } from '@/types';
<<<<<<< HEAD
=======
import { t } from '@/services/i18n';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export class UcdpEventsPanel extends Panel {
  private events: UcdpGeoEvent[] = [];
  private activeTab: UcdpEventType = 'state-based';
  private onEventClick?: (lat: number, lon: number) => void;

  constructor() {
    super({
      id: 'ucdp-events',
<<<<<<< HEAD
      title: 'UCDP Conflict Events',
      showCount: true,
      trackActivity: true,
      infoTooltip: `<strong>UCDP Georeferenced Events</strong>
        Event-level conflict data from Uppsala University.
        <ul>
          <li><strong>State-Based</strong>: Government vs rebel group</li>
          <li><strong>Non-State</strong>: Armed group vs armed group</li>
          <li><strong>One-Sided</strong>: Violence against civilians</li>
        </ul>
        Deaths shown as best estimate (low-high range).
        ACLED duplicates are filtered out automatically.`,
    });
    this.showLoading('Loading UCDP events');
=======
      title: t('panels.ucdpEvents'),
      showCount: true,
      trackActivity: true,
      infoTooltip: t('components.ucdpEvents.infoTooltip'),
    });
    this.showLoading(t('common.loadingUcdpEvents'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public setEventClickHandler(handler: (lat: number, lon: number) => void): void {
    this.onEventClick = handler;
  }

  public setEvents(events: UcdpGeoEvent[]): void {
    this.events = events;
    this.setCount(events.length);
    this.renderContent();
  }

  public getEvents(): UcdpGeoEvent[] {
    return this.events;
  }

<<<<<<< HEAD
  private getTypeColor(type: UcdpEventType): string {
    switch (type) {
      case 'state-based': return '#ff4444';
      case 'non-state': return '#ff8800';
      case 'one-sided': return '#ffcc00';
    }
  }

  private renderContent(): void {
    const filtered = this.events.filter(e => e.type_of_violence === this.activeTab);
    const tabs = [
      { key: 'state-based' as UcdpEventType, label: 'State-Based' },
      { key: 'non-state' as UcdpEventType, label: 'Non-State' },
      { key: 'one-sided' as UcdpEventType, label: 'One-Sided' },
    ];

    const tabCounts = {
      'state-based': this.events.filter(e => e.type_of_violence === 'state-based').length,
      'non-state': this.events.filter(e => e.type_of_violence === 'non-state').length,
      'one-sided': this.events.filter(e => e.type_of_violence === 'one-sided').length,
    };

    const tabsHtml = tabs.map(t =>
      `<button class="panel-tab ${t.key === this.activeTab ? 'active' : ''}" data-tab="${t.key}">${t.label} (${tabCounts[t.key]})</button>`
    ).join('');

    const displayed = filtered.slice(0, 50);
    const eventsHtml = displayed.length === 0
      ? '<div class="panel-empty">No events in this category</div>'
      : displayed.map(e => {
        const deathsBadge = e.deaths_best > 0
          ? `<span class="ucdp-deaths" style="color:${this.getTypeColor(e.type_of_violence)}">${e.deaths_best} <small>(${e.deaths_low}-${e.deaths_high})</small></span>`
          : '<span class="ucdp-deaths dim">0</span>';

        return `
          <div class="ucdp-event" data-lat="${e.latitude}" data-lon="${e.longitude}">
            <div class="ucdp-event-header">
              <span class="ucdp-location">${escapeHtml(e.country)}</span>
              <span class="ucdp-date">${e.date_start}</span>
              ${deathsBadge}
            </div>
            <div class="ucdp-actors">
              <span class="ucdp-side-a">${escapeHtml(e.side_a.substring(0, 60))}</span>
              <span class="ucdp-vs">vs</span>
              <span class="ucdp-side-b">${escapeHtml(e.side_b.substring(0, 60))}</span>
            </div>
          </div>`;
      }).join('');

    const moreHtml = filtered.length > 50
      ? `<div class="panel-more">${filtered.length - 50} more events not shown</div>`
      : '';

    this.setContent(`
      <div class="ucdp-tabs">${tabsHtml}</div>
      <div class="ucdp-events-list">${eventsHtml}${moreHtml}</div>
    `);

    this.content.querySelectorAll('.panel-tab').forEach(btn => {
=======
  private renderContent(): void {
    const filtered = this.events.filter(e => e.type_of_violence === this.activeTab);
    const tabs: { key: UcdpEventType; label: string }[] = [
      { key: 'state-based', label: t('components.ucdpEvents.stateBased') },
      { key: 'non-state', label: t('components.ucdpEvents.nonState') },
      { key: 'one-sided', label: t('components.ucdpEvents.oneSided') },
    ];

    const tabCounts: Record<UcdpEventType, number> = {
      'state-based': 0,
      'non-state': 0,
      'one-sided': 0,
    };
    for (const event of this.events) {
      tabCounts[event.type_of_violence] += 1;
    }

    const totalDeaths = filtered.reduce((sum, e) => sum + e.deaths_best, 0);

    const tabsHtml = tabs.map(t =>
      `<button class="ucdp-tab ${t.key === this.activeTab ? 'ucdp-tab-active' : ''}" data-tab="${t.key}">${t.label} <span class="ucdp-tab-count">${tabCounts[t.key]}</span></button>`
    ).join('');

    const displayed = filtered.slice(0, 50);
    let bodyHtml: string;

    if (displayed.length === 0) {
      bodyHtml = `<div class="panel-empty">${t('common.noEventsInCategory')}</div>`;
    } else {
      const rows = displayed.map(e => {
        const deathsClass = e.type_of_violence === 'state-based' ? 'ucdp-deaths-state'
          : e.type_of_violence === 'non-state' ? 'ucdp-deaths-nonstate'
            : 'ucdp-deaths-onesided';
        const deathsHtml = e.deaths_best > 0
          ? `<span class="${deathsClass}">${e.deaths_best}</span> <small class="ucdp-range">(${e.deaths_low}-${e.deaths_high})</small>`
          : '<span class="ucdp-deaths-zero">0</span>';
        const actors = `${escapeHtml(e.side_a)} vs ${escapeHtml(e.side_b)}`;

        return `<tr class="ucdp-row" data-lat="${e.latitude}" data-lon="${e.longitude}">
          <td class="ucdp-country">${escapeHtml(e.country)}</td>
          <td class="ucdp-deaths">${deathsHtml}</td>
          <td class="ucdp-date">${e.date_start}</td>
          <td class="ucdp-actors">${actors}</td>
        </tr>`;
      }).join('');

      bodyHtml = `
        <table class="ucdp-table">
          <thead>
            <tr>
              <th>${t('components.ucdpEvents.country')}</th>
              <th>${t('components.ucdpEvents.deaths')}</th>
              <th>${t('components.ucdpEvents.date')}</th>
              <th>${t('components.ucdpEvents.actors')}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>`;
    }

    const moreHtml = filtered.length > 50
      ? `<div class="panel-more">${t('components.ucdpEvents.moreNotShown', { count: filtered.length - 50 })}</div>`
      : '';

    this.setContent(`
      <div class="ucdp-panel-content">
        <div class="ucdp-header">
          <div class="ucdp-tabs">${tabsHtml}</div>
          ${totalDeaths > 0 ? `<span class="ucdp-total-deaths">${t('components.ucdpEvents.deathsCount', { count: totalDeaths.toLocaleString() })}</span>` : ''}
        </div>
        ${bodyHtml}
        ${moreHtml}
      </div>
    `);

    this.content.querySelectorAll('.ucdp-tab').forEach(btn => {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      btn.addEventListener('click', () => {
        this.activeTab = (btn as HTMLElement).dataset.tab as UcdpEventType;
        this.renderContent();
      });
    });

<<<<<<< HEAD
    this.content.querySelectorAll('.ucdp-event').forEach(el => {
=======
    this.content.querySelectorAll('.ucdp-row').forEach(el => {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      el.addEventListener('click', () => {
        const lat = Number((el as HTMLElement).dataset.lat);
        const lon = Number((el as HTMLElement).dataset.lon);
        if (Number.isFinite(lat) && Number.isFinite(lon)) this.onEventClick?.(lat, lon);
      });
    });
  }
}
