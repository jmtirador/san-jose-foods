# San Jose Foods — Project Context

## What this site is

Marketing site for **San Jose Foods LLC**, Pepe's dad's company.

**Positioning:** International meat trade intermediary. Sources beef, pork, and chicken from packing facilities in the United States (USDA), Canada (CFIA), and Brazil (SIF), and supplies the Mexican market. Operates from Hidalgo, TX with LLC-backed credit lines and 24/7 commercial response.

**Buyer:** Mexican meat processors, distributors, and retailers placing wholesale orders. The buyer browses in Spanish and thinks in Mexican market cut names (arrachera, aguayón, diezmillo) and IMPS numbers, not HS codes.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (CSS-first config in `globals.css` `@theme` block, no `tailwind.config.ts`)
- **Motion 12** (`motion/react`) for entrance and scroll motion
- **torph** (`torph/react`) for the EN/ES text morph on headings and the manifest count
- **next-themes** for the dark/light toggle
- **lucide-react** for the six utility glyphs only (menu, close, arrow, check, chevron, sun/moon). No decorative icons anywhere.
- **`.npmrc` has `legacy-peer-deps=true`**: required for the Vercel build (React 19 + ESLint peer-dep conflicts). Don't remove it.
- `next.config.js` restricts image optimization to WebP. AVIF encoding of the 2000px source photos stalls the local optimizer for minutes.
- The `lint` script (`next lint`) no longer exists in Next 16 and there is no ESLint config in the repo. TypeScript runs inside `next build`. Known gap, not fixed in Phase 5.

## Design direction: Phase 5, "Black Ground, Real Goods" (2026-09-15)

The site reads like an established company's site, not a document. Near-black stage, one sans at giant scale, and **the product is the only color**: brand red and the graded product photography are the only chroma on the page (plus the WhatsApp glyph green, a third-party mark).

Phases 3 and 4 ("Trade Desk", "The Yellow Sheet") both styled the site as a trade document because there was no photography and type was the only lever. Both were retired on 2026-09-15: a customs form is what a broker faxes you; principals show the goods and the scale. The old primitives (`SectionHead`, `.flourish`, `.doc-index`, `.doc-stamp`, `.form-label`, `.spec-row`, dotted leaders, the declaration hero, the header morph) are gone. Don't reintroduce them.

**Design read:** a B2B marketing site for Mexican wholesale meat buyers, established-principal and product-first, in the Anduril x Linear dark industrial family. Dials: VARIANCE 6, MOTION 6, DENSITY 5.

## Typography

- **Font: Switzer** (Fontshare, Indian Type Foundry, ITF Free Font License: commercial use and self-hosting allowed, no attribution). Variable weight 100-900, self-hosted from `src/app/fonts/` via `next/font/local` as `--font-switzer`. One family carries every word. **Chivo Mono** (`next/font/google`) is confined to codes and typed values: IMPS and HS numbers, phone, email, address, the `USDA · CFIA · SIF` line.
- **Never use** Geist (Phase 3 shipped it and it read as a template tell), Inter, Bricolage Grotesque, Faustina, Saira, Source Serif 4, DM Sans, or Playfair Display. No serif anywhere.
- **Scale (six sizes, classes in `globals.css`):** `.t-display` hero and page h1 (`clamp(3.25rem, 7.6vw, 7.5rem)`, 600, -0.04em, 0.95), `.t-h2` section heads (600, -0.03em), `.t-h3` (1.375rem, 600), `.t-lead`, `.t-body` (1.0625rem / 1.6), `.t-small` (0.875rem), `.t-code` (mono 0.8125rem, tabular). Headings get `text-wrap: balance`, paragraphs `text-wrap: pretty` (set in `@layer base`).
- **Weights:** headings 600, buttons and row names 500, body 400. Never 700+ on display text.
- Sentence case everywhere. No uppercase-tracked labels above headings (the "eyebrow" tell); the only uppercase text is the EN/ES control.

## Color

- **Brand red `#D9182E`** (`brand-600`, `--primary`). Never replace it. Filled buttons use it in both themes (white text on it passes AA at 5.1:1). Red as *text* uses `--accent-text` (darker on light, lifted on dark) for contrast.
- **Dark (default):** `--background oklch(0.13 0.005 40)` near-black, warm. Surfaces lift: `--surface-1 0.17`, `--surface-2 0.21`. Borders are white at 10%.
- **Light:** `--background oklch(0.985 0.003 60)` off-white, never pure white. Borders black at 8%.
- **Error red is hue-shifted** (`--destructive` at hue ~33) so form errors read as their own signal. Required-field asterisks use it.
- **Grain:** one fixed `.grain` layer (`feTurbulence` SVG, `mix-blend-mode: overlay`, 5% dark / 3.5% light) gives the near-black ground texture. Never on scrolling containers.
- **Image grade (`.grade`):** every photo is `grayscale(0.8) contrast(1.08) brightness(0.9)` plus a brand-red multiply layer at 32% and a fade. Variants: `.grade-hero` (top scrim for the header plus bottom fade to ink, white copy in both themes), `.grade-plate` (fade to ink, copy sits on the image), `.grade-band` (fades into the page at both edges, red at 22%). This is what makes stock read as the brand's own until real photography arrives.

