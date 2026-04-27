'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
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

function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // duplicate for seamless loop
  return (
    <div
      style={{ background: RED }}
      className="overflow-hidden py-2.5 flex items-center select-none"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90 px-6 flex items-center gap-6"
          >
            {item}
            <span className="text-white/30 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function ProductCard({
  title,
  desc,
  imageSrc,
  href,
}: {
  title: string
  desc: string
  imageSrc: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded block"
      style={{ background: INK_S }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0508] via-[#0D0508]/40 to-transparent" />
        {/* red left accent bar, grows on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-px bg-brand-600" />
          <h3 className="font-display text-white font-bold text-xl">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm font-sans leading-relaxed">{desc}</p>
        <div className="mt-4 flex items-center gap-1.5 text-brand-600 text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
          <span>View Cuts</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
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
      <section className="relative min-h-screen flex flex-col lg:grid lg:grid-cols-[55%_45%] bg-ink overflow-hidden">

        {/* Far-left vertical rule — anchors the composition like a magazine page */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden lg:block" aria-hidden />

        {/* Left: editorial text panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-28">

          {/* Top-right corner detail — editorial issue mark */}
          <div className="absolute top-10 right-10 hidden lg:block">
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/40">
              No. 17 · MMXXVI
            </span>
          </div>

          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px bg-brand-600" />
            <span className="eyebrow text-white/40">
              USDA Certified · Est. 2017
            </span>
          </motion.div>

          {/* Display headline — word-staggered reveal */}
          <h1
            className="font-display font-bold text-white leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.6rem)' }}
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
              className="block text-white/40 font-display font-bold"
            >
              Across Borders.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-sans text-white/55 text-base md:text-lg max-w-sm leading-relaxed mb-12"
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
          <span className="font-sans text-[9px] uppercase tracking-[0.36em] text-white/30 [writing-mode:vertical-rl] rotate-180">
            Scroll
          </span>
          <div className="relative w-px h-16 bg-white/15 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white/70"
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

          {/* gradient bleed into text panel */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${INK} 0%, ${INK}55 12%, transparent 42%)`,
            }}
            aria-hidden
          />

          {/* bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: `linear-gradient(to top, ${INK}, transparent)` }}
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
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">

          {/* section label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-px bg-brand-600" />
            <span className="eyebrow text-muted-foreground">By the numbers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { value: '20', suffix: '+', label: h.trust1Title, sub: h.trust1Desc },
              { value: '150', suffix: '+', label: h.trust2Title, sub: h.trust2Desc },
              { value: '98', suffix: '%', label: h.trust3Title, sub: h.trust3Desc },
            ].map((stat) => (
              <div key={stat.value} className="py-10 md:py-4 md:px-12 first:md:pl-0 last:md:pr-0">
                <div
                  className="font-display font-bold leading-none mb-4 text-brand-600"
                  style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
                >
                  {stat.value}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
                <div className="font-sans font-semibold text-foreground text-base mb-1">{stat.label}</div>
                <div className="font-sans text-muted-foreground text-sm leading-relaxed">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS — dark editorial showcase ────────────────── */}
      <section className="py-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">

          {/* header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px" style={{ background: RED }} />
                <span className="eyebrow text-gray-600">What we supply</span>
              </div>
              <h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                {h.productsTitle}
              </h2>
            </div>
            <Link href="/products" className="btn-outline-brand font-sans text-xs shrink-0">
              {h.viewProducts}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProductCard
              title={h.chicken}
              desc={h.chickenDesc}
              imageSrc="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80"
              href="/products"
            />
            <ProductCard
              title={h.pork}
              desc={h.porkDesc}
              imageSrc="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"
              href="/products"
            />
            <ProductCard
              title={h.beef}
              desc={h.beefDesc}
              imageSrc="https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&q=80"
              href="/products"
            />
          </div>

          <p className="font-sans text-gray-600 text-sm mt-8 max-w-lg leading-relaxed">
            {h.productsSub}
          </p>
        </div>
      </section>

      {/* ── CTA — bold red editorial ───────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: RED }}>
        {/* ghost Playfair text behind as decoration */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden
        >
          <span
            className="font-display font-bold text-white/5 whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)', lineHeight: 1 }}
          >
            Order
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <div className="flex justify-center mb-8">
            <span className="eyebrow text-white/50">Ready when you are</span>
          </div>
          <h2
            className="font-display font-bold italic text-white mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            {h.ctaTitle}
          </h2>
          <p className="font-sans text-white/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {h.ctaSub}
          </p>
          <Link href="/contact" className="btn-white font-sans">
            {h.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
