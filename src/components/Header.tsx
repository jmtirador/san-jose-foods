'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

const INK = '#0D0508'

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
    <header className="sticky top-0 z-50 shadow-lg" style={{ background: INK }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo — Playfair brand mark */}
          <Link href="/" className="flex flex-col justify-center flex-shrink-0 group">
            <span
              className="text-white font-bold leading-tight tracking-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.2rem' }}
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
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-200'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <div className="block h-px mt-0.5 bg-brand-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: language toggle + mobile button */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div className="flex items-center border border-white/10 rounded overflow-hidden font-sans text-[11px] font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 transition-colors ${
                  language === 'en'
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 transition-colors ${
                  language === 'es'
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                ES
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-gray-400 hover:text-white p-1.5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/5" style={{ background: '#180B10' }}>
          <nav className="px-5 py-4 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-sans px-4 py-3 rounded text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-white bg-white/5 border-l-2 border-brand-600'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
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
