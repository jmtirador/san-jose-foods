'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { SPRING, rowReveal } from '@/lib/motion'
import { waLink } from '@/lib/whatsapp'
import type { CutSpec, PrimalId, Protein } from '@/data/cuts'
import { MorphText } from '@/components/MorphText'
import { Reveal } from '@/components/Reveal'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'

export type Selected = Record<string, boolean>

export interface AtlasLabels {
  formats: string
  quote: string
  add: string
  remove: string
  imps: string
  waPrefix: string
  waVolume: string
  cutsWord: string
  hsWord: string
  formatWord: string
}

function CutRow({
  proteinId, title, name, spec, active, onToggle, labels, showMx, order,
}: {
  proteinId: Protein; title: string; name: string; spec: CutSpec
  active: boolean; onToggle: (key: string) => void; labels: AtlasLabels; showMx: boolean; order: number
}) {
  const key = `${proteinId}:${spec.index}`
  const reduce = useReducedMotion()
  return (
    <motion.li {...rowReveal(reduce, order)}>
      <div className={`group flex items-center gap-2 rounded-md transition-colors ${active ? 'bg-primary/10' : 'hover:bg-foreground/[0.04]'}`}>
        <button
          type="button"
          onClick={() => onToggle(key)}
          aria-pressed={active}
          aria-label={`${active ? labels.remove : labels.add}: ${name}`}
          className="flex min-h-[56px] flex-1 items-center gap-4 rounded-md px-3 py-3 text-left transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span
            aria-hidden
            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border transition-colors ${
              active ? 'border-primary bg-primary text-white' : 'border-foreground/30 text-transparent group-hover:border-foreground/60'
            }`}
          >
            {/* The check springs in (claim: this cut joined the request). */}
            <motion.span className="inline-flex" animate={{ scale: active ? 1 : 0.4, opacity: active ? 1 : 0 }} transition={reduce ? { duration: 0 } : SPRING.check}>
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-medium leading-snug text-foreground">{name}</span>
            {showMx && spec.mx && <span className="t-small block text-muted-foreground">{spec.mx}</span>}
            {spec.imps && (
              <span className="t-code mt-0.5 block text-muted-foreground sm:hidden">
                {labels.imps} {spec.imps}
              </span>
            )}
          </span>
          {spec.imps && (
            <span className="t-code hidden shrink-0 text-muted-foreground sm:block">
              {labels.imps} {spec.imps}
            </span>
          )}
        </button>
        <a
          href={waLink(`${labels.waPrefix} ${title}: ${name}${spec.imps ? ` (${labels.imps} ${spec.imps})` : ''}. ${labels.waVolume}`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels.quote}: ${name}`}
          title={labels.quote}
          className="mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground/55 transition-colors hover:bg-foreground/5 hover:text-[#25D366] active:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <WhatsAppGlyph className="h-4 w-4" />
        </a>
      </div>
    </motion.li>
  )
}

export function AtlasSection({
  proteinId, hs, image, primals, title, desc, cuts, specs, primalLabels, selected, onToggle, labels, language, priority = false,
}: {
  proteinId: Protein; hs: string; image: string; primals: PrimalId[]
  title: string; desc: string; cuts: readonly string[]; specs: CutSpec[]
  primalLabels: Record<PrimalId, string>
  selected: Selected; onToggle: (key: string) => void
  labels: AtlasLabels; language: 'en' | 'es'; priority?: boolean
}) {
  return (
    <section id={proteinId} className="scroll-mt-32 border-t border-border py-20 lg:py-28">
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.72fr_1.7fr] lg:gap-16">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Reveal>
            <div className="grade grade-plate relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-2">
              <Image src={image} alt={desc} fill priority={priority} sizes="(max-width: 1024px) 100vw, 36vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 lg:p-8">
                <h2 className="t-h2 text-white">
                  <MorphText>{title}</MorphText>
                </h2>
                <span className="t-code shrink-0 text-white/80">{cuts.length} {labels.cutsWord}</span>
              </div>
            </div>
            <p className="t-body mt-6 text-muted-foreground">{desc}</p>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              <div className="kv"><dt>{labels.hsWord}</dt><dd className="t-code">{hs}</dd></div>
              <div className="kv"><dt>{labels.formatWord}</dt><dd>{labels.formats}</dd></div>
            </dl>
          </Reveal>
        </div>

        {/* Primal groups flow into two independent columns on desktop, so a
            wrapped name in one group never inflates a row in another. */}
        <div className="lg:columns-2 lg:gap-10">
          {primals.map((primal) => {
            const rows = specs.filter((s) => s.primal === primal)
            if (rows.length === 0) return null
            return (
              <Reveal key={primal} className="mb-10 break-inside-avoid" amount={0.1} blur={false}>
                <h3 className="t-small mb-2 px-3 text-muted-foreground">{primalLabels[primal]}</h3>
                <ul className="divide-y divide-border border-y border-border">
                  {rows.map((spec, order) => {
                    const name = cuts[spec.index]
                    // Show the market name only when it adds a word the current
                    // name doesn't already carry.
                    const showMx = !!spec.mx && !name.toLowerCase().includes(spec.mx.toLowerCase())
                    return (
                      <CutRow
                        key={spec.index}
                        proteinId={proteinId}
                        title={title}
                        name={name}
                        spec={spec}
                        active={!!selected[`${proteinId}:${spec.index}`]}
                        onToggle={onToggle}
                        labels={labels}
                        showMx={showMx || language === 'en'}
                        order={order}
                      />
                    )
                  })}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
