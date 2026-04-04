# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **docsy-website** (`artifacts/docsy-website/`) — Multi-page marketing website for Docsy Notary Services. React + Vite, frontend-only. No backend.
  - Pages: Home, RON, Mobile Notary, Apostille, Loan Signing, Court Reporting, Memberships (Safe+), FAQ, Help Center (12 guides), Promos, Login, Verify, 404
  - Stack: React, Vite, Tailwind CSS, wouter (routing), shadcn/ui (accordion only in FAQ), lucide-react icons
  - Fonts: DM Sans (400/700/900) via Google Fonts
  - **Design system: Exact rig.ai replication with Carolina blue replacing orange**
  - Color palette:
    - `#0a0a0a` — page background (pure black)
    - `#111` — surface (card areas, dropdowns)
    - `#1a1a1a` — dividers (thin horizontal lines between sections)
    - `#4B9CD3` — Carolina blue: hero backgrounds, section label pills, CTA buttons
    - `#ffffff` — primary text
    - `rgba(255,255,255,0.40–0.60)` — secondary/muted text
  - Layout patterns:
    - Hero: full-bleed Carolina blue background, black text, massive font, two CTA buttons
    - Sections: stacked, each separated by `border-t border-[#1a1a1a]`, centered content
    - Section label pill: `inline-flex px-3 py-1.5 bg-[CAROLINA] text-black text-xs font-bold uppercase tracking-widest`
    - No rounded corners anywhere — sharp/square everything
    - No cards with decorative borders — only thin divider lines
    - Headings: `font-black` (900 weight), very large, `letterSpacing: "-0.02em"`
  - Navbar: left logo, center nav links, right "Sign In" + "Book a Service" button (Carolina blue, sharp)
  - PromotionTicker: scrolling promo bar below nav, black background, Carolina blue text items
  - Logo: `/public/logo.png` (Docsy logo, white via CSS `brightness-0 invert`)
  - Routes: `/`, `/ron`, `/mobile-notary`, `/apostille`, `/loan-signing`, `/court-reporting`, `/memberships`, `/faq`, `/help-center`, `/help-center/:id`, `/promos`, `/login`, `/verify`
- **api-server** (`artifacts/api-server/`) — Express 5 backend API server

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