## Radius, spacing, layout

- **One radius system:** controls 8px (`rounded-md`), surfaces and plates 16px (`rounded-xl`). Nested inner = outer minus padding. No pills except the arrow disc inside a plate.
- 8px spacing scale. Sections `py-24` desktop / `py-16` mobile. Container `.wrap` (`max-w-[1280px] px-6 sm:px-10`). Hero full-bleed.
- Structure comes from whitespace and single hairlines (`divide-y`, `border-y`). No cards with shadows; the only shadow on the site is under the floating manifest dock (functional elevation).
- `.kv` is the key-value row (grey label left, bold value right, whitespace only) used for direct lines, HS/format, and the Company at-a-glance list.

## Motion

Tokens live in `src/lib/motion.ts` (`DUR`, `EASING`, `STAGGER`, `SPRING`, `revealProps`, `rowReveal`, `heroLine`). Components compose them; a literal duration or easing in a component is drift. `MotionConfig reducedMotion="user"` wraps the tree (in `ThemeProvider.tsx`), every component also guards with `useReducedMotion`, and a global CSS media query collapses transitions. Every animation states a true fact (the `motion` skill's rule); the claim is written next to each one in the code.

1. **The page opened:** the hero and masthead headlines set themselves word by word (`MorphText stagger`), then the lead line and CTAs rise in; the hero image settles from scale 1.08 and parallaxes 16% on scroll (`useScroll` + `useTransform`, transform only).
2. **The page changed:** `src/app/template.tsx` remounts on every navigation and crossfades the content column in with an 8px rise. The header never re-renders.
3. **This section arrived:** `Reveal` once per section; rows inside lists (FAQ, at-a-glance, capabilities, reference points, contact fields, catalog rows) arrive in order with `rowReveal` (40ms step, capped at 300ms).
4. **The corridor progresses as you do:** `Corridor` draws its three stages from scroll progress (origins, crossings, market) with the desk and market nodes scaling in; the traveling dots start once the map is fully drawn. Phones get the vertical list.
5. **The language changed:** `MorphText` morphs each word (torph), the language pill slides (`layoutId`), the manifest count morphs by digit.
6. **This is the current place:** the header nav tick and the catalog jump-bar tick slide between items (`layoutId` + `SPRING.tick`).
7. **You pressed it:** every control scales 2 to 3% on press; the check inside a cut row springs in when the cut joins the request; the theme icon turns over on toggle.
8. **The plate arrived:** Home product photos settle from scale 1.14 into their frames; the Company band drifts slower than the page.

**Don't add:** marquees, count-up stat bands, scroll hijacking, GSAP, loops that never end, gradient sweeps, confetti. Bold means a stronger idea, never louder decoration.

## Content rules

- **Bilingual:** all user-facing strings live in `src/translations/index.ts` with `en` and `es` keys. The language is resolved server-side in `layout.tsx` (cookie `sjf-lang`, then `Accept-Language`) so Spanish visitors never flash English. The header toggle swaps live via `useLanguage()`.
- **Hero headline lines must have the same word count in EN and ES** (`heroTitleA` 3 words, `heroTitleB` 2 words) so each word morphs into its counterpart.
- **Never fabricate stats.** No "20+ years", "150+ clients", "98% on-time". No founding year, client count, or numerical history is confirmed. Real claims: 3 countries (US, Canada, Brazil), 24/7 commercial response, LLC credit-backed, cargo-insured.
- **No "family-owned" framing.** This is a professional LLC trading company.
- **Never name a supplier plant.** The photos in `~/Projects/branding-san-jose/SJF Fotos Productos/` show Simmons boxes with a USDA establishment number legible; they cannot go on the site.
- **Inspection certifications** are always the three together: USDA (US) + CFIA (Canada) + SIF (Brazil).
- **No em dashes or en dashes** in visible copy, metadata, or alt text.
- **Copy register:** plain and functional, sentence case. Spanish is Mexican commercial register (usted, cotizar, la mesa, empacadora).

## The catalog (Products page)

- Cut names are the `cuts` arrays in `src/translations/index.ts` (beef 16, pork 12, chicken 11). **Their order is an index**: `src/data/cuts.ts` maps each `index` to a primal group, an IMPS number, and a Mexican market name. Reordering a `cuts` array without updating `cuts.ts` corrupts the atlas.
- **IMPS numbers** come from the USDA AMS Institutional Meat Purchase Specifications, Series 100 (beef) and 400 (pork). Items with no series number (offal, all poultry) carry `null`, never an invented code. Mexican market names follow published US-to-Mexico nomenclature guides; an unsourced pair stays `null`.
- **Manifest:** rows toggle by `${protein}:${index}`, never by the translated name, so a ticked row survives an EN/ES toggle. The message lists each cut by protein, name as printed, and IMPS number, capped at 24 lines (`+N more`) so a `wa.me` link can't get silently truncated. The dock uses literal `bg-ink` / `text-paper`, never the theme pair, so it is one consistent dark object in both themes.
- Primal groups render inside `lg:columns-2` with `break-inside-avoid`, so a wrapped name in one group never inflates a row in another.

## Imagery

- Three product photos in `public/img/` (`beef.jpg` 2000x3000, `pork.jpg`, `chicken.jpg`), downloaded from Unsplash (license permits use), served through `next/image`, always graded. Slots waiting for owned photography: the Home hero (portrait, 2000x3000 or larger), the three Home plates, the three Products plates (4:5), the Company band (wide, 2000x900 or larger). Every box has to be re-boxed or label-away in owned shots.
- The Company page uses a product macro as a band, never a facility or people photo: stock must not imply SJF's own operation.

## Contact

- **Address:** 1020 E. Produce Rd., Hidalgo, TX 78557
- **Phone:** +52 81 8016 3885 (Monterrey area code)
- **Email:** ventas1@sanjosefoods.net
- **WhatsApp:** `https://wa.me/528180163885`

## Project structure pointers

- Pages (4): `src/app/{page,products,company,contact}/page.tsx`. `/about` and `/why-san-jose-foods` are permanent redirects to `/company` in `next.config.js`. Per-route `<title>`/description live in each segment's `layout.tsx`.
- Shared: `Masthead` (interior page opener), `Header` (fixed 64px, transparent over the Home hero with the `.on-image` white scheme, blurred once scrolled, full-height mobile sheet), `Footer`, `CtaBand` (the one red block per page), `Reveal`, `MorphText`, `Corridor`, `AtlasSection` + `ManifestDock` (Products), `SjfMark` (the real logo mark), `WhatsAppGlyph`, `ThemeProvider`, `ThemeToggle`.
- Data: `src/data/cuts.ts`. Translations: `src/translations/index.ts`. WhatsApp link builder: `src/lib/whatsapp.ts`. Fonts: `src/app/fonts/`. Tokens, type scale, buttons, grade, grain: `src/app/globals.css`. JSON-LD `Organization` is emitted in `layout.tsx` with real facts only.

## Workflow norms

- **Small atomic commits.** One logical change per commit. Vercel auto-deploys from `main` to `san-jose-foods.vercel.app`.
- **Pre-flight before pushing:** `npm run build` locally.
- **Screenshots:** the site's reveals are `whileInView`, so a capture must wait for hydration, scroll the page slowly, and settle before capturing. `~/.claude/tools/headless-shot.js` scrolls too fast for this site; the language is a cookie (`sjf-lang`), not localStorage.

## What's been deliberately decided (don't undo without asking)

- **The hero is a full-bleed graded product image with white copy in both themes.** In light mode it is the page's one deliberate dark block. Don't add a stats band, a ticker, a form, or a trust strip inside it (max four text elements: headline, sub, primary, secondary).
- **Headings morph on the language toggle, per word.** Keep EN and ES word counts equal on the hero lines; everywhere else a mismatch just crossfades.
- **One accent.** Red appears on: the header and hero primary buttons, the corridor's desk node and traveling dots, selected cut rows and their check, the closing band, focus rings. Nothing else.
- **The Corridor diagram is real facts only** (three inspection systems, one desk in Hidalgo, three named crossings, Mexico). Never add routes, plants, or volumes that aren't public and confirmed.
- **Home product plates keep the arrow disc; no text chips on any image.** Plate captions are title + `N cuts` (+ HS on Home) only.
- **"How the desk works" is three numerals on one rule, not three cards.** No icons.
- **Common questions is a ruled two-column list**, not an accordion.
- **Company keeps Mission / Vision as two side-by-side statements** (content unchanged, small labels, lead-size text).
- **Interior page h1s use `.t-display`** like the hero, with a `max-w` that keeps them to two or three lines. Mastheads sit under the fixed header with `pt-32 lg:pt-44`.
- **Every `.btn-*` and the cut row controls carry the full state set** (hover, active, focus-visible, disabled). Press is a color shift plus `scale-[0.98]`, never a lift.
- **Header:** the WhatsApp primary button lives in the header on desktop and in the mobile sheet. No other CTA in the chrome.
- **Manifest keying, cap, and dock colors** as described under "The catalog".
- **Images are local (`public/img/`), never hotlinked**, and always pass through `.grade`.
