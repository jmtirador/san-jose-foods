'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/products', label: t.nav.products },
    { href: '/why-san-jose-foods', label: t.nav.why },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo — Playfair brand mark */}
          <Link href="/" className="flex flex-col justify-center flex-shrink-0 group">
            <span
              className="text-foreground font-bold leading-tight tracking-tight font-display"
              style={{ fontSize: '1.2rem' }}
            >
              San Jose Foods
            </span>
            <span className="text-brand-600 font-sans text-[9px] font-semibold tracking-[0.32em] uppercase mt-0.5">
              Meat Exports
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200 rounded ${
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <div className="block h-px mt-0.5 bg-brand-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: theme toggle + language toggle + mobile button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Language toggle */}
            <div className="flex items-center border border-border rounded overflow-hidden font-sans text-[11px] font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 transition-colors ${
                  language === 'en'
                    ? 'bg-brand-600 text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 transition-colors ${
                  language === 'es'
                    ? 'bg-brand-600 text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ES
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground p-1.5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-5 py-4 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-sans px-4 py-3 rounded text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-foreground bg-accent border-l-2 border-brand-600'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
