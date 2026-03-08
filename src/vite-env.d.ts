/// <reference types="vite/client" />

declare const __APP_VERSION__: string;
<<<<<<< HEAD
=======

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_WS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
>>>>>>> 0f7893c792ef8a834c008cd8f80eb6f5a9db8f27
