import React, { createContext, useCallback, useState, type ReactNode } from "react";
import type { Artist } from "@/types";

interface UIContextValue {
  quickViewId: string | null;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  contactArtistTarget: Artist | null;
  openContactArtist: (artist: Artist) => void;
  closeContactArtist: () => void;
}

export const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [contactArtistTarget, setContactArtistTarget] = useState<Artist | null>(null);

  const openQuickView = useCallback((id: string) => setQuickViewId(id), []);
  const closeQuickView = useCallback(() => setQuickViewId(null), []);
  const openContactArtist = useCallback((artist: Artist) => setContactArtistTarget(artist), []);
  const closeContactArtist = useCallback(() => setContactArtistTarget(null), []);

  return (
    <UIContext.Provider
      value={{ quickViewId, openQuickView, closeQuickView, contactArtistTarget, openContactArtist, closeContactArtist }}
    >
      {children}
    </UIContext.Provider>
  );
}
