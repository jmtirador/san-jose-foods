'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/company', label: t.nav.company },
    { href: '/contact', label: t.nav.contact },
  ]

  const lines: { label: string; value: string; href?: string }[] = [
    { label: 'TEL', value: '+52 81 8016 3885', href: 'tel:+528180163885' },
    { label: 'EMAIL', value: 'ventas1@sanjosefoods.net', href: 'mailto:ventas1@sanjosefoods.net' },
    { label: 'WHATSAPP', value: 'wa.me/528180163885', href: waLink('Hola, quiero cotizar. / Hi, I would like a quote.') },
    { label: 'HQ', value: '1020 E. Produce Rd., Hidalgo, TX 78557' },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Ruled inline nav row — no "Quick Links" heading, no column */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 border-b border-border font-mono text-[11px] uppercase tracking-[0.15em]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Letterhead: wide masthead left, contact ledger right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 py-14">

          <div>
            <div className="text-foreground font-medium leading-tight font-display tracking-tight" style={{ fontSize: '1.4rem' }}>
              San Jose Foods
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="text-primary">SJF</span> · International Meat Trade · Hidalgo, TX
            </div>
            <p className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground max-w-md">{t.footer.tagline}</p>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              USDA <span className="text-border">/</span> CFIA <span className="text-border">/</span> SIF
            </div>
          </div>

          {/* Contact ledger — mono dotted-leader spec table */}
          <div className="lg:pt-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground pb-3 border-b border-border">
              {t.contact.infoTitle}
            </div>
            {lines.map((l) => (
              <div key={l.label} className="spec-row border-b border-border/60">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground shrink-0">{l.label}</span>
                <span className="lead-dots" />
                {l.href ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="val font-mono text-[12px] text-foreground hover:text-brand-600 transition-colors"
                  >
                    {l.value}
                  </a>
                ) : (
                  <span className="val font-mono text-[12px]">{l.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom letterhead line */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="tnum">© {year}</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  )
}
