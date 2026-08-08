import { ROUTES } from "@/constants/routes";

export interface NavLink {
  label: string;
  to: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Browse art", to: ROUTES.shop },
  { label: "Artists", to: ROUTES.artists },
  { label: "Collections", to: ROUTES.collections },
  { label: "Custom artwork", to: ROUTES.customArtwork },
];

export const MOBILE_EXTRA_NAV: NavLink[] = [
  { label: "About", to: ROUTES.about },
  { label: "Blog", to: ROUTES.blog },
  { label: "Contact", to: ROUTES.contact },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All artwork", to: ROUTES.shop },
      { label: "Original paintings", to: `${ROUTES.shop}?category=original-paintings` },
      { label: "Limited editions", to: `${ROUTES.shop}?category=limited-editions` },
      { label: "Canvas prints", to: `${ROUTES.shop}?category=canvas-prints` },
      { label: "Custom artwork", to: ROUTES.customArtwork },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", to: ROUTES.about },
      { label: "Artists", to: ROUTES.artists },
      { label: "Journal", to: ROUTES.blog },
      { label: "Sell on Art Miqael", to: ROUTES.sell },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", to: ROUTES.contact },
      { label: "FAQs", to: ROUTES.faqs },
      { label: "Shipping policy", to: ROUTES.policy("shipping") },
      { label: "Refund policy", to: ROUTES.policy("refund") },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: ROUTES.policy("privacy") },
      { label: "Terms of service", to: ROUTES.policy("terms") },
    ],
  },
];
