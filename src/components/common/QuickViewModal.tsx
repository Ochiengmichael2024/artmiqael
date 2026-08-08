import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { findArtwork } from "@/data/artworks.data";
import { formatPrice } from "@/utils/format";
import { ROUTES } from "@/constants/routes";
import { useUI } from "@/hooks/useUI";
import { useCart } from "@/hooks/useCart";

export function QuickViewModal() {
  const { quickViewId, closeQuickView } = useUI();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();

  const artwork = quickViewId ? findArtwork(quickViewId) : undefined;
  const isWished = artwork ? wishlist.includes(artwork.id) : false;

  return (
    <Modal open={!!artwork} onClose={closeQuickView} maxWidth={820} labelledBy="quick-view-title" className="!p-0 overflow-hidden">
      {artwork && (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="bg-line min-h-[240px] sm:min-h-[300px]">
            <img src={artwork.img} alt={artwork.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-7 relative">
            <div className="font-mono text-[11px] text-ink-faint mb-1.5">{artwork.artistName}</div>
            <h3 id="quick-view-title" className="font-serif text-[26px] mb-2">
              {artwork.title}
            </h3>
            <StarRating rating={artwork.rating} count={artwork.reviewCount} />
            <div className="font-serif text-2xl font-semibold my-4">{formatPrice(artwork.price)}</div>
            <p className="text-[13.5px] text-ink-soft leading-relaxed mb-4">{artwork.description}</p>
            <div className="font-mono text-[11.5px] text-ink-soft mb-5 grid gap-1">
              <div>{artwork.dims}</div>
              <div>{artwork.medium}</div>
              <div>{artwork.availability === "ready" ? "Ready to ship" : "Made to order"}</div>
            </div>
            <div className="flex gap-2.5 mb-3">
              <Button className="flex-1" onClick={() => addToCart(artwork.id)}>
                <ShoppingBag size={15} /> Add to cart
              </Button>
              <IconButton aria-label="Wishlist" active={isWished} className="w-[46px] h-[46px]" onClick={() => toggleWishlist(artwork.id)}>
                <Heart size={17} fill={isWished ? "currentColor" : "none"} />
              </IconButton>
            </div>
            <button
              className="underline-link"
              onClick={() => {
                closeQuickView();
                navigate(ROUTES.product(artwork.id));
              }}
            >
              View full details <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
