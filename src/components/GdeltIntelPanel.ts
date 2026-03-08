import { Panel } from './Panel';
<<<<<<< HEAD
import { escapeHtml, sanitizeUrl } from '@/utils/sanitize';
import {
  INTEL_TOPICS,
=======
import { sanitizeUrl } from '@/utils/sanitize';
import { t } from '@/services/i18n';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  getIntelTopics,
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  fetchTopicIntelligence,
  formatArticleDate,
  extractDomain,
  type GdeltArticle,
  type IntelTopic,
  type TopicIntelligence,
} from '@/services/gdelt-intel';

export class GdeltIntelPanel extends Panel {
<<<<<<< HEAD
  private activeTopic: IntelTopic = INTEL_TOPICS[0]!;
=======
  private activeTopic: IntelTopic = getIntelTopics()[0]!;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  private topicData = new Map<string, TopicIntelligence>();
  private tabsEl: HTMLElement | null = null;

  constructor() {
    super({
      id: 'gdelt-intel',
<<<<<<< HEAD
      title: 'Live Intelligence',
      showCount: true,
      trackActivity: true,
      infoTooltip: `<strong>GDELT Intelligence</strong>
        Real-time global news monitoring:
        <ul>
          <li>Curated topic categories (conflicts, cyber, etc.)</li>
          <li>Articles from 100+ languages translated</li>
          <li>Updates every 15 minutes</li>
        </ul>
        Source: GDELT Project (gdeltproject.org)`,
=======
      title: t('panels.gdeltIntel'),
      showCount: true,
      trackActivity: true,
      infoTooltip: t('components.gdeltIntel.infoTooltip'),
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    });
    this.createTabs();
    this.loadActiveTopic();
  }

  private createTabs(): void {
<<<<<<< HEAD
    this.tabsEl = document.createElement('div');
    this.tabsEl.className = 'gdelt-intel-tabs';

    INTEL_TOPICS.forEach(topic => {
      const tab = document.createElement('button');
      tab.className = `gdelt-intel-tab ${topic.id === this.activeTopic.id ? 'active' : ''}`;
      tab.dataset.topicId = topic.id;
      tab.title = topic.description;
      tab.innerHTML = `<span class="tab-icon">${topic.icon}</span><span class="tab-label">${escapeHtml(topic.name)}</span>`;

      tab.addEventListener('click', () => this.selectTopic(topic));
      this.tabsEl!.appendChild(tab);
    });
=======
    this.tabsEl = h('div', { className: 'gdelt-intel-tabs' },
      ...getIntelTopics().map(topic =>
        h('button', {
          className: `gdelt-intel-tab ${topic.id === this.activeTopic.id ? 'active' : ''}`,
          dataset: { topicId: topic.id },
          title: topic.description,
          onClick: () => this.selectTopic(topic),
        },
          h('span', { className: 'tab-icon' }, topic.icon),
          h('span', { className: 'tab-label' }, topic.name),
        ),
      ),
    );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    this.element.insertBefore(this.tabsEl, this.content);
  }

  private selectTopic(topic: IntelTopic): void {
    if (topic.id === this.activeTopic.id) return;

    this.activeTopic = topic;

    this.tabsEl?.querySelectorAll('.gdelt-intel-tab').forEach(tab => {
      tab.classList.toggle('active', (tab as HTMLElement).dataset.topicId === topic.id);
    });

    const cached = this.topicData.get(topic.id);
    if (cached && Date.now() - cached.fetchedAt.getTime() < 5 * 60 * 1000) {
      this.renderArticles(cached.articles);
    } else {
      this.loadActiveTopic();
    }
  }

  private async loadActiveTopic(): Promise<void> {
    this.showLoading();

<<<<<<< HEAD
    try {
      const data = await fetchTopicIntelligence(this.activeTopic);
      this.topicData.set(this.activeTopic.id, data);
      this.renderArticles(data.articles);
      this.setCount(data.articles.length);
    } catch (error) {
      console.error('[GdeltIntelPanel] Load error:', error);
      this.showError('Failed to load intelligence feed');
=======
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await fetchTopicIntelligence(this.activeTopic);
        if (!this.element?.isConnected) return;
        this.topicData.set(this.activeTopic.id, data);

        if (data.articles.length === 0 && attempt < 2) {
          this.showRetrying();
          await new Promise(r => setTimeout(r, 15_000));
          if (!this.element?.isConnected) return;
          continue;
        }

        this.renderArticles(data.articles);
        this.setCount(data.articles.length);
        return;
      } catch (error) {
        if (this.isAbortError(error)) return;
        if (!this.element?.isConnected) return;
        console.error(`[GdeltIntelPanel] Load error (attempt ${attempt + 1}):`, error);
        if (attempt < 2) {
          this.showRetrying();
          await new Promise(r => setTimeout(r, 15_000));
          if (!this.element?.isConnected) return;
          continue;
        }
        this.showError(t('common.failedIntelFeed'));
      }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }
  }

  private renderArticles(articles: GdeltArticle[]): void {
    if (articles.length === 0) {
<<<<<<< HEAD
      this.content.innerHTML = '<div class="empty-state">No recent articles for this topic</div>';
      return;
    }

    const html = articles.map(article => this.renderArticle(article)).join('');
    this.content.innerHTML = `<div class="gdelt-intel-articles">${html}</div>`;
  }

  private renderArticle(article: GdeltArticle): string {
=======
      replaceChildren(this.content, h('div', { className: 'empty-state' }, t('components.gdelt.empty')));
      return;
    }

    replaceChildren(this.content,
      h('div', { className: 'gdelt-intel-articles' },
        ...articles.map(article => this.buildArticle(article)),
      ),
    );
  }

  private buildArticle(article: GdeltArticle): HTMLElement {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    const domain = article.source || extractDomain(article.url);
    const timeAgo = formatArticleDate(article.date);
    const toneClass = article.tone ? (article.tone < -2 ? 'tone-negative' : article.tone > 2 ? 'tone-positive' : '') : '';

<<<<<<< HEAD
    return `
      <a href="${sanitizeUrl(article.url)}" target="_blank" rel="noopener" class="gdelt-intel-article ${toneClass}">
        <div class="article-header">
          <span class="article-source">${escapeHtml(domain)}</span>
          <span class="article-time">${escapeHtml(timeAgo)}</span>
        </div>
        <div class="article-title">${escapeHtml(article.title)}</div>
      </a>
    `;
=======
    return h('a', {
      href: sanitizeUrl(article.url),
      target: '_blank',
      rel: 'noopener',
      className: `gdelt-intel-article ${toneClass}`.trim(),
    },
      h('div', { className: 'article-header' },
        h('span', { className: 'article-source' }, domain),
        h('span', { className: 'article-time' }, timeAgo),
      ),
      h('div', { className: 'article-title' }, article.title),
    );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public async refresh(): Promise<void> {
    await this.loadActiveTopic();
  }

  public async refreshAll(): Promise<void> {
    this.topicData.clear();
    await this.loadActiveTopic();
  }
}
