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

## Typography system (2026-08-27 rethink)

- **Font:** **Bricolage Grotesque** (display/UI — the most-installed new Google sans-serif of the last two years, variable `opsz` axis for optical sizing, real ink-trap character instead of a neo-grotesque default) + **Faustina** (reading text + the counterpart-language italic) + **Chivo Mono** (typed values and codes only). Loaded via `next/font/google` in `src/app/layout.tsx`. Bricolage replaced Saira on 2026-08-27 (Saira read "fine but boring" once shipped — swap decided from a real side-by-side render, not from description).
- **Never use** Geist, Geist Mono, Source Serif 4, Saira, Inter, DM Sans, or Playfair Display. Migrated away from Geist deliberately — a full site rethink (2026-08-27) replaced the whole type system and the label grammar below; this supersedes any earlier Geist-era typography notes. Saira shipped for one day in the same rethink and was replaced (see below) — don't reintroduce it either.
- **Roles are voice contracts, not just fonts** — see "Voice grammar" below for exactly which elements get which face.

### Weight discipline

- **Body (Faustina):** `font-normal` (400) light mode, `font-weight: 450` dark mode (`.dark p.font-serif, .dark span.font-serif` in `globals.css` — thin serif hairlines bloom against a dark ground; put `font-serif` directly on the leaf `<p>`/`<span>`, never a wrapping `<div>`, or the selector won't match).
- **Headlines (h1, h2, h3) and section titles:** `font-semibold` (Bricolage Grotesque — the weight axis runs 200-800; semibold/700 is where the ink-trap character reads clearly without going heavy).
- **Buttons:** `font-medium` (500), sentence case.
- **Stat/declaration numerals:** DATA voice (Chivo Mono), ink not red — see the red budget below.
- **Never** use `font-bold` or `font-extrabold` on display text.

### Voice grammar — the four contracts

Mono is not "the spec-sheet font used everywhere labels go." Each voice has a one-sentence contract; test any new label against it before reaching for `font-mono` or `uppercase tracking-*`.

- **DATA (Chivo Mono):** a string a customs broker could copy onto a bill of lading unchanged — a typed value, a numeral, a code (cut names, HS codes, phone/email/address values, declaration values, doc-stamps). Case as written, tracking 0–0.02em, never uppercase-tracked.
- **FORM-LABEL (`.form-label` class, Bricolage Grotesque 11px uppercase tracking-[0.06em]):** the pre-printed half of a document. Legal ONLY attached to a ruled structure (a table header row, a form field, a declaration row label). A caps label floating in whitespace with nothing ruling it is the AI-eyebrow tell — the old `.eyebrow` class was exactly that and is deleted.
- **EDITORIAL (Bricolage Grotesque for display / Faustina for body):** sentence case, no added tracking. Headlines, prose, questions, buttons, all instructions, form errors.
- **COUNTERPART (`.flourish` class, Faustina italic, muted, ~14-16px):** one line restating a heading in the OTHER language — Spanish on the EN page, English on the ES page (e.g. `beefCounterpart` in `translations/index.ts` holds "Res de exportación" on the `en` table and "Export-grade beef" on the `es` table). Never data, never decoration, max one per section. This replaced the old "Spanish heritage flourish" framing — the device now carries meaning in both directions instead of only ever showing Spanish.

### Red budget

Per viewport: red = one action (a filled button, a hovered/checked row, or the CTA band) + at most one identity/state instance outside chrome (the hero accent word, the active nav tick). Chrome red is fixed at the logo mark + active nav tick. Demoted to ink/muted: `.doc-index`, stat/capability numerals, required-field asterisks, header/footer "SJF" sublines, the products pricing-note glyph. The manifest dock and checked-checkbox fill are deliberately **ink, not red** (`bg-ink`/`text-warm-50`, literal tokens not `foreground`/`background`, so the dock doesn't flip character between themes) — this keeps red scarce enough that it still means something when it appears.

### Where mono lives now (much more restricted than the old system)

Cut names in the products table, HS codes, the declaration's six values, footer/contact/company ledger values, doc-stamps, the marquee-replacement's absence (the marquee was deleted, see below), corner reference stamps ("Ref · Sourced product"). Every one of these is a number, a code, or a copyable value — the rule should be inferable from any single screen.

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
- Shared components: `CtaBand` (one WhatsApp-first sign-off), `WhatsAppGlyph`, `Header` (flush bar → bordered document tab morph), `Footer` (trade-letterhead ledger), `SectionHead` (newspaper section head — 2px ink rule + big Bricolage Grotesque title + mono meta, replaces the old `.section-bar` strip).
- Layout + ThemeProvider wrap: `src/app/layout.tsx`
- Translations: `src/translations/index.ts` (single source of truth for all bilingual content)
- Theme + nav components: `src/components/{Header,Footer,ThemeProvider,ThemeToggle}.tsx`
- shadcn primitives: `src/components/ui/*.tsx`
- Global CSS + theme tokens + custom button classes: `src/app/globals.css`

## Workflow norms

- **Small atomic commits.** One logical change per commit. Vercel auto-deploys from `main` to `san-jose-foods.vercel.app`.
- **Pre-flight before pushing:** `npm run build` locally. If it passes locally, Vercel ~95% passes too.
- **Vercel install gotcha:** `.npmrc` with `legacy-peer-deps=true` is committed for a reason. Don't remove it.

## Design direction: Trade Desk (Phase 4 — "The Yellow Sheet," 2026-08-27)

The site reads like a **trade document / spec sheet**, not a marketing site. Phase 3 (Geist/mono-everything/dotted-leader-everywhere) had itself become a template tell by mid-2026 — the red ticker and count-up stat ledger were, near-verbatim, Magic UI's two flagship landing-page primitives (`Marquee` and `NumberTicker`) dressed in mono. Phase 4 is a full rethink: new type system (see Typography above), a stricter voice grammar, a scarcer red budget, and the concept expressed through real trade-document devices instead of generic "spec sheet" decoration.

**What changed from Phase 3:**
- **Home hero is now a declaration form** ("La Declaración"): no stock photo, no ticker, no count-up ledger. Six ruled rows (Origin/Inspection/HS/Condition/Crossing/Desk) print in place on mount, styled after real customs-document field names (FSIS 9060-5, the Mexican pedimento). The old §01 stats ledger (`Counter.tsx`, count-up numerals) is deleted — "5 core services" was a table of contents pretending to be a proof, not a real stat.
- **Section headers are newspaper section heads** (`SectionHead.tsx`: 2px ink rule, big Bricolage Grotesque title with a hanging mono `§0X` index, a mono meta line of real codes), not the old gray `.section-bar` strip. `CropMarks` and `.doc-grid` (the graph-paper texture) are deleted sitewide — texture come from density and hairlines, not decoration.
- **Products cut table is a market-report ledger** ("The Yellow Sheet," after Urner Barry's real daily meat-market report): ruled rows, cut names promoted to the DATA voice (Chivo Mono — a cut name IS the SKU), a `CUT / QUOTE` header row. Dotted leaders are reserved for true multi-row *value* ledgers (footer, contact, company ops) — the products table uses solid hairlines instead, matching how the ledger's own voice-grammar rule treats it as a table, not an invoice.
- **Manifest multi-select** (new, `products/page.tsx`): a checkbox gutter lets a buyer tick cuts across all three protein sections and send ONE WhatsApp message shaped like a line-item order, instead of one WhatsApp thread per cut. Selection keys are `${protein}:${index}` (language-invariant — cut names are translated strings and would strand ticked state on an EN/ES toggle if used as the key). Each line in the outgoing message carries the cut's own catalog number (matching its on-page badge), not a tick-order renumbering. Capped at 24 lines (`+N more`) so a buyer ticking most of the catalog can't build a `wa.me` link long enough to silently truncate. The dock is deliberately ink, not red (see red budget above).
- **`.eyebrow` is deleted.** Every masthead used to carry a small uppercase tracked label above the h1 — the single most-documented AI landing-page tell. The h1 (plus a `doc-stamp` revision mark) now carries the job alone.
- Real public trade facts (WCO HS codes 0201/0202/0203/0207, USDA·CFIA·SIF, border crossings, NOM references) are used as content for credibility — never fabricated company data. This rule is unchanged from Phase 3.

Primitives live in `globals.css` `@layer components`: `.flourish` (now the counterpart-language voice, not just "Spanish heritage"), `.section-head` + `SectionHead.tsx`, `.form-label`, `.spec-row` (+`.lead-dots`, `.val` — true ledgers only), `.doc-index`, `.doc-stamp`, `.rule`, `.tnum`.

**Ban site-wide:** icon-in-tinted-rounded-square cards, equal-column feature/value grids, generic Mission/Vision sections (Company's `01/Mission · 02/Vision` mandate ledger is a *deliberate* numbered-document reframing of this, not the banned pattern — see "deliberately decided" below), decorative icons, soft shadows/glass, centered count-up stat bands, check-in-circle bullet lists, off-the-shelf landing-page primitives (Magic UI-style marquees/tickers/number-counters), and AI filler vocab (strategic/comprehensive/leading/seamless/optimize/premium/"wide range"/"full range"/"facilitate"/"resulting in").

## What's been deliberately decided (don't undo without asking)

- **`.flourish` (Faustina italic) is the counterpart-language line** — Spanish under an English heading, English under a Spanish one — never a decorative accent on a headline in its own page's language. The hero headline is all Bricolage Grotesque with one upright red accent *word* (`Mexico`/`México`). A serif-italic accent word inside a sans headline is the 2026 template tell; reserving the italic for the other-language register keeps it meaningful. (Supersedes the earlier "Spanish heritage flourishes ONLY" framing — see Typography above.)
- **The home hero is the declaration form, not a stats ledger.** The old §01 count-up ledger (`Counter.tsx`) is deleted; don't reintroduce a centered/count-up stat band anywhere on the site — it's a named AI-slop pattern and was itself a Magic UI primitive. Rule for the whole site: dotted leaders live only on true multi-row *value* tables that earn them (footer/contact ledgers, Company ops table) — the products cut table and the hero declaration use solid hairlines instead (they're closer to a filled-in form/ledger than an invoice).
- **Neutrals are warm paper tones** (hue ~52), not the stock stone preset.
- **Default theme:** dark.
- **No ghost decorative text behind CTAs.** "Carnicería" and "Pricing" ghosts were removed. Don't reintroduce.
- **No "Est · 2017" claim, and no marquee/ticker at all.** No founding year confirmed. The old red marquee ticker is deleted (Phase 4) — it was a Magic UI `Marquee` primitive dressed in mono; the facts it carried (inspection, sourcing, credit, 24/7, insurance, cold chain) now live in the hero declaration instead.
- **CTA h2 is upright, not italic.**
- **Product cards use asymmetric grid** (beef hero spans 2 cols × 2 rows, pork + chicken stack on right). Don't flatten back to 3 equal columns. Corner overlay chips (category + index stamped on the photo) are deleted — the index now lives in the caption block below the image.
- **Company §02 is the two-column `01 / Mission` · `02 / Vision` mandate.** This is a deliberate numbered-document reframing, not the generic banned Mission/Vision pattern — don't "fix" it by removing the framing. §01's "Who We Are" text column and the image+ops-ledger column are `lg:items-center` (the text column is much shorter; centering it against the taller column reads intentional instead of orphaned). §03 capability numbers are vertically centered against their heading+text (`lg:items-center`) and the capability body runs in two columns so it fills the width instead of hugging the left edge.
- **Real logo mark is integrated** via `SjfMark` (`src/components/SjfMark.tsx`): the two-tone red "A" peak, extracted from the `branding-san-jose` vector. It sits left of the wordmark in the nav, in the footer masthead, as the home hero's quiet ~5% opacity watermark, and as the favicon (white mark on the brand-red chip). Supersedes the text-only wordmark.
- **Section seams come from `SectionHead`'s own `border-t-2 border-foreground` rule, not an additional outer wrapper border.** Wrapping a `<section>` that opens with `SectionHead` in `border-t border-rule` produces two stacked "new section" signals with dead air between them — don't add one back. The `--rule` token (border mixed ~78% toward foreground) is still used for: the hero's bottom border, declaration-row hairlines, and Contact's form/rail section border — anywhere a divider needs to out-read the surrounding background without a `SectionHead` already providing the seam.
- **Every `.btn-*` carries the full state set** (hover, active-pressed, focus-visible ring, disabled), including `.btn-outline-white` (added Phase 4, for the CtaBand's secondary action on the red band). Press is a color shift, not a lift.
- **Error red is hue-shifted** (`--destructive` at hue ~33) so form errors read as their own signal, distinct from brand red (hue 23.5), the site's all-purpose emphasis color. Required-field asterisks use `text-destructive`, not `text-muted-foreground` (they need to read distinctly from the label they're attached to) and not brand red (that's reserved for the red budget's action/state slots).
- **Secondary product cards (pork/chicken) use a compact footer** (title + counterpart line + CTA, no description paragraph) so the caption fits the 280px grid row; the beef hero keeps the full caption. The counterpart line stays visible on every card.
- **Stock/reference imagery gets a `Ref ·` caption, never a `Fig. NN` documentary index**, sitewide including the Products page cut-table plates (added Phase 4 — they'd been skipping it). `Fig. NN` numbering reads as a catalogued photo of SJF's own facility, so representative stock carries a `Ref ·` marker until real SJF photography replaces it.
- **Interior page mastheads use `pt-12 pb-12` under the sticky header**, uniformly across Company/Contact/Products. The header is `sticky` and holds its own 76px of flow, so extra top padding only prints an empty band. Don't re-inflate to `pt-20`, and don't let one page's masthead drift to a different bottom padding than the others (Products briefly drifted to `pb-4`; fixed).
- **The manifest's multi-select checkbox is keyed by `${protein}:${index}`, never by the cut's display name.** Cut names are translated strings — keying by name strands a buyer's ticked selections the moment they toggle EN/ES.
- **Cut tables render as two independent column arrays** (`cuts.slice(0, mid)` / `cuts.slice(mid)`), not a single CSS `grid-cols-2` over a flat list. A shared grid auto-flows consecutive cuts into the same row, so a 2-line-wrapped name inflates its unrelated row-partner's height — splitting the list in half up front keeps each column's row heights independent.
- **The manifest dock uses literal `bg-ink`/`text-warm-50` tokens, never the theme-relative `foreground`/`background` pair.** Those tokens invert between dark and light mode, which would flip the dock's character along with the theme; the dock is meant to read as one consistent dark bar always.
