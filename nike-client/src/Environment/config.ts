export interface IConfig {
  CLIENT_ID: string;
  JSV_ADMIN_API_URL: string;
}

export function getClientId(): string {
  return "f9d190b5-60b6-45e4-8fd6-a1919fa09f46";
}

export function getJsvAdminApiUrl() {
  return "http://localhost:5005/api/v1"
}

export function getConfig(param: keyof IConfig): string {
  if (!window._env_ || Object.keys(window._env_).length === 0) {
    return "";
  }
  if (!window._env_[param]) {
    throw new Error("Missing required environment variable: " + param);
  }

  return window._env_[param];
}
