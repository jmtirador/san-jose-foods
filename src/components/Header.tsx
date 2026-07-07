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

// Scroll thresholds with a dead-zone (hysteresis) so micro-scrolls near the
// boundary never flicker the morph: once condensed we stay condensed until the
// user scrolls most of the way back up, and vice-versa. (Same mechanic as the
// Finch marketing nav — the full bar detaches into a floating pill on scroll.)
const ENTER = 90 // condense once scrolled past this
const EXIT = 40 // expand again only after scrolling back above this

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const pathname = usePathname()
  const reduce = useReducedMotion()

  // useScroll gives a MotionValue (no re-render per frame); React state flips
  // only when the hysteresis boundary is crossed, so the tree re-renders at most
  // twice per scroll direction — not on every pixel.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCondensed((prev) => {
      if (prev && y < EXIT) return false
      if (!prev && y > ENTER) return true
      return prev
    })
    if (y > ENTER) setMenuOpen((o) => (o ? false : o))
  })

  const morph = reduce ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/products', label: t.nav.products },
    { href: '/why-san-jose-foods', label: t.nav.why },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Fixed-height sticky shell → the morphing chrome is absolute inside it, so the
  // header's reserved flow height never changes and page content can't jump when
  // the bar condenses into a pill.
  const chromeClass = condensed
    ? 'mx-auto mt-3 flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-4 rounded-full border border-border bg-card/90 backdrop-blur-xl px-4 py-2 nav-pill-shadow'
    : 'mx-auto flex h-16 md:h-[72px] w-full max-w-7xl items-center justify-between gap-3 px-6 sm:px-10'

  return (
    <header className="sticky top-0 z-50 h-16 md:h-[72px]">
      {/* Full-bleed bar background — fades away as the chrome detaches into a
          floating pill, so the "lift off the top edge" reads as one motion. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-b border-border bg-background/95 backdrop-blur shadow-sm"
        initial={false}
        animate={{ opacity: condensed ? 0 : 1 }}
        transition={morph}
      />

      <div className="absolute inset-x-0 top-0">
        <motion.div layout transition={morph} className={chromeClass}>

          {/* Logo — wordmark + tagline (tagline collapses into the pill) */}
          <motion.div layout transition={morph} className="flex-shrink-0">
            <Link href="/" className="flex flex-col justify-center group">
              <span
                className="text-foreground font-medium leading-tight tracking-tight font-display"
                style={{ fontSize: condensed ? '1.05rem' : '1.2rem' }}
              >
                San Jose Foods
              </span>
              <AnimatePresence initial={false}>
                {!condensed && (
                  <motion.span
                    key="tagline"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={morph}
                    className="overflow-hidden text-primary font-sans text-[9px] font-semibold tracking-[0.32em] uppercase"
                  >
                    Meat Exports
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* Desktop Nav — persists into the pill (multi-page site) */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-md ${
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
          <motion.div layout transition={morph} className="flex items-center gap-3">
            <ThemeToggle />

            {/* Language toggle */}
            <div className="flex items-center border border-border rounded-md overflow-hidden font-sans text-[11px] font-semibold">
              <button
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
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
                aria-pressed={language === 'es'}
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
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu — overlays below the bar; auto-closes when the bar condenses */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute left-0 right-0 top-full border-t border-border bg-card shadow-lg"
          >
            <nav className="px-6 py-4 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-sans px-4 py-3 rounded-md text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-foreground bg-accent border-l-2 border-brand-600'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
