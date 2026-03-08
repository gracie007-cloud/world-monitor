<<<<<<< HEAD
import { Panel } from './Panel';
import { escapeHtml } from '@/utils/sanitize';
import { isDesktopRuntime } from '@/services/runtime';
=======

import { Panel } from './Panel';
import { t } from '@/services/i18n';
import { getLocalApiPort, isDesktopRuntime } from '@/services/runtime';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
import {
  getDesktopReadinessChecks,
  getKeyBackedAvailabilitySummary,
  getNonParityFeatures,
} from '@/services/desktop-readiness';
<<<<<<< HEAD

interface ServiceStatus {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'degraded' | 'outage' | 'unknown';
  description: string;
}
=======
import {
  fetchServiceStatuses,
  type ServiceStatusResult as ServiceStatus,
} from '@/services/infrastructure';
import { h, replaceChildren, type DomChild } from '@/utils/dom-utils';
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

interface LocalBackendStatus {
  enabled?: boolean;
  mode?: string;
  port?: number;
  remoteBase?: string;
}

<<<<<<< HEAD
interface ServiceStatusResponse {
  success: boolean;
  timestamp: string;
  summary: {
    operational: number;
    degraded: number;
    outage: number;
    unknown: number;
  };
  services: ServiceStatus[];
  local?: LocalBackendStatus;
}

type CategoryFilter = 'all' | 'cloud' | 'dev' | 'comm' | 'ai' | 'saas';

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All',
  cloud: 'Cloud',
  dev: 'Dev Tools',
  comm: 'Comms',
  ai: 'AI',
  saas: 'SaaS',
};
=======
type CategoryFilter = 'all' | 'cloud' | 'dev' | 'comm' | 'ai' | 'saas';

function getCategoryLabel(category: CategoryFilter): string {
  const labels: Record<CategoryFilter, string> = {
    all: t('components.serviceStatus.categories.all'),
    cloud: t('components.serviceStatus.categories.cloud'),
    dev: t('components.serviceStatus.categories.dev'),
    comm: t('components.serviceStatus.categories.comm'),
    ai: t('components.serviceStatus.categories.ai'),
    saas: t('components.serviceStatus.categories.saas'),
  };
  return labels[category];
}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

export class ServiceStatusPanel extends Panel {
  private services: ServiceStatus[] = [];
  private loading = true;
  private error: string | null = null;
  private filter: CategoryFilter = 'all';
<<<<<<< HEAD
  private refreshInterval: ReturnType<typeof setInterval> | null = null;
  private localBackend: LocalBackendStatus | null = null;

  constructor() {
    super({ id: 'service-status', title: 'Service Status', showCount: false });
    void this.fetchStatus();
    this.refreshInterval = setInterval(() => this.fetchStatus(), 60000);
  }

