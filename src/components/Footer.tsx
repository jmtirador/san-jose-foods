'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { SjfMark } from '@/components/SjfMark'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/company', label: t.nav.company },
    { href: '/contact', label: t.nav.contact },
  ]

  const lines: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: t.common.tel, value: '+52 81 8016 3885', href: 'tel:+528180163885' },
    { label: t.common.email, value: 'ventas1@sanjosefoods.net', href: 'mailto:ventas1@sanjosefoods.net' },
    { label: 'WhatsApp', value: 'wa.me/528180163885', href: waLink(t.common.waMessage), external: true },
    { label: t.common.hq, value: '1020 E. Produce Rd., Hidalgo, TX 78557' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="wrap grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <SjfMark className="h-8 w-auto shrink-0" />
            <span className="text-[19px] font-semibold tracking-[-0.02em] text-foreground">San Jose Foods</span>
          </div>
          <p className="t-body mt-6 max-w-sm text-muted-foreground">{t.footer.tagline}</p>
          <p className="t-code mt-6 text-muted-foreground">USDA · CFIA · SIF</p>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="t-body w-fit py-1.5 text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <p className="t-small mb-4 text-muted-foreground">{t.footer.direct}</p>
          <dl className="divide-y divide-border">
            {lines.map((l) => (
              <div key={l.label} className="kv">
                <dt>{l.label}</dt>
                <dd className="t-code text-left sm:text-right max-w-[72%]">
                  {l.href ? (
                    <a
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      className="text-foreground transition-colors hover:text-accent-text"
                    >
                      {l.value}
                    </a>
                  ) : (
                    l.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="t-small tnum text-muted-foreground">© {year}</span>
        <span className="t-small text-muted-foreground">{t.footer.rights}</span>
      </div>
    </footer>
  )
}
