'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, animate } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'

function CtaSection({
  eyebrow,
  title,
  sub,
  btn,
  trust,
}: {
  eyebrow: string
  title: string
  sub: string
  btn: string
  trust: string
}) {
  return (
    <section className="relative overflow-hidden bg-brand-600 py-32">
      {/* Top hairline rule — magazine spread divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/25" aria-hidden />

      {/* Subtle grain on the CTA — parallel to the hero grain treatment for tactile depth */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.12] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
          backgroundSize: '180px 180px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <div className="flex justify-center mb-8">
          <span className="eyebrow text-white/55">{eyebrow}</span>
        </div>

        <h2
          className="font-display font-medium text-white mb-6 leading-tight tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
        >
          {title}
        </h2>

        <p className="font-sans text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {sub}
        </p>

        <Link href="/contact" className="btn-white font-sans">
          {btn}
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Trust line below the button — mono for spec-sheet stamp */}
        <div className="mt-8 flex items-center justify-center gap-3 text-white/55">
          <span className="w-6 h-px bg-white/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            {trust}
          </span>
          <span className="w-6 h-px bg-white/30" />
        </div>
      </div>
    </section>
  )
}

// Count-up on scroll into view. Renders the final value on the server and until
// scrolled into view, so no-JS / pre-hydration / crawlers see the real number
// (not "0"); the count-up flourish then plays once, the moment it enters view.
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [n, setN] = useState(to)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    setN(0)
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return <span ref={ref}>{n}</span>
}

