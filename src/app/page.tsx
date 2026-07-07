'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { CtaBand } from '@/components/CtaBand'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'

function Marquee({ items }: { items: readonly string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden bg-brand-600 select-none">
      <div className="py-2.5 flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {loop.map((item, i) => (
            <span key={i} className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white px-7 flex items-center gap-7">
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
  title, desc, imageSrc, category, index, esTitle, cta, className = '',
}: {
  title: string; desc: string; imageSrc: string; category: string
  index: number; esTitle: string; cta: string; className?: string
}) {
  return (
    <Link href="/products" className={`group relative overflow-hidden border border-border bg-card flex flex-col h-full ${className}`}>
      <div className="relative flex-1 overflow-hidden min-h-[16rem]">
        <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        {/* Flat stamped index — no glass/backdrop-blur */}
        <div className="absolute top-0 right-0 z-10 flex items-center gap-2 bg-background px-3 py-1.5 border-l border-b border-border">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground font-semibold">{category}</span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-brand-600 font-bold tabular-nums">0{index}</span>
        </div>
      </div>
      <div className="p-6 border-t border-border">
        <div className="flex items-baseline gap-2">
          <span className="doc-index">No. 0{index}</span>
          <h3 className="font-display text-card-foreground font-medium tracking-tight text-xl">{title}</h3>
        </div>
        <p className="flourish text-muted-foreground text-sm mb-3 mt-0.5">{esTitle}</p>
        <p className="text-muted-foreground text-sm font-sans leading-relaxed">{desc}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-brand-600 transition-colors">
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

  const figures = [
    { value: '3',    unit: h.trust1Unit, label: h.trust1Title, es: 'EE.UU. · Canadá · Brasil', desc: h.trust1Desc },
    { value: '24/7', unit: h.trust2Unit, label: h.trust2Title, es: 'Respuesta inmediata',       desc: h.trust2Desc },
    { value: '5',    unit: h.trust3Unit, label: h.trust3Title, es: 'Cinco servicios centrales',  desc: h.trust3Desc },
  ]

  return (
    <>
      {/* ── HERO — editorial split, de-decorated ─────────────── */}
      <section className="relative min-h-[calc(100vh-68px)] bg-background overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block" aria-hidden />

        {/* Right: photography — functional gradient only (no grain, no tint) */}
        <div className="absolute inset-y-0 right-0 lg:left-[56%] hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1400&q=85"
            alt="Premium meat products"
            fill priority sizes="(max-width: 1024px) 0px, 48vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, var(--background) 0%, color-mix(in oklch, var(--background) 30%, transparent) 14%, transparent 44%)` }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, var(--background), transparent)` }} aria-hidden />
          {/* Flat mono figure stamp */}
          <div className="absolute bottom-6 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 bg-black/40 px-2.5 py-1">
            {h.heroFig}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col justify-center min-h-[calc(100vh-76px)] pt-16 pb-24 lg:max-w-[600px]">
            {/* Eyebrow — red rule ABOVE the text so the whole hero column shares one
                left edge with the wordmark and headline (congruent). */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-9"
            >
              <div className="w-10 h-px bg-brand-600 mb-5" />
              <span className="eyebrow text-foreground/60">{h.heroEyebrow}</span>
            </motion.div>

            <h1 className="font-display font-medium text-foreground text-balance leading-[1.05] mb-9 tracking-[-0.035em]" style={{ fontSize: 'clamp(2.5rem, 4.4vw, 3.85rem)' }}>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="block">
                {h.heroLine1}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }} className="block flourish text-primary">
                {h.heroLine2}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.46, ease: [0.22, 1, 0.36, 1] }} className="block text-foreground/45">
                {h.heroLine3}
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.62 }} className="font-sans text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mb-11">
              {h.heroSub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.78 }} className="flex flex-wrap gap-4">
              <a href={waLink(h.heroWaMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary font-sans text-sm">
                {h.heroCta}
                <WhatsAppGlyph className="w-4 h-4" />
              </a>
              <Link href="/products" className="btn-ghost font-sans text-sm">{h.heroSubCta}</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee items={h.ticker} />

      {/* ── KEY FIGURES — ledger, not a centered count-up band ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="section-bar">
            <span className="label">§01 — {h.statsEyebrow}</span>
            <span className="meta">SJF · REV 2026.07</span>
          </div>
          <div>
            {figures.map((f, i) => (
              <div key={f.label} className="flex items-baseline gap-6 py-8 border-b border-border">
                <span className="doc-index shrink-0 hidden sm:block w-12">No. 0{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground">{f.label}</div>
                  <div className="flourish text-muted-foreground text-sm mt-1">{f.es}</div>
                  <div className="font-sans text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">{f.desc}</div>
                </div>
                {/* Dotted leader ends at a fixed x — the figure columns are fixed
                    width so numbers right-align and units left-align across rows. */}
                <div className="hidden md:block flex-1 self-center border-b border-dotted border-border/70" aria-hidden />
                <div className="shrink-0 flex items-baseline">
                  <span className="w-[128px] text-right font-display font-normal tabular-nums text-primary tracking-[-0.03em] leading-none" style={{ fontSize: 'clamp(2.2rem, 3.4vw, 3.25rem)' }}>{f.value}</span>
                  <span className="w-[116px] pl-3 font-mono text-[10px] uppercase tracking-[0.16em] leading-tight text-muted-foreground">{f.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS — preview, de-decorated ─────────────────── */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-brand-600" />
                <span className="eyebrow text-muted-foreground">§02 — {h.productsEyebrow}</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.04em] text-foreground" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                {h.productsTitle}
              </h2>
            </div>
            <Link href="/products" className="btn-outline-brand font-sans text-xs shrink-0">{h.viewProducts}</Link>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="reveal-on-scroll grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-3"
          >
            {[
              { title: h.beef, desc: h.beefDesc, src: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=1200&q=85', category: 'Beef', index: 1, es: 'Res de exportación', cls: 'md:col-span-2 md:row-span-2' },
              { title: h.pork, desc: h.porkDesc, src: 'https://images.unsplash.com/photo-1592877186734-6e558cf0dfaf?w=800&q=80', category: 'Pork', index: 2, es: 'Cerdo premium', cls: '' },
              { title: h.chicken, desc: h.chickenDesc, src: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80', category: 'Chicken', index: 3, es: 'Pollo selecto', cls: '' },
            ].map((p) => (
              <motion.div key={p.category} variants={{ hidden: { y: 20 }, visible: { y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }} className={p.cls}>
                <ProductCard title={p.title} desc={p.desc} imageSrc={p.src} category={p.category} index={p.index} esTitle={p.es} cta={h.viewCuts} />
              </motion.div>
            ))}
          </motion.div>

          <p className="font-sans text-muted-foreground text-sm mt-8 max-w-lg leading-relaxed">{h.productsSub}</p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
