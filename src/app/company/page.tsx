'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CtaBand } from '@/components/CtaBand'
import { SectionHead } from '@/components/SectionHead'

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
      {/* Page masthead */}
      <section className="bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-12"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="font-display font-semibold tracking-[-0.02em] text-foreground" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
              {a.pageTitle}
            </h1>
            <span className="doc-stamp hidden sm:block mt-3 shrink-0">SJF-CO · REV 2026.08</span>
          </div>
          <p className="font-serif text-muted-foreground text-lg max-w-2xl leading-relaxed">{a.pageSub}</p>
        </motion.div>
      </section>

      {/* §01 — Who We Are + Operations ledger */}
      <section>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-14">
          <SectionHead index="§01" title={a.storyTitle} meta={co.s1Meta} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] lg:items-center gap-12 lg:gap-16">
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[16px] max-w-xl">
              <p className="font-serif">{a.storyP1}</p>
              <p className="font-serif">{a.storyP2}</p>
              <p className="font-serif text-foreground text-lg leading-relaxed pt-2">
                <span className="doc-index block mb-2">{co.positioning}</span>
                {a.storyP3}
              </p>
            </div>

            <div>
              <div className="relative border border-border overflow-hidden aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1560166444-441876015a70?w=900&q=80" alt="Meat processing operations" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.02em] uppercase text-muted-foreground mt-2">{co.figOps}</p>
              <div className="mt-8 bg-background">
                <div className="form-label pb-3 border-b border-border">{co.opsTitle}</div>
                {co.ops.map((row) => (
                  <div key={row.k} className="spec-row">
                    <span className="form-label shrink-0">{row.k}</span>
                    <span className="lead-dots" />
                    <span className="val font-mono text-[12px] text-foreground text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §02 — Mandate */}
      <section>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-14">
          <SectionHead index="§02" title={co.s2} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {mandate.map((m) => (
              <div key={m.n}>
                <div className="doc-index mb-3">{m.n} / {m.title}</div>
                <p className="font-serif text-foreground/90 text-lg leading-relaxed max-w-md">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §03 — Capabilities */}
      <section>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14">
          <SectionHead index="§03" title={co.s3} />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-4">
          {capabilities.map((c, i) => (
            <div key={c.title} className="grid grid-cols-1 lg:grid-cols-[auto_1fr] lg:items-center gap-4 lg:gap-14 py-10 border-b border-border">
              <div className="font-mono font-medium tabular-nums text-muted-foreground tracking-[-0.02em] leading-none" style={{ fontSize: '2.2rem' }}>0{i + 1}</div>
              <div>
                <h3 className="font-display font-semibold tracking-[-0.01em] text-foreground text-xl mb-4">{c.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 max-w-4xl">
                  <p className="font-serif text-muted-foreground leading-relaxed text-[15px]">{c.p1}</p>
                  <p className="font-serif text-muted-foreground leading-relaxed text-[15px]">{c.p2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* §04 — Reference */}
      <section>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-14">
          <SectionHead index="§04" title={co.s4} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {reference.map((r) => (
              <div key={r.title}>
                <h3 className="font-display font-semibold tracking-[-0.01em] text-foreground text-2xl mb-3">{r.title}</h3>
                <p className="font-serif text-muted-foreground leading-relaxed text-[15px] mb-6 max-w-md">{r.sub}</p>
                <div>
                  {r.points.map((pt, i) => (
                    <div key={pt} className="flex items-baseline gap-4 py-2.5 border-b border-border/60">
                      <span className="doc-index text-[11px] shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-serif text-[15px] leading-relaxed text-muted-foreground">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
