/**
 * Thin, typed wrapper around the browser storage API.
 * Swap the implementation here if persistence ever moves to a real backend —
 * no other file in the app should touch `localStorage` directly.
 */
const PREFIX = "art-miqael:";

export const storageService = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode, quota) — fail silently */
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {
      /* ignore */
    }
  },
};
