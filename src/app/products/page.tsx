'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { CtaBand } from '@/components/CtaBand'
import { CropMarks } from '@/components/CropMarks'

// Real, public reference facts only (WCO HS chapter 02): operator credibility
// without fabricating anything company-specific.
const SPEC = {
  chicken: { hs: 'HS 0207', img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&q=80' },
  pork: { hs: 'HS 0203', img: 'https://images.unsplash.com/photo-1592877186734-6e558cf0dfaf?w=900&q=80' },
  beef: { hs: 'HS 0201 / 0202', img: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=900&q=80' },
}

function SpecSection({
  index, title, esFlourish, desc, cuts, imageSrc, hs, getPricing, quote, metaFormats, waPrefix, waVolume,
}: {
  index: number; title: string; esFlourish: string; desc: string
  cuts: readonly string[]; imageSrc: string; hs: string
  getPricing: string; quote: string; metaFormats: string; waPrefix: string; waVolume: string
}) {
  return (
    <section className="doc-grid border-t border-border">
      {/* Document section header */}
      <div className="section-bar relative">
        <CropMarks />
        <span className="label flex items-baseline gap-3">
          <span className="doc-index">§0{index}</span>
          {title}
        </span>
        <span className="meta hidden sm:block">US · CA · BR · {hs} · {metaFormats}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 lg:grid-cols-[0.8fr_1.35fr] gap-10 lg:gap-14">
        {/* Image plate — hard-edged, consistent side */}
        <div>
          <div className="relative border border-border overflow-hidden aspect-[4/3] lg:aspect-[4/5]">
            <Image src={imageSrc} alt={title} fill sizes="(max-width: 1024px) 100vw, 32vw" className="object-cover" />
          </div>
          <p className="flourish text-muted-foreground text-sm mt-4">{esFlourish}</p>
          <p className="sm:hidden font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-2">US · CA · BR · {hs}</p>
        </div>

        {/* Cut table — the dominant column */}
        <div>
          <p className="font-sans text-muted-foreground leading-relaxed text-sm mb-8 max-w-2xl">{desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 bg-background">
            {cuts.map((cut) => (
              <a
                key={cut}
                href={waLink(`${waPrefix} ${title} — ${cut}. ${waVolume}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cut spec-row"
              >
                <span className="font-sans text-sm text-foreground/90 group-hover/cut:text-foreground transition-colors">{cut}</span>
                <span className="lead-dots" />
                <span className="val font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground group-hover/cut:text-brand-600 transition-colors whitespace-nowrap">
                  {quote} →
                </span>
              </a>
            ))}
          </div>

          <a
            href={waLink(`${waPrefix} ${title}. ${waVolume}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary font-sans text-sm mt-8"
          >
            <WhatsAppGlyph className="w-4 h-4" />
            {getPricing}
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const p = t.products

  const shared = { getPricing: p.getPricing, quote: p.quote, metaFormats: p.metaFormats, waPrefix: p.waCutPrefix, waVolume: p.waVolume }

  return (
    <>
      {/* Page header — document masthead */}
      <section className="doc-grid bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-12"
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <div className="w-10 h-px bg-brand-600 mb-4" />
              <span className="eyebrow text-muted-foreground">{p.eyebrow}</span>
            </div>
            <span className="doc-stamp hidden sm:block mt-1">SJF-CAT · REV 2026.07 · MX</span>
          </div>
          <h1 className="font-display font-medium tracking-[-0.04em] text-foreground mb-5" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
            {p.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed mb-5">{p.pageSub}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="text-primary">▸</span> {p.pricingNote}
          </p>
        </motion.div>
      </section>

      <SpecSection index={1} title={p.beef.title} esFlourish="Res de exportación" desc={p.beef.desc} cuts={p.beef.cuts} imageSrc={SPEC.beef.img} hs={SPEC.beef.hs} {...shared} />
      <SpecSection index={2} title={p.pork.title} esFlourish="Cerdo premium" desc={p.pork.desc} cuts={p.pork.cuts} imageSrc={SPEC.pork.img} hs={SPEC.pork.hs} {...shared} />
      <SpecSection index={3} title={p.chicken.title} esFlourish="Pollo selecto" desc={p.chicken.desc} cuts={p.chicken.cuts} imageSrc={SPEC.chicken.img} hs={SPEC.chicken.hs} {...shared} />

      <div className="border-t border-border" />
      <CtaBand />
    </>
  )
}