  public destroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private async fetchStatus(): Promise<void> {
    try {
      const res = await fetch('/api/service-status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: ServiceStatusResponse = await res.json();
      if (!data.success) throw new Error('Failed to load status');

      this.services = data.services;
      this.localBackend = data.local ?? null;
      this.error = null;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch';
      console.error('[ServiceStatus] Fetch error:', err);
    } finally {
      this.loading = false;
      this.render();
=======
  private localBackend: LocalBackendStatus | null = null;

  constructor() {
    super({ id: 'service-status', title: t('panels.serviceStatus'), showCount: false });
    void this.fetchStatus();
  }

  private lastServicesJson = '';

  public async fetchStatus(): Promise<boolean> {
    try {
      const data = await fetchServiceStatuses();
      if (!this.element?.isConnected) return false;
      if (!data.success) throw new Error('Failed to load status');

      const fingerprint = data.services.map(s => `${s.name}:${s.status}`).join(',');
      const changed = fingerprint !== this.lastServicesJson;
      this.lastServicesJson = fingerprint;
      this.services = data.services;
      this.error = null;
      return changed;
    } catch (err) {
      if (this.isAbortError(err)) return false;
      if (!this.element?.isConnected) return false;
      this.error = err instanceof Error ? err.message : 'Failed to fetch';
      console.error('[ServiceStatus] Fetch error:', err);
      return true;
    } finally {
      this.loading = false;
      if (this.element?.isConnected) {
        this.render();
      }
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    }
  }

  private setFilter(filter: CategoryFilter): void {
    this.filter = filter;
    this.render();
  }

  private getFilteredServices(): ServiceStatus[] {
    if (this.filter === 'all') return this.services;
    return this.services.filter(s => s.category === this.filter);
  }

  protected render(): void {
    if (this.loading) {
<<<<<<< HEAD
      this.content.innerHTML = `
        <div class="service-status-loading">
          <div class="loading-spinner"></div>
          <span>Checking services...</span>
        </div>
      `;
=======
      replaceChildren(this.content,
        h('div', { className: 'service-status-loading' },
          h('div', { className: 'loading-spinner' }),
          h('span', null, t('components.serviceStatus.checkingServices')),
        ),
      );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    if (this.error) {
<<<<<<< HEAD
      this.content.innerHTML = `
        <div class="service-status-error">
          <span class="error-text">${escapeHtml(this.error)}</span>
          <button class="retry-btn">Retry</button>
        </div>
      `;
      this.content.querySelector('.retry-btn')?.addEventListener('click', () => {
        this.loading = true;
        this.render();
        void this.fetchStatus();
      });
=======
      replaceChildren(this.content,
        h('div', { className: 'service-status-error' },
          h('span', { className: 'error-text' }, this.error),
          h('button', {
            className: 'retry-btn',
            onClick: () => { this.loading = true; this.render(); void this.fetchStatus(); },
          }, t('common.retry')),
        ),
      );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
      return;
    }

    const filtered = this.getFilteredServices();
    const issues = filtered.filter(s => s.status !== 'operational');

<<<<<<< HEAD
    const backendHtml = this.renderBackendStatus();
    const readinessHtml = this.renderDesktopReadiness();
    const summaryHtml = this.renderSummary(filtered);
    const filtersHtml = this.renderFilters();
    const servicesHtml = this.renderServices(filtered);

    this.content.innerHTML = `
      ${backendHtml}
      ${readinessHtml}
      ${summaryHtml}
      ${filtersHtml}
      <div class="service-status-list">
        ${servicesHtml}
      </div>
      ${issues.length === 0 ? '<div class="all-operational">All services operational</div>' : ''}
    `;

    this.attachFilterListeners();
  }


  private renderBackendStatus(): string {
    if (!isDesktopRuntime()) return '';

    if (!this.localBackend?.enabled) {
      return `
        <div class="service-status-backend warning">
          Desktop local backend unavailable. Falling back to cloud API.
        </div>
      `;
    }

    const port = this.localBackend.port ?? 46123;
    const remote = this.localBackend.remoteBase ?? 'https://worldmonitor.app';

    return `
      <div class="service-status-backend">
        Local backend active on <strong>127.0.0.1:${port}</strong> · cloud fallback: <strong>${escapeHtml(remote)}</strong>
      </div>
    `;
  }

  private renderSummary(services: ServiceStatus[]): string {
=======
    replaceChildren(this.content,
      this.buildBackendStatus(),
      this.buildDesktopReadiness(),
      this.buildSummary(filtered),
      this.buildFilters(),
      h('div', { className: 'service-status-list' },
        ...this.buildServiceItems(filtered),
      ),
      issues.length === 0 ? h('div', { className: 'all-operational' }, t('components.serviceStatus.allOperational')) : false,
    );
  }

  private buildBackendStatus(): DomChild {
    if (!isDesktopRuntime()) return false;

    if (!this.localBackend?.enabled) {
      return h('div', { className: 'service-status-backend warning' },
        t('components.serviceStatus.backendUnavailable'),
      );
    }

    const port = this.localBackend.port ?? getLocalApiPort();
    const remote = this.localBackend.remoteBase ?? 'https://worldmonitor.app';

    return h('div', { className: 'service-status-backend' },
      'Local backend active on ', h('strong', null, `127.0.0.1:${port}`),
      ' · cloud fallback: ', h('strong', null, remote),
    );
  }

  private buildSummary(services: ServiceStatus[]): HTMLElement {
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
    const operational = services.filter(s => s.status === 'operational').length;
    const degraded = services.filter(s => s.status === 'degraded').length;
    const outage = services.filter(s => s.status === 'outage').length;

<<<<<<< HEAD
    return `
      <div class="service-status-summary">
        <div class="summary-item operational">
          <span class="summary-count">${operational}</span>
          <span class="summary-label">OK</span>
        </div>
        <div class="summary-item degraded">
          <span class="summary-count">${degraded}</span>
          <span class="summary-label">Degraded</span>
        </div>
        <div class="summary-item outage">
          <span class="summary-count">${outage}</span>
          <span class="summary-label">Outage</span>
        </div>
      </div>
    `;
  }

  private renderDesktopReadiness(): string {
    if (!isDesktopRuntime()) return '';
=======
    return h('div', { className: 'service-status-summary' },
      h('div', { className: 'summary-item operational' },
        h('span', { className: 'summary-count' }, String(operational)),
        h('span', { className: 'summary-label' }, t('components.serviceStatus.ok')),
      ),
      h('div', { className: 'summary-item degraded' },
        h('span', { className: 'summary-count' }, String(degraded)),
        h('span', { className: 'summary-label' }, t('components.serviceStatus.degraded')),
      ),
      h('div', { className: 'summary-item outage' },
        h('span', { className: 'summary-count' }, String(outage)),
        h('span', { className: 'summary-label' }, t('components.serviceStatus.outage')),
      ),
    );
  }

  private buildDesktopReadiness(): DomChild {
    if (!isDesktopRuntime()) return false;
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27

    const checks = getDesktopReadinessChecks(Boolean(this.localBackend?.enabled));
    const keySummary = getKeyBackedAvailabilitySummary();
    const nonParity = getNonParityFeatures();

<<<<<<< HEAD
    return `
      <div class="service-status-desktop-readiness">
        <div class="service-status-desktop-title">Desktop readiness</div>
        <div class="service-status-desktop-subtitle">Acceptance checks: ${checks.filter(check => check.ready).length}/${checks.length} ready · key-backed features ${keySummary.available}/${keySummary.total}</div>
        <ul class="service-status-desktop-list">
          ${checks.map(check => `<li>${check.ready ? '✅' : '⚠️'} ${escapeHtml(check.label)}</li>`).join('')}
        </ul>
        <details class="service-status-non-parity">
          <summary>Non-parity fallbacks (${nonParity.length})</summary>
          <ul>
            ${nonParity.map(feature => `<li><strong>${escapeHtml(feature.panel)}</strong>: ${escapeHtml(feature.fallback)}</li>`).join('')}
          </ul>
        </details>
      </div>
    `;
  }

  private renderFilters(): string {
    const filters = Object.entries(CATEGORY_LABELS).map(([key, label]) => {
      const active = this.filter === key ? 'active' : '';
      return `<button class="status-filter-btn ${active}" data-filter="${key}">${label}</button>`;
    }).join('');

    return `<div class="service-status-filters">${filters}</div>`;
  }

  private renderServices(services: ServiceStatus[]): string {
    return services.map(service => {
      const statusIcon = this.getStatusIcon(service.status);
      const statusClass = service.status;

      return `
        <div class="service-status-item ${statusClass}">
          <span class="status-icon">${statusIcon}</span>
          <span class="status-name">${escapeHtml(service.name)}</span>
          <span class="status-badge ${statusClass}">${service.status.toUpperCase()}</span>
        </div>
      `;
    }).join('');
=======
    return h('div', { className: 'service-status-desktop-readiness' },
      h('div', { className: 'service-status-desktop-title' }, t('components.serviceStatus.desktopReadiness')),
      h('div', { className: 'service-status-desktop-subtitle' },
        t('components.serviceStatus.acceptanceChecks', { ready: String(checks.filter(check => check.ready).length), total: String(checks.length), available: String(keySummary.available), featureTotal: String(keySummary.total) }),
      ),
      h('ul', { className: 'service-status-desktop-list' },
        ...checks.map(check =>
          h('li', null, `${check.ready ? '✅' : '⚠️'} ${check.label}`),
        ),
      ),
      h('details', { className: 'service-status-non-parity' },
        h('summary', null, t('components.serviceStatus.nonParityFallbacks', { count: String(nonParity.length) })),
        h('ul', null,
          ...nonParity.map(feature =>
            h('li', null, h('strong', null, feature.panel), `: ${feature.fallback}`),
          ),
        ),
      ),
    );
  }

  private buildFilters(): HTMLElement {
    const categories: CategoryFilter[] = ['all', 'cloud', 'dev', 'comm', 'ai', 'saas'];
    return h('div', { className: 'service-status-filters' },
      ...categories.map(key =>
        h('button', {
          className: `status-filter-btn ${this.filter === key ? 'active' : ''}`,
          dataset: { filter: key },
          onClick: () => this.setFilter(key),
        }, getCategoryLabel(key)),
      ),
    );
  }

  private buildServiceItems(services: ServiceStatus[]): HTMLElement[] {
    return services.map(service =>
      h('div', { className: `service-status-item ${service.status}` },
        h('span', { className: 'status-icon' }, this.getStatusIcon(service.status)),
        h('span', { className: 'status-name' }, service.name),
        h('span', { className: `status-badge ${service.status}` }, service.status.toUpperCase()),
      ),
    );
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'operational': return '●';
      case 'degraded': return '◐';
      case 'outage': return '○';
      default: return '?';
    }
  }

<<<<<<< HEAD
  private attachFilterListeners(): void {
    this.content.querySelectorAll('.status-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = (btn as HTMLElement).dataset.filter as CategoryFilter;
        this.setFilter(filter);
      });
    });
  }
=======
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
}
