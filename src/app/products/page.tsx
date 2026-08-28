'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { CtaBand } from '@/components/CtaBand'
import { SectionHead } from '@/components/SectionHead'

// Real, public reference facts only (WCO HS chapter 02): operator credibility
// without fabricating anything company-specific.
const SPEC = {
  chicken: { hs: 'HS 0207', img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&q=80' },
  pork: { hs: 'HS 0203', img: 'https://images.unsplash.com/photo-1592877186734-6e558cf0dfaf?w=900&q=80' },
  beef: { hs: 'HS 0201 / 0202', img: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=900&q=80' },
}

type Selected = Record<string, boolean>

function SpecSection({
  id, index, title, counterpart, desc, cuts, imageSrc, hs, fig,
  colCut, colQuote, getPricing, quote, metaFormats, waPrefix, waVolume,
  selected, onToggle,
}: {
  id: string; index: number; title: string; counterpart: string; desc: string
  cuts: readonly string[]; imageSrc: string; hs: string; fig: string
  colCut: string; colQuote: string
  getPricing: string; quote: string; metaFormats: string; waPrefix: string; waVolume: string
  selected: Selected; onToggle: (key: string, cut: string) => void
}) {
  return (
    <section id={id} className="scroll-mt-[76px]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-12">
        <SectionHead index={`§0${index}`} title={title} meta={`${hs} · US · CA · BR · ${metaFormats}`} size="lg" />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.35fr] gap-10 lg:gap-14">
          {/* Image plate — hard-edged, consistent side */}
          <div>
            <div className="relative border border-border overflow-hidden aspect-[4/3] lg:aspect-[4/5]">
              <Image src={imageSrc} alt={title} fill sizes="(max-width: 1024px) 100vw, 32vw" className="object-cover" />
            </div>
            {/* Representative stock carries the Ref marker (site rule) until real
                SJF photography replaces it. */}
            <p className="font-mono text-[10px] tracking-[0.02em] uppercase text-muted-foreground mt-4">{fig}</p>
            <p className="flourish text-muted-foreground text-sm mt-1.5">{counterpart}</p>
          </div>

          {/* Cut table — the money surface. Ruled market-report rows: number,
              cut name in the DATA voice (it IS the SKU), quote action right. */}
          <div>
            <p className="font-serif text-muted-foreground leading-relaxed text-[16px] mb-8 max-w-2xl">{desc}</p>

            <div className="grid grid-cols-[28px_1fr] items-baseline gap-x-3 pb-2 border-b-2 border-foreground">
              <span aria-hidden />
              <div className="flex items-baseline justify-between">
                <span className="form-label">{colCut}</span>
                <span className="form-label">{colQuote}</span>
              </div>
            </div>

            <div>
              {cuts.map((cut, i) => {
                const key = `${id}:${cut}`
                return (
                  <div key={cut} className="grid grid-cols-[28px_1fr] items-center border-b border-border">
                    <input
                      type="checkbox"
                      checked={!!selected[key]}
                      onChange={() => onToggle(key, cut)}
                      aria-label={`${cut} — ${colQuote}`}
                      className="h-4 w-4 appearance-none rounded-sm border border-border checked:bg-brand-600 checked:border-brand-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                    />
                    <a
                      href={waLink(`${waPrefix} ${title}: ${cut}. ${waVolume}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/cut flex items-baseline gap-3 py-3.5 px-2 -mx-2 rounded-sm transition-colors hover:bg-accent active:bg-accent ${selected[key] ? 'bg-accent' : ''}`}
                    >
                      <span className="font-mono text-[12px] text-muted-foreground tnum">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-mono text-[14px] text-foreground flex-1 leading-snug">{cut}</span>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium text-muted-foreground group-hover/cut:text-brand-600 group-active/cut:text-brand-600 transition-colors whitespace-nowrap">
                        <WhatsAppGlyph className="w-3 h-3" />
                        {quote}
                      </span>
                    </a>
                  </div>
                )
              })}
            </div>

            <a
              href={waLink(`${waPrefix} ${title}. ${waVolume}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary font-sans text-sm mt-8"
            >
              <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
              {getPricing}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const p = t.products

  // Manifest: tick cuts across sections, send ONE WhatsApp message shaped like a
  // line-item order. The single-tap row path stays untouched; this is additive.
  const [selected, setSelected] = useState<Selected>({})
  const [cutNames, setCutNames] = useState<Record<string, string>>({})

  const onToggle = (key: string, cut: string) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }))
    setCutNames((prev) => ({ ...prev, [key]: cut }))
  }

  const proteinTitles: Record<string, string> = { beef: p.beef.title, pork: p.pork.title, chicken: p.chicken.title }
  const picked = Object.keys(selected).filter((k) => selected[k])
  const count = picked.length

  const manifestMessage = () => {
    const lines = picked.map((k, i) => {
      const [proteinId] = k.split(':')
      return `${String(i + 1).padStart(2, '0')} ${proteinTitles[proteinId]} · ${cutNames[k]} · ${p.manifestVolume}`
    })
    return [p.manifestIntro, ...lines, p.manifestDelivery].join('\n')
  }

  const shared = {
    colCut: p.colCut, colQuote: p.colQuote, getPricing: p.getPricing, quote: p.quote,
    metaFormats: p.metaFormats, waPrefix: p.waCutPrefix, waVolume: p.waVolume, fig: p.fig,
    selected, onToggle,
  }

  return (
    <>
      {/* Page masthead */}
      <section className="bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-4"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="font-display font-semibold tracking-[-0.02em] text-foreground" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
              {p.pageTitle}
            </h1>
            <span className="doc-stamp hidden sm:block mt-3 shrink-0">SJF-CAT · REV 2026.08</span>
          </div>
          <p className="font-serif text-muted-foreground text-lg max-w-2xl leading-relaxed mb-3">{p.pageSub}</p>
          <p className="font-serif text-[15px] text-muted-foreground">{p.pricingNote}</p>
        </motion.div>
      </section>

      <SpecSection id="beef" index={1} title={p.beef.title} counterpart={p.counterpart.beef} desc={p.beef.desc} cuts={p.beef.cuts} imageSrc={SPEC.beef.img} hs={SPEC.beef.hs} {...shared} />
      <SpecSection id="pork" index={2} title={p.pork.title} counterpart={p.counterpart.pork} desc={p.pork.desc} cuts={p.pork.cuts} imageSrc={SPEC.pork.img} hs={SPEC.pork.hs} {...shared} />
      <SpecSection id="chicken" index={3} title={p.chicken.title} counterpart={p.counterpart.chicken} desc={p.chicken.desc} cuts={p.chicken.cuts} imageSrc={SPEC.chicken.img} hs={SPEC.chicken.hs} {...shared} />

      <div className="border-t border-border" />
      <CtaBand />

      {/* Manifest dock — appears when at least one cut is ticked. One message,
          shaped like the purchase order it becomes. */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 72 }} animate={{ y: 0 }} exit={{ y: 72 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="region" aria-live="polite"
            className="fixed bottom-0 inset-x-0 z-40 bg-brand-600 text-white border-t border-brand-800"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between gap-4">
              <span className="font-mono text-[13px] tnum whitespace-nowrap">
                {count} {count === 1 ? p.manifestLine : p.manifestLines}
              </span>
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <button
                  type="button"
                  onClick={() => setSelected({})}
                  className="font-sans text-[13px] text-white/80 hover:text-white active:text-white transition-colors underline underline-offset-4 decoration-white/40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                >
                  {p.manifestClear}
                </button>
                <a
                  href={waLink(manifestMessage())}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-brand-700 font-sans font-medium text-[13px] px-4 py-2 rounded-sm hover:bg-warm-50 active:bg-warm-100 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600"
                >
                  <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
                  {p.manifestSend}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
