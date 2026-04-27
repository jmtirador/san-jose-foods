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
                className="text-foreground font-medium leading-tight font-display tracking-tight"
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
                <a href="tel:+528180163885" className="text-muted-foreground hover:text-foreground transition-colors">
                  +52 81 8016 3885
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/70 text-[10px] uppercase tracking-widest block mb-0.5">
                  {t.footer.mxPhone}
                </span>
                <a href="mailto:ventas1@sanjosefoods.net" className="text-muted-foreground hover:text-foreground transition-colors">
                  ventas1@sanjosefoods.net
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/70 text-[10px] uppercase tracking-widest block mb-0.5">
                  {t.footer.email}
                </span>
                <span className="text-muted-foreground">
                  1020 E. Produce Rd.<br />
                  Hidalgo, TX 78557
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-sans text-xs text-muted-foreground/70">
          <span>© {new Date().getFullYear()} San Jose Foods LLC. {t.footer.rights}</span>
          <span>Hidalgo, TX · International Trade</span>
        </div>
      </div>
    </footer>
  )
}
