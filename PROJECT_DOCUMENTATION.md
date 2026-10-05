# Art Miqael Project Documentation

## 1. Project Overview

Art Miqael is a React + TypeScript storefront for an art marketplace. The application is organized around a feature-based architecture and is designed to model a complete shopping experience: browsing artworks, viewing product details, managing cart and wishlist, checkout flow, account pages, artist pages, blog, FAQs, and policy sections.

The project is built with:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Context API for global app state

This is a client-side demo storefront, meaning the data is local and simulated. It is structured so a future backend can be connected without rewriting the UI layer.

---

## 2. High-Level Structure

```text
.
├─ public/                     Static public assets served directly by Vite
├─ src/
│  ├─ app/                    Main app shell, providers, and route configuration
│  ├─ assets/                 Images and local static media files
│  ├─ components/
│  │  ├─ common/              Reusable storefront content blocks
│  │  ├─ layout/              Site-wide layout structures
│  │  └─ ui/                  Base UI primitives and reusable components
│  ├─ constants/              Routing, navigation, filter options, static settings
│  ├─ context/                Application state providers
│  ├─ data/                   Content and catalog data
│  ├─ features/               Feature-specific pages and modules
│  ├─ hooks/                  Custom hooks for business logic and state access
│  ├─ services/               Simulated API and storage layer
│  ├─ styles/                 Tailwind/global styling definitions
│  ├─ types/                  Shared TypeScript interfaces
│  ├─ utils/                  Helper functions for formatting, validation, and class names
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ README.md
├─ PROJECT_DOCUMENTATION.md
├─ .gitignore
└─ public/
```

---

## 3. Module-by-Module Description

### 3.1 app/
This folder contains the application root and setup logic.

- App.tsx: top-level app composition
- AppProviders.tsx: wraps the app with providers like theme, cart, auth, toast, and UI state
- routes.tsx: route declarations for the app's pages

Purpose: centralizes app bootstrap, routing, and provider configuration.

### 3.2 assets/
Stores local image assets and static media used across the app.

Purpose: keeps UI visuals centralized and easy to replace without touching page logic.

### 3.3 components/
This is the UI layer for reusable building blocks.

#### components/common/
Shared UI elements used across multiple feature pages.

- ArtworkCard.tsx: card layout for artwork listings
- ContactArtistModal.tsx: contact flow for artists
- Pagination.tsx: pagination control for list views
- QuickViewModal.tsx: quick preview modal for artworks
- SummaryRow.tsx: summary row used in orders, cart, and checkout summaries
- Toasts.tsx: toast notification container and messages

Purpose: reusable storefront widgets shared by many pages.

#### components/layout/
Structural site layout components.

- Header.tsx: top navigation bar with search, cart, wishlist, account actions
- Footer.tsx: site footer and support links
- MainLayout.tsx: wrapper shell for page layouts
- MobileDrawer.tsx: mobile navigation drawer
- Breadcrumbs.tsx: location breadcrumbs for nested pages

Purpose: shapes the app shell and navigation experience across pages.

#### components/ui/
Core reusable UI building blocks.

Examples include:

- Button/
- Input/
- Select/
- Modal/
- Card/
- Tabs/
- Accordion/
- ThemeToggle.tsx
- PageHeader/
- SectionHeader/
- EmptyState/
- ErrorState/
- LoadingSpinner/
- Badge/
- StarRating/
- StepIndicator/
- TextArea/

Purpose: provides a consistent design system for pages and avoids duplicated markup.

### 3.4 constants/
Contains static configuration values used in the app.

- navigation.ts: main navigation links
- routes.ts: central route path constants
- filters.ts: filtering configuration and option presets

Purpose: keeps route names, menu labels, and common filters in one place.

### 3.5 context/
Contains React context providers for cross-app state.

- AuthContext.tsx: user authentication state and login/logout simulation
- CartContext.tsx: shopping cart, wishlist, and recent searches
- ThemeContext.tsx: light/dark mode state
- ToastContext.tsx: global toast notifications
- UIContext.tsx: overlay or UI interaction state

Purpose: centralizes app-wide shared state without prop drilling.

### 3.6 data/
Static data layer for the storefront.

Files include:

- artworks.data.ts
- artists.data.ts
- blog.data.ts
- categories.data.ts
- faq.data.ts
- reviews.data.ts

Purpose: stores catalog and content data used by pages and hooks. This keeps content separate from UI components.

### 3.7 features/
Each folder represents a feature or page group in the application.

#### about/
About page content and sections.

#### account/
User account pages including profile, orders, addresses, settings, and order details.

#### artists/
Artist listing and artist profile pages.

#### auth/
Authentication flows such as login, register, and reset password.

#### blog/
Blog list and single blog article viewing.

