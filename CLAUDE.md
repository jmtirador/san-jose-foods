# San Jose Foods — Project Context

## What this site is

Marketing site for **San Jose Foods LLC**, Pepe's dad's company.

**Positioning:** International meat trade intermediary. Sources beef, pork, and chicken from packing facilities in the United States (USDA), Canada (CFIA), and Brazil (SIF), and supplies the Mexican market. Operates from Hidalgo, TX with LLC-backed credit lines and 24/7 commercial response.

**Buyer:** Mexican meat processors, distributors, and retailers placing wholesale orders.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (CSS-first config in `globals.css` `@theme` block — no `tailwind.config.ts`)
- **shadcn/ui 4.5** (components in `src/components/ui/`)
- **Motion 12** (`motion/react`) for animations
- **next-themes** for dark/light toggle
- **lucide-react** for icons
- **`.npmrc` has `legacy-peer-deps=true`** — required for Vercel build (React 19 + ESLint peer-dep conflicts).

## Typography system

- **Font:** Geist Sans (body + headlines) + Geist Mono (all labels, spec details, data) + **Source Serif 4 italic** for accents only. Loaded via `next/font/google` in `src/app/layout.tsx`.
- **Serif accent (`.flourish`):** Source Serif 4 italic carries the Spanish heritage flourishes (`Res de exportación`) and exactly ONE red accent word per major headline (e.g. the hero's `delivered by the load`). Accent only, never body copy.
- **Never use** Playfair Display, DM Sans, or Inter. We migrated away from them deliberately.
- **All eyebrows / field labels / spec labels are Geist Mono** (uppercase, tracked). No uppercase tracked labels in Geist Sans.

### Weight discipline (Geist runs heavier than Inter at the same numbers)

- **Body:** `font-normal` (400)
- **Headlines (h1, h2, h3):** `font-medium` (500)
- **Buttons:** `font-medium` (500)
- **Stat numerals (giant red numbers):** `font-normal` (400). Size + tracking carry the impact, not weight.
- **Never** use `font-bold` or `font-extrabold` on display text in Geist. It looks heavy.

### Tracking discipline (negative tracking scales with size)

- **Big big headers** (h1, large h2 ≥ text-3xl, hero numerals): `tracking-[-0.04em]`
- **Medium headers** (text-2xl): `tracking-[-0.02em]`
- **Smaller headers** (text-xl, text-lg): `tracking-[-0.015em]`
- **Body text + descriptions + Spanish flourishes:** no negative tracking
- **Eyebrows + spec labels (in mono):** wider tracking — `tracking-[0.2em]` or `tracking-wider`

### Where mono lives (the "spec-sheet" character)

- All section eyebrows ("BY THE NUMBERS", "WHAT WE SUPPLY", etc.) — via `.eyebrow` class
- Marquee "EST · 2017"-style pin and ticker items
- Stat entry marks ("— No. 01", etc.) and unit labels ("+ YEARS", "/ 7 RESPONSE")
- Product card corner labels ("BEEF / 01")
- CTA trust line ("From Texas to Mexico · 20 years")

Italic on Geist looks digital (oblique slant). Avoid Geist italic entirely — Spanish heritage flourishes and headline accent words now use the real **Source Serif 4 italic** via `.flourish`, which carries the translation/heritage register Geist's oblique can't.

## Color system

- **Brand red:** `#D9182E` (`brand-600`). Never replace this.
- **Light mode:** warm cream background (`oklch(0.987 0.004 50)` ≈ `#FFF8F5`), ink-near-black foreground.
- **Dark mode:** soft warm gray background (`oklch(0.275 0.003 60)`) — Claude/ChatGPT-style, **not** near-black ink. Cards lift to `oklch(0.32)`.
- **Theme behavior:** the entire page flips between modes. The marquee bar and CTA section stay red in both modes (brand assertion, not a theme choice). Default theme is `dark`.

## Radius system (Trade Desk: near-square)

Structure comes from **1px hairlines + whitespace, not rounding**. Nothing rounder than ~4px.

- **`--radius: 0.125rem` (2px).** Tiers: `rounded-sm` 0px, `rounded-md`/`rounded-lg` 2px, `rounded-xl` 4px.
- Large surfaces (cards, panels, image plates) read as **spec plates** with a 1px `border-border`, not rounded chrome.
- No soft drop shadows / glass / backdrop-blur as decoration. Elevation is not a device; hover is a **color shift, not a lift**.

## Motion philosophy

Animations are **earned**, not decorative. Five moments deserve motion:

1. **Hero headline** — word-by-word stagger on mount (1.5s, the marquee moment)
2. **Subpage heroes** — single block fade-up, 0.5s (lighter, since users see these on every nav)
3. **Stat numerals** — count-up + block stagger when scrolled into view
4. **Product cards** — staggerChildren on parent variant, hover scale + Spanish reveal
5. **Marquee** — continuous, slow (45s loop)

**Don't add:**
- Generic fade-on-scroll for every section
- Micro-interactions on every hover
- Scroll-tied parallax (we removed the CTA ghost text + parallax in cleanup)
- Hover decorations that don't tie to content meaning

## Content rules

- **Bilingual:** all user-facing strings live in `src/translations/index.ts` with `en` and `es` keys. The header has an EN/ES toggle that swaps live via `useLanguage()`.
- **Spanish heritage flourishes** (italic Spanish lines under English labels, e.g. `Res de exportación`) are intentional and always visible. They're a brand signature.
- **Never fabricate stats.** No "20+ years", "150+ clients", "98% on-time". No founding year, client count, or numerical history is confirmed. Real claims: 3 countries (US, Canada, Brazil), 24/7 commercial response, 5 core services, LLC credit-backed, cargo-insured.
- **No "family-owned" framing.** This is a professional LLC trading company.
- **Inspection certifications** are multi-country: USDA (US) + CFIA (Canada) + SIF (Brazil). Saying just "USDA Certified" is misleading for two-thirds of sourcing.

## Contact

- **Address:** 1020 E. Produce Rd., Hidalgo, TX 78557
- **Phone:** +52 81 8016 3885 (Monterrey area code)
- **Email:** ventas1@sanjosefoods.net
- **WhatsApp:** `https://wa.me/528180163885`

## Project structure pointers

- Pages (4): `src/app/{page,products,company,contact}/page.tsx`. About + Why merged into `/company`; `/about` and `/why-san-jose-foods` are permanent redirects in `next.config.js`. Per-route `<title>`/description live in each segment's `layout.tsx`.
- Shared components: `CtaBand` (one WhatsApp-first sign-off), `WhatsAppGlyph`, `Header` (flush bar → bordered document tab morph), `Footer` (trade-letterhead ledger).
- Layout + ThemeProvider wrap: `src/app/layout.tsx`
- Translations: `src/translations/index.ts` (single source of truth for all bilingual content)
- Theme + nav components: `src/components/{Header,Footer,ThemeProvider,ThemeToggle}.tsx`
- shadcn primitives: `src/components/ui/*.tsx`
- Global CSS + theme tokens + custom button classes: `src/app/globals.css`

## Workflow norms

- **Small atomic commits.** One logical change per commit. Vercel auto-deploys from `main` to `san-jose-foods.vercel.app`.
- **Pre-flight before pushing:** `npm run build` locally. If it passes locally, Vercel ~95% passes too.
- **Vercel install gotcha:** `.npmrc` with `legacy-peer-deps=true` is committed for a reason. Don't remove it.

## Design direction: Trade Desk (Phase 3, locked)

The site reads like a **trade document / spec sheet**, not a marketing site: mono labels, 1px ruled hairlines, dotted-leader spec tables, numbered document sections (`§01`, `No. 0X`, `SS0X`), tabular numerals, `doc-stamp` revision marks. Grew out of a whole-site AI-tell audit — the shadcn defaults (rounded cards, soft shadows, icon-in-tinted-square rows, centered count-up stats, glassy nav) were the loudest tells and were all removed. Primitives live in `globals.css` `@layer components`: `.flourish`, `.section-bar`, `.spec-row` (+`.lead-dots`, `.val`), `.doc-index`, `.doc-stamp`, `.rule`, `.tnum`. Real public trade facts (WCO HS codes 0201/0202/0203/0207, USDA·CFIA·SIF, border crossings) are used as content for credibility — never fabricated company data.

**Ban site-wide:** icon-in-tinted-rounded-square cards, equal-column feature/value grids, Mission/Vision sections, decorative icons, soft shadows/glass, centered count-up stat bands, check-in-circle bullet lists, and AI filler vocab (strategic/comprehensive/leading/seamless/optimize/premium).

## What's been deliberately decided (don't undo without asking)

- **Serif italic (`.flourish`) is for the Spanish heritage flourishes ONLY** (e.g. `Res de exportación`), never a decorative accent on an English headline. The hero is all Geist with one upright red accent *word* (`Mexico`). A serif-italic accent word inside a sans headline is the 2026 template tell; reserving the italic for the Spanish register keeps it meaningful.
- **The §01 stats are a left-aligned ledger** (`No. 0X` marker, label block with Spanish flourish + one-line desc, dotted leader, right-aligned red numeral with a count-up, unit column). But NO `doc-grid` behind the numbers and NO per-row solid separator: the dotted leader is the only line per row. Rule for the whole site: dotted leaders live only on multi-row value tables that earn them (this ledger, Products cut tables, Company ops table, footer/contact ledgers), each row gets ONE line not two (leader OR separator, not both), and the graph grid never sits behind a leader table (it fights the dotted lines).
- **Neutrals are warm paper tones** (hue ~52), not the stock stone preset.
- **Default theme:** dark.
- **No ghost decorative text behind CTAs.** "Carnicería" and "Pricing" ghosts were removed. Don't reintroduce.
- **No "Est · 2017" claim.** No founding year confirmed. The marquee pin was removed; the marquee is scroll-only (no pinned label).
- **CTA h2 is upright, not italic.** Geist italic doesn't carry the heritage feel.
- **The hero "Across Borders" line is `font-medium`** like the rest of the headline — it had a leftover `font-bold` override that was bolder than the other lines. Stays at medium.
- **Product cards use asymmetric grid** (beef hero spans 2 cols × 2 rows, pork + chicken stack on right). Don't flatten back to 3 equal columns.
- **Company §02 is the two-column `01 / Mission` · `02 / Vision` mandate.** §03 capability numbers are vertically centered against their heading+text (`lg:items-center`) and the capability body runs in two columns so it fills the width instead of hugging the left edge.
- **Real logo mark is integrated** via `SjfMark` (`src/components/SjfMark.tsx`): the two-tone red "A" peak, extracted from the `branding-san-jose` vector. It sits left of the wordmark in the nav, in the footer masthead, and as the favicon (white mark on the brand-red chip). Supersedes the text-only wordmark.
- **Section dividers use the `--rule` token** (border mixed ~78% toward foreground), not plain `border-border`, so they out-read the faint `doc-grid` graph paper in both themes. The grid stays a whisper; structure lines stay legible.
- **Every `.btn-*` carries the full state set** (hover, active-pressed, focus-visible ring, disabled). Press is a color shift, not a lift.
- **Error red is hue-shifted** (`--destructive` at hue ~33) so form errors read as their own signal, distinct from brand red (hue 23.5), the site's all-purpose emphasis color.
- **Secondary product cards (pork/chicken) use a compact footer** (title + Spanish flourish + CTA, no description paragraph) so the caption fits the 280px grid row; the beef hero keeps the full caption. The Spanish flourish stays visible on every card.
- **Stock/reference imagery gets a `Ref ·` caption, never a `Fig. NN` documentary index.** `Fig. NN` numbering reads as a catalogued photo of SJF's own facility, so representative stock (the company ops photo, the hero sourced-product shot) carries a `Ref ·` marker until real SJF photography replaces it.
