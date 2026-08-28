'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { CtaBand } from '@/components/CtaBand'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { SectionHead } from '@/components/SectionHead'
import { SjfMark } from '@/components/SjfMark'

function ProductCard({
  title, desc, imageSrc, counterpart, anchor, index, cta, className = '', compact = false,
}: {
  title: string; desc: string; imageSrc: string; counterpart: string; anchor: string
  index: number; cta: string; className?: string; compact?: boolean
}) {
  return (
    <Link href={`/products#${anchor}`} className={`group relative overflow-hidden border border-border bg-card flex flex-col h-full ${className}`}>
      <div className="relative flex-1 overflow-hidden min-h-[16rem] md:min-h-0">
        <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="p-6 border-t border-border">
        <div className="flex items-baseline gap-3">
          <span className="doc-index">No. 0{index}</span>
          <h3 className="font-display text-card-foreground font-semibold tracking-[-0.01em] text-[22px]">{title}</h3>
        </div>
        <p className="flourish text-muted-foreground text-sm mb-3 mt-1">{counterpart}</p>
        {!compact && <p className="text-muted-foreground text-[15px] font-serif leading-relaxed">{desc}</p>}
        <div className="mt-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-muted-foreground group-hover:text-brand-600 transition-colors">
          <span>{cta}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const h = t.home
  const reduce = useReducedMotion()

  // Declaration rows print in place, top to bottom — a dot-matrix pass, not a
  // fade choreography. The one mount animation on the page.
  const printRow = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5 + i * 0.07, duration: 0.02 },
        }

  return (
    <>
      {/* ── HERO — La Declaración: the trade document, filled in ── */}
      <section className="relative bg-background overflow-hidden border-b border-rule">
        {/* Quiet right-edge watermark, desktop only */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[-120px] hidden lg:flex items-center opacity-[0.05]">
          <SjfMark className="h-[420px] w-auto" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="lg:max-w-[720px]">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold text-foreground text-balance leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.4rem, 4.6vw, 4rem)', fontStretch: '87.5%' }}
            >
              {h.heroLine1}<br />
              {h.heroLine2}<br />
              {h.heroLine3}<span className="text-primary">{h.heroAccent}</span>.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flourish text-muted-foreground text-[16px] mt-5"
            >
              {h.heroCounterpart}
            </motion.p>

            {/* The declaration — six ruled rows, pre-printed label left, typed
                value right. The facts that used to live in a ticker and a stat
                band, presented the way the trade actually writes them. */}
            <div className="mt-10 border-t-2 border-foreground">
              {h.declaration.map((row, i) => (
                <motion.div
                  key={row.k}
                  {...printRow(i)}
                  className="flex items-baseline justify-between gap-4 py-3 border-b border-border"
                >
                  <span className="form-label shrink-0">{row.k}</span>
                  <span className="font-mono text-[14px] sm:text-[15px] text-foreground text-right tnum leading-snug">{row.v}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href={waLink(h.heroWaMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary font-sans text-sm">
                {h.heroCta}
                <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
              </a>
              <Link href="/products" className="btn-ghost font-sans text-sm">{h.heroSubCta}</Link>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="doc-stamp mt-10"
            >
              {h.heroDocLine}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── §01 CATALOG PREVIEW ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div className="flex-1">
              <SectionHead index="§01" title={h.productsTitle} meta="HS 0201 · 0202 · 0203 · 0207" />
            </div>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="reveal-on-scroll grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-3"
          >
            {[
              { title: h.beef, desc: h.beefDesc, src: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=1200&q=85', anchor: 'beef', counterpart: h.beefCounterpart, index: 1, cls: 'md:col-span-2 md:row-span-2' },
              { title: h.pork, desc: h.porkDesc, src: 'https://images.unsplash.com/photo-1592877186734-6e558cf0dfaf?w=800&q=80', anchor: 'pork', counterpart: h.porkCounterpart, index: 2, cls: '' },
              { title: h.chicken, desc: h.chickenDesc, src: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80', anchor: 'chicken', counterpart: h.chickenCounterpart, index: 3, cls: '' },
            ].map((p) => (
              <motion.div key={p.anchor} variants={{ hidden: { y: 20 }, visible: { y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }} className={p.cls}>
                <ProductCard title={p.title} desc={p.desc} imageSrc={p.src} counterpart={p.counterpart} anchor={p.anchor} index={p.index} cta={h.viewCuts} compact={!p.cls} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <p className="font-serif text-muted-foreground text-[16px] max-w-lg leading-relaxed">{h.productsSub}</p>
            <Link href="/products" className="btn-outline-brand font-sans text-xs shrink-0">{h.viewProducts}</Link>
          </div>
        </div>
      </section>

      {/* ── §02 COMMON QUESTIONS — objection handling before the order desk ── */}
      <section className="py-20 bg-background border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-12">
            <SectionHead index="§02" title={h.faqEyebrow} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
            {h.faq.map((f, i) => (
              <div key={f.q} className="flex gap-5">
                <span className="doc-index shrink-0 w-12 pt-0.5">Q.0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="font-serif font-semibold text-foreground text-[17px] mb-2">{f.q}</h3>
                  <p className="font-serif text-muted-foreground text-[15px] leading-relaxed max-w-md">{f.a}</p>
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
