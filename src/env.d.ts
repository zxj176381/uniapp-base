/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  VITE_APP_NAME: string;
  VITE_ENV_NAME: "development" | "staging" | "production";
  VITE_ENV: "" | "dev" | "staging";
  VITE_PARSE_KEY: string;
  VITE_SERVICE_URL: string;
  VITE_OSS_SERVICE_URL: string;
  VITE_TIMEOUT: number;
}
