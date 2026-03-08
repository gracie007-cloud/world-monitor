import { Panel } from './Panel';
<<<<<<< HEAD
import { escapeHtml, sanitizeUrl } from '@/utils/sanitize';

interface TechEventCoords {
  lat: number;
  lng: number;
  country: string;
  original: string;
  virtual?: boolean;
}

interface TechEvent {
  id: string;
  title: string;
  type: 'conference' | 'earnings' | 'ipo' | 'other';
  location: string | null;
  coords: TechEventCoords | null;
  startDate: string;
  endDate: string;
  url: string | null;
}

interface TechEventsResponse {
  success: boolean;
  count: number;
  conferenceCount: number;
  mappableCount: number;
  lastUpdated: string;
  events: TechEvent[];
  error?: string;
}

type ViewMode = 'upcoming' | 'conferences' | 'earnings' | 'all';

=======
import { t } from '@/services/i18n';
import { sanitizeUrl } from '@/utils/sanitize';
import { h, replaceChildren } from '@/utils/dom-utils';
import { isDesktopRuntime } from '@/services/runtime';
import { ResearchServiceClient } from '@/generated/client/worldmonitor/research/v1/service_client';
import type { TechEvent } from '@/generated/client/worldmonitor/research/v1/service_client';
import type { NewsItem, DeductContextDetail } from '@/types';
import { buildNewsContext } from '@/utils/news-context';

type ViewMode = 'upcoming' | 'conferences' | 'earnings' | 'all';

const researchClient = new ResearchServiceClient('', { fetch: (...args) => globalThis.fetch(...args) });

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
export class TechEventsPanel extends Panel {
  private viewMode: ViewMode = 'upcoming';
  private events: TechEvent[] = [];
  private loading = true;
  private error: string | null = null;

<<<<<<< HEAD
  constructor(id: string) {
    super({ id, title: 'Tech Events', showCount: true });
=======
  constructor(id: string, private getLatestNews?: () => NewsItem[]) {
    super({ id, title: t('panels.events'), showCount: true });
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    this.element.classList.add('panel-tall');
    void this.fetchEvents();
  }

  private async fetchEvents(): Promise<void> {
    this.loading = true;
    this.error = null;
    this.render();

<<<<<<< HEAD
    try {
      const res = await fetch('/api/tech-events?days=180&limit=100');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: TechEventsResponse = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');

      this.events = data.events;
      this.setCount(data.conferenceCount);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch events';
      console.error('[TechEvents] Fetch error:', err);
    } finally {
      this.loading = false;
      this.render();
    }
=======
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await researchClient.listTechEvents({
          type: '',
          mappable: false,
          days: 180,
          limit: 100,
        });
        if (!this.element?.isConnected) return;
        if (!data.success) throw new Error(data.error || 'Unknown error');

        this.events = data.events;
        this.setCount(data.conferenceCount);
        this.error = null;

        if (this.events.length === 0 && attempt < 2) {
          this.showRetrying();
          await new Promise(r => setTimeout(r, 15_000));
          if (!this.element?.isConnected) return;
          continue;
        }
        break;
      } catch (err) {
        if (this.isAbortError(err)) return;
        if (!this.element?.isConnected) return;
        if (attempt < 2) {
          this.showRetrying();
          await new Promise(r => setTimeout(r, 15_000));
          if (!this.element?.isConnected) return;
          continue;
        }
        this.error = err instanceof Error ? err.message : 'Failed to fetch events';
        console.error('[TechEvents] Fetch error:', err);
      }
    }
    this.loading = false;
    this.render();
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  protected render(): void {
    if (this.loading) {
<<<<<<< HEAD
      this.content.innerHTML = `
        <div class="tech-events-loading">
          <div class="loading-spinner"></div>
          <span>Loading tech events...</span>
        </div>
      `;
=======
      replaceChildren(this.content,
        h('div', { className: 'tech-events-loading' },
          h('div', { className: 'loading-spinner' }),
          h('span', null, t('components.techEvents.loading')),
        ),
      );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    if (this.error) {
<<<<<<< HEAD
      this.content.innerHTML = `
        <div class="tech-events-error">
          <span class="error-icon">⚠️</span>
          <span class="error-text">${escapeHtml(this.error)}</span>
          <button class="retry-btn" onclick="this.closest('.panel').querySelector('.panel-content').__panel?.refresh()">Retry</button>
        </div>
      `;
=======
      replaceChildren(this.content,
        h('div', { className: 'tech-events-error' },
          h('span', { className: 'error-icon' }, '⚠️'),
          h('span', { className: 'error-text' }, this.error),
          h('button', { className: 'retry-btn', onClick: () => this.refresh() }, t('common.retry')),
        ),
      );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    const filteredEvents = this.getFilteredEvents();
    const upcomingConferences = this.events.filter(e => e.type === 'conference' && new Date(e.startDate) >= new Date());
    const mappableCount = upcomingConferences.filter(e => e.coords && !e.coords.virtual).length;

<<<<<<< HEAD
    this.content.innerHTML = `
      <div class="tech-events-panel">
        <div class="tech-events-tabs">
          <button class="tab ${this.viewMode === 'upcoming' ? 'active' : ''}" data-view="upcoming">Upcoming</button>
          <button class="tab ${this.viewMode === 'conferences' ? 'active' : ''}" data-view="conferences">Conferences</button>
          <button class="tab ${this.viewMode === 'earnings' ? 'active' : ''}" data-view="earnings">Earnings</button>
          <button class="tab ${this.viewMode === 'all' ? 'active' : ''}" data-view="all">All</button>
        </div>
        <div class="tech-events-stats">
          <span class="stat">📅 ${upcomingConferences.length} conferences</span>
          <span class="stat">📍 ${mappableCount} on map</span>
          <a href="https://www.techmeme.com/events" target="_blank" rel="noopener" class="source-link">Techmeme Events ↗</a>
        </div>
        <div class="tech-events-list">
          ${filteredEvents.length > 0
            ? filteredEvents.map(e => this.renderEvent(e)).join('')
            : '<div class="empty-state">No events to display</div>'
          }
        </div>
      </div>
    `;

    // Add tab listeners
    this.content.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = (e.target as HTMLElement).dataset.view as ViewMode;
        if (view) {
          this.viewMode = view;
          this.render();
        }
      });
    });

    // Add map link listeners
    this.content.querySelectorAll('.event-map-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = parseFloat((link as HTMLElement).dataset.lat || '0');
        const lng = parseFloat((link as HTMLElement).dataset.lng || '0');
        this.panToLocation(lat, lng);
      });
    });
