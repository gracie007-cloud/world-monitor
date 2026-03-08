<<<<<<< HEAD
declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    onRegisteredSW?: (swUrl: string, registration: ServiceWorkerRegistration | undefined) => void;
    onOfflineReady?: () => void;
    onNeedRefresh?: () => void;
  }
  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>;
}
=======
// virtual:pwa-register types removed — SW is registered manually in main.ts
// to avoid the autoUpdate controllerchange → reload() cycle.
export {};
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