#### cart/
Shopping cart page and cart item rows.

#### checkout/
Checkout funnel for shipping, payment, and order review.

#### collections/
Collection-based browsing pages.

#### contact/
Contact page and inquiry UI.

#### custom-artwork/
Custom commission or bespoke art request feature.

#### faqs/
Frequently asked questions pages.

#### home/
Landing page and featured content.

#### not-found/
404 page for invalid routes.

#### order-success/
Confirmation page after successful checkout.

#### policy/
Privacy, shipping, returns, and policy content pages.

#### product/
Single artwork detail page and related product presentation.

- ProductTabs.tsx: artwork description, artist bio, shipping details, and reviews; opening an artwork automatically starts browser text-to-speech for its description, with a control to stop or replay it.

The speech control uses the browser's Speech Synthesis API and stops when playback is stopped, the artwork changes, or the Description tab is closed. Background ambience is not included.

#### sell/
Artwork selling submission or seller inquiry form.

#### shop/
Main storefront browsing, filtering, and product list page.

#### wishlist/
Saved artworks and user wishlist management page.

Purpose: keeps each route and domain section isolated while sharing infrastructure globally.

### 3.8 hooks/
Custom hooks used to encapsulate logic and state behavior.

Examples:

- useAuth.ts
- useCart.ts
- useOrders.ts
- useSearchSuggestions.ts
- useShare.ts
- useShopFilters.ts
- useTheme.ts
- useToast.ts
- useUI.ts
- useWishlist.ts

Purpose: centralizes interaction logic such as filtering, search suggestions, theme toggling, and cart-related behavior.

### 3.9 services/
Simulated backend/data access layer.

- artist.service.ts
- artwork.service.ts
- auth.service.ts
- order.service.ts
- storage.service.ts

Purpose: abstracts the app's data access so components do not directly manipulate local data or storage. This layer is designed to be replaced with real API calls later.

### 3.10 styles/
Global styling layer for the app.

- globals.css: global Tailwind import and reusable classes such as button, card, input, badge styles

Purpose: centralizes design tokens, layout patterns, and reusable CSS classes.

### 3.11 types/
Type definitions for the app's shared data models.

Purpose: keeps TypeScript contracts consistent across components, services, and context providers.

### 3.12 utils/
Utility helpers for reusable logic.

- cx.ts: class-name merging helper
- format.ts: number/date/text formatting helpers
- slugify.ts: URL-safe slug generation
- validators.ts: validation rules for input fields

Purpose: reduces duplication and keeps logic reusable across features.

---

## 4. Data Flow and App Behavior

The application follows a simple layered architecture:

1. Static data is stored in src/data/
2. Services read or simulate access to that data
3. Context providers manage shared state such as cart, auth, and theme
4. Hooks expose stateful behavior to UI components
5. Feature pages render data and user flows using reusable UI modules

This separation ensures the UI remains clean and easier to maintain.

---

## 5. Design and UX Structure

The project uses Tailwind CSS with a custom theme defined in tailwind.config.ts and shared component classes in src/styles/globals.css.

This gives the app a consistent design language for:

- buttons
- cards
- tabs
- input fields
- badges
- section headers
- containers
- modals
- star ratings

The design system is intentionally reusable so each feature does not need to define its own visual patterns from scratch.

All buttons rendered through the shared `Button` component reuse one hover treatment: enabled buttons fade to 85% opacity while retaining their configured background color. This behavior is defined in `src/styles/globals.css`, not repeated in individual pages or variants.

---

## 6. Key Architectural Principles

### Feature-first organization
Pages and route-related logic live under src/features, while shared UI sits under src/components.

### Shared data and configuration
Static content and route metadata are kept outside components to reduce duplication and improve maintainability.

### Business logic outside JSX
Stateful operations are handled in hooks and context rather than burying logic in page components.

### Future-ready services layer
The services folder is designed as a boundary between UI logic and future backend integration.

---

## 7. Runtime Notes

The project is a client-side demo storefront.

Important current limitations:

- No real payment processing
- No backend database
- No real email delivery
- Auth is simulated
- Checkout is a front-end flow with validation but no live transaction processing

These are deliberate simplifications to keep the project focused on the shopping experience and architecture.

---

## 8. Project Scripts

From the root of the project:

```bash
npm install
npm run dev -- --host
npm run build
npm run preview
npm run lint
```

Purpose:

- dev: run the Vite development server
- build: compile TypeScript and create production output
- preview: preview the final production build locally
- lint: run ESLint checks

---

## 9. Summary

Art Miqael is a structured art marketplace front-end with a clean separation between:

- UI components
- route-based feature pages
- shared app state
- local data and simulated services
- reusable utilities and styling

This structure makes the project easy to extend, refactor, and connect to a real backend later.
