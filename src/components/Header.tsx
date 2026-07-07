'use client'

import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
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

  // Calm ease-in-out at 0.42s reads smooth for a container morph where elements travel.
  const morph = reduce ? { duration: 0 } : { duration: 0.42, ease: [0.4, 0, 0.2, 1] as const }

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/company', label: t.nav.company },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const langBtn = (lang: 'en' | 'es', label: string) => (
    <button
      type="button"
      onClick={() => setLanguage(lang)}
      aria-pressed={language === lang}
      className={
        language === lang
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground transition-colors'
      }
    >
      {label}
    </button>
  )

  // Flush, opaque, hairline-ruled bar; on scroll it detaches into a bordered (not
  // glassy/shadowed) document tab — the morph, reskinned to Trade Desk language.
  const chromeClass = condensed
    ? 'mx-auto mt-3 flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-5 rounded-sm border border-border bg-background px-5 py-2.5'
    : 'mx-auto flex h-16 md:h-[68px] w-full max-w-7xl items-center justify-between gap-3 px-6 sm:px-10'

  return (
    <header className="sticky top-0 z-50 h-16 md:h-[68px]">
      {/* Flush opaque bar with a single bottom hairline — no blur, no shadow.
          Fades out as the chrome detaches so content shows behind the tab. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-b border-border bg-background"
        initial={false}
        animate={{ opacity: condensed ? 0 : 1 }}
        transition={morph}
      />

      <div className="absolute inset-x-0 top-0">
        <motion.div layout transition={morph} className={chromeClass}>

          {/* Wordmark + mono descriptor (descriptor collapses into the tab) */}
          <motion.div layout transition={morph} className="flex-shrink-0">
            <Link href="/" className="flex flex-col justify-center group">
              <span
                className="text-foreground font-medium leading-tight tracking-tight font-display"
                style={{
                  fontSize: condensed ? '1.05rem' : '1.15rem',
                  transition: reduce ? undefined : 'font-size 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                San&nbsp;Jose&nbsp;Foods
              </span>
              <AnimatePresence initial={false}>
                {!condensed && (
                  <motion.span
                    key="descriptor"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={morph}
                    className="overflow-hidden font-mono text-[9px] font-medium tracking-[0.28em] uppercase text-muted-foreground"
                  >
                    <span className="text-primary">SJF</span>&nbsp;· International Meat Trade
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* Nav — motion.nav so links glide (not teleport) through the morph */}
          <motion.nav layout transition={morph} className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute left-3 right-3 -bottom-0.5 block h-[2px] bg-brand-600" aria-hidden />
                )}
              </Link>
            ))}
          </motion.nav>

          {/* Control cluster — mono document-settings strip: EN/ES | LIGHT/DARK */}
          <motion.div layout transition={morph} className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] tracking-wider">
              <div className="flex items-center gap-1.5">
                {langBtn('en', 'EN')}
                <span className="text-border" aria-hidden>/</span>
                {langBtn('es', 'ES')}
              </div>
              <span className="w-px h-3 bg-border" aria-hidden />
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground p-1.5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile menu — flush ruled panel, auto-closes when the bar condenses */}
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
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4 font-mono text-[11px] tracking-wider">
                <div className="flex items-center gap-1.5">
                  {langBtn('en', 'EN')}
                  <span className="text-border" aria-hidden>/</span>
                  {langBtn('es', 'ES')}
                </div>
                <span className="w-px h-3 bg-border" aria-hidden />
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
