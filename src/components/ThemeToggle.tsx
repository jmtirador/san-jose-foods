'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// LIGHT / DARK as a two-option mono control matching the EN/ES language toggle:
// active = foreground + a red baseline tick, inactive = muted.
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-4 w-[86px]" aria-hidden />
  }

  const current = theme === 'system' ? resolvedTheme : theme

  const seg = (active: boolean, label: string, value: string) => (
    <button
      type="button"
      onClick={() => setTheme(value)}
      aria-pressed={active}
      aria-label={`${label} mode`}
      className={`relative px-0.5 pb-1 transition-colors ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
      {active && <span className="absolute inset-x-0 -bottom-px h-[1.5px] bg-brand-600" aria-hidden />}
    </button>
  )

  return (
    <div className="flex items-center gap-3">
      {seg(current === 'light', 'LIGHT', 'light')}
      {seg(current === 'dark', 'DARK', 'dark')}
    </div>
  )
}
