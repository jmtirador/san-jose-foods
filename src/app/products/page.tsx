'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const INK = '#0D0508'
const RED  = '#D9182E'

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
}: {
  title: string
  desc: string
  cuts: readonly string[]
  imageSrc: string
  reverse?: boolean
  index: number
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded ${reverse ? '' : ''}`}>
      {/* Image */}
      <div className={`relative h-72 lg:h-auto min-h-[400px] overflow-hidden ${reverse ? 'lg:order-2' : ''}`}>
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${INK}cc)` }} />
        {/* index number watermark */}
        <div
          className="absolute bottom-4 left-5 font-display font-bold text-white/10 select-none leading-none"
          style={{ fontSize: '6rem' }}
          aria-hidden
        >
          0{index}
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-10 lg:p-14 flex flex-col justify-center ${reverse ? 'lg:order-1' : ''}`}
        style={{ background: INK }}
      >
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px" style={{ background: RED }} />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-600">
            Wholesale
          </span>
        </div>

        <h2
          className="font-display font-bold text-white mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
        >
          {title}
        </h2>
        <p className="font-sans text-gray-500 mb-8 leading-relaxed text-sm">{desc}</p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-10">
          {cuts.map((cut) => (
            <li key={cut} className="flex items-start gap-2.5 font-sans text-gray-400 text-sm">
              <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: RED }} />
              {cut}
            </li>
          ))}
        </ul>

        <div>
          <Link href="/contact" className="btn-primary font-sans text-sm">
            Contact Us for Pricing
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const p = t.products

  return (
    <>
      {/* Hero */}
      <section className="py-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: RED }} />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600">
              What we supply
            </span>
          </div>
          <h1
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {p.pageTitle}
          </h1>
          <p className="font-sans text-gray-500 text-lg max-w-2xl leading-relaxed mb-6">{p.pageSub}</p>
          <div className="inline-flex items-center gap-2 border border-white/10 rounded px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
            <span className="font-sans text-gray-500 text-xs">{p.pricingNote}</span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="space-y-px" style={{ background: '#0D0508' }}>
        <ProductSection
          title={p.chicken.title}
          desc={p.chicken.desc}
          cuts={p.chicken.cuts}
          imageSrc={productImages.chicken}
          index={1}
        />
        <ProductSection
          title={p.pork.title}
          desc={p.pork.desc}
          cuts={p.pork.cuts}
          imageSrc={productImages.pork}
          reverse
          index={2}
        />
        <ProductSection
          title={p.beef.title}
          desc={p.beef.desc}
          cuts={p.beef.cuts}
          imageSrc={productImages.beef}
          index={3}
        />
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden" style={{ background: RED }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
          <span
            className="font-display font-bold text-white/5 whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)', lineHeight: 1 }}
          >
            Pricing
          </span>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold italic text-white text-4xl md:text-5xl mb-6">{t.home.ctaTitle}</h2>
          <p className="font-sans text-white/75 text-lg mb-10 leading-relaxed">{p.pricingNote}</p>
          <Link href="/contact" className="btn-white font-sans">{p.contactBtn}</Link>
        </div>
      </section>
    </>
  )
}
