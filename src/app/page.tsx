'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, animate, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const INK   = '#0D0508'
const INK_S = '#180B10'
const RED   = '#D9182E'

const TICKER_ITEMS = [
  'USDA Certified',
  'Cold-Chain Logistics',
  '20+ Years Exporting',
  '150+ Clients in Mexico',
  '98% On-Time Delivery',
  'Chicken · Pork · Beef',
]

function CtaSection({
  title,
  sub,
  btn,
}: {
  title: string
  sub: string
  btn: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Parallax: ghost text drifts vertically as section scrolls past
  const ghostY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-brand-600 py-32"
    >
      {/* Top hairline rule — magazine spread divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/25" aria-hidden />

      {/* Ghost Playfair "Carnicería" — Spanish heritage word, parallax on scroll */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        <motion.span
          style={{
            y: ghostY,
            fontSize: 'clamp(7rem, 17vw, 17rem)',
            lineHeight: 1,
          }}
          className="font-display font-bold italic text-white/[0.06] whitespace-nowrap select-none"
        >
          Carnicería
        </motion.span>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <div className="flex justify-center mb-8">
          <span className="eyebrow text-white/55">Ready when you are</span>
        </div>

        <h2
          className="font-display font-semibold italic text-white mb-6 leading-tight tracking-tight"
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
            From Texas to Mexico · 20 years
          </span>
          <span className="w-6 h-px bg-white/30" />
        </div>
      </div>
    </section>
  )
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return <span ref={ref}>{n}</span>
}

function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden bg-brand-600 select-none">
      {/* Static "EST · 2017" pin — anchored to the left edge, doesn't move */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-brand-600 pl-5 pr-6 border-r border-white/25 shadow-[6px_0_8px_-4px_rgba(0,0,0,0.25)]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          Est · 2017
        </span>
      </div>

      {/* Scrolling content — padded so initial items don't overlap the pin */}
      <div className="py-2.5 flex items-center pl-36">
        <div className="flex whitespace-nowrap animate-marquee">
          {items.map((item, i) => (
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
  className = '',
}: {
  title: string
  desc: string
  imageSrc: string
  href: string
  category: string
  index: number
  esTitle: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded bg-card border border-border flex flex-col ${className}`}
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
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded">
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
          <h3 className="font-display text-card-foreground font-semibold tracking-tight text-xl">{title}</h3>
        </div>

        {/* Spanish heritage line — always visible, dim, brightens slightly on hover */}
        <p className="font-display italic text-muted-foreground/55 text-sm mb-3 ml-6 group-hover:text-muted-foreground transition-colors duration-500">
          {esTitle}
        </p>

        <p className="text-muted-foreground text-sm font-sans leading-relaxed">{desc}</p>

        <div className="mt-4 flex items-center gap-1.5 text-brand-600 text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all duration-500">
          <span>View Cuts</span>
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
      <section className="relative min-h-screen flex flex-col lg:grid lg:grid-cols-[55%_45%] bg-background overflow-hidden">

        {/* Far-left vertical rule — anchors the composition like a magazine page */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 hidden lg:block" aria-hidden />

        {/* Left: editorial text panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-28">

          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-brand-600" />
            <span className="eyebrow text-foreground/50">
              USDA Certified · Est. 2017
            </span>
          </motion.div>

          {/* Display headline — word-staggered reveal */}
          <h1
            className="font-display font-semibold text-foreground leading-[1.02] mb-8 tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Premium US Proteins,
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="not-italic block text-brand-600"
            >
              Reliably Delivered
            </motion.em>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block text-foreground/40 font-display font-bold"
            >
              Across Borders.
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
            <Link href="/contact" className="btn-primary font-sans text-sm">
              {h.heroCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="btn-ghost font-sans text-sm">
              {h.heroSubCta}
            </Link>
          </motion.div>

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

        {/* Right: full-bleed photography with grain + tint */}
        <div className="relative hidden lg:block">
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
      </section>

      {/* ── MARQUEE TICKER ────────────────────────────────────── */}
      <Marquee />

      {/* ── STATS — giant editorial numbers ───────────────────── */}
      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">

          {/* section label */}
          <div className="flex items-center gap-4 mb-20">
            <div className="w-10 h-px bg-brand-600" />
            <span className="eyebrow text-muted-foreground">By the numbers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { value: 20,  unit: '+ Years',           label: h.trust1Title, sub: h.trust1Desc, es: 'Años exportando' },
              { value: 150, unit: '+ Clients',         label: h.trust2Title, sub: h.trust2Desc, es: 'Clientes en México' },
              { value: 98,  unit: '% On-Time',         label: h.trust3Title, sub: h.trust3Desc, es: 'Entregas a tiempo' },
            ].map((stat, idx) => (
              <div
                key={stat.value}
                className="relative py-12 md:py-6 md:px-14 first:md:pl-0 last:md:pr-0 text-center"
              >
                {/* Editorial entry mark — tiny red label above the numeral */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-4 h-px bg-brand-600" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-600 font-semibold">
                    No. 0{idx + 1}
                  </span>
                </div>

                {/* The hero numeral — semibold for Geist (which runs heavier than Inter) */}
                <div
                  className="font-display font-semibold tracking-[-0.03em] text-brand-600 [font-feature-settings:'tnum','lnum'] -mt-2 [line-height:0.85]"
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)' }}
                >
                  <Counter to={stat.value} />
                </div>

                {/* Demoted unit — mono for spec-sheet feel */}
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.unit}
                </div>

                {/* Editorial gap */}
                <div className="mt-7 font-sans font-semibold text-foreground text-base leading-tight">
                  {stat.label}
                </div>

                {/* Spanish heritage flourish */}
                <div className="mt-1 font-display italic text-muted-foreground/80 text-sm">
                  {stat.es}
                </div>

                <div className="mt-3 font-sans text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {stat.sub}
                </div>
              </div>
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
                <span className="eyebrow text-muted-foreground">What we supply</span>
              </div>
              <h2
                className="font-display font-semibold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {h.productsTitle}
              </h2>
            </div>
            <Link href="/products" className="btn-outline-brand font-sans text-xs shrink-0">
              {h.viewProducts}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-4">
            {/* Hero card — beef, spans 2 cols × 2 rows */}
            <ProductCard
              title={h.beef}
              desc={h.beefDesc}
              imageSrc="https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=1200&q=85"
              href="/products"
              category="Beef"
              index={1}
              esTitle="Res de exportación"
              className="md:col-span-2 md:row-span-2"
            />
            {/* Top right */}
            <ProductCard
              title={h.pork}
              desc={h.porkDesc}
              imageSrc="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"
              href="/products"
              category="Pork"
              index={2}
              esTitle="Cerdo premium"
            />
            {/* Bottom right */}
            <ProductCard
              title={h.chicken}
              desc={h.chickenDesc}
              imageSrc="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80"
              href="/products"
              category="Chicken"
              index={3}
              esTitle="Pollo selecto"
            />
          </div>

          <p className="font-sans text-muted-foreground text-sm mt-8 max-w-lg leading-relaxed">
            {h.productsSub}
          </p>
        </div>
      </section>

      {/* ── CTA — bold red editorial ───────────────────────────── */}
      <CtaSection title={h.ctaTitle} sub={h.ctaSub} btn={h.ctaBtn} />
    </>
  )
}
