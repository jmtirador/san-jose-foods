'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CtaBand } from '@/components/CtaBand'
import { CropMarks } from '@/components/CropMarks'

export default function CompanyPage() {
  const { t } = useLanguage()
  const a = t.about
  const w = t.why
  const co = t.company

  const mandate = [
    { n: '01', title: a.value1Title, body: a.value1Desc },
    { n: '02', title: a.value2Title, body: a.value2Desc },
  ]
  const capabilities = [
    { title: w.diff1Title, p1: w.diff1P1, p2: w.diff1P2 },
    { title: w.diff2Title, p1: w.diff2P1, p2: w.diff2P2 },
    { title: w.diff3Title, p1: w.diff3P1, p2: w.diff3P2 },
  ]
  const reference = [
    { title: w.usdaTitle, sub: w.usdaSub, points: w.usdaPoints },
    { title: w.coldTitle, sub: w.coldSub, points: w.coldPoints },
  ]

  return (
    <>
      {/* Header */}
      <section className="doc-grid bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-12"
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <div className="w-10 h-px bg-brand-600 mb-4" />
              <span className="eyebrow text-muted-foreground">{co.eyebrow}</span>
            </div>
            <span className="doc-stamp hidden sm:block mt-1">SJF-CO · REV 2026.08</span>
          </div>
          <h1 className="font-display font-medium tracking-[-0.04em] text-foreground mb-5" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
            {a.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed">{a.pageSub}</p>
        </motion.div>
      </section>

      {/* SS01 — Who We Are + Operations manifest */}
      <section className="doc-grid border-t border-border">
        <div className="section-bar relative">
          <CropMarks />
          <span className="label flex items-baseline gap-3"><span className="doc-index">§01</span> {a.storyTitle}</span>
          <span className="meta hidden sm:block">{co.s1Meta}</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16">
          <div className="space-y-5 font-sans text-muted-foreground leading-relaxed max-w-2xl">
            <p>{a.storyP1}</p>
            <p>{a.storyP2}</p>
            <p className="text-foreground text-lg leading-relaxed pt-2">
              <span className="doc-index block mb-2">{co.positioning}</span>
              {a.storyP3}
            </p>
          </div>

          <div>
            <div className="relative border border-border overflow-hidden aspect-[4/3]">
              <Image src="https://images.unsplash.com/photo-1560166444-441876015a70?w=900&q=80" alt="Meat processing operations" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-2">{co.figOps}</p>
            <div className="mt-8 bg-background">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground pb-3 border-b border-border">{co.opsTitle}</div>
              {co.ops.map((row) => (
                <div key={row.k} className="spec-row">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shrink-0">{row.k}</span>
                  <span className="lead-dots" />
                  <span className="val font-mono text-[11px] text-foreground text-right">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SS02 — Mandate */}
      <section className="doc-grid border-t border-border">
        <div className="section-bar relative">
          <CropMarks />
          <span className="label flex items-baseline gap-3"><span className="doc-index">§02</span> {co.s2}</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {mandate.map((m) => (
            <div key={m.n}>
              <div className="doc-index mb-3">{m.n} / {m.title}</div>
              <p className="font-sans text-foreground/90 text-lg leading-relaxed max-w-md">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SS03 — Capabilities */}
      <section className="doc-grid border-t border-border">
        <div className="section-bar relative">
          <CropMarks />
          <span className="label flex items-baseline gap-3"><span className="doc-index">§03</span> {co.s3}</span>
        </div>
        <h2 className="sr-only">{co.s3}</h2>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {capabilities.map((c, i) => (
            <div key={c.title} className="grid grid-cols-1 lg:grid-cols-[auto_1fr] lg:items-center gap-4 lg:gap-14 py-10 border-b border-border">
              <div className="font-mono font-semibold tabular-nums text-brand-600 tracking-[-0.02em] leading-none" style={{ fontSize: '2.2rem' }}>0{i + 1}</div>
              <div>
                <h3 className="font-display font-medium tracking-[-0.015em] text-foreground text-xl mb-4">{c.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-4xl">
                  <p className="font-sans text-muted-foreground leading-relaxed text-[15px]">{c.p1}</p>
                  <p className="font-sans text-muted-foreground leading-relaxed text-[15px]">{c.p2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SS04 — Reference */}
      <section className="doc-grid border-t border-border">
        <div className="section-bar relative">
          <CropMarks />
          <span className="label flex items-baseline gap-3"><span className="doc-index">§04</span> {co.s4}</span>
        </div>
        <h2 className="sr-only">{co.s4}</h2>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {reference.map((r) => (
            <div key={r.title}>
              <h3 className="font-display font-medium tracking-[-0.02em] text-foreground text-2xl mb-3">{r.title}</h3>
              <p className="font-sans text-muted-foreground leading-relaxed text-[15px] mb-6 max-w-md">{r.sub}</p>
              <div>
                {r.points.map((pt, i) => (
                  <div key={pt} className="flex items-baseline gap-4 py-2.5 border-b border-border/60">
                    <span className="doc-index text-[10px] shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-sans text-[15px] leading-relaxed text-muted-foreground">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
