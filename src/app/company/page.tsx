'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { rowReveal, useReducedMotionFlag, useStill } from '@/lib/motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { CtaBand } from '@/components/CtaBand'
import { Masthead } from '@/components/Masthead'
import { MorphText } from '@/components/MorphText'
import { Reveal } from '@/components/Reveal'

export default function CompanyPage() {
  const { t } = useLanguage()
  const a = t.about
  const w = t.why
  const co = t.company
  const reduce = useReducedMotion()

  // The band drifts slower than the page (claim: it sits behind the content).
  const bandRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'end start'] })
  const still = useReducedMotionFlag()
  const bandY = useStill(useTransform(scrollYProgress, [0, 1], ['-12%', '12%']), still, '0%')

  const mandate = [
    { title: a.value1Title, body: a.value1Desc },
    { title: a.value2Title, body: a.value2Desc },
  ]
  const capabilities = [
    { title: w.diff1Title, p1: w.diff1P1, p2: w.diff1P2 },
    { title: w.diff2Title, p1: w.diff2P1, p2: w.diff2P2 },
    { title: w.diff3Title, p1: w.diff3P1, p2: w.diff3P2 },
  ]
  const reference = [
    { title: w.usdaTitle, sub: w.usdaSub, points: w.usdaPoints },
    { title: w.coldTitle, sub: w.coldSub, points: w.coldPoints },
  ]

  return (
    <>
      <Masthead title={a.pageTitle} sub={a.pageSub} titleClassName="max-w-[16ch]" className="lg:pb-24" />

      {/* Who we are, offset against the at-a-glance list. */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="wrap grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveal className="lg:pt-12">
            <h2 className="t-h2 text-foreground">
              <MorphText>{a.storyTitle}</MorphText>
            </h2>
            <p className="t-body mt-8 max-w-[60ch] text-muted-foreground">{a.storyP1}</p>
            <p className="t-body mt-5 max-w-[60ch] text-muted-foreground">{a.storyP2}</p>
            <p className="t-lead mt-10 max-w-[38ch] text-foreground">{a.storyP3}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-small mb-3 text-muted-foreground">{co.opsTitle}</p>
            <dl className="divide-y divide-border border-y border-border">
              {co.ops.map((row, i) => (
                <motion.div key={row.k} className="kv py-5" {...rowReveal(reduce, i)}>
                  <dt>{row.k}</dt>
                  <dd className="text-[1.125rem]">{row.v}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed product band. Product macro, not a facility: nothing here
          implies a photo of SJF's own operation. */}
      <div ref={bandRef} className="grade grade-band relative h-[48vh] min-h-[320px]">
        <motion.div className="absolute inset-x-0 -top-[12%] -bottom-[12%]" style={{ y: bandY }}>
          <Image src="/img/pork.jpg" alt={co.bandAlt} fill sizes="100vw" className="object-cover object-center" />
        </motion.div>
      </div>

      {/* Mandate: two statements. */}
      <section className="py-24 lg:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="t-h2 text-foreground">
              <MorphText>{co.s2}</MorphText>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
            {mandate.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <p className="t-small text-muted-foreground">{m.title}</p>
                <p className="t-lead mt-4 text-foreground">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities: numbered rows on a lifted surface. */}
      <section className="border-y border-border bg-surface-1 py-24 lg:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="t-h2 text-foreground">
              <MorphText>{co.s3}</MorphText>
            </h2>
          </Reveal>
          <ol className="mt-14 divide-y divide-border border-t border-border">
            {capabilities.map((c, i) => (
              <li key={c.title}>
                <Reveal className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[6rem_1fr_1.2fr] lg:gap-12 lg:py-14" amount={0.3}>
                  <span aria-hidden className="text-[3.5rem] font-semibold leading-none tracking-[-0.04em] text-foreground/20 tnum lg:text-[4rem]">0{i + 1}</span>
                  <h3 className="t-h3 text-foreground">{c.title}</h3>
                  <div>
                    <p className="t-body text-muted-foreground">{c.p1}</p>
                    <p className="t-body mt-4 text-muted-foreground">{c.p2}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reference: two lists. */}
      <section className="py-24 lg:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="t-h2 text-foreground">
              <MorphText>{co.s4}</MorphText>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            {reference.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <h3 className="t-h3 text-foreground">{r.title}</h3>
                <p className="t-body mt-3 max-w-[48ch] text-muted-foreground">{r.sub}</p>
                <ol className="mt-8 divide-y divide-border border-y border-border">
                  {r.points.map((pt, j) => (
                    <motion.li key={pt} className="flex items-baseline gap-5 py-4" {...rowReveal(reduce, j)}>
                      <span className="t-code w-6 shrink-0 text-muted-foreground">{String(j + 1).padStart(2, '0')}</span>
                      <span className="t-body text-foreground">{pt}</span>
                    </motion.li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
