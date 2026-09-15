'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { TextMorph } from 'torph/react'
import { waLink } from '@/lib/whatsapp'
import { DUR, SPRING } from '@/lib/motion'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'

// The order composer. One consistent dark panel in both themes (literal ink
// and paper tokens, never the theme pair), so it reads as the same object
// whether the page is light or dark.
export function ManifestDock({
  count, message, onClear, language, labels,
}: {
  count: number; message: string; onClear: () => void; language: 'en' | 'es'
  labels: { line: string; lines: string; send: string; clear: string }
}) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={reduce ? false : { y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { y: 96, opacity: 0 }}
          transition={reduce ? { duration: 0 } : SPRING.dock}
          role="region"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex items-center justify-between gap-3 rounded-xl bg-ink px-3 py-3 text-paper shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/10 sm:gap-6 sm:pl-6">
            <span className="flex items-baseline gap-2 whitespace-nowrap">
              <TextMorph as="span" className="text-[18px] font-semibold tnum" locale={language} duration={DUR.settle * 1000}>
                {String(count)}
              </TextMorph>
              <span className="t-small text-paper/70">{count === 1 ? labels.line : labels.lines}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClear}
                className="h-11 rounded-md px-3 text-sm font-medium text-paper/70 transition-colors hover:bg-white/10 hover:text-paper active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
              >
                {labels.clear}
              </button>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn h-11 bg-paper px-4 text-sm text-ink hover:bg-white active:bg-brand-50 focus-visible:ring-paper focus-visible:ring-offset-ink"
              >
                <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
                {labels.send}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
