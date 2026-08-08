import { useCallback } from "react";
import type { Artwork } from "@/types";
import { useToast } from "@/hooks/useToast";

export function useShare() {
  const { pushToast } = useToast();

  const shareArtwork = useCallback(
    (artwork: Artwork) => {
      const url = `${window.location.origin}/product/${artwork.id}`;
      if (navigator.share) {
        navigator.share({ title: artwork.title, text: `${artwork.title} by ${artwork.artistName}`, url }).catch(() => {});
        return;
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => pushToast("Link copied to clipboard"));
        return;
      }
      pushToast(`Share link: ${url}`);
    },
    [pushToast]
  );

  return { shareArtwork };
}
