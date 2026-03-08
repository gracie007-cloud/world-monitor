<<<<<<< HEAD
=======
import { t } from '@/services/i18n';
import { isMobileDevice } from '@/utils';

>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
const STORAGE_KEY = 'mobile-warning-dismissed';

export class MobileWarningModal {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'mobile-warning-overlay';
    this.element.innerHTML = `
      <div class="mobile-warning-modal">
        <div class="mobile-warning-header">
          <span class="mobile-warning-icon">📱</span>
<<<<<<< HEAD
          <span class="mobile-warning-title">Mobile View</span>
        </div>
        <div class="mobile-warning-content">
          <p>You're viewing a simplified mobile version focused on MENA region with essential layers enabled.</p>
          <p>Tip: Use the view buttons (GLOBAL/US/MENA) to switch regions. Tap markers to see details.</p>
=======
          <span class="mobile-warning-title">${t('modals.mobileWarning.title')}</span>
        </div>
        <div class="mobile-warning-content">
          <p>${t('modals.mobileWarning.description')}</p>
          <p>${t('modals.mobileWarning.tip')}</p>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        </div>
        <div class="mobile-warning-footer">
          <label class="mobile-warning-remember">
            <input type="checkbox" id="mobileWarningRemember">
<<<<<<< HEAD
            <span>Don't show again</span>
          </label>
          <button class="mobile-warning-btn">Got it</button>
=======
            <span>${t('modals.mobileWarning.dontShowAgain')}</span>
          </label>
          <button class="mobile-warning-btn">${t('modals.mobileWarning.gotIt')}</button>
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
        </div>
      </div>
    `;

    document.body.appendChild(this.element);
    this.setupEventListeners();
<<<<<<< HEAD
=======

    // Remove will-change after entrance animation to free GPU memory
    const modal = this.element.querySelector('.mobile-warning-modal') as HTMLElement | null;
    modal?.addEventListener('animationend', () => {
      modal.style.willChange = 'auto';
    }, { once: true });
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  private setupEventListeners(): void {
    this.element.querySelector('.mobile-warning-btn')?.addEventListener('click', () => {
      this.dismiss();
    });

    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('mobile-warning-overlay')) {
        this.dismiss();
      }
    });
  }

  private dismiss(): void {
    const checkbox = this.element.querySelector('#mobileWarningRemember') as HTMLInputElement;
    if (checkbox?.checked) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    this.hide();
  }

  public show(): void {
    this.element.classList.add('active');
  }

  public hide(): void {
    this.element.classList.remove('active');
  }

  public static shouldShow(): boolean {
<<<<<<< HEAD
    // Check if already dismissed permanently
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      return false;
    }

    // Check if mobile device (screen width < 768px or touch-primary device)
    const isMobileWidth = window.innerWidth < 768;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    return isMobileWidth || isTouchDevice;
=======
    if (localStorage.getItem(STORAGE_KEY) === 'true') return false;
    return isMobileDevice();
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
