'use client'

import { motion, useReducedMotion } from 'motion/react'
import { revealProps } from '@/lib/motion'

// One entrance for everything below the fold: this section arrived. The
// `reveal` class lets layout.tsx's noscript rule force it visible.
export function Reveal({
  children, className = '', delay = 0, amount = 0.25, blur = true,
}: {
  children: React.ReactNode; className?: string; delay?: number; amount?: number; blur?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={`reveal ${className}`} {...revealProps(reduce, { delay, amount, blur })}>
      {children}
    </motion.div>
  )
}
