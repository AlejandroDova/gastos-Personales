# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run lint     # ESLint
```

No test runner configured.

## Architecture

Next.js 15 App Router app. Single Zustand store (`src/store/store.ts`) holds all state — `expenses[]` and `debts[]`. No backend, no persistence (state resets on reload). Dashboard auto-loads sample data when store is empty.

**Routing:**
- `/dashboard` → summary + chart
- `/dashboard/gastos` → expense list + add form
- `/dashboard/deudas` → debt list + add form

**Layout:** `src/app/template.tsx` wraps all dashboard routes with `Sidebar` + `Navbar`. This is a Next.js template (re-mounts on nav), not a layout.

**State:** All mutations go through `useStore` (Zustand). IDs assigned via `Date.now()`. No selectors — components call `useStore()` directly and destructure what they need.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Zustand v5 · Chart.js via react-chartjs-2 · Heroicons
