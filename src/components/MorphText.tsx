'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { TextMorph } from 'torph/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { DUR, EASING, STAGGER } from '@/lib/motion'

// A heading that morphs between its English and Spanish text when the
// language flips (claim: the language changed). torph pins each element to
// one line, so the text is split per word: words wrap like normal text and
// each word morphs on its own. When the two languages differ in word count the
// block crossfades instead. With `stagger`, the words also rise in one by one
// on mount (claim: the headline is being set). torph keeps the full string for
// screen readers and goes static under prefers-reduced-motion on its own.
export function MorphText({
  children, as: Tag = 'span', className = '', stagger = false, delay = 0,
}: {
  children: string; as?: React.ElementType; className?: string; stagger?: boolean; delay?: number
}) {
  const { language } = useLanguage()
  const reduce = useReducedMotion()
  const words = children.split(' ')

  const wordEntrance = (i: number) =>
    stagger && !reduce
      ? {
          initial: { opacity: 0, y: '0.5em', filter: 'blur(6px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: DUR.hero, delay: delay + i * STAGGER.word, ease: EASING.enter },
        }
      : {}

  return (
    <Tag className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words.length}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: DUR.base, ease: EASING.exit }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <motion.span className="inline-block" {...wordEntrance(i)}>
                <TextMorph
                  as="span"
                  className="inline-block align-baseline"
                  locale={language}
                  duration={DUR.settle * 1000 + 140}
                  ease="cubic-bezier(0.19, 1, 0.22, 1)"
                >
                  {word}
                </TextMorph>
              </motion.span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </Tag>
  )
}
