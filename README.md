# San Jose Foods

Marketing site for San Jose Foods LLC, an international meat trade company based in Hidalgo, TX. The site is bilingual (English / Spanish), runs on Next.js 16 with React 19, and is deployed to Vercel.

**Live:** https://san-jose-foods.vercel.app

## The company

San Jose Foods sources beef, pork, and chicken from packing facilities in the United States (USDA), Canada (CFIA), and Brazil (SIF), and supplies the Mexican market. The site is built for Mexican buyers (processors, distributors, retailers) to evaluate the operation and get in touch.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS-first config in `globals.css` `@theme`), shadcn/ui 4
- **Motion:** Motion 12 (`motion/react`)
- **Theming:** next-themes (dark default)
- **Icons:** lucide-react
- **Deploy:** Vercel

## Design decisions worth calling out

A few choices that took real thought, not just shipping a Next.js template.

**Bilingual is a first-class concern.** All user-facing strings live in `src/translations/index.ts` with `en` and `es` keys. A `useLanguage()` hook swaps copy live via the header toggle. The company speaks to U.S. and Canadian suppliers and Mexican buyers, so the site has to as well.

**Typography is a system, not a style.** Geist Sans for body and headlines, Geist Mono for spec-sheet details. Weights are locked at 400 and 500 across the site (Geist runs heavier than Inter at the same numbers; reaching for `font-bold` makes headlines look top-heavy). Negative tracking scales with size: `-0.04em` on giant headers, `-0.02em` on mid, none on body.

**Animation has a budget.** Five moments earn motion: the hero word-by-word stagger, sub-page hero fade, stat count-ups, product-card stagger, and the slow ticker marquee. Generic fade-on-scroll is out on purpose.

**Asymmetric product grid.** Beef hero spans 2 columns by 2 rows; pork and chicken stack to its right. The 3-equal-column layout was tested and rejected as visually flat.

**Honest copy.** No fabricated stats. Only claims the business can stand behind: three sourcing countries, 24/7 commercial response, LLC-backed credit lines, cargo-insured.

## Running locally

```bash
npm install            # legacy-peer-deps is already configured in .npmrc
npm run dev            # http://localhost:3000
npm run build          # production build (run before pushing)
npm run lint
```

`.npmrc` ships with `legacy-peer-deps=true`. That isn't laziness, it resolves a real peer-dependency conflict between React 19 and ESLint that would otherwise break the Vercel build.

## Project layout

```
src/
├── app/              # App Router pages: home, about, products, contact, why-san-jose-foods
├── components/       # Header, Footer, ThemeProvider, ThemeToggle
│   └── ui/           # shadcn primitives
├── contexts/         # LanguageContext (EN/ES toggle)
├── translations/     # single source of truth for bilingual copy
└── lib/              # utils
```

## How this was built

I'm a junior industrial-engineering student. I designed the product, picked the stack, made the typography and motion calls, and drove every commit and deploy myself. The code was written in collaboration with Claude Code; the `CLAUDE.md` in this repo documents the design and content rules so the collaboration stays consistent across sessions.

## Status

Live in production. Roadmap items and design constraints are tracked in `CLAUDE.md`.

---

By Pepe Tirado.
Business contact: [ventas1@sanjosefoods.net](mailto:ventas1@sanjosefoods.net)
