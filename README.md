# Art Miqael

A production-structured art marketplace: React + TypeScript + Vite + Tailwind CSS, organized as a
feature-based architecture. This covers the **core shopper journey**: browse → product detail → cart →
checkout → account/orders, plus artists, collections, blog, FAQs and policy pages.

Verified: `npm install`, `npx tsc -b` (zero errors) and `npm run build` all succeed as shipped.

## Quick start (Google Cloud Shell or any machine with Node 18+)

```bash
unzip art-miqael.zip
cd art-miqael
npm install
npm run dev -- --host        # starts Vite on :5173, --host exposes it for Cloud Shell's Web Preview
```

In Cloud Shell, once `npm run dev` is running, use **Web Preview → Preview on port 5173**.

Other scripts:

```bash
npm run build      # type-checks (tsc -b) then produces a production build in dist/
npm run preview    # serves the dist/ build locally
npm run lint        # ESLint
```

## What this is (and isn't)

This is a fully client-side demo storefront — there is no real backend, payment processor, or email
delivery. That's intentional (scoped as "core shopper journey" with a simulated checkout). Everything
is structured so a real backend is a drop-in swap:

- **`src/services/`** is the only place that talks to storage/"APIs". Every function is `async` and
  shaped like a real HTTP call (`artworkService.list()`, `orderService.place()`, etc.) even though it
  currently reads from `src/data/*` and `localStorage`. Point these at real endpoints later without
  touching a single component.
- **`src/services/storage.service.ts`** is the only file that touches `localStorage`. Swap it for a
  cookie/session/remote-persistence strategy in one place.

Not built (explicitly out of scope for this pass, but nothing in the UI links to a dead page for them):
a seller dashboard and an admin panel. `/sell` is an application form, not a working dashboard.

## Architecture

```
src/
  app/            Root App component, router (routes.tsx), provider composition
  components/
    ui/           Generic, reusable primitives (Button, Card, Modal, Input, Accordion, Tabs, ...)
    layout/       Header, Footer, MobileDrawer, Breadcrumbs, MainLayout
    common/       Cross-feature building blocks (ArtworkCard, Toasts, QuickViewModal, Pagination, ...)
  features/       One folder per route/feature — home, shop, product, cart, checkout, auth, account,
                  artists, collections, about, contact, custom-artwork, sell, blog, faqs, policy
  context/        React Context providers (Toast, Cart, Auth, UI/overlay state)
  hooks/          Custom hooks (useCart, useAuth, useToast, useShopFilters, useWishlist, ...)
  services/       Simulated API layer (artwork/artist/auth/order) + storage wrapper
  data/           Static catalogue data — artworks, artists, blog posts, FAQs (no hardcoded content
                  lives in components)
  constants/      Routes, nav links, filter option lists
  types/          Shared TypeScript interfaces
  utils/          Formatting, slugs, validators, classnames
  styles/         Tailwind entry + reusable component classes (btn, card, field-input, badge, ...)
```

### Why this split

- **Feature-based, not type-based.** Each feature folder owns its page + the sub-components only it
  uses (e.g. `features/checkout/ShippingStep.tsx`). Shared UI lives in `components/ui`; shared
  cross-feature widgets (like the product card) live in `components/common`.
- **No hardcoded content in components.** Nav links, footer columns, filter options, artwork/artist/
  blog/FAQ copy all live in `data/` or `constants/` and are rendered via `.map()`.
- **Business logic lives in hooks/services, not JSX.** `useShopFilters`, `useCheckout`, `useCart`, etc.
  hold state and behaviour; page components mostly just render the result.
- **Path aliases.** `@/` maps to `src/` (configured in both `tsconfig.json` and `vite.config.ts`), so
  imports never look like `../../../../components/Button`.

### Known simplifications (documented, not hidden)

- Auth is fully simulated (`services/auth.service.ts`) — any email/password "signs in".
- Checkout is a real multi-step form with validation, but payment is never actually charged.
- A handful of `ui/` components (e.g. `Badge`, `Container`) skipped a separate `.types.ts` file since
  their prop shape is a one-liner already exported from the component file — splitting it out would add
  a file without adding clarity. Components with a genuinely reusable type (`Card`, `Button`, `Tabs`,
  `Accordion`) do export a dedicated type from their barrel.

## Design system

Colors, type scale (Fraunces serif / Inter sans / Space Mono labels), radii and shadows are defined as
Tailwind theme tokens in `tailwind.config.ts`, plus reusable component classes (`.btn-primary`, `.card`,
`.field-input`, `.badge`, ...) in `src/styles/globals.css` — so no component hand-rolls one-off utility
soup for repeated patterns.
