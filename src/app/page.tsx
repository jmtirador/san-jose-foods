'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { PROTEINS } from '@/data/cuts'
import { CtaBand } from '@/components/CtaBand'
import { Corridor } from '@/components/Corridor'
import { MorphText } from '@/components/MorphText'
import { Reveal } from '@/components/Reveal'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { DUR, EASING, heroLine, rowReveal, useReducedMotionFlag, useStill } from '@/lib/motion'

function ProductPlate({
  href, image, alt, title, meta, cta, priority = false,
}: {
  href: string; image: string; alt: string; title: string; meta: string; cta: string; priority?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <Link href={href} className="group grade grade-plate relative block h-full min-h-[300px] overflow-hidden rounded-xl bg-surface-2">
      {/* The photo settles into its frame as the plate arrives (claim: this plate arrived). */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: DUR.hero * 1.4, ease: EASING.enter }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 lg:p-8">
        <div>
          <h3 className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] text-white lg:text-[2.25rem]">{title}</h3>
          <p className="t-code mt-3 text-white/75">{meta}</p>
        </div>
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden>
          <ArrowRight className="h-4 w-4" />
        </span>
        <span className="sr-only">{cta}</span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const { t } = useLanguage()
  const h = t.home
  const reduce = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const still = useReducedMotionFlag()
  const imageY = useStill(useTransform(scrollYProgress, [0, 1], ['0%', '16%']), still, '0%')

  const line = (delay: number) => heroLine(reduce, delay)

  const plates = PROTEINS.map((pr, i) => ({
    id: pr.id,
    image: pr.image,
    title: h[pr.id],
    alt: h[`${pr.id}Desc`],
    meta: `${t.products[pr.id].cuts.length} ${t.common.cuts} · ${pr.hs}`,
    cls: i === 0 ? 'md:col-span-2 md:row-span-2' : '',
  }))

  return (
    <>
      {/* HERO: giant statement, bottom-left over a full-bleed graded image. */}
      <section ref={heroRef} className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink lg:min-h-[100svh]">
        <motion.div style={{ y: imageY }} className="grade grade-hero absolute inset-x-0 top-0 h-[118%]">
          <motion.div
            initial={reduce ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: DUR.hero * 2, ease: EASING.enter }}
            className="absolute inset-0"
          >
            <Image src="/img/beef-hero.jpg" alt={h.heroImageAlt} fill priority quality={72} sizes="100vw" className="object-cover object-center" />
          </motion.div>
        </motion.div>

        <div className="wrap relative z-10 pb-16 pt-44 lg:pb-24">
          <h1 className="reveal t-display max-w-[20ch] text-white">
            <MorphText as="span" className="block" stagger delay={0.1}>{h.heroTitleA}</MorphText>
            <MorphText as="span" className="block" stagger delay={0.34}>{h.heroTitleB}</MorphText>
          </h1>
          <motion.p className="reveal t-lead mt-8 max-w-[40ch] text-white/85" {...line(0.62)}>
            {h.heroSub}
          </motion.p>
          <motion.div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" {...line(0.76)}>
            <a href={waLink(t.common.waMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.common.whatsapp}
              <span className="btn-disc"><WhatsAppGlyph className="h-3.5 w-3.5" /></span>
            </a>
            <Link href="/products" className="link-arrow text-white hover:text-white/80">
              {h.heroSubCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THE CORRIDOR: the one drawn diagram on the site. */}
      <section className="py-24 lg:py-32">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="t-h2 text-foreground">
              <MorphText>{h.corridorTitle}</MorphText>
            </h2>
            <p className="t-body mt-6 max-w-[58ch] text-muted-foreground">{h.corridorBody}</p>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <Corridor />
          </div>
        </div>
      </section>

      {/* WHAT WE SUPPLY: asymmetric plates, beef leads. */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="t-h2 text-foreground">
              <MorphText>{h.productsTitle}</MorphText>
            </h2>
            <p className="t-body mt-6 max-w-[58ch] text-muted-foreground">{h.productsSub}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[300px]">
            {plates.map((pl, i) => (
              <Reveal key={pl.id} delay={i * 0.08} className={pl.cls} amount={0.15}>
                <ProductPlate
                  href={`/products#${pl.id}`}
                  image={pl.image}
                  alt={pl.alt}
                  title={pl.title}
                  meta={pl.meta}
                  cta={h.viewCuts}
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/products" className="link-arrow">
              {h.viewProducts}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* HOW THE DESK WORKS: three numerals on one rule, no cards. */}
      <section className="border-y border-border bg-surface-1 py-24 lg:py-32">
        <div className="wrap">
          <Reveal>
            <h2 className="t-h2 text-foreground">
              <MorphText>{h.stepsTitle}</MorphText>
            </h2>
          </Reveal>
          <ol className="relative mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {/* The rule draws left to right as the steps lay out (claim: three steps, in order). */}
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-[5.25rem] hidden h-px origin-left bg-border md:block"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: DUR.hero, ease: EASING.enter }}
            />
            {h.steps.map((s, i) => (
              <motion.li key={s.title} className="relative" {...rowReveal(reduce, i * 3)}>
                <span aria-hidden className="block bg-surface-1 pr-4 text-[4.5rem] font-semibold leading-none tracking-[-0.04em] text-foreground/20 tnum md:inline-block md:text-[5rem]">
                  0{i + 1}
                </span>
                <h3 className="t-h3 mt-6 text-foreground">{s.title}</h3>
                <p className="t-body mt-3 max-w-[34ch] text-muted-foreground">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* COMMON QUESTIONS: sticky heading, ruled list. */}
      <section className="py-24 lg:py-32">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.7fr] lg:gap-24">
          <Reveal>
            <h2 className="t-h2 text-foreground lg:sticky lg:top-28">
              <MorphText>{h.faqTitle}</MorphText>
            </h2>
          </Reveal>
          <div className="divide-y divide-border border-t border-border">
            {h.faq.map((f, i) => (
              <motion.div key={f.q} className="reveal grid gap-3 py-8 md:grid-cols-[1fr_1.25fr] md:gap-10" {...rowReveal(reduce, i, 0.4)}>
                <h3 className="t-h3 text-foreground">{f.q}</h3>
                <p className="t-body text-muted-foreground">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
