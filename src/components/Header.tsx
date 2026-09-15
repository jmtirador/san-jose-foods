'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SjfMark } from '@/components/SjfMark'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { DUR, EASING, SPRING } from '@/lib/motion'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => setMenuOpen(false), [pathname])

  // While the mobile sheet is open: lock page scroll, make the page behind it
  // inert so Tab can't wander into hidden content, and close on Escape with
  // focus returned to the toggle.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const behind = [document.querySelector('main'), document.querySelector('footer')] as (HTMLElement | null)[]
    behind.forEach((el) => { if (el) el.inert = menuOpen })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      behind.forEach((el) => { if (el) el.inert = false })
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/company', label: t.nav.company },
    { href: '/contact', label: t.nav.contact },
  ]
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  // Over the home hero image the bar sits on a dark photo in both themes, so
  // it borrows the on-image scheme (white ink) until the page scrolls.
  const onImage = pathname === '/' && !scrolled && !menuOpen

  // Compact in the desktop bar (mouse), full 44px targets in the phone sheet.
  const languageControl = (size: 'compact' | 'touch') => (
    <div
      role="group"
      aria-label={language === 'es' ? 'Idioma' : 'Language'}
      className={`inline-flex items-center rounded-md border border-border p-1 ${size === 'touch' ? 'h-13' : 'h-11'}`}
    >
      {(['en', 'es'] as const).map((lang) => {
        const active = language === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={`relative rounded-sm text-[13px] font-medium uppercase tracking-[0.04em] transition-colors ${size === 'touch' ? 'h-11 px-5' : 'h-9 px-3.5'} ${
              active ? 'text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {/* The pill slides to the chosen language (claim: the language changed). */}
            {active && <motion.span layoutId={`lang-pill-${size}`} transition={SPRING.tick} className="absolute inset-0 rounded-sm bg-foreground" aria-hidden />}
            <span className="relative">{lang}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${onImage ? 'on-image' : ''}`}>
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          scrolled || menuOpen ? 'bg-background/80 backdrop-blur-xl border-border' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="San Jose Foods, home">
            <SjfMark className="h-7 w-auto" />
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">San Jose Foods</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative rounded-md px-3.5 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {/* The tick slides to the current page (claim: this is the current place). */}
                {isActive(link.href) && <motion.span layoutId="nav-tick" transition={SPRING.tick} aria-hidden className="absolute inset-x-3.5 bottom-1 h-[2px] rounded-full bg-primary" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              {languageControl('compact')}
              <ThemeToggle />
            </div>
            <a
              href={waLink(t.common.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex btn-primary h-11 px-5 text-sm"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              {t.common.whatsapp}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-foreground/5"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={reduce ? { duration: 0 } : { duration: DUR.base, ease: EASING.enter }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-background overflow-y-auto"
          >
            <nav className="wrap flex flex-col py-8" aria-label="Primary, mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`py-4 text-[2rem] font-semibold tracking-[-0.03em] border-b border-border transition-colors ${
                    isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={waLink(t.common.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                {t.common.whatsapp}
              </a>
              <div className="mt-6 flex items-center gap-3 sm:hidden">
                {languageControl('touch')}
                <ThemeToggle className="h-13 w-13" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
