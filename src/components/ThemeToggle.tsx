'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { DUR, EASING } from '@/lib/motion'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => setMounted(true), [])

  const current = theme === 'system' ? resolvedTheme : theme
  const isDark = current === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10 active:scale-[0.97] ${className}`}
    >
      {/* The icon turns over when the theme changes (claim: the theme changed).
          Nothing renders until mounted so it never shows the wrong theme. */}
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? 'sun' : 'moon'}
            className="inline-flex"
            initial={reduce ? false : { rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 1 } : { rotate: 90, opacity: 0, scale: 0.6 }}
            transition={reduce ? { duration: 0 } : { duration: DUR.quick, ease: EASING.enter }}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
