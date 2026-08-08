import { useMemo } from "react";
import { useCart } from "@/hooks/useCart";
import { ARTWORKS } from "@/data/artworks.data";
import type { Artwork } from "@/types";

/** Wishlist state itself lives in CartContext (it shares persistence with the cart); this hook exposes the resolved artwork list. */
export function useWishlist() {
  const { wishlist, toggleWishlist } = useCart();

  const items: Artwork[] = useMemo(() => wishlist.map((id) => ARTWORKS.find((a) => a.id === id)).filter(Boolean) as Artwork[], [wishlist]);

  return { wishlistIds: wishlist, items, toggleWishlist };
}
