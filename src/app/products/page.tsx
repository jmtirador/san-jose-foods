'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { SPRING } from '@/lib/motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROTEINS, cutsFor } from '@/data/cuts'
import { AtlasSection, type AtlasLabels, type Selected } from '@/components/AtlasSection'
import { ManifestDock } from '@/components/ManifestDock'
import { CtaBand } from '@/components/CtaBand'
import { Masthead } from '@/components/Masthead'

// Cap the outgoing message so a buyer ticking most of the catalog can't build
// a wa.me link long enough to get silently truncated by a mobile OS or WhatsApp.
const MAX_MANIFEST_LINES = 24

export default function ProductsPage() {
  const { t, language } = useLanguage()
  const p = t.products

  // Selection keys are `${protein}:${index}`, never the translated name, so a
  // ticked row survives an EN/ES toggle.
  const [selected, setSelected] = useState<Selected>({})
  const onToggle = (key: string) => setSelected((prev) => ({ ...prev, [key]: !prev[key] }))

  // Which protein section is in view, for the jump bar's "you are here" tick.
  const [activeSection, setActiveSection] = useState<string>('beef')
  useEffect(() => {
    const sections = PROTEINS.map((pr) => document.getElementById(pr.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5] },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const picked = Object.keys(selected).filter((k) => selected[k])
  const count = picked.length

  const manifestMessage = () => {
    const sorted = [...picked].sort((a, b) => {
      const [proteinA, idxA] = a.split(':')
      const [proteinB, idxB] = b.split(':')
      return proteinA !== proteinB ? proteinA.localeCompare(proteinB) : Number(idxA) - Number(idxB)
    })
    const capped = sorted.slice(0, MAX_MANIFEST_LINES)
    const overflow = sorted.length - capped.length

    // Each line carries the cut name as printed on the page plus its IMPS
    // number, so the desk and the buyer share one reference.
    const lines = capped.map((k) => {
      const [proteinId, idxStr] = k.split(':')
      const protein = proteinId as 'beef' | 'pork' | 'chicken'
      const idx = Number(idxStr)
      const cutName = p[protein].cuts[idx]
      const spec = cutsFor(protein).find((s) => s.index === idx)
      const imps = spec?.imps ? ` (${p.imps} ${spec.imps})` : ''
      return `${p[protein].title} · ${cutName}${imps} · ${p.manifestVolume}`
    })
    if (overflow > 0) lines.push(p.manifestMore.replace('{n}', String(overflow)))
    return [p.manifestIntro, ...lines, p.manifestDelivery].join('\n')
  }

  const labels: AtlasLabels = {
    formats: p.formats,
    quote: p.quote,
    add: p.add,
    remove: p.remove,
    imps: p.imps,
    waPrefix: p.waCutPrefix,
    waVolume: p.waVolume,
    cutsWord: t.common.cuts,
    hsWord: 'HS',
    formatWord: language === 'es' ? 'Formato' : 'Format',
  }

  return (
    <>
      <Masthead title={p.pageTitle} sub={p.pageSub}>
        <p className="t-small mt-4 text-muted-foreground">{p.pricingNote}</p>
      </Masthead>

      {/* Section jump bar. Sticks under the header. */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/80 backdrop-blur-xl">
        <nav className="wrap flex h-14 items-center gap-2 overflow-x-auto" aria-label="Catalog sections">
          {PROTEINS.map((pr) => {
            const active = activeSection === pr.id
            return (
              <a
                key={pr.id}
                href={`#${pr.id}`}
                aria-current={active ? 'location' : undefined}
                className={`relative inline-flex h-11 shrink-0 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors ${
                  active ? 'border-foreground/30 bg-foreground/[0.06] text-foreground' : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                }`}
              >
                {p[pr.id].title}
                <span className={`t-code ${active ? 'text-foreground/70' : 'text-muted-foreground/70'}`}>{p[pr.id].cuts.length}</span>
                {active && <motion.span layoutId="jump-tick" transition={SPRING.tick} aria-hidden className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-primary" />}
              </a>
            )
          })}
        </nav>
      </div>

      {PROTEINS.map((pr, i) => (
        <AtlasSection
          key={pr.id}
          proteinId={pr.id}
          hs={pr.hs}
          image={pr.image}
          primals={pr.primals}
          title={p[pr.id].title}
          desc={p[pr.id].desc}
          cuts={p[pr.id].cuts}
          specs={cutsFor(pr.id)}
          primalLabels={p.primals}
          selected={selected}
          onToggle={onToggle}
          labels={labels}
          language={language}
          priority={i === 0}
        />
      ))}

      {/* Extra room under the band while the dock is up, so it never covers the band's buttons. */}
      <div className={count > 0 ? 'pb-24' : ''}>
        <CtaBand />
      </div>

      <ManifestDock
        count={count}
        message={manifestMessage()}
        onClear={() => setSelected({})}
        language={language}
        labels={{ line: p.manifestLine, lines: p.manifestLines, send: p.manifestSend, clear: p.manifestClear }}
      />
    </>
  )
}
