import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Eye, Share2, Plus } from "lucide-react";
import type { Artwork } from "@/types";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/format";
import { cx } from "@/utils/cx";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useShare } from "@/hooks/useShare";
import { useUI } from "@/hooks/useUI";

export interface ArtworkCardProps {
  artwork: Artwork;
  view?: "grid" | "list";
}

function availabilityLabel(artwork: Artwork): string {
  if (artwork.availability === "made") return "Made to order";
  if (artwork.category === "limited-editions") return "Limited edition";
  if (artwork.category === "original-paintings") return "Original";
  return "";
}

export function ArtworkCard({ artwork, view = "grid" }: ArtworkCardProps) {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { shareArtwork } = useShare();
  const { openQuickView } = useUI();
  const isWished = wishlist.includes(artwork.id);
  const go = () => navigate(ROUTES.product(artwork.id));
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  if (view === "list") {
    return (
      <div
        className="card animate-fade-up flex gap-5 p-4 cursor-pointer items-stretch"
        role="link"
        tabIndex={0}
        onClick={go}
        onKeyDown={(e) => e.key === "Enter" && go()}
      >
        <div className="w-40 min-w-[160px] rounded-2xl overflow-hidden bg-line relative">
          <img src={artwork.img} alt={artwork.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="font-mono text-[11px] text-ink-faint mb-1">{artwork.artistName}</div>
          <div className="font-serif text-xl mb-1">{artwork.title}</div>
          <div className="text-[12.5px] text-ink-soft mb-2">
            {artwork.dims} · {artwork.medium}
          </div>
          <StarRating rating={artwork.rating} count={artwork.reviewCount} />
        </div>
        <div className="flex flex-col items-end justify-between min-w-[130px]">
          <div className="font-serif text-[19px] font-semibold">{formatPrice(artwork.price)}</div>
          <div className="flex gap-2">
            <IconButton aria-label="Wishlist" active={isWished} onClick={stop(() => toggleWishlist(artwork.id))}>
              <Heart size={16} fill={isWished ? "currentColor" : "none"} />
            </IconButton>
            <Button size="sm" onClick={stop(() => addToCart(artwork.id))}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up cursor-pointer" role="link" tabIndex={0} onClick={go} onKeyDown={(e) => e.key === "Enter" && go()}>
      <div className="relative rounded-md overflow-hidden bg-line aspect-[4/5] mb-3 group">
        <img
          src={artwork.img}
          alt={artwork.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
        />
        {availabilityLabel(artwork) && <Badge className="absolute left-2.5 bottom-2.5">{availabilityLabel(artwork)}</Badge>}
        <IconButton
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          active={isWished}
          className="absolute top-2.5 right-2.5"
          onClick={stop(() => toggleWishlist(artwork.id))}
        >
          <Heart size={15} fill={isWished ? "currentColor" : "none"} />
        </IconButton>
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <IconButton aria-label="Quick view" onClick={stop(() => openQuickView(artwork.id))}>
            <Eye size={14} />
          </IconButton>
          <IconButton aria-label="Share" onClick={stop(() => shareArtwork(artwork))}>
            <Share2 size={14} />
          </IconButton>
        </div>
      </div>
      <div className="font-mono text-[11px] text-ink-faint mb-0.5">{artwork.artistName}</div>
      <div className="font-serif text-[17px] mb-0.5 leading-tight">{artwork.title}</div>
      <div className="text-xs text-ink-soft mb-1.5">{artwork.dims}</div>
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="font-serif text-base font-semibold">{formatPrice(artwork.price)}</span>
        <StarRating rating={artwork.rating} count={artwork.reviewCount} />
      </div>
      <Button variant="secondary" size="sm" block onClick={stop(() => addToCart(artwork.id))}>
        <Plus size={14} /> Add to cart
      </Button>
    </div>
  );
}

export function ArtworkGrid({ artworks, view = "grid" }: { artworks: Artwork[]; view?: "grid" | "list" }) {
  return (
    <div className={cx("artwork-grid", view === "list" && "is-list")}>
      {artworks.map((a) => (
        <ArtworkCard key={a.id} artwork={a} view={view} />
      ))}
    </div>
  );
}
