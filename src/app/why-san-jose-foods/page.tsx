'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function DiffCard({
  number,
  title,
  p1,
  p2,
  icon,
}: {
  number: string
  title: string
  p1: string
  p2: string
  icon: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-8 p-8 rounded border border-border bg-card hover:border-brand-600/40 transition-colors">
      {/* left: number + icon */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="font-display font-medium tracking-[-0.04em] leading-none select-none text-brand-600/30"
          style={{ fontSize: '3.5rem' }}
          aria-hidden
        >
          {number}
        </div>
        <div className="w-11 h-11 rounded flex items-center justify-center text-white bg-brand-600">
          {icon}
        </div>
      </div>
      {/* right: text */}
      <div>
        <h3 className="font-display font-medium tracking-[-0.015em] text-card-foreground text-xl mb-3">{title}</h3>
        <p className="font-sans text-muted-foreground mb-3 leading-relaxed text-sm">{p1}</p>
        <p className="font-sans text-muted-foreground leading-relaxed text-sm">{p2}</p>
      </div>
    </div>
  )
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-sans text-sm">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-brand-600/15 border border-brand-600/40 text-brand-600">
            <Check className="w-2.5 h-2.5" strokeWidth={3} />
          </div>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function WhyPage() {
  const { t } = useLanguage()
  const w = t.why

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-brand-600" />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              The difference
            </span>
          </div>
          <h1
            className="font-display font-medium tracking-[-0.04em] text-foreground mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {w.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed">{w.pageSub}</p>
        </motion.div>
      </section>

      {/* 3 Differentiators */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 space-y-4">
          <DiffCard
            number="01"
            title={w.diff1Title}
            p1={w.diff1P1}
            p2={w.diff1P2}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
          />
          <DiffCard
            number="02"
            title={w.diff2Title}
            p1={w.diff2P1}
            p2={w.diff2P2}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
          />
          <DiffCard
            number="03"
            title={w.diff3Title}
            p1={w.diff3P1}
            p2={w.diff3P2}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* USDA & Cold Chain */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* USDA */}
            <div className="rounded p-10 bg-card border border-border">
              <div className="w-10 h-10 rounded flex items-center justify-center mb-6 bg-brand-600/15 border border-brand-600/40 text-brand-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-card-foreground text-2xl mb-3">{w.usdaTitle}</h2>
              <p className="font-sans text-muted-foreground mb-7 leading-relaxed text-sm">{w.usdaSub}</p>
              <CheckList items={w.usdaPoints} />
            </div>

            {/* Cold Chain */}
            <div className="rounded p-10 bg-card border border-border">
              <div className="w-10 h-10 rounded flex items-center justify-center mb-6 bg-brand-600/15 border border-brand-600/40 text-brand-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-card-foreground text-2xl mb-3">{w.coldTitle}</h2>
              <p className="font-sans text-muted-foreground mb-7 leading-relaxed text-sm">{w.coldSub}</p>
              <CheckList items={w.coldPoints} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-px bg-brand-600" />
            <h2 className="font-sans text-muted-foreground font-semibold text-[11px] uppercase tracking-[0.3em]">
              {w.testimonialsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { quote: w.t1, name: w.t1name },
              { quote: w.t2, name: w.t2name },
            ].map((item) => (
              <div key={item.name} className="rounded p-8 border border-border bg-card">
                <div className="font-display text-5xl leading-none mb-4 text-brand-600/40" aria-hidden>
                  &ldquo;
                </div>
                <p className="font-display italic text-card-foreground leading-relaxed mb-6 text-lg">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-sans font-bold text-xs bg-brand-600">
                    {item.name.charAt(0)}
                  </div>
                  <span className="font-sans text-muted-foreground text-sm font-medium">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden bg-brand-600">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-medium tracking-[-0.04em] text-white text-4xl md:text-5xl mb-6">{t.home.ctaTitle}</h2>
          <p className="font-sans text-white/80 text-lg mb-10 leading-relaxed">{t.home.ctaSub}</p>
          <Link href="/contact" className="btn-white font-sans">{t.home.ctaBtn}</Link>
        </div>
      </section>
    </>
  )
}
