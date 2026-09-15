'use client'

import { motion, useReducedMotion } from 'motion/react'
import { DUR, EASING } from '@/lib/motion'

// Every route change is a transition, never a teleport: the content column
// crossfades in with an 8px rise while the header stays put (claim: the page
// changed). template.tsx remounts per navigation, which is what fires it.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base, ease: EASING.enter }}
    >
      {children}
    </motion.div>
  )
}
