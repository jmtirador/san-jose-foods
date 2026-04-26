'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const INK  = '#0D0508'
const INK_S = '#180B10'
const RED  = '#D9182E'

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
    <div
      className="grid grid-cols-[auto_1fr] gap-8 p-8 rounded border border-white/5 hover:border-white/10 transition-colors"
      style={{ background: INK_S }}
    >
      {/* left: number + icon */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="font-display font-bold leading-none select-none"
          style={{ fontSize: '3.5rem', color: `${RED}25` }}
          aria-hidden
        >
          {number}
        </div>
        <div
          className="w-11 h-11 rounded flex items-center justify-center text-white"
          style={{ background: RED }}
        >
          {icon}
        </div>
      </div>
      {/* right: text */}
      <div>
        <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
        <p className="font-sans text-gray-500 mb-3 leading-relaxed text-sm">{p1}</p>
        <p className="font-sans text-gray-500 leading-relaxed text-sm">{p2}</p>
      </div>
    </div>
  )
}

function CheckList({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-sans text-sm">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: light ? 'rgba(255,255,255,0.15)' : `${RED}20`, border: `1px solid ${light ? 'rgba(255,255,255,0.3)' : RED}` }}
          >
            <svg className="w-2.5 h-2.5" fill={light ? 'white' : RED} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className={light ? 'text-gray-300' : 'text-gray-600'}>{item}</span>
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
      <section className="py-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: RED }} />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600">
              The difference
            </span>
          </div>
          <h1
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {w.pageTitle}
          </h1>
          <p className="font-sans text-gray-500 text-lg max-w-2xl leading-relaxed">{w.pageSub}</p>
        </div>
      </section>

      {/* 3 Differentiators */}
      <section className="py-20" style={{ background: INK }}>
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
      <section className="py-20" style={{ background: '#FFF8F5' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* USDA — dark panel */}
            <div className="rounded p-10" style={{ background: INK }}>
              <div
                className="w-10 h-10 rounded flex items-center justify-center mb-6"
                style={{ background: `${RED}20`, border: `1px solid ${RED}40` }}
              >
                <svg className="w-5 h-5" fill="none" stroke={RED} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-white text-2xl mb-3">{w.usdaTitle}</h2>
              <p className="font-sans text-gray-500 mb-7 leading-relaxed text-sm">{w.usdaSub}</p>
              <CheckList items={w.usdaPoints} light />
            </div>

            {/* Cold Chain — warm light panel */}
            <div className="rounded p-10 bg-white border border-warm-200">
              <div
                className="w-10 h-10 rounded flex items-center justify-center mb-6"
                style={{ background: `${RED}10`, border: `1px solid ${RED}30` }}
              >
                <svg className="w-5 h-5" fill="none" stroke={RED} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-3">{w.coldTitle}</h2>
              <p className="font-sans text-gray-500 mb-7 leading-relaxed text-sm">{w.coldSub}</p>
              <CheckList items={w.coldPoints} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: '#FFF8F5' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-px" style={{ background: RED }} />
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              {w.testimonialsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { quote: w.t1, name: w.t1name },
              { quote: w.t2, name: w.t2name },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded p-8 border border-warm-200">
                <div className="font-display text-5xl leading-none mb-4" style={{ color: `${RED}30` }} aria-hidden>
                  "
                </div>
                <p className="font-display italic text-gray-700 leading-relaxed mb-6 text-lg">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-sans font-bold text-xs"
                    style={{ background: RED }}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <span className="font-sans text-gray-600 text-sm font-medium">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden" style={{ background: RED }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
          <span
            className="font-display font-bold text-white/5 whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)', lineHeight: 1 }}
          >
            Partner
          </span>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold italic text-white text-4xl md:text-5xl mb-6">{t.home.ctaTitle}</h2>
          <p className="font-sans text-white/75 text-lg mb-10 leading-relaxed">{t.home.ctaSub}</p>
          <Link href="/contact" className="btn-white font-sans">{t.home.ctaBtn}</Link>
        </div>
      </section>
    </>
  )
}
