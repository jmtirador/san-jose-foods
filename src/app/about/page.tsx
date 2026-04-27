'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-card border border-border rounded p-6 hover:shadow-md transition-shadow group">
      <div className="w-10 h-10 rounded flex items-center justify-center mb-4 bg-brand-600/10 text-brand-600">
        {icon}
      </div>
      <h3 className="font-display font-medium tracking-[-0.015em] text-card-foreground text-lg mb-2">{title}</h3>
      <p className="font-sans text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function AboutPage() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <>
      {/* Page Hero */}
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
              Our story
            </span>
          </div>
          <h1
            className="font-display font-medium tracking-[-0.04em] text-foreground mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {a.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed">{a.pageSub}</p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-medium tracking-[-0.04em] text-foreground text-3xl md:text-4xl mb-8">{a.storyTitle}</h2>
              <div className="space-y-5 font-sans text-muted-foreground leading-relaxed">
                <p>{a.storyP1}</p>
                <p>{a.storyP2}</p>
                <blockquote className="font-display italic text-foreground text-lg border-l-2 pl-5 border-brand-600">
                  {a.storyP3}
                </blockquote>
              </div>
            </div>
            <div className="relative overflow-hidden rounded h-80 lg:min-h-[460px]">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                alt="San Jose Foods team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-px bg-brand-600" />
            <h2 className="font-sans text-foreground font-semibold text-[11px] uppercase tracking-[0.3em]">
              {a.statsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '20+', label: a.stat1 },
              { value: '150+', label: a.stat2 },
              { value: '2', label: a.stat3 },
              { value: '98%', label: a.stat4 },
            ].map((stat) => (
              <div key={stat.label} className="py-8 border-b border-border">
                <div
                  className="font-display font-medium tracking-[-0.04em] text-brand-600 mb-2"
                  style={{ fontSize: '3rem' }}
                >
                  {stat.value}
                </div>
                <div className="font-sans text-muted-foreground text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-12">
            <h2 className="font-display font-medium tracking-[-0.04em] text-foreground text-3xl md:text-4xl">{a.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ValueCard
              title={a.value1Title}
              desc={a.value1Desc}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
            />
            <ValueCard
              title={a.value2Title}
              desc={a.value2Desc}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
            <ValueCard
              title={a.value3Title}
              desc={a.value3Desc}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <ValueCard
              title={a.value4Title}
              desc={a.value4Desc}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-brand-600">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
          <span
            className="font-display font-medium tracking-[-0.04em] italic text-white/[0.06] whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(8rem, 18vw, 18rem)', lineHeight: 1 }}
          >
            Carnicería
          </span>
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-medium tracking-[-0.04em] italic text-white text-4xl md:text-5xl mb-6">{t.home.ctaTitle}</h2>
          <p className="font-sans text-white/80 text-lg mb-10 leading-relaxed">{t.home.ctaSub}</p>
          <Link href="/contact" className="btn-white font-sans">{t.home.ctaBtn}</Link>
        </div>
      </section>
    </>
  )
}
