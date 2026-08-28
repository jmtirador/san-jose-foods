'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'

// What the user types is the filled-in half of the form: it renders in the DATA
// voice (mono), while the printed labels stay in the form-label voice.
const inputClass =
  'w-full bg-background border border-border rounded-sm px-4 py-3 font-mono text-[14px] text-foreground placeholder:text-muted-foreground/60 placeholder:font-sans placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-brand-600 focus:border-brand-600 transition-colors aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-destructive'

const labelClass = 'form-label block mb-2'

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

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

    const lines = [
      c.waIntro, '',
      `${c.name}: ${form.name}`,
      form.company && `${c.company}: ${form.company}`,
      `${c.email}: ${form.email}`,
      form.phone && `${c.phone}: ${form.phone}`,
      form.interest && `${c.interest}: ${form.interest}`,
      `${c.message}: ${form.message}`,
    ].filter(Boolean)
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  const dlines: { label: string; value: string; href?: string }[] = [
    { label: c.usOffice, value: '+52 81 8016 3885', href: 'tel:+528180163885' },
    { label: c.mxLine, value: 'ventas1@sanjosefoods.net', href: 'mailto:ventas1@sanjosefoods.net' },
    { label: c.emailLabel, value: '1020 E. Produce Rd., Hidalgo, TX 78557' },
  ]

  return (
    <>
      {/* Header */}
      <section className="bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-12"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="font-display font-semibold tracking-[-0.02em] text-foreground" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
              {c.pageTitle}
            </h1>
            <span className="doc-stamp hidden sm:block mt-3 shrink-0">SJF-RFQ · REV 2026.08</span>
          </div>
          <p className="font-serif text-muted-foreground text-lg max-w-2xl leading-relaxed">{c.pageSub}</p>
          {/* On mobile the rail (and its quick chat button) renders below the whole
              form — give the WhatsApp-first buyer the fast path before the form. */}
          <a
            href={waLink(c.waIntro)}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline-brand font-sans text-sm mt-7 lg:hidden"
          >
            <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
            {c.waBtn}
          </a>
        </motion.div>
      </section>

      <section className="border-t border-rule bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form — earns its container */}
            <div className="lg:col-span-3 relative border border-border bg-card p-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="doc-index">RFQ</span>
                <h2 className="font-display font-medium tracking-[-0.015em] text-card-foreground text-xl">{c.formTitle}</h2>
              </div>
              <p className="font-serif text-muted-foreground text-[15px] leading-relaxed mb-7">{c.formNote}</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>{c.name}<span className="text-muted-foreground"> *</span></label>
                    <input id="name" name="name" type="text" required placeholder={c.namePh} value={form.name} onChange={handleChange} className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p id="name-error" role="alert" className="mt-1.5 font-serif text-[13px] text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>{c.company}</label>
                    <input id="company" name="company" type="text" placeholder={c.companyPh} value={form.company} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className={labelClass}>{c.email}<span className="text-muted-foreground"> *</span></label>
                    <input id="email" name="email" type="email" required placeholder={c.emailPh} value={form.email} onChange={handleChange} className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                    {errors.email && <p id="email-error" role="alert" className="mt-1.5 font-serif text-[13px] text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>{c.phone}</label>
                    <input id="phone" name="phone" type="tel" placeholder={c.phonePh} value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="interest" className={labelClass}>{c.interest}</label>
                  <div className="relative">
                    <select id="interest" name="interest" value={form.interest} onChange={handleChange} className={`${inputClass} appearance-none pr-10`}>
                      <option value="">{c.interestPh}</option>
                      {c.interestOpts.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M2.5 4.5 6 8l3.5-3.5" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>{c.message}<span className="text-muted-foreground"> *</span></label>
                  <textarea id="message" name="message" rows={5} required placeholder={c.messagePh} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
                  {errors.message && <p id="message-error" role="alert" className="mt-1.5 font-serif text-[13px] text-destructive">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full justify-center font-sans">
                  {c.submit}
                  <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
                </button>
              </form>
            </div>

            {/* Ledger rail — ruled sections, no rounded cards. Sticky so the short
                rail tracks the taller form instead of trailing into dead space. */}
            <div className="lg:col-span-2 space-y-10 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-background">
                <div className="form-label pb-3 border-b border-border">{c.infoTitle}</div>
                {dlines.map((l) => (
                  <div key={l.label} className="spec-row">
                    <span className="form-label shrink-0">{l.label}</span>
                    <span className="lead-dots" />
                    {l.href ? (
                      <a href={l.href} className="group/link val font-mono text-[12px] text-foreground hover:text-brand-600 transition-colors inline-flex items-baseline gap-1.5">
                        {l.value}
                        <span aria-hidden className="text-muted-foreground group-hover/link:text-brand-600 transition-colors">↗</span>
                      </a>
                    ) : (
                      <span className="val font-mono text-[12px] text-right">{l.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <a
                href={waLink(c.waIntro)}
                target="_blank" rel="noopener noreferrer"
                className="btn-outline-brand font-sans text-sm w-full justify-center"
              >
                <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
                {c.waBtn}
              </a>

              <div className="border-t border-border pt-5">
                <div className="form-label mb-2">{c.serviceTitle}</div>
                <p className="font-serif text-muted-foreground text-[15px] leading-relaxed">{c.serviceDesc}</p>
              </div>

              <div className="border-t border-border pt-5">
                <div className="form-label mb-2">{c.hoursTitle}</div>
                {c.hours.split('\n').map((line) => (
                  <p key={line} className="font-serif text-muted-foreground text-[15px] leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
