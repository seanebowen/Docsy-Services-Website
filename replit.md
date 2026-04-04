# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **docsy-website** (`artifacts/docsy-website/`) — Multi-page marketing website for Docsy Notary Services. React + Vite, frontend-only. No backend.
  - Pages: Home, RON, Mobile Notary, Apostille, Loan Signing, Court Reporting, Memberships (Safe+), FAQ, Help Center (12 guides), Promos, Login, Verify
  - Stack: React, Vite, Tailwind CSS, wouter (routing), shadcn/ui components, lucide-react icons
  - Fonts: DM Sans (400/500/700) + JetBrains Mono (terminal mockup)
  - Design system: rig.rs-inspired — exact replication of rig.rs layout/aesthetic with Carolina blue replacing orange
  - Color palette:
    - `#00251b` (terminal-green) — page backgrounds
    - `#4B9CD3` (Carolina blue) — primary accent, buttons, links
    - `#f4ffff` (cloud-white) — text
    - `#047521` (emerald) — card borders
    - `#40ff7d` (signal-green) — section labels, highlights
    - `#000F0A` — darker surface for pricing tables/code blocks
  - Component patterns:
    - Cards: `rounded-xl` with `border border-emerald` or `border border-cloud/10`, hover lift
    - Buttons: filled (`bg-carolina rounded-md shadow-lg`) + outline (`border border-cloud/30 rounded-md`)
    - CTA sections: `rounded-3xl` with `bg-gradient-to-br from-emerald to-terminal`, radial overlay
    - Hero sections: centered text, radial glow blur overlay, signal-green section label
    - Terminal mockup: macOS dot buttons, monospace pre block
  - Navbar: centered logo, backdrop-blur sticky header, 3-col flex layout
  - PromotionTicker: scrolling promo bar below nav, Carolina blue background with terminal-green label
  - Logo: `/public/logo.png` (Docsy logo, white via CSS brightness/invert filter)
  - Custom component: `Reveal.tsx` — IntersectionObserver-based scroll reveal with delay prop
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
