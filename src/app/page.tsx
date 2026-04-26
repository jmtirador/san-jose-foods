'use client'

import Link from 'next/link'
import Image from 'next/image'
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
      <section
        className="min-h-screen flex flex-col lg:grid"
        style={{ background: INK, gridTemplateColumns: '55% 45%' }}
      >
        {/* Left: editorial text panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-28">

          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px" style={{ background: RED }} />
            <span className="eyebrow text-gray-500">
              USDA Certified · Est. 2017
            </span>
          </div>

          {/* Display headline — Playfair + DM Sans mix */}
          <h1
            className="font-display font-bold text-white leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(2.6rem, 4.8vw, 4.6rem)' }}
          >
            Premium US Proteins,<br />
            <em style={{ color: RED }} className="not-italic">Reliably Delivered</em><br />
            <span className="text-gray-400 font-display font-bold">Across Borders.</span>
          </h1>

          <p className="font-sans text-gray-400 text-base md:text-lg max-w-sm leading-relaxed mb-12">
            {h.heroSub}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary font-sans text-sm">
              {h.heroCta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/products" className="btn-ghost font-sans text-sm">
              {h.heroSubCta}
            </Link>
          </div>

          {/* bottom fade hint */}
          <div className="absolute bottom-10 left-20 hidden lg:flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Right: full-bleed photography */}
        <div className="relative hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1400&q=85"
            alt="Premium meat products"
            fill
            priority
            className="object-cover"
          />
          {/* gradient bleed left into text panel */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${INK} 0%, ${INK}55 12%, transparent 42%)`,
            }}
          />
          {/* bottom dark fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: `linear-gradient(to top, ${INK}, transparent)` }}
          />
          {/* subtle red tint */}
          <div className="absolute inset-0 mix-blend-multiply opacity-20" style={{ background: RED }} />
        </div>
      </section>

      {/* ── MARQUEE TICKER ────────────────────────────────────── */}
      <Marquee />

      {/* ── STATS — giant editorial numbers ───────────────────── */}
      <section className="py-24" style={{ background: '#FFF8F5' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">

          {/* section label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-px" style={{ background: RED }} />
            <span className="eyebrow text-gray-400">By the numbers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-warm-200">
            {[
              { value: '20', suffix: '+', label: h.trust1Title, sub: h.trust1Desc },
              { value: '150', suffix: '+', label: h.trust2Title, sub: h.trust2Desc },
              { value: '98', suffix: '%', label: h.trust3Title, sub: h.trust3Desc },
            ].map((stat) => (
              <div key={stat.value} className="py-10 md:py-4 md:px-12 first:md:pl-0 last:md:pr-0">
                <div
                  className="font-display font-bold leading-none mb-4"
                  style={{ fontSize: 'clamp(4rem, 7vw, 6rem)', color: RED }}
                >
                  {stat.value}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
                <div className="font-sans font-semibold text-gray-800 text-base mb-1">{stat.label}</div>
                <div className="font-sans text-gray-500 text-sm leading-relaxed">{stat.sub}</div>
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
