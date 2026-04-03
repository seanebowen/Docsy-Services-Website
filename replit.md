# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **docsy-website** (`artifacts/docsy-website/`) — Multi-page marketing website for Docsy Notary Services. React + Vite, frontend-only. No backend.
  - Pages: Home, RON, Mobile Notary, Apostille, Loan Signing, Court Reporting, Memberships (Safe+), FAQ, Help Center (12 guides)
  - Stack: React, Vite, Tailwind CSS, framer-motion, wouter (routing), shadcn/ui components
  - Fonts: Barlow Condensed 900 (headings, all-caps editorial), Barlow 400/600 (body)
  - Color scheme: cream background (#f2f0e3), near-black (#141414) dark sections, slate blue (#4A6FA8) primary/CTAs, yellow-highlight (#fef08a) for key phrases
  - Design: BlueNotary-inspired editorial aesthetic — zero border-radius, dark hero sections, numbered sidebar columns, slate-blue banner bars
  - Navbar: 6 main service tabs + "More ▾" dropdown (FAQ, Help Center, My Account, Sign Out) + "Book a Service" CTA
  - Logo: `/public/logo.png` (Docsy logo, white via CSS filter on dark backgrounds)
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
