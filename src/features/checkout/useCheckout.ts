import { useMemo, useState } from "react";
import type { ShippingDetails } from "@/types";
import { DELIVERY_OPTIONS } from "@/constants/filters";
import { isRequired, isValidEmail, isValidCardNumber, isValidExpiry, isValidCvc } from "@/utils/validators";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { findArtwork } from "@/data/artworks.data";

export interface BillingDetails {
  card: string;
  exp: string;
  cvc: string;
  nameOnCard: string;
}

export function useCheckout() {
  const { cart, coupon } = useCart();
  const { user, addresses } = useAuth();

  const items = cart.map((c) => ({ ...c, artwork: findArtwork(c.id) })).filter((c): c is typeof c & { artwork: NonNullable<typeof c.artwork> } => !!c.artwork);
  const subtotal = items.reduce((s, c) => s + c.artwork.price * c.qty, 0);
  const discount = coupon ? Math.round(subtotal * coupon.pct) : 0;
  const defaultAddr = addresses[0];

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingDetails>({
    firstName: user?.name?.split(" ")[0] ?? "",
    lastName: user?.name?.split(" ")[1] ?? "",
    email: user?.email ?? "",
    phone: "",
    address: defaultAddr?.address ?? "",
    city: defaultAddr?.city ?? "",
    country: defaultAddr?.country ?? "",
    zip: defaultAddr?.zip ?? "",
  });
  const [delivery, setDelivery] = useState("standard");
  const [billing, setBilling] = useState<BillingDetails>({ card: "", exp: "", cvc: "", nameOnCard: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryOptions = useMemo(() => DELIVERY_OPTIONS(500, subtotal), [subtotal]);
  const shippingCost = deliveryOptions.find((d) => d.key === delivery)?.price ?? 0;
  const total = subtotal - discount + shippingCost;

  function validateShipping(): boolean {
    const e: Record<string, string> = {};
    if (!isRequired(shipping.firstName)) e.firstName = "Required";
    if (!isRequired(shipping.lastName)) e.lastName = "Required";
    if (!isValidEmail(shipping.email)) e.email = "Enter a valid email";
    if (!isRequired(shipping.address)) e.address = "Required";
    if (!isRequired(shipping.city)) e.city = "Required";
    if (!isRequired(shipping.country)) e.country = "Required";
    if (!isRequired(shipping.zip)) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateBilling(): boolean {
    const e: Record<string, string> = {};
    if (!isValidCardNumber(billing.card)) e.card = "Enter a valid card number";
    if (!isValidExpiry(billing.exp)) e.exp = "MM/YY";
    if (!isValidCvc(billing.cvc)) e.cvc = "Invalid CVC";
    if (!isRequired(billing.nameOnCard)) e.nameOnCard = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validateBilling()) return;
    setStep((s) => Math.min(2, s + 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  return {
    items, subtotal, discount, total, step, setStep, next, back,
    shipping, setShipping, delivery, setDelivery, deliveryOptions, shippingCost,
    billing, setBilling, errors,
  };
}
