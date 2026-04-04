# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **docsy-website** (`artifacts/docsy-website/`) — Multi-page marketing website for Docsy Notary Services. React + Vite, frontend-only. No backend.
  - Pages: Home, RON, Mobile Notary, Apostille, Loan Signing, Court Reporting, Memberships (Safe+), FAQ, Help Center (12 guides), Promos, Login, Verify
  - Stack: React, Vite, Tailwind CSS, wouter (routing), shadcn/ui components, lucide-react icons
  - Fonts: Inter (weights 300–900, headings use weight 700 with -0.03em tracking) + JetBrains Mono (bracket numbering)
  - Color scheme: `#0a0a0a` background, `#111` surface, `#222` borders, `#4A6FA8` primary/CTAs, `#999`/`#777`/`#555` text hierarchy, yellow-highlight for key phrases (`bg-yellow-200 text-black px-1`)
  - Design: rig.ai-inspired dark tech aesthetic — zero border-radius, Reveal scroll animations, bracket `[01]`/`[02]` section numbering, slate-blue banner dividers, bordered dark cards/tables
  - Navbar: 3-col flex — left (RON, Mobile Notary, Loan Signing) | center logo (h-14) | right (Apostille, Court Reporting, Memberships, More dropdown, Book a Service); bg `#0a0a0a`
  - Logo: `/public/logo.png` (Docsy logo, white via CSS filter `brightness(0) invert(1)`)
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
