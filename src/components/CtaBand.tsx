'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'

// One shared, left-aligned, WhatsApp-first sign-off — replaces the byte-identical
// centered red "Get in Touch" panels that closed every page.
export function CtaBand() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <section className="bg-brand-600 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
            <span className="w-8 h-px bg-white/50" />
            {h.ctaEyebrow}
          </div>
          <h2
            className="font-display font-medium text-white leading-[1.08] tracking-[-0.03em] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            {h.ctaTitle}
          </h2>
          <p className="font-sans text-white/95 text-lg max-w-xl mb-10 leading-relaxed">{h.ctaSub}</p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={waLink(h.heroWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-brand-700 font-medium px-7 py-3.5 rounded-sm hover:bg-[#FFF8F5] transition-colors"
            >
              <WhatsAppGlyph className="w-4 h-4" />
              {h.ctaWhatsApp}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/60 text-white hover:border-white font-medium px-7 py-3.5 rounded-sm transition-colors"
            >
              {h.ctaBtn}
            </Link>
          </div>

          <div className="mt-12 pt-6 border-t border-white/25 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
            San Jose Foods LLC · US / CA / BR → MX · {h.ctaTrust}
          </div>
        </div>
      </div>
    </section>
  )
}