function Marquee({ items, pin }: { items: readonly string[]; pin: string }) {
  const loop = [...items, ...items] // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden bg-brand-600 select-none">
      {/* Static origin pin — anchored to the left edge, doesn't move */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-brand-600 pl-5 pr-6 border-r border-white/25 shadow-[6px_0_8px_-4px_rgba(0,0,0,0.25)]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {pin}
        </span>
      </div>

      {/* Scrolling content — padded so initial items don't overlap the pin */}
      <div className="py-2.5 flex items-center pl-36">
        <div className="flex whitespace-nowrap animate-marquee">
          {loop.map((item, i) => (
            <span
              key={i}
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 px-7 flex items-center gap-7"
            >
              {item}
              <span className="text-white/35 text-xs font-light">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  title,
  desc,
  imageSrc,
  href,
  category,
  index,
  esTitle,
  cta,
  className = '',
}: {
  title: string
  desc: string
  imageSrc: string
  href: string
  category: string
  index: number
  esTitle: string
  cta: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col h-full ${className}`}
    >
      <div className="relative flex-1 overflow-hidden min-h-[16rem]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-[900ms] ease-out"
        />
        {/* gradient fades photo into card surface — flips with theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Magazine corner label — top right, backdrop-blur for legibility on any photo */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-md">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-semibold">
            {category}
          </span>
          <span className="text-white/40 text-[9px]">/</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-600 font-bold">
            0{index}
          </span>
        </div>

        {/* red left accent bar, grows on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-px bg-brand-600" />
          <h3 className="font-display text-card-foreground font-medium tracking-tight text-xl">{title}</h3>
        </div>

        {/* Spanish heritage line — always visible, dim, brightens slightly on hover */}
        <p className="font-display italic text-muted-foreground/55 text-sm mb-3 ml-6 group-hover:text-muted-foreground transition-colors duration-500">
          {esTitle}
        </p>

        <p className="text-muted-foreground text-sm font-sans leading-relaxed">{desc}</p>

        <div className="mt-4 flex items-center gap-1.5 text-brand-600 text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all duration-500">
          <span>{cta}</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <>
      {/* ── HERO — editorial split ─────────────────────────────── */}
      <section className="relative min-h-screen bg-background overflow-hidden">

        {/* Far-left vertical rule — anchors the composition like a magazine page */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 hidden lg:block" aria-hidden />

        {/* Right: full-bleed photography with grain + tint — absolute so text container can align to navbar */}
        <div className="absolute inset-y-0 right-0 lg:left-[52%] hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1400&q=85"
            alt="Premium meat products"
            fill
            priority
            className="object-cover"
          />

          {/* gradient bleed into text panel — uses var(--background) so it flips with theme */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, var(--background) 0%, color-mix(in oklch, var(--background) 33%, transparent) 12%, transparent 42%)`,
            }}
            aria-hidden
          />

          {/* bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: `linear-gradient(to top, var(--background), transparent)` }}
            aria-hidden
          />

          {/* red tint */}
          <div className="absolute inset-0 mix-blend-multiply opacity-20 bg-brand-600" aria-hidden />

          {/* film grain overlay — SVG noise, low opacity, push warmth */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-[0.18] pointer-events-none"
            aria-hidden
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
              backgroundSize: '180px 180px',
            }}
          />
        </div>

        {/* Content container — same max-w-7xl + padding as navbar/footer so the headline aligns under the logo */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 min-h-screen">

            <div className="flex flex-col justify-start pt-12 lg:pt-12 pb-20">

              {/* eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="w-8 h-px bg-brand-600" />
                <span className="eyebrow text-foreground/50">
                  {h.heroEyebrow}
                </span>
              </motion.div>

              {/* Display headline — word-staggered reveal */}
              <h1
                className="font-display font-medium text-foreground leading-[1.02] mb-8 tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {h.heroLine1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-brand-600"
                >
                  {h.heroLine2}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-foreground/40"
                >
                  {h.heroLine3}
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="font-sans text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed mb-12"
              >
                {h.heroSub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={waLink(h.heroWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary font-sans text-sm"
                >
                  {h.heroCta}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/products" className="btn-ghost font-sans text-sm">
                  {h.heroSubCta}
                </Link>
              </motion.div>

            </div>

            {/* Right column reserved for photo (which lives in absolute layer behind) */}
            <div className="hidden lg:block" aria-hidden />

          </div>
        </div>

        {/* Scroll indicator — pinned to far-left edge of the section, below content */}
        <div className="absolute bottom-12 left-6 hidden lg:flex flex-col items-center gap-3 z-20" aria-hidden>
          <span className="font-sans text-[9px] uppercase tracking-[0.36em] text-foreground/40 [writing-mode:vertical-rl] rotate-180">
            Scroll
          </span>
          <div className="relative w-px h-16 bg-foreground/15 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-foreground/70"
              initial={{ height: '0%', y: '0%' }}
              animate={{ height: ['0%', '60%', '60%'], y: ['0%', '0%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ────────────────────────────────────── */}
      <Marquee items={h.ticker} pin="USA · CA · BR" />

      {/* ── STATS — giant editorial numbers ───────────────────── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">

          {/* section label */}
          <div className="flex items-center gap-4 mb-20">
            <div className="w-10 h-px bg-brand-600" />
            <span className="eyebrow text-muted-foreground">{h.statsEyebrow}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { value: 3,  unit: h.trust1Unit, label: h.trust1Title, sub: h.trust1Desc, es: 'EE.UU. · Canadá · Brasil' },
              { value: 24, unit: h.trust2Unit, label: h.trust2Title, sub: h.trust2Desc, es: 'Respuesta inmediata' },
              { value: 5,  unit: h.trust3Unit, label: h.trust3Title, sub: h.trust3Desc, es: 'Soluciones integrales' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="reveal-on-scroll relative py-12 md:py-6 md:px-14 first:md:pl-0 last:md:pr-0 text-center"
              >
                {/* Editorial entry mark — tiny red label above the numeral, lifted via translate so the numeral stays put */}
                <div className="flex items-center justify-center gap-2 mb-2 -translate-y-4">
                  <div className="w-4 h-px bg-brand-600" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-600 font-semibold">
                    No. 0{idx + 1}
                  </span>
                </div>

                {/* The hero numeral — Vercel/Geist style: regular weight, size carries it */}
                <div
                  className="font-display font-normal tracking-[-0.04em] text-brand-600 [font-feature-settings:'tnum','lnum'] -mt-2 [line-height:0.85]"
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)' }}
                >
                  <Counter to={stat.value} />
                </div>

                {/* Demoted unit — mono for spec-sheet feel */}
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.unit}
                </div>

                {/* Editorial gap */}
                <div className="mt-7 font-sans font-medium text-foreground text-base leading-tight">
                  {stat.label}
                </div>

                {/* Spanish heritage flourish — always Spanish, a brand signature */}
                <div className="mt-1 font-display italic text-muted-foreground/80 text-sm font-normal">
                  {stat.es}
                </div>

                <div className="mt-3 font-sans font-normal text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS — editorial showcase ─────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">

          {/* header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-brand-600" />
                <span className="eyebrow text-muted-foreground">{h.productsEyebrow}</span>
              </div>
              <h2
                className="font-display font-medium tracking-[-0.04em] text-foreground"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {h.productsTitle}
              </h2>
            </div>
            <Link href="/products" className="btn-outline-brand font-sans text-xs shrink-0">
              {h.viewProducts}
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="reveal-on-scroll grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-4"
          >
            {[
              { title: h.beef, desc: h.beefDesc, src: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=1200&q=85', category: 'Beef', index: 1, es: 'Res de exportación', cls: 'md:col-span-2 md:row-span-2' },
              { title: h.pork, desc: h.porkDesc, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',  category: 'Pork', index: 2, es: 'Cerdo premium',     cls: '' },
              { title: h.chicken, desc: h.chickenDesc, src: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80', category: 'Chicken', index: 3, es: 'Pollo selecto', cls: '' },
            ].map((p) => (
              <motion.div
                key={p.category}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={p.cls}
              >
                <ProductCard
                  title={p.title}
                  desc={p.desc}
                  imageSrc={p.src}
                  href="/products"
                  category={p.category}
                  index={p.index}
                  esTitle={p.es}
                  cta={h.viewCuts}
                />
              </motion.div>
            ))}
          </motion.div>

          <p className="font-sans text-muted-foreground text-sm mt-8 max-w-lg leading-relaxed">
            {h.productsSub}
          </p>
        </div>
      </section>

      {/* ── CTA — bold red editorial ───────────────────────────── */}
      <CtaSection eyebrow={h.ctaEyebrow} title={h.ctaTitle} sub={h.ctaSub} btn={h.ctaBtn} trust={h.ctaTrust} />
    </>
  )
}
