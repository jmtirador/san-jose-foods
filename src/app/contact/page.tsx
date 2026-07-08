'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { waLink } from '@/lib/whatsapp'
import { WhatsAppGlyph } from '@/components/WhatsAppGlyph'
import { CropMarks } from '@/components/CropMarks'

const inputClass =
  'w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-brand-600 focus:border-brand-600 transition-colors [&:user-invalid]:border-destructive [&:user-invalid]:ring-1 [&:user-invalid]:ring-destructive'

const labelClass = 'block font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mb-2'

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', interest: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
      <section className="doc-grid bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-12"
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <div className="w-10 h-px bg-brand-600 mb-4" />
              <span className="eyebrow text-muted-foreground">{c.eyebrow}</span>
            </div>
            <span className="doc-stamp hidden sm:block mt-1">SJF-RFQ · REV 2026.07</span>
          </div>
          <h1 className="font-display font-medium tracking-[-0.04em] text-foreground mb-5" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
            {c.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed">{c.pageSub}</p>
        </motion.div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form — earns its container */}
            <div className="lg:col-span-3 relative border border-border bg-card p-8">
              <CropMarks />
              <div className="flex items-baseline gap-3 mb-2">
                <span className="doc-index">RFQ</span>
                <h2 className="font-display font-medium tracking-[-0.015em] text-card-foreground text-xl">{c.formTitle}</h2>
              </div>
              <p className="font-sans text-muted-foreground text-sm mb-7">{c.formNote}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>{c.name}<span className="text-primary"> *</span></label>
                    <input id="name" name="name" type="text" required placeholder={c.namePh} value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>{c.company}</label>
                    <input id="company" name="company" type="text" placeholder={c.companyPh} value={form.company} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className={labelClass}>{c.email}<span className="text-primary"> *</span></label>
                    <input id="email" name="email" type="email" required placeholder={c.emailPh} value={form.email} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>{c.phone}</label>
                    <input id="phone" name="phone" type="tel" placeholder={c.phonePh} value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="interest" className={labelClass}>{c.interest}</label>
                  <select id="interest" name="interest" value={form.interest} onChange={handleChange} className={inputClass}>
                    <option value="">{c.interestPh}</option>
                    {c.interestOpts.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>{c.message}<span className="text-primary"> *</span></label>
                  <textarea id="message" name="message" rows={5} required placeholder={c.messagePh} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" className="btn-primary w-full justify-center font-sans">
                  {c.submit}
                  <WhatsAppGlyph className="w-4 h-4 text-[#25D366]" />
                </button>
              </form>
            </div>

            {/* Ledger rail — ruled sections, no rounded cards */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground pb-3 border-b border-border">{c.infoTitle}</div>
                {dlines.map((l) => (
                  <div key={l.label} className="spec-row">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shrink-0">{l.label}</span>
                    <span className="lead-dots" />
                    {l.href ? (
                      <a href={l.href} className="val font-mono text-[12px] text-foreground hover:text-brand-600 transition-colors">{l.value}</a>
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
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-600 mb-2">{c.serviceTitle}</div>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{c.serviceDesc}</p>
              </div>

              <div className="border-t border-border pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{c.hoursTitle}</div>
                {c.hours.split('\n').map((line) => (
                  <p key={line} className="font-sans text-muted-foreground text-sm">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
