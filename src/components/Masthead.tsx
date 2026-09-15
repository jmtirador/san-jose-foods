'use client'

import { motion, useReducedMotion } from 'motion/react'
import { MorphText } from '@/components/MorphText'
import { DUR, EASING, heroLine } from '@/lib/motion'

// Interior page opener: the display h1 sets itself word by word, then the lead
// line and anything under it rise in (claim: the page opened).
export function Masthead({
  title, sub, children, titleClassName = '', className = '',
}: {
  title: string; sub: string; children?: React.ReactNode; titleClassName?: string; className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <section className={`pb-12 pt-32 lg:pb-16 lg:pt-44 ${className}`}>
      <div className="wrap">
        <h1 className={`reveal t-display text-foreground ${titleClassName}`}>
          <MorphText stagger>{title}</MorphText>
        </h1>
        <motion.div className="reveal" {...heroLine(reduce, 0.3)} transition={reduce ? undefined : { duration: DUR.arrive, delay: 0.3, ease: EASING.enter }}>
          <p className="t-lead mt-8 max-w-[54ch] text-muted-foreground">{sub}</p>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
