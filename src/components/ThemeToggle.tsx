'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// A mono LIGHT / DARK text switch that reads like a document settings strip,
// not a floating glassy icon button (the shadcn + next-themes starter default).
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-4 w-[86px]" aria-hidden />
  }

  const current = theme === 'system' ? resolvedTheme : theme

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={current === 'light'}
        aria-label="Light mode"
        className={
          current === 'light'
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground transition-colors'
        }
      >
        LIGHT
      </button>
      <span className="text-border" aria-hidden>/</span>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={current === 'dark'}
        aria-label="Dark mode"
        className={
          current === 'dark'
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground transition-colors'
        }
      >
        DARK
      </button>
    </div>
  )
}
