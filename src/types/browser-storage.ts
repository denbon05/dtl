export enum CookiesConcern {
  UNSETTLED = 'unsettled',
  ALLOWED = 'allowed',
  DENIED = 'denied',
}

export interface AppStorage {
  cookiesConcern: CookiesConcern;
}

export type AppStorageKeys = keyof AppStorage;
