'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { ThemeToggle } from '@/components/ThemeToggle'

// Hysteresis dead-zone so micro-scrolls near the boundary don't flicker the morph.
const ENTER = 90
const EXIT = 40

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const pathname = usePathname()
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCondensed((prev) => {
      if (prev && y < EXIT) return false
      if (!prev && y > ENTER) return true
      return prev
    })
    if (y > ENTER) setMenuOpen((o) => (o ? false : o))
  })

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/company', label: t.nav.company },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // A two-option mono control (EN/ES, LIGHT/DARK): active = foreground + a red
  // baseline tick; inactive = muted. Reads as a real setting, not plain text.
  const seg = (active: boolean, label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative px-0.5 pb-1 transition-colors ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
      {active && <span className="absolute inset-x-0 -bottom-px h-[1.5px] bg-brand-600" aria-hidden />}
    </button>
  )

  const controls = (
    <div className="flex items-stretch font-mono text-[11px] tracking-[0.12em]">
      <div className="flex items-center gap-3">
        {seg(language === 'en', 'EN', () => setLanguage('en'))}
        {seg(language === 'es', 'ES', () => setLanguage('es'))}
      </div>
      <div className="mx-5 w-px self-center h-3 bg-border" aria-hidden />
      <ThemeToggle />
    </div>
  )

  // Morph is CSS-transition based (max-width, padding, radius, bg, border, margin),
  // NOT Framer layout/FLIP — so the flex children reflow via justify-between and
  // never teleport at animation end. Structure stays identical in both states.
  const morphTransition = reduce
    ? undefined
    : 'max-width 0.5s cubic-bezier(0.4,0,0.2,1), margin-top 0.5s cubic-bezier(0.4,0,0.2,1), padding 0.5s cubic-bezier(0.4,0,0.2,1), border-radius 0.5s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease'

  return (
    <header className="sticky top-0 z-50 h-[76px]">
      {/* Full-bleed flush bar background + bottom hairline — fades out on condense
          so the bar reads as detaching into a floating panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-b bg-background transition-[opacity,border-color] duration-400"
        style={{ opacity: condensed ? 0 : 1, borderColor: 'var(--border)' }}
      />

      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div
          className={`flex h-[68px] w-full items-center justify-between gap-6 border ${
            condensed ? 'max-w-6xl mt-2 rounded-xl border-border bg-card px-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]' : 'max-w-7xl mt-0 rounded-none border-transparent bg-transparent px-6 sm:px-10'
          }`}
          style={{ transition: morphTransition }}
        >
          {/* Wordmark + descriptor — constant structure (no collapse) so nothing
              reflows the logo mid-morph. */}
          <Link href="/" className="flex flex-col justify-center flex-shrink-0 group">
            <span className="text-foreground font-medium leading-none tracking-tight font-display text-[1.15rem]">
              San&nbsp;Jose&nbsp;Foods
            </span>
            <span className="mt-1 font-mono text-[9px] font-medium tracking-[0.26em] uppercase text-muted-foreground whitespace-nowrap">
              <span className="text-primary">SJF</span>&nbsp;· International Meat Trade
            </span>
          </Link>

          {/* Nav — plain flex, no layout FLIP; stays justify-between so it can't teleport */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute left-3.5 right-3.5 -bottom-1 block h-[2px] bg-brand-600" aria-hidden />
                )}
              </Link>
            ))}
          </nav>

          {/* Control cluster */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">{controls}</div>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground p-1.5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden absolute left-0 right-0 top-full border-y border-border bg-background"
          >
            <nav className="px-6 py-4 flex flex-col divide-y divide-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-sans py-3 text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">{controls}</div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
