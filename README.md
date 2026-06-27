# 📚 The Wisdom Vault — Frontend

A minimalist book archiving and management platform. Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, consuming a FastAPI backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Icons | Lucide React |
| Package Manager | pnpm |
| HTTP | Native `fetch` (server-side) |
| Auth | JWT — `access_token` + `refresh_token` via HttpOnly cookies |

---

## Features

- **Book Catalog** — filterable and searchable book grid with URL-driven filters (category, author, price range, stock, sort), paginated results, and 60-second ISR revalidation
- **Book Detail Pages** — full book metadata with cover images sourced from Open Library
- **Authors & Categories** — dedicated browse pages for authors and categories
- **Cart** — add/remove items; item count displayed live in the navbar
- **Wishlist** — save books for later; count shown alongside cart and orders in the navbar
- **Orders** — order history with per-order detail pages, status tracking, checkout form, and cancel action
- **Account Page** — view profile information
- **Auth** — login, signup, logout with JWT access/refresh token rotation; silent token refresh every 13 minutes via `AuthRefresher`; middleware-level route protection and redirect handling
- **Responsive Navbar** — sticky, blurred navbar with desktop and mobile (portal-based slide-out drawer) variants; inline item count badges for wishlist, orders, and cart
- **Dark Mode** — full dark/light theme support via Tailwind

---

## Project Structure

```
book-store-frontend/
├── app/
│   ├── (overview)/         # Home page (book catalog)
│   ├── account/            # User account page
│   ├── api/
│   │   └── auth/refresh/   # Next.js Route Handler for token refresh
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── authors/            # Authors browse page
│   ├── book/[id]/          # Book detail page
│   ├── cart/               # Shopping cart
│   ├── categories/         # Categories browse page
│   ├── orders/
│   │   ├── page.tsx        # Order history
│   │   └── [id]/           # Order detail page
│   ├── wishlist/           # Wishlist page
│   ├── auth-refresher.tsx  # Silent token refresh client component
│   ├── globals.css
│   └── layout.tsx          # Root layout — session, navbar, item counts
├── app/lib/
│   ├── api.ts              # apiFetch helper (token injection, 401 handling)
│   ├── definitions.ts      # Shared TypeScript interfaces
│   ├── schemas.ts          # Zod validation schemas
│   └── auth/ books/ cart/ orders/ authors/ categories/ users/ wishlists/
│       └── actions.ts      # Server actions per domain
├── app/ui/
│   ├── navbar.tsx          # Responsive navbar with mobile drawer (portal)
│   ├── search.tsx          # Search input
│   ├── skeletons.tsx       # Loading skeletons
│   ├── books/              # BookCard, BookGrid, FiltersPanel, Pagination
│   ├── cart/               # CartItem, CartButton
│   ├── orders/             # OrderCard, OrderItemRow, CheckoutForm, CancelButton
│   ├── wishlist/           # WishlistItem, WishlistButton
│   ├── authors/            # AuthorGrid
│   ├── categories/         # CategoryGrid
│   └── account/            # AccountSection
├── proxy.ts                # Middleware: route protection + token refresh injection
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Auth Architecture

Authentication is entirely cookie-based with two HttpOnly cookies: `access_token` (15 min) and `refresh_token` (7 days).

- **Middleware** (`proxy.ts`) guards protected routes (`/account`, `/cart`, `/wishlist`, `/orders`). If a page request arrives with a valid refresh token but no access token, it silently calls `/api/auth/refresh`, sets fresh cookies, and injects `x-access-token` into the request headers before forwarding.
- **`apiFetch`** reads the injected header or the cookie to attach `Authorization: Bearer <token>` to all server-side API calls.
- **`AuthRefresher`** is a client component mounted in the root layout that polls the refresh endpoint every 13 minutes, keeping the access token alive during long sessions.
- **`getSession`** is memoised with React `cache()` so the `/users/me` endpoint is only called once per request tree, regardless of how many Server Components invoke it.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- The [book-store-backend](https://github.com/RashadDweik/book-store-backend) running (FastAPI on `http://localhost:8000`)

### Installation

```bash
git clone https://github.com/RashadDweik/book-store-frontend.git
cd book-store-frontend
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
INTERNAL_API_BASE_URL=http://localhost:8000
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
pnpm build
pnpm start
```

---

## Backend

This frontend pairs with a **FastAPI** backend. See the [book-store-api](https://github.com/RashadDweik/book-store-api) repository for setup.

The backend provides REST endpoints for books, authors, categories, cart, wishlist, orders, and auth, along with JWT issuance, PostgreSQL persistence, Redis caching, and Open Library API integration for book covers.

---
