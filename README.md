# Art Miqael

A production-structured art marketplace: React + TypeScript + Vite + Tailwind CSS, organized as a
feature-based architecture. This covers the **core shopper journey**: browse → product detail → cart →
checkout → account/orders, plus artists, collections, blog, FAQs and policy pages.

Verified: `npm install`, `npx tsc -b` (zero errors) and `npm run build` all succeed as shipped.

## Project documentation

For the complete project structure and brief explanation of each module, see [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).

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

```text
.
├─ public/                     Static assets served directly by Vite
├─ src/
│  ├─ app/                    App shell, provider composition, route definitions
│  │  ├─ App.tsx
│  │  ├─ AppProviders.tsx
│  │  └─ routes.tsx
│  ├─ assets/                 Local images, icons, brand/media files
│  ├─ components/
│  │  ├─ common/              Shared storefront UI blocks (cards, modal, pagination, toasts)
│  │  ├─ layout/              Header, Footer, Breadcrumbs, MobileDrawer, main shell
│  │  └─ ui/                  Reusable primitives (Button, Input, Select, Modal, Tabs, etc.)
│  ├─ constants/              Navigation, routes, filter config, static lists
│  ├─ context/                Cart, auth, theme, toast, UI state providers
│  ├─ data/                   Artwork, artist, blog, FAQ, review, category data sets
│  ├─ features/
│  │  ├─ about/
│  │  ├─ account/
│  │  ├─ artists/
│  │  ├─ auth/
│  │  ├─ blog/
│  │  ├─ cart/
│  │  ├─ checkout/
│  │  ├─ collections/
│  │  ├─ contact/
│  │  ├─ custom-artwork/
│  │  ├─ faqs/
│  │  ├─ home/
│  │  ├─ not-found/
│  │  ├─ order-success/
│  │  ├─ policy/
│  │  ├─ product/
│  │  ├─ sell/
│  │  ├─ shop/
│  │  └─ wishlist/
│  ├─ hooks/                  Reusable custom hooks for auth, cart, wishlist, filters, UI
│  ├─ services/               Simulated API/storage layer (artwork, auth, order, storage)
│  ├─ styles/                 Tailwind/global styling and reusable utility classes
│  ├─ types/                  Shared TypeScript models and interfaces
│  ├─ utils/                  formatters, cx helper, validators, slugs
│  ├─ main.tsx
│  ├─ vite-env.d.ts
│  └─ index.css (if present in a future refactor; styling is currently in styles/globals.css)
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ README.md
└─ .gitignore
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
