import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, ArrowRight, Share2, MessageCircle, Minus, Plus } from "lucide-react";
import type { Artwork, Artist } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/utils/format";
import { cx } from "@/utils/cx";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/hooks/useCart";
import { useShare } from "@/hooks/useShare";
import { useUI } from "@/hooks/useUI";

export function BuyBox({ artwork, artist }: { artwork: Artwork; artist: Artist }) {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { shareArtwork } = useShare();
  const { openContactArtist } = useUI();
  const [qty, setQty] = useState(1);
  const isWished = wishlist.includes(artwork.id);

  return (
    <div>
      <button className="underline-link text-xs mb-2" onClick={() => navigate(ROUTES.artistDetail(artist.id))}>
        {artwork.artistName}
      </button>
      <h1 className="heading-serif text-[clamp(28px,3.6vw,40px)] mb-2.5">{artwork.title}</h1>
      <StarRating rating={artwork.rating} count={artwork.reviewCount} size={15} />
      <div className="font-serif text-[30px] font-semibold my-4.5">{formatPrice(artwork.price)}</div>
      <div className="flex gap-2 mb-5 flex-wrap">
        <Badge tone="accent">{artwork.edition}</Badge>
        <Badge>{artwork.dims}</Badge>
        <Badge>{artwork.medium}</Badge>
        <Badge tone={artwork.availability === "ready" ? "sage" : "default"}>
          {artwork.availability === "ready" ? "Ready to ship" : "Made to order · 3–5 weeks"}
        </Badge>
      </div>
      <p className="text-ink-soft text-[14.5px] leading-relaxed mb-6">{artwork.description}</p>

      <div className="flex items-center gap-3.5 mb-4.5">
        <div className="flex items-center border border-line-strong rounded-full">
          <button className="icon-btn border-0" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span className="w-[30px] text-center text-sm">{qty}</span>
          <button className="icon-btn border-0" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </div>
        <span className="text-[12.5px] text-ink-faint">
          {artwork.category === "original-paintings" ? "One of one — quantity capped at 1" : "Up to 10 per order"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-3">
        <Button variant="secondary" className="flex-1 min-w-[160px]" onClick={() => addToCart(artwork.id, qty)}>
          <ShoppingBag size={15} /> Add to cart
        </Button>
        <Button
          className="flex-1 min-w-[160px]"
          onClick={() => {
            addToCart(artwork.id, qty);
            navigate(ROUTES.checkout);
          }}
        >
          Buy now 
        </Button>
      </div>
      <div className="flex gap-2.5 mb-6 flex-wrap">
        <Button variant="ghost" onClick={() => toggleWishlist(artwork.id)}>
          <Heart size={15} fill={isWished ? "currentColor" : "none"} className={cx(isWished && "text-danger")} /> {isWished ? "Saved" : "Wishlist"}
        </Button>
        <Button variant="ghost" onClick={() => shareArtwork(artwork)}>
          <Share2 size={15} /> Share
        </Button>
        <Button variant="ghost" onClick={() => openContactArtist(artist)}>
          <MessageCircle size={15} /> Contact artist
        </Button>
      </div>

      <div className="card p-4.5 flex flex-col sm:flex-row gap-3.5 items-start sm:items-center">
        <img src={`https://picsum.photos/seed/${artist.seed}/100/100`} alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />
        <div className="flex-1">
          <div className="font-semibold text-sm">{artist.name}</div>
          <div className="text-[12.5px] text-ink-soft">
            {artist.location} · {artist.specialty}
          </div>
        </div>
        <button className="underline-link" onClick={() => navigate(ROUTES.artistDetail(artist.id))}>
          View profile
        </button>
      </div>
    </div>
  );
}
