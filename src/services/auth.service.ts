import type { User } from "@/types";
import { storageService } from "@/services/storage.service";

const KEY = "auth-user";

function nameFromEmail(email: string): string {
  return email
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const authService = {
  async signIn(email: string): Promise<User> {
    const user: User = { name: nameFromEmail(email), email };
    storageService.set(KEY, user);
    return delay(user);
  },
  async signUp(name: string, email: string): Promise<User> {
    const user: User = { name, email };
    storageService.set(KEY, user);
    return delay(user);
  },
  async signOut(): Promise<void> {
    storageService.remove(KEY);
    return delay(undefined, 150);
  },
  async requestPasswordReset(_email: string): Promise<void> {
    return delay(undefined, 500);
  },
  loadPersistedUser(): User | null {
    return storageService.get<User | null>(KEY, null);
  },
};