=======
    const tabEntries: [ViewMode, string][] = [
      ['upcoming', t('components.techEvents.upcoming')],
      ['conferences', t('components.techEvents.conferences')],
      ['earnings', t('components.techEvents.earnings')],
      ['all', t('components.techEvents.all')],
    ];

    replaceChildren(this.content,
      h('div', { className: 'tech-events-panel' },
        h('div', { className: 'tech-events-tabs' },
          ...tabEntries.map(([view, label]) =>
            h('button', {
              className: `tab ${this.viewMode === view ? 'active' : ''}`,
              dataset: { view },
              onClick: () => { this.viewMode = view; this.render(); },
            }, label),
          ),
        ),
        h('div', { className: 'tech-events-stats' },
          h('span', { className: 'stat' }, `📅 ${t('components.techEvents.conferencesCount', { count: String(upcomingConferences.length) })}`),
          h('span', { className: 'stat' }, `📍 ${t('components.techEvents.onMap', { count: String(mappableCount) })}`),
          h('a', { href: 'https://www.techmeme.com/events', target: '_blank', rel: 'noopener', className: 'source-link' }, t('components.techEvents.techmemeEvents')),
        ),
        h('div', { className: 'tech-events-list' },
          ...(filteredEvents.length > 0
            ? filteredEvents.map(e => this.buildEvent(e))
            : [h('div', { className: 'empty-state' }, t('components.techEvents.noEvents'))]),
        ),
      ),
    );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  private getFilteredEvents(): TechEvent[] {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    switch (this.viewMode) {
      case 'upcoming':
        return this.events.filter(e => {
          const start = new Date(e.startDate);
          return start >= now && start <= thirtyDaysFromNow;
        }).slice(0, 20);

      case 'conferences':
        return this.events.filter(e => e.type === 'conference' && new Date(e.startDate) >= now).slice(0, 30);

      case 'earnings':
        return this.events.filter(e => e.type === 'earnings' && new Date(e.startDate) >= now).slice(0, 30);

      case 'all':
        return this.events.filter(e => new Date(e.startDate) >= now).slice(0, 50);

      default:
        return [];
    }
  }

