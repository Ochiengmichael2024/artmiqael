import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { Artwork } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/format";
import { ROUTES } from "@/constants/routes";

export interface CartItemRowProps {
  artwork: Artwork;
  qty: number;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
}

export function CartItemRow({ artwork, qty, onUpdateQty, onRemove, onSaveForLater }: CartItemRowProps) {
  return (
    <Card className="flex flex-col sm:flex-row gap-4 p-4 mb-3.5 items-start sm:items-center">
      <Link to={ROUTES.product(artwork.id)} className="w-full sm:w-[84px] h-[100px] rounded-[10px] overflow-hidden shrink-0 block">
        <img src={artwork.img} alt={artwork.title} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10.5px] text-ink-faint">{artwork.artistName}</div>
        <Link to={ROUTES.product(artwork.id)} className="font-serif text-base block">
          {artwork.title}
        </Link>
        <div className="text-xs text-ink-soft my-1">{artwork.dims}</div>
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="flex items-center border border-line-strong rounded-full">
            <button className="icon-btn border-0 w-[30px] h-[30px]" onClick={() => onUpdateQty(Math.max(1, qty - 1))} aria-label="Decrease">
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-[13px]">{qty}</span>
            <button className="icon-btn border-0 w-[30px] h-[30px]" onClick={() => onUpdateQty(qty + 1)} aria-label="Increase">
              <Plus size={12} />
            </button>
          </div>
          <button className="underline-link" onClick={onSaveForLater}>
            Save for later
          </button>
          <Button variant="danger" size="sm" onClick={onRemove}>
            <Trash2 size={13} /> Remove
          </Button>
        </div>
      </div>
      <div className="font-serif text-[17px] font-semibold">{formatPrice(artwork.price * qty)}</div>
    </Card>
  );
}
