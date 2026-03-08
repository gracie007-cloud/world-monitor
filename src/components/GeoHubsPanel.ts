import { Panel } from './Panel';
import type { GeoHubActivity } from '@/services/geo-activity';
import { escapeHtml, sanitizeUrl } from '@/utils/sanitize';
<<<<<<< HEAD
=======
import { t } from '@/services/i18n';
import { getCSSColor } from '@/utils';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

const COUNTRY_FLAGS: Record<string, string> = {
  'USA': '🇺🇸', 'Russia': '🇷🇺', 'China': '🇨🇳', 'UK': '🇬🇧', 'Belgium': '🇧🇪',
  'Israel': '🇮🇱', 'Iran': '🇮🇷', 'Ukraine': '🇺🇦', 'Taiwan': '🇹🇼', 'Japan': '🇯🇵',
  'South Korea': '🇰🇷', 'North Korea': '🇰🇵', 'India': '🇮🇳', 'Saudi Arabia': '🇸🇦',
  'Turkey': '🇹🇷', 'France': '🇫🇷', 'Germany': '🇩🇪', 'Egypt': '🇪🇬', 'Pakistan': '🇵🇰',
  'Palestine': '🇵🇸', 'Yemen': '🇾🇪', 'Syria': '🇸🇾', 'Lebanon': '🇱🇧',
  'Sudan': '🇸🇩', 'Ethiopia': '🇪🇹', 'Myanmar': '🇲🇲', 'Austria': '🇦🇹',
  'International': '🌐',
};

const TYPE_ICONS: Record<string, string> = {
  capital: '🏛️',
  conflict: '⚔️',
  strategic: '⚓',
  organization: '🏢',
};

const TYPE_LABELS: Record<string, string> = {
  capital: 'Capital',
  conflict: 'Conflict Zone',
  strategic: 'Strategic',
  organization: 'Organization',
};

export class GeoHubsPanel extends Panel {
  private activities: GeoHubActivity[] = [];
  private onHubClick?: (hub: GeoHubActivity) => void;

  constructor() {
    super({
      id: 'geo-hubs',
<<<<<<< HEAD
      title: 'Geopolitical Hotspots',
      showCount: true,
      infoTooltip: `
        <strong>Geopolitical Activity Hubs</strong><br>
        Shows regions with the most news activity.<br><br>
        <em>Hub types:</em><br>
        • 🏛️ Capitals — World capitals and government centers<br>
        • ⚔️ Conflict Zones — Active conflict areas<br>
        • ⚓ Strategic — Chokepoints and key regions<br>
        • 🏢 Organizations — UN, NATO, IAEA, etc.<br><br>
        <em>Activity levels:</em><br>
        • <span style="color: #ff4444">High</span> — Breaking news or 70+ score<br>
        • <span style="color: #ff8844">Elevated</span> — Score 40-69<br>
        • <span style="color: #888">Low</span> — Score below 40<br><br>
        Click a hub to zoom to its location.
      `,
    });
=======
      title: t('panels.geoHubs'),
      showCount: true,
      infoTooltip: t('components.geoHubs.infoTooltip', {
        highColor: getCSSColor('--semantic-critical'),
        elevatedColor: getCSSColor('--semantic-high'),
        lowColor: getCSSColor('--text-dim'),
      }),
    });
    this.setupDelegatedListeners();
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public setOnHubClick(handler: (hub: GeoHubActivity) => void): void {
    this.onHubClick = handler;
  }

  public setActivities(activities: GeoHubActivity[]): void {
    this.activities = activities.slice(0, 10);
    this.setCount(this.activities.length);
    this.render();
  }

  private getFlag(country: string): string {
    return COUNTRY_FLAGS[country] || '🌐';
  }

  private getTypeIcon(type: string): string {
    return TYPE_ICONS[type] || '📍';
  }

  private getTypeLabel(type: string): string {
    return TYPE_LABELS[type] || type;
  }

  private render(): void {
    if (this.activities.length === 0) {
<<<<<<< HEAD
      this.showError('No active geopolitical hubs');
=======
      this.showError(t('common.noActiveGeoHubs'));
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    const html = this.activities.map((hub, index) => {
      const trendIcon = hub.trend === 'rising' ? '↑' : hub.trend === 'falling' ? '↓' : '';
      const breakingTag = hub.hasBreaking ? '<span class="hub-breaking geo">ALERT</span>' : '';
      const topStory = hub.topStories[0];

      return `
        <div class="geo-hub-item ${hub.activityLevel}" data-hub-id="${escapeHtml(hub.hubId)}" data-index="${index}">
          <div class="hub-rank">${index + 1}</div>
          <span class="geo-hub-indicator ${hub.activityLevel}"></span>
          <div class="hub-info">
            <div class="hub-header">
              <span class="hub-name">${escapeHtml(hub.name)}</span>
              <span class="hub-flag">${this.getFlag(hub.country)}</span>
              ${breakingTag}
            </div>
            <div class="hub-meta">
<<<<<<< HEAD
              <span class="hub-news-count">${hub.newsCount} ${hub.newsCount === 1 ? 'story' : 'stories'}</span>
=======
              <span class="hub-news-count">${hub.newsCount} ${hub.newsCount === 1 ? t('components.geoHubs.story') : t('components.geoHubs.stories')}</span>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
              ${trendIcon ? `<span class="hub-trend ${hub.trend}">${trendIcon}</span>` : ''}
              <span class="geo-hub-type">${this.getTypeIcon(hub.type)} ${this.getTypeLabel(hub.type)}</span>
            </div>
          </div>
          <div class="hub-score geo">${Math.round(hub.score)}</div>
        </div>
        ${topStory ? `
          <a class="hub-top-story geo" href="${sanitizeUrl(topStory.link)}" target="_blank" rel="noopener" data-hub-id="${escapeHtml(hub.hubId)}">
            ${escapeHtml(topStory.title.length > 80 ? topStory.title.slice(0, 77) + '...' : topStory.title)}
          </a>
        ` : ''}
      `;
    }).join('');

    this.setContent(html);
<<<<<<< HEAD
    this.bindEvents();
  }

  private bindEvents(): void {
    const items = this.content.querySelectorAll<HTMLDivElement>('.geo-hub-item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const hubId = item.dataset.hubId;
        const hub = this.activities.find(a => a.hubId === hubId);
        if (hub && this.onHubClick) {
          this.onHubClick(hub);
        }
      });
=======
  }

  /**
   * Attach a single delegated click listener on the container so that
   * re-renders (which replace innerHTML) never accumulate listeners.
   */
  private setupDelegatedListeners(): void {
    this.content.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const item = target.closest<HTMLDivElement>('.geo-hub-item');
      if (!item) return;
      const hubId = item.dataset.hubId;
      const hub = this.activities.find(a => a.hubId === hubId);
      if (hub && this.onHubClick) {
        this.onHubClick(hub);
      }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    });
  }
}