<<<<<<< HEAD
  private renderEvent(event: TechEvent): string {
=======
  private buildEvent(event: TechEvent): HTMLElement {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const now = new Date();

    const isToday = startDate.toDateString() === now.toDateString();
<<<<<<< HEAD
    const isSoon = !isToday && startDate <= new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // Within 2 days
=======
    const isSoon = !isToday && startDate <= new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    const isThisWeek = startDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const dateStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDateStr = endDate > startDate && endDate.toDateString() !== startDate.toDateString()
      ? ` - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
      : '';

    const typeIcons: Record<string, string> = {
      conference: '🎤',
      earnings: '📊',
      ipo: '🔔',
      other: '📌',
    };

    const typeClasses: Record<string, string> = {
      conference: 'type-conference',
      earnings: 'type-earnings',
      ipo: 'type-ipo',
      other: 'type-other',
    };

<<<<<<< HEAD
    const mapLink = event.coords && !event.coords.virtual
      ? `<button class="event-map-link" data-lat="${event.coords.lat}" data-lng="${event.coords.lng}" title="Show on map">📍</button>`
      : '';

    const locationText = event.location
      ? `<span class="event-location">${escapeHtml(event.location)}</span>`
      : '';

    const safeEventUrl = sanitizeUrl(event.url || '');
    const urlLink = safeEventUrl
      ? `<a href="${safeEventUrl}" target="_blank" rel="noopener" class="event-url" title="More info">↗</a>`
      : '';

    return `
      <div class="tech-event ${typeClasses[event.type]} ${isToday ? 'is-today' : ''} ${isSoon ? 'is-soon' : ''} ${isThisWeek ? 'is-this-week' : ''}">
        <div class="event-date">
          <span class="event-month">${startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
          <span class="event-day">${startDate.getDate()}</span>
          ${isToday ? '<span class="today-badge">TODAY</span>' : ''}
          ${isSoon ? '<span class="soon-badge">SOON</span>' : ''}
        </div>
        <div class="event-content">
          <div class="event-header">
            <span class="event-icon">${typeIcons[event.type]}</span>
            <span class="event-title">${escapeHtml(event.title)}</span>
            ${urlLink}
          </div>
          <div class="event-meta">
            <span class="event-dates">${dateStr}${endDateStr}</span>
            ${locationText}
            ${mapLink}
          </div>
        </div>
      </div>
    `;
=======
    const className = [
      'tech-event',
      typeClasses[event.type],
      isToday ? 'is-today' : '',
      isSoon ? 'is-soon' : '',
      isThisWeek ? 'is-this-week' : '',
    ].filter(Boolean).join(' ');

    const safeEventUrl = sanitizeUrl(event.url || '');

    return h('div', { className },
      h('div', { className: 'event-date' },
        h('span', { className: 'event-month' }, startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()),
        h('span', { className: 'event-day' }, String(startDate.getDate())),
        isToday ? h('span', { className: 'today-badge' }, t('components.techEvents.today')) : false,
        isSoon ? h('span', { className: 'soon-badge' }, t('components.techEvents.soon')) : false,
      ),
      h('div', { className: 'event-content' },
        h('div', { className: 'event-header' },
          h('span', { className: 'event-icon' }, typeIcons[event.type] ?? '📌'),
          h('span', { className: 'event-title' }, event.title),
          safeEventUrl
            ? h('a', { href: safeEventUrl, target: '_blank', rel: 'noopener', className: 'event-url', title: t('components.techEvents.moreInfo') }, '↗')
            : false,
        ),
        h('div', { className: 'event-meta' },
          h('span', { className: 'event-dates' }, `${dateStr}${endDateStr}`),
          event.location
            ? h('span', { className: 'event-location' }, event.location)
            : false,
          isDesktopRuntime() ? h('button', {
            className: 'event-deduce-link',
            title: 'Deduce Situation with AI',
            style: 'background: none; border: none; cursor: pointer; opacity: 0.7; font-size: 1.1em; transition: opacity 0.2s; margin-left: auto; padding-right: 4px;',
            onClick: (e: Event) => {
              e.preventDefault();
              e.stopPropagation();

              let geoContext = `Event details: ${event.title} (${event.type}) taking place from ${dateStr}${endDateStr}. Location: ${event.location || 'Unknown/Virtual'}.`;

              if (this.getLatestNews) {
                const newsCtx = buildNewsContext(this.getLatestNews);
                if (newsCtx) geoContext += `\n\n${newsCtx}`;
              }

              const detail: DeductContextDetail = {
                query: `What is the expected impact of the tech event: ${event.title}?`,
                geoContext,
                autoSubmit: true,
              };
              document.dispatchEvent(new CustomEvent('wm:deduct-context', { detail }));
            },
          }, '\u{1F9E0}') : false,
          event.coords && !event.coords.virtual
            ? h('button', {
              className: 'event-map-link',
              title: t('components.techEvents.showOnMap'),
              onClick: (e: Event) => {
                e.preventDefault();
                this.panToLocation(event.coords!.lat, event.coords!.lng);
              },
            }, '📍')
            : false,
        ),
      ),
    );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  private panToLocation(lat: number, lng: number): void {
    // Dispatch event for map to handle
    window.dispatchEvent(new CustomEvent('tech-event-location', {
      detail: { lat, lng, zoom: 10 }
    }));
  }

  public refresh(): void {
    void this.fetchEvents();
  }

  public getConferencesForMap(): TechEvent[] {
    return this.events.filter(e =>
      e.type === 'conference' &&
      e.coords &&
      !e.coords.virtual &&
      new Date(e.startDate) >= new Date()
    );
  }
}
