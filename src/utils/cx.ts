import clsx, { type ClassValue } from "clsx";

/** Combines conditional class names. Thin re-export so call sites use one import path. */
export function cx(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
