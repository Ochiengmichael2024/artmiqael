import type { FaqGroup } from "@/types";

export const FAQ_GROUPS: FaqGroup[] = [
  { group: "Orders & shipping", items: [
    ["How long does shipping take?", "Ready-to-ship pieces leave our studio partners within 2 business days and typically arrive in 5–10 business days depending on destination. Made-to-order and commissioned work ships once complete — see the product page for an estimated timeline."],
    ["Do you ship internationally?", "Yes. International orders are calculated at checkout with duties handled on delivery in most regions. Large or fragile pieces may require a white-glove courier, which we'll flag before you pay."],
    ["Can I track my order?", "Every order gets a tracking link by email once it ships, and you can always check current status under Account → Orders."],
  ]},
  { group: "Payments", items: [
    ["What payment methods do you accept?", "We accept all major credit and debit cards, plus a saved-card option for returning collectors. This is a demo checkout, so no real charge is ever made."],
    ["Is my payment information secure?", "Card details are never stored on our side — this demo simulates a tokenised checkout the way a production integration would work."],
  ]},
  { group: "Returns & refunds", items: [
    ["Can I return a piece?", "Open-edition prints and canvas works can be returned within 14 days in original packaging. Original paintings and commissions are final sale once accepted, given their one-off nature."],
    ["What if my piece arrives damaged?", "Contact us within 48 hours with photos of the packaging and the damage and we'll arrange a replacement or refund — no questions asked."],
  ]},
  { group: "Commissions", items: [
    ["How does a custom commission work?", "Start on the Custom artwork page with your space, budget and any reference pieces. The artist will propose a sketch or colour study before starting the final work."],
    ["Can I commission a specific artist?", "Yes — mention their name in your brief and we'll confirm availability before matching you elsewhere."],
  ]},
  { group: "Account", items: [
    ["Do I need an account to buy?", "No, guest checkout is available, but creating an account lets you track orders, save addresses and build a wishlist."],
    ["How do I reset my password?", "Use Forgot password on the login page — in this demo it simulates sending a reset link and confirms instantly."],
  ]},
];

export const POLICY_CONTENT: Record<string, { title: string; body: string[] }> = {
  privacy: { title: "Privacy policy", body: ["Art Miqael collects only the information needed to process orders, respond to enquiries, and improve the browsing experience: name, email, shipping address and order history.", "We never sell personal information to third parties. Payment details are tokenised at checkout and never stored on our servers.", "You can request a copy of your data or ask us to delete your account at any time by contacting support."] },
  terms: { title: "Terms of service", body: ["By placing an order on Art Miqael you agree to pay the listed price plus applicable shipping and duties. Original paintings and commissions are one-of-one and sold as-is once accepted.", "Listed availability (ready to ship / made to order) reflects our best estimate at time of purchase and may shift slightly for hand-made work.", "Continued use of the site constitutes acceptance of these terms as they're updated from time to time."] },
  shipping: { title: "Shipping policy", body: ["Ready-to-ship pieces leave our studio partners within 2 business days. Made-to-order and commissioned pieces ship once complete, with an estimate shown on the product page.", "Large or fragile works may require white-glove courier delivery, calculated automatically at checkout.", "International orders may be subject to import duties collected on delivery, depending on destination."] },
  refund: { title: "Refund policy", body: ["Open-edition prints and canvas works can be returned within 14 days in original packaging for a full refund.", "Original paintings, limited editions and commissions are final sale once accepted, given their one-off nature — please use the zoom and detail images before purchasing.", "Damaged-on-arrival pieces are always eligible for replacement or refund — contact us within 48 hours with photos."] },
};
