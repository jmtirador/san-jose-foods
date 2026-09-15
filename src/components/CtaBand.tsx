'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { MorphText } from '@/components/MorphText'
import { Reveal } from '@/components/Reveal'

// The one deliberate color block per page: the whole band goes brand red and
// closes with the same WhatsApp action the site opens with.
export function CtaBand() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <section className="bg-brand-600 text-white">
      <Reveal className="wrap grid grid-cols-1 items-end gap-10 py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-32">
        <div>
          <h2 className="t-h2 text-white">
            <MorphText>{h.ctaTitle}</MorphText>
          </h2>
          <p className="t-lead mt-6 max-w-xl text-white/85">{h.ctaSub}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
          <a href={waLink(t.common.waMessage)} target="_blank" rel="noopener noreferrer" className="btn-white">
            <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
            {t.common.whatsapp}
          </a>
          <Link href="/contact" className="btn-outline-white">{h.ctaBtn}</Link>
        </div>
      </Reveal>
    </section>
  )
}
