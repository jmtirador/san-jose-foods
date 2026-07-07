'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'

const productImages = {
  chicken: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&q=80',
  pork:    'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
  beef:    'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=900&q=80',
}

function ProductSection({
  title,
  desc,
  cuts,
  imageSrc,
  reverse = false,
  index,
  wholesale,
  getPricing,
  waPrefix,
  waVolume,
}: {
  title: string
  desc: string
  cuts: readonly string[]
  imageSrc: string
  reverse?: boolean
  index: number
  wholesale: string
  getPricing: string
  waPrefix: string
  waVolume: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl border border-border bg-card">
      {/* Image */}
      <div className={`relative h-72 lg:h-auto min-h-[400px] overflow-hidden ${reverse ? 'lg:order-2' : ''}`}>
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        {/* gradient fades photo into card surface — flips with theme */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${reverse ? 'to left' : 'to right'}, transparent 60%, var(--card) 100%)`,
          }}
          aria-hidden
        />
        {/* index number watermark */}
        <div
          className="absolute bottom-4 left-5 font-display font-medium tracking-[-0.04em] text-foreground/[0.08] select-none leading-none"
          style={{ fontSize: '6rem' }}
          aria-hidden
        >
          0{index}
        </div>
      </div>

      {/* Content */}
      <div className={`p-10 lg:p-14 flex flex-col justify-center bg-card ${reverse ? 'lg:order-1' : ''}`}>
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-brand-600" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {wholesale}
          </span>
        </div>

        <h2
          className="font-display font-medium tracking-[-0.04em] text-card-foreground mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
        >
          {title}
        </h2>
        <p className="font-sans text-muted-foreground mb-8 leading-relaxed text-sm">{desc}</p>

        {/* Each cut is a tap-to-quote: opens WhatsApp prefilled with the exact cut. */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mb-10">
          {cuts.map((cut) => (
            <li key={cut}>
              <a
                href={waLink(`${waPrefix} ${title} — ${cut}. ${waVolume}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cut flex items-start gap-2.5 font-sans text-muted-foreground text-sm py-1 rounded-md transition-colors hover:text-brand-600"
              >
                <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-brand-600" />
                <span className="flex-1">{cut}</span>
                <MessageCircle className="w-3.5 h-3.5 mt-0.5 opacity-0 group-hover/cut:opacity-100 transition-opacity flex-shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <div>
          <a
            href={waLink(`${waPrefix} ${title}. ${waVolume}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary font-sans text-sm"
          >
            {getPricing}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const p = t.products

  const sectionProps = {
    wholesale: p.wholesale,
    getPricing: p.getPricing,
    waPrefix: p.waCutPrefix,
    waVolume: p.waVolume,
  }

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
            <span className="eyebrow text-muted-foreground">
              {p.eyebrow}
            </span>
          </div>
          <h1
            className="font-display font-medium tracking-[-0.04em] text-foreground mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {p.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed mb-6">{p.pageSub}</p>
          <div className="inline-flex items-center gap-2 border border-border rounded-md px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
            <span className="font-sans text-muted-foreground text-xs">{p.pricingNote}</span>
          </div>
        </motion.div>
      </section>

      {/* Products */}
      <section className="space-y-px bg-background pb-12 border-t border-border pt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-4">
          <ProductSection
            title={p.chicken.title}
            desc={p.chicken.desc}
            cuts={p.chicken.cuts}
            imageSrc={productImages.chicken}
            index={1}
            {...sectionProps}
          />
          <ProductSection
            title={p.pork.title}
            desc={p.pork.desc}
            cuts={p.pork.cuts}
            imageSrc={productImages.pork}
            reverse
            index={2}
            {...sectionProps}
          />
          <ProductSection
            title={p.beef.title}
            desc={p.beef.desc}
            cuts={p.beef.cuts}
            imageSrc={productImages.beef}
            index={3}
            {...sectionProps}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden bg-brand-600">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-medium tracking-[-0.04em] text-white text-4xl md:text-5xl mb-6">{t.home.ctaTitle}</h2>
          <p className="font-sans text-white/80 text-lg mb-10 leading-relaxed">{p.pricingNote}</p>
          <Link href="/contact" className="btn-white font-sans">{p.contactBtn}</Link>
        </div>
      </section>
    </>
  )
}
