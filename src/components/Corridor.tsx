'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useReducedMotionFlag, useStill } from '@/lib/motion'

// The corridor, drawn from public facts only: three inspection systems feed
// one desk in Hidalgo, and loads cross at three named ports of entry. The
// routes draw as the reader scrolls through the section (claim: the corridor
// progresses as you do); once drawn, three dots travel the routes.

const ORIGINS = [
  { id: 'ca', y: 80 },
  { id: 'us', y: 210 },
  { id: 'br', y: 340 },
] as const
const DESK = { x: 600, y: 210 }
const CROSSINGS = [
  { id: 'reynosa', label: 'Reynosa', y: 110 },
  { id: 'laredo', label: 'Nuevo Laredo', y: 210 },
  { id: 'matamoros', label: 'Matamoros', y: 310 },
] as const
const MARKET = { x: 1120, y: 210 }
const OX = 90
const CX = 900

const originPath = (y: number) => `M ${OX} ${y} C ${OX + 220} ${y}, ${DESK.x - 220} ${DESK.y}, ${DESK.x} ${DESK.y}`
const crossingPath = (y: number) => `M ${DESK.x} ${DESK.y} C ${DESK.x + 140} ${DESK.y}, ${CX - 140} ${y}, ${CX} ${y}`
const marketPath = (y: number) => `M ${CX} ${y} C ${CX + 100} ${y}, ${MARKET.x - 100} ${MARKET.y}, ${MARKET.x} ${MARKET.y}`

export function Corridor() {
  const { t } = useLanguage()
  const h = t.home
  const reduce = useReducedMotion()
  const nodes = h.corridorNodes
  const originLabel: Record<'ca' | 'us' | 'br', string> = { ca: nodes.ca, us: nodes.us, br: nodes.br }

  // Scroll progress through the diagram drives the three drawing stages.
  const ref = useRef<HTMLDivElement>(null)
  // Progress runs from the diagram entering at the bottom to the whole diagram
  // being on screen, so it is fully drawn while every node is still visible.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'end 88%'] })
  const still = useReducedMotionFlag()
  const stage1 = useStill(useTransform(scrollYProgress, [0, 0.42], [0, 1]), still, 1)
  const stage2 = useStill(useTransform(scrollYProgress, [0.32, 0.74], [0, 1]), still, 1)
  const stage3 = useStill(useTransform(scrollYProgress, [0.62, 1], [0, 1]), still, 1)
  const [drawn, setDrawn] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => { if (v > 0.96 && !drawn) setDrawn(true) })

  const stroke = (stage: typeof stage1) => ({ style: { pathLength: stage, opacity: stage } })

  const travel = (path: string, dur: number, begin: number) =>
    reduce || !drawn ? null : (
      <circle r="5" className="fill-brand-600">
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
      </circle>
    )

  return (
    <div ref={ref} className="reveal">
      {/* Desktop and tablet: the drawn map. */}
      <svg viewBox="0 0 1200 420" className="hidden w-full md:block" role="img" aria-label={h.corridorTitle}>
        <g className="stroke-foreground/25" fill="none" strokeWidth="1.5">
          {ORIGINS.map((o) => (
            <motion.path key={o.id} d={originPath(o.y)} {...stroke(stage1)} />
          ))}
          {CROSSINGS.map((c) => (
            <motion.path key={c.id} d={crossingPath(c.y)} {...stroke(stage2)} />
          ))}
          {CROSSINGS.map((c) => (
            <motion.path key={`${c.id}-mx`} d={marketPath(c.y)} {...stroke(stage3)} />
          ))}
        </g>

        {travel(originPath(ORIGINS[0].y), 6, 0)}
        {travel(originPath(ORIGINS[1].y), 5.2, 1.4)}
        {travel(originPath(ORIGINS[2].y), 6.4, 2.6)}
        {travel(crossingPath(CROSSINGS[1].y), 3.6, 0.8)}
        {travel(marketPath(CROSSINGS[1].y), 2.8, 2.2)}

        {ORIGINS.map((o) => (
          <g key={o.id}>
            <circle cx={OX} cy={o.y} r="6" className="fill-background stroke-foreground" strokeWidth="1.5" />
            <text x={OX} y={o.y - 22} textAnchor="middle" className="fill-foreground font-semibold" fontSize="17">
              {originLabel[o.id].split(' · ')[0]}
            </text>
            <text x={OX} y={o.y + 34} textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="13">
              {originLabel[o.id].split(' · ')[1]}
            </text>
          </g>
        ))}

        <g>
          <motion.circle cx={DESK.x} cy={DESK.y} r="9" className="fill-brand-600" style={{ scale: stage1, transformOrigin: `${DESK.x}px ${DESK.y}px` }} />
          <motion.circle cx={DESK.x} cy={DESK.y} r="18" className="stroke-brand-600/40" fill="none" strokeWidth="1.5" style={{ opacity: stage2 }} />
          <text x={DESK.x} y={DESK.y - 34} textAnchor="middle" className="fill-foreground font-semibold" fontSize="17">{nodes.desk}</text>
          <text x={DESK.x} y={DESK.y + 44} textAnchor="middle" className="fill-muted-foreground" fontSize="13">{h.corridorDesk}</text>
        </g>

        {CROSSINGS.map((c) => (
          <g key={c.id}>
            <circle cx={CX} cy={c.y} r="6" className="fill-background stroke-foreground" strokeWidth="1.5" />
            <text x={CX} y={c.y - 18} textAnchor="middle" className="fill-foreground font-medium" fontSize="15">{c.label}</text>
          </g>
        ))}

        <g>
          <motion.circle cx={MARKET.x} cy={MARKET.y} r="6" className="fill-foreground" style={{ scale: stage3, transformOrigin: `${MARKET.x}px ${MARKET.y}px` }} />
          <text x={MARKET.x} y={MARKET.y - 22} textAnchor="middle" className="fill-foreground font-semibold" fontSize="17">{nodes.mx}</text>
          <text x={MARKET.x} y={MARKET.y + 34} textAnchor="middle" className="fill-muted-foreground" fontSize="13">{h.corridorMarket}</text>
        </g>

        <text x={OX} y={400} textAnchor="middle" className="fill-muted-foreground" fontSize="13">{h.corridorOrigins}</text>
        <text x={CX} y={400} textAnchor="middle" className="fill-muted-foreground" fontSize="13">{h.corridorCrossings}</text>
      </svg>

      {/* Phones: the same facts as a vertical route. */}
      <ol className="relative md:hidden border-l border-foreground/25 pl-6">
        {[
          { title: h.corridorOrigins, items: [nodes.us, nodes.ca, nodes.br] },
          { title: h.corridorDesk, items: [nodes.desk], red: true },
          { title: h.corridorCrossings, items: CROSSINGS.map((c) => c.label) },
          { title: h.corridorMarket, items: [nodes.mx] },
        ].map((step) => (
          <li key={step.title} className="relative pb-8 last:pb-0">
            <span aria-hidden className={`absolute -left-[31px] top-1.5 h-[11px] w-[11px] rounded-full border ${step.red ? 'border-brand-600 bg-brand-600' : 'border-foreground bg-background'}`} />
            <p className="t-small text-muted-foreground">{step.title}</p>
            <ul className="mt-1 space-y-0.5">
              {step.items.map((it) => (
                <li key={it} className="font-medium text-foreground">{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
