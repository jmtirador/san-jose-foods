// One motion vocabulary for the site. Components compose these; a literal
// duration or easing inside a component is drift.
//
// Claims this site makes with motion (each animation states a true fact):
//  - "the page opened": hero lines and mastheads rise in once on mount
//  - "the page changed": every route enters with a crossfade and an 8px rise
//  - "this section arrived": one reveal per section, rows in order
//  - "the corridor progresses as you do": the route map draws with scroll
//  - "the language changed": headings morph word by word, the pill slides
//  - "this is the current place": nav and jump-bar ticks slide, not jump
//  - "you pressed it": 3% press on every control
//  - "the order grew": the manifest count morphs by digit

import { useEffect } from 'react'
import { useMotionValue, useReducedMotion, useTransform, type MotionValue, type Transition } from 'motion/react'

export const DUR = {
  instant: 0.12,
  quick: 0.18,
  base: 0.26,
  settle: 0.42,
  arrive: 0.7,
  hero: 0.9,
} as const

export const EASING = {
  enter: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  between: [0.4, 0, 0.2, 1] as const,
}

export const STAGGER = {
  word: 0.07,
  row: 0.04,
  card: 0.08,
} as const

export const SPRING = {
  dock: { type: 'spring', stiffness: 260, damping: 28 } as Transition,
  tick: { type: 'spring', stiffness: 420, damping: 34 } as Transition,
  check: { type: 'spring', stiffness: 520, damping: 26 } as Transition,
}

/** Section entrance: a heavy fade-up that settles once. */
export function revealProps(reduce: boolean | null, opts: { delay?: number; amount?: number; blur?: boolean } = {}) {
  const { delay = 0, amount = 0.25, blur = true } = opts
  if (reduce) return { initial: false as const, whileInView: undefined, viewport: undefined, transition: undefined }
  return {
    initial: { opacity: 0, y: 28, filter: blur ? 'blur(6px)' : 'blur(0px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount },
    transition: { duration: DUR.arrive, delay, ease: EASING.enter } as Transition,
  }
}

/** Row entrance inside a list: 40ms step, lead capped at ~300ms. */
export function rowReveal(reduce: boolean | null, index: number, amount = 0.3) {
  if (reduce) return { initial: false as const }
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: DUR.settle, delay: Math.min(index * STAGGER.row, 0.3), ease: EASING.enter } as Transition,
  }
}

/** Mount entrance for hero-scale text. */
export function heroLine(reduce: boolean | null, delay = 0) {
  if (reduce) return {}
  return {
    initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: DUR.hero, delay, ease: EASING.enter } as Transition,
  }
}

/**
 * Scroll-linked values must never switch between a MotionValue and a plain
 * number (Motion leaves the last bound value in place). This folds the
 * reduced-motion preference into the value pipeline instead: when the user
 * prefers reduced motion, the value rests at `resting`; otherwise it follows.
 */
export function useReducedMotionFlag(): MotionValue<number> {
  const reduce = useReducedMotion()
  const flag = useMotionValue(reduce ? 1 : 0)
  useEffect(() => { flag.set(reduce ? 1 : 0) }, [reduce, flag])
  return flag
}

export function useStill<T extends number | string>(value: MotionValue<T>, flag: MotionValue<number>, resting: T): MotionValue<T> {
  // Function form: Motion tracks every motion value read inside, so a flip of
  // the flag recomputes the output even when the scroll value is unchanged.
  return useTransform(() => (flag.get() ? resting : value.get()))
}
