'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { rowReveal } from '@/lib/motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { Masthead } from '@/components/Masthead'
import { Reveal } from '@/components/Reveal'

const inputClass =
  'w-full h-12 rounded-md border border-border bg-surface-1 px-4 text-[15px] text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/30'
const labelClass = 'block t-small font-medium text-foreground mb-2'
const errorClass = 'mt-2 t-small text-destructive'

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact
  const reduce = useReducedMotion()

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', interest: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => { const next = { ...prev }; delete next[name]; return next })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate in JS so the messages honor the site's EN/ES toggle. Native
    // validation bubbles follow the browser's locale, not the language switch.
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = c.errRequired
    if (!form.email.trim()) next.email = c.errRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = c.errEmail
    if (!form.message.trim()) next.message = c.errRequired
    if (Object.keys(next).length) {
      setErrors(next)
      const first = (['name', 'email', 'message'] as const).find((f) => next[f])
      if (first) document.getElementById(first)?.focus()
      return
    }
    setErrors({})

    const msgLines = [
      c.waIntro, '',
      `${c.name}: ${form.name}`,
      form.company && `${c.company}: ${form.company}`,
      `${c.email}: ${form.email}`,
      form.phone && `${c.phone}: ${form.phone}`,
      form.interest && `${c.interest}: ${form.interest}`,
      `${c.message}: ${form.message}`,
    ].filter(Boolean)
    window.open(waLink(msgLines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  const lines: { label: string; value: string; href?: string }[] = [
    { label: t.common.tel, value: '+52 81 8016 3885', href: 'tel:+528180163885' },
    { label: t.common.email, value: 'ventas1@sanjosefoods.net', href: 'mailto:ventas1@sanjosefoods.net' },
    { label: t.common.hq, value: '1020 E. Produce Rd., Hidalgo, TX 78557' },
  ]

  return (
    <>
      <Masthead title={c.pageTitle} sub={c.pageSub}>
        {/* Phones: the fast path sits above the form, not below it. */}
        <a href={waLink(c.waIntro)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 lg:hidden">
          <WhatsAppGlyph className="h-4 w-4" />
          {t.common.whatsapp}
        </a>
      </Masthead>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="wrap grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <Reveal>
            <h2 className="t-h3 text-foreground">{c.formTitle}</h2>
            <p className="t-body mt-2 text-muted-foreground">{c.formNote}</p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2" {...rowReveal(reduce, 0)}>
                <div>
                  <label htmlFor="name" className={labelClass}>{c.name}<span className="text-destructive"> *</span></label>
                  <input id="name" name="name" type="text" autoComplete="name" required placeholder={c.namePh} value={form.name} onChange={handleChange} className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name && <p id="name-error" role="alert" className={errorClass}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>{c.company}</label>
                  <input id="company" name="company" type="text" autoComplete="organization" placeholder={c.companyPh} value={form.company} onChange={handleChange} className={inputClass} />
                </div>
              </motion.div>
              <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2" {...rowReveal(reduce, 2)}>
                <div>
                  <label htmlFor="email" className={labelClass}>{c.email}<span className="text-destructive"> *</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder={c.emailPh} value={form.email} onChange={handleChange} className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email && <p id="email-error" role="alert" className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>{c.phone}</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={c.phonePh} value={form.phone} onChange={handleChange} className={inputClass} />
                </div>
              </motion.div>
              <motion.div {...rowReveal(reduce, 4)}>
                <label htmlFor="interest" className={labelClass}>{c.interest}</label>
                <div className="relative">
                  <select id="interest" name="interest" value={form.interest} onChange={handleChange} className={`${inputClass} appearance-none pr-10`}>
                    <option value="">{c.interestPh}</option>
                    {c.interestOpts.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                </div>
              </motion.div>
              <motion.div {...rowReveal(reduce, 6)}>
                <label htmlFor="message" className={labelClass}>{c.message}<span className="text-destructive"> *</span></label>
                <textarea id="message" name="message" rows={5} required placeholder={c.messagePh} value={form.message} onChange={handleChange} className={`${inputClass} h-auto min-h-[150px] resize-y py-3`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
                {errors.message && <p id="message-error" role="alert" className={errorClass}>{errors.message}</p>}
              </motion.div>
              <motion.button type="submit" className="btn-primary w-full" {...rowReveal(reduce, 8)}>
                {c.submit}
                <span className="btn-disc"><WhatsAppGlyph className="h-3.5 w-3.5" /></span>
              </motion.button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h3 className="t-small mb-3 font-normal text-muted-foreground">{c.infoTitle}</h3>
              <dl className="divide-y divide-border border-y border-border">
                {lines.map((l) => (
                  <div key={l.label} className="kv py-4">
                    <dt>{l.label}</dt>
                    <dd className="t-code text-left sm:text-right max-w-[72%]">
                      {l.href ? (
                        <a href={l.href} className="text-foreground transition-colors hover:text-accent-text">{l.value}</a>
                      ) : (
                        l.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Desktop only: phones get the same action above the form. */}
            <a href={waLink(c.waIntro)} target="_blank" rel="noopener noreferrer" className="btn-primary hidden w-full lg:inline-flex">
              <WhatsAppGlyph className="h-4 w-4" />
              {t.common.whatsapp}
            </a>

            <div>
              <h3 className="t-small mb-2 font-normal text-muted-foreground">{c.serviceTitle}</h3>
              <p className="t-body text-foreground">{c.serviceDesc}</p>
            </div>

            <div>
              <h3 className="t-small mb-2 font-normal text-muted-foreground">{c.hoursTitle}</h3>
              {c.hours.split('\n').map((line) => (
                <p key={line} className="t-body text-foreground">{line}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
