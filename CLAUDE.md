# San Jose Foods — Project Context

## What this site is

Marketing site for **San Jose Foods LLC**, Pepe's dad's company.

**Real positioning:** International meat trade intermediary. Sources meat through strategic partnerships with packing facilities in the **United States, Canada, and Brazil**, and supplies the **Mexican market**. Operates from Hidalgo, TX with LLC-backed credit lines and 24/7 commercial response.

**It is NOT:** a family-owned wholesale exporter, a 20-year-old company with 150 clients, or a single-country (US-only) supplier. The placeholder content originally framed it that way — that was wrong. Don't reintroduce those claims.

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

- **Font:** Geist Sans (body + headlines) + Geist Mono (spec-sheet details). Loaded via `next/font/google` in `src/app/layout.tsx`.
- **Never use** Playfair Display, DM Sans, or Inter. We migrated away from them deliberately.

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

Italic on Geist looks digital (oblique slant, not a real italic). Avoid italic on headers. Spanish heritage flourishes (`Res de exportación`, `Años exportando`) are an exception — they're allowed italic because the convention reads as a translation/heritage signal.

## Color system

- **Brand red:** `#D9182E` (`brand-600`). Never replace this.
- **Light mode:** warm cream background (`oklch(0.987 0.004 50)` ≈ `#FFF8F5`), ink-near-black foreground.
- **Dark mode:** soft warm gray background (`oklch(0.275 0.003 60)`) — Claude/ChatGPT-style, **not** near-black ink. Cards lift to `oklch(0.32)`.
- **Theme behavior:** the entire page flips between modes. The marquee bar and CTA section stay red in both modes (brand assertion, not a theme choice). Default theme is `dark`.

## Radius system (tiered, Linear/Vercel style)

- **Big surfaces** (cards, panels, form, story image): `rounded-xl` (12px)
- **Buttons, inputs, small icon containers (w-9/10/11):** `rounded-lg` (8px)
- **Small chips, nav pills, corner badges:** `rounded-md` (6px)
- **shadcn `--radius` variable:** `0.75rem`

Bigger surface = bigger radius. Don't share radii between buttons and cards.

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
- **Never fabricate stats.** No "20+ years", "150+ clients", "98% on-time". The dad provided no numerical history. Real claims: 3 countries (US, Canada, Brazil), 24/7 commercial response, 5 core services, LLC credit-backed, cargo-insured.
- **No "family-owned" framing.** This is a professional LLC trading company.
- **Inspection certifications** are multi-country: USDA (US) + CFIA (Canada) + SIF (Brazil). Saying just "USDA Certified" is misleading for two-thirds of sourcing.

## Real contact info (don't replace with placeholders)

- **Address:** 1020 E. Produce Rd., Hidalgo, TX 78557
- **Phone:** +52 81 8016 3885 (Monterrey area code; the dad uses a Mexican number)
- **Email:** ventas1@sanjosefoods.net
- **WhatsApp link:** `https://wa.me/528180163885`

## Project structure pointers

- Pages: `src/app/{page,about,products,contact,why-san-jose-foods}/page.tsx`
- Layout + ThemeProvider wrap: `src/app/layout.tsx`
- Translations: `src/translations/index.ts` (single source of truth for all bilingual content)
- Theme + nav components: `src/components/{Header,Footer,ThemeProvider,ThemeToggle}.tsx`
- shadcn primitives: `src/components/ui/*.tsx`
- Global CSS + theme tokens + custom button classes: `src/app/globals.css`

## How Pepe collaborates

He is a junior IE student learning to leverage AI. He's not a developer yet. He drives commands and git himself; AI drives code-building. He wants to understand what code does, not just copy-paste.

- **Push back if a request would harm the site.** He's open to corrections — he overruled my "keep Playfair" advice but appreciates the reasoning being given first.
- **Be executive-direct.** Claim first, then reasoning. No padding.
- **Spaced lines, sharp claims.** He explicitly asked for breathing room in responses (per `~/.claude/projects/.../memory/feedback_response_density.md`).
- **No em dashes as conjunctions in prose.** Use commas, colons, or periods.
- **End useful answers with a "shortcut hack"** when one genuinely exists.

## Workflow norms (already in motion)

- **Small atomic commits.** One logical change per commit. Pepe pushes via `git push origin main` himself; Vercel auto-deploys (project at `vercel.com/jmtirador/san-jose-foods`, prod URL `san-jose-foods.vercel.app`).
- **`!` prefix in Claude Code prompt** runs shell commands inline so the agent sees the output.
- **Pre-flight before pushing:** `npm run build` locally. If it passes locally, Vercel ~95% passes too.
- **Vercel install gotcha:** `.npmrc` with `legacy-peer-deps=true` is committed for a reason. Don't remove it.

## What's been deliberately decided (don't undo without asking)

- **Default theme:** dark. Pepe prefers the contrast.
- **No ghost decorative text behind CTAs.** "Carnicería" and "Pricing" ghosts were removed. Don't reintroduce.
- **No "Est · 2017" claim.** Dad gave no founding year. Marquee pin reads `USA · CA · BR` (the three sourcing countries).
- **CTA h2 is upright, not italic.** Geist italic doesn't carry the heritage feel.
- **The hero "Across Borders" line is `font-medium`** like the rest of the headline — it had a leftover `font-bold` override that was bolder than the other lines. Stays at medium.
- **Product cards use asymmetric grid** (beef hero spans 2 cols × 2 rows, pork + chicken stack on right). Don't flatten back to 3 equal columns.
- **Stats section is centered** (eyebrow + numeral + unit + label all center-aligned). Left-aligning broke optical balance because of Geist's side bearing.
