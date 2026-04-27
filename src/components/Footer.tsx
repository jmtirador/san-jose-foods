'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/products', label: t.nav.products },
    { href: '/why-san-jose-foods', label: t.nav.why },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <div
                className="text-foreground font-semibold leading-tight font-display tracking-tight"
                style={{ fontSize: '1.2rem' }}
              >
                San Jose Foods
              </div>
              <div className="font-sans text-[9px] font-semibold tracking-[0.32em] uppercase mt-1 text-brand-600">
                Meat Exports
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-foreground font-semibold text-[11px] uppercase tracking-[0.25em] mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-foreground font-semibold text-[11px] uppercase tracking-[0.25em] mb-5">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4 font-sans text-sm">
              <li>
                <span className="text-muted-foreground/70 text-[10px] uppercase tracking-widest block mb-0.5">
                  {t.footer.usPhone}
                </span>
                <a href="tel:+15555550100" className="text-muted-foreground hover:text-foreground transition-colors">
                  +1 (555) 555-0100
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/70 text-[10px] uppercase tracking-widest block mb-0.5">
                  {t.footer.mxPhone}
                </span>
                <a href="tel:+525555550200" className="text-muted-foreground hover:text-foreground transition-colors">
                  +52 (555) 555-0200
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/70 text-[10px] uppercase tracking-widest block mb-0.5">
                  {t.footer.email}
                </span>
                <a href="mailto:info@sanjosefoods.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@sanjosefoods.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-sans text-xs text-muted-foreground/70">
          <span>© {new Date().getFullYear()} San Jose Foods. {t.footer.rights}</span>
          <span>{t.footer.address}</span>
        </div>
      </div>
    </footer>
  )
}
