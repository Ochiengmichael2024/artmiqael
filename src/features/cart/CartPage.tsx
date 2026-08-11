import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/filters";
import { findArtwork } from "@/data/artworks.data";
import { formatPrice } from "@/utils/format";
import { useCart } from "@/hooks/useCart";
import { CartItemRow } from "./CartItemRow";
import { OrderSummary } from "./OrderSummary";

export function CartPage() {
  const navigate = useNavigate();
  const { cart, savedForLater, updateQty, removeFromCart, saveForLater, moveToCart, applyCoupon, coupon, couponError } = useCart();
  const [couponInput, setCouponInput] = useState("");

  const items = cart.map((c) => ({ ...c, artwork: findArtwork(c.id) })).filter((c): c is typeof c & { artwork: NonNullable<typeof c.artwork> } => !!c.artwork);
  const subtotal = items.reduce((s, c) => s + c.artwork.price * c.qty, 0);
  const discount = coupon ? Math.round(subtotal * coupon.pct) : 0;
  const shipping = subtotal === 0 ? 0 : subtotal > FREE_SHIPPING_THRESHOLD ? 0 : 25;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <Container className="pt-10">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          body="Save works to your cart as you browse — nothing here is reserved until checkout."
          action={<Button onClick={() => navigate(ROUTES.shop)}>Continue shopping</Button>}
        />
      </Container>
    );
  }

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Cart" }]} />
      <PageHeader title="Your cart" />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-10">
        <div>
          {items.map((c) => (
            <CartItemRow
              key={c.id}
              artwork={c.artwork}
              qty={c.qty}
              onUpdateQty={(qty) => updateQty(c.id, qty)}
              onRemove={() => removeFromCart(c.id)}
              onSaveForLater={() => saveForLater(c.id)}
            />
          ))}
          <Link to={ROUTES.shop} className="underline-link">
            <ArrowLeft size={12} /> Continue shopping
          </Link>

          {savedForLater.length > 0 && (
            <div className="mt-10">
              <div className="font-mono text-[11px] text-ink-faint mb-3.5">SAVED FOR LATER ({savedForLater.length})</div>
              {savedForLater.map((id) => {
                const a = findArtwork(id);
                if (!a) return null;
                return (
                  <Card key={id} className="flex flex-col sm:flex-row gap-4 p-4 mb-3 items-start sm:items-center">
                    <img src={a.img} alt="" className="w-[60px] h-[72px] rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-[14.5px]">{a.title}</div>
                      <div className="text-xs text-ink-soft">{formatPrice(a.price)}</div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => moveToCart(id)}>
                      Move to cart
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
          couponInput={couponInput}
          onCouponInputChange={setCouponInput}
          onApplyCoupon={() => applyCoupon(couponInput)}
          couponError={couponError}
          couponApplied={coupon?.code ?? null}
          onCheckout={() => navigate(ROUTES.checkout)}
        />
      </div>
    </Container>
  );
}
