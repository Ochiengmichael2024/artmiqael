export type Availability = "ready" | "made";
export type ArtworkSize = "small" | "medium" | "statement";
export type ArtworkStyle = "Abstract" | "Figurative" | "Minimal" | "Nature";
export type ArtworkOrientation = "Landscape" | "Portrait" | "Square";
export type CategorySlug =
  | "original-paintings"
  | "limited-editions"
  | "canvas-prints"
  | "murals"
  | "custom-artwork";

export interface Artist {
  id: string;
  name: string;
  location: string;
  specialty: string;
  bio: string;
  works: number;
  seed: string;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  category: CategorySlug;
  style: ArtworkStyle;
  orientation: ArtworkOrientation;
  price: number;
  size: ArtworkSize;
  availability: Availability;
  rating: number;
  reviewCount: number;
  edition: string;
  dims: string;
  medium: string;
  seed: string;
  img: string;
  imgAlt: string;
  imgDetail: string;
  description: string;
  tags: string[];
}

export interface Category {
  slug: CategorySlug;
  label: string;
  blurb: string;
}

export interface PriceBand {
  key: string;
  label: string;
  test: (price: number) => boolean;
}

export interface Review {
  name: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  body: string[];
}

export interface FaqGroup {
  group: string;
  items: [string, string][];
}

export interface CartItem {
  id: string;
  qty: number;
}

export interface Address {
  label?: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}

export interface User {
  name: string;
  email: string;
}

export interface DeliveryOption {
  key: string;
  label: string;
  days: string;
  price: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}

export interface OrderLineItem extends CartItem {
  artwork: Artwork;
}

export type OrderStatus = "Placed" | "Processing" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  date: string;
  items: OrderLineItem[];
  shipping: ShippingDetails;
  delivery: DeliveryOption;
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
}

export interface Coupon {
  code: string;
  pct: number;
}

export type ToastType = "success" | "error";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ShopFilters {
  category: string[];
  style: string[];
  orientation: string[];
  size: string[];
  price: string[];
  availability: string[];
}
