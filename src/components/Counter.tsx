'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

// Ledger figure that ticks up when scrolled into view. Renders the final value
// on the server / for no-JS / reduced-motion / non-numeric values (e.g. "24/7"),
// so it degrades to the real number, never "0".
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const isInt = /^\d+$/.test(value)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!isInt || reduce || !inView || started.current) return
    started.current = true
    setDisplay('0')
    const controls = animate(0, parseInt(value, 10), {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    })
    return () => controls.stop()
  }, [inView, value, isInt, reduce])

  return <span ref={ref}>{display}</span>
}
