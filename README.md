# Whatbytes Frontend Assignment

An e-commerce storefront built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**: a product listing with filters, product detail pages and a persistent cart.

Live demo: https://whatbytesfrontend.vercel.app/

**Repository:** https://github.com/garvitgrapefruitcornSSSSS/Whatbytes-Frontend-Assignment

## Features

### Home page — Product Listing (`/`)
- Header with logo, search bar, cart button with item-count badge, and profile avatar
- Sidebar with category radios and a dual-thumb price range slider, plus a second filter card mirroring the design
- Responsive product grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Product cards with image, title, price and a quick **Add to Cart** button
- Featured wide card (Smartphone) with rating stars, description and category
- "No products found" state with a one-click **Clear all filters**
- Footer with filter links, copyright and social media icons

### Product Detail page (`/product/[id]`)
- Image carousel with arrows, thumbnails, dot indicators and keyboard navigation
- Title, brand, rating, price, description and category (links back to the filtered listing)
- Quantity selector and **Add to Cart**
- Customer reviews section
- Static generation for every product, a loading skeleton and a custom 404 for unknown IDs

### Cart page (`/cart`)
- List of added products with quantity controls and remove buttons
- Price summary: subtotal, shipping (free over $500), estimated tax and total
- Empty-cart state and "Clear cart"

## Logic implemented

| Requirement | Where |
| --- | --- |
| Category and price filtering | [`src/lib/filters.ts`](src/lib/filters.ts) |
| Search with string matching (case-insensitive, every word must match title / category / brand) | [`src/lib/filters.ts`](src/lib/filters.ts), [`SearchBar.tsx`](src/components/layout/SearchBar.tsx) |
| URL-based filters, e.g. `/?category=electronics&price=0-1000&q=watch` | [`src/hooks/useUrlFilters.ts`](src/hooks/useUrlFilters.ts) |
| Client-side cart state with React Context | [`src/context/CartContext.tsx`](src/context/CartContext.tsx) |
| Cart persisted in `localStorage` (synced across tabs, hydration-safe via `useSyncExternalStore`) | [`src/store/cartStore.ts`](src/store/cartStore.ts) |
| Dynamic routing for product detail pages | [`src/app/product/[id]/page.tsx`](src/app/product/[id]/page.tsx) |
| Conditional rendering (no results, empty cart, 404) | `ProductListing.tsx`, `CartView.tsx`, `not-found.tsx` |

### URL filter parameters

| Param | Example | Notes |
| --- | --- | --- |
| `category` | `electronics`, `clothing`, `home` | Omitted means "All" |
| `price` | `0-1000`, `100-500` | Min-max, clamped to 0–1000 |
| `q` | `wireless` | Free-text search from the header |

Filters can be combined, shared and bookmarked, and browser back/forward restores them.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Cache Components)
- React 19 and TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev/) icons
- Product images from [Unsplash](https://unsplash.com/)

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Product listing (/)
│   ├── product/[id]/            # Product detail page, loading skeleton, 404
│   ├── cart/page.tsx            # Cart page
│   ├── layout.tsx               # Root layout: CartProvider, Header, Footer
│   └── globals.css              # Theme tokens and slider styles
├── components/
│   ├── layout/                  # Header, SearchBar, CartButton, Footer
│   ├── filters/                 # FilterSidebar, PriceRangeSlider
│   ├── products/                # ProductListing, ProductGrid, cards, RatingStars, AddToCartButton
│   ├── product-detail/          # ImageCarousel, QuantitySelector, PurchasePanel, ReviewsSection
│   ├── cart/                    # CartView
│   └── icons/                   # Social media SVG icons
├── context/CartContext.tsx      # Cart React Context and useCart hook
├── store/cartStore.ts           # localStorage-backed cart store
├── hooks/useUrlFilters.ts       # URL ⇄ filter state sync
├── lib/                         # Filtering and pricing helpers
├── data/products.ts             # Mock product catalogue
└── types/                       # Product and filter types
```

## Deployment

The app is deployed on [Vercel](https://vercel.com/). To deploy your own copy, import the repository in Vercel; the default Next.js settings work with no extra configuration.
