export interface IConfig {
  CLIENT_ID: string;
  JSV_ADMIN_API_URL: string;
}

export function getClientId(): string {
  if (process.env.NODE_ENV === "development") {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    if (!clientId) {
      throw Error("REACT_APP_CLIENT_ID missing from environment");
    }
    return clientId;
  } else {
    return getConfig("CLIENT_ID");
  }
}

export function getJsvAdminApiUrl() {
  if (process.env.NODE_ENV === "development") {
    const clientId = process.env.REACT_APP_JSV_ADMIN_API_URL;
    if (!clientId) {
      throw Error("REACT_APP_JSV_ADMIN_API_URL missing from environment");
    }
    return clientId;
  } else {
    return getConfig("JSV_ADMIN_API_URL");
  }
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
