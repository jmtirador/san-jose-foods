'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { MotionConfig } from 'motion/react'
import type { ComponentProps } from 'react'

// Providers for the whole tree. MotionConfig honors the OS reduced-motion
// setting for every Motion animation (transforms and layout collapse, opacity
// still crossfades), on top of each component's own useReducedMotion guard.
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  )
}
