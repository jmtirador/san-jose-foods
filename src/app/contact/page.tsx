'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const inputClass =
  'w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-brand-600 focus:border-brand-600 transition'

function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-brand-600/10 text-brand-600">
        {icon}
      </div>
      <div>
        <div className="font-sans text-muted-foreground text-[10px] uppercase tracking-widest mb-0.5">{label}</div>
        {href ? (
          <a href={href} className="font-sans text-foreground hover:text-brand-600 transition-colors text-sm font-medium">
            {value}
          </a>
        ) : (
          <span className="font-sans text-foreground text-sm font-medium">{value}</span>
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', interest: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-brand-600" />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Let&apos;s talk
            </span>
          </div>
          <h1
            className="font-display font-medium tracking-[-0.04em] text-foreground mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {c.pageTitle}
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed">{c.pageSub}</p>
        </motion.div>
      </section>

      {/* Main */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form — 3 cols */}
            <div className="lg:col-span-3 rounded-xl p-8 bg-card border border-border">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-5 h-px bg-brand-600" />
                <h2 className="font-display font-medium tracking-[-0.015em] text-card-foreground text-xl">{c.formTitle}</h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-brand-600/15 text-brand-600">
                    <Check className="w-7 h-7" strokeWidth={2} />
                  </div>
                  <p className="font-sans text-foreground font-medium text-lg">{c.submitted}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{c.name}</label>
                      <input
                        name="name" type="text" required
                        placeholder={c.namePh} value={form.name} onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{c.company}</label>
                      <input
                        name="company" type="text"
                        placeholder={c.companyPh} value={form.company} onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{c.email}</label>
                      <input
                        name="email" type="email" required
                        placeholder={c.emailPh} value={form.email} onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{c.phone}</label>
                      <input
                        name="phone" type="tel"
                        placeholder={c.phonePh} value={form.phone} onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{c.interest}</label>
                    <select
                      name="interest" value={form.interest} onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">{c.interestPh}</option>
                      {c.interestOpts.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{c.message}</label>
                    <textarea
                      name="message" rows={5} required
                      placeholder={c.messagePh} value={form.message} onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center font-sans">
                    {c.submit}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Info — 2 cols */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-5 h-px bg-brand-600" />
                  <h2 className="font-display font-medium tracking-[-0.015em] text-foreground text-xl">{c.infoTitle}</h2>
                </div>
                <div className="space-y-5">
                  <InfoItem
                    label={c.usOffice}
                    value="+52 81 8016 3885"
                    href="tel:+528180163885"
                    icon={<Phone className="w-4 h-4" strokeWidth={1.6} />}
                  />
                  <InfoItem
                    label={c.mxLine}
                    value="ventas1@sanjosefoods.net"
                    href="mailto:ventas1@sanjosefoods.net"
                    icon={<Mail className="w-4 h-4" strokeWidth={1.6} />}
                  />
                  <InfoItem
                    label={c.emailLabel}
                    value="1020 E. Produce Rd., Hidalgo, TX 78557"
                    icon={<MapPin className="w-4 h-4" strokeWidth={1.6} />}
                  />
                </div>
              </div>

              {/* WhatsApp — keep brand green; this isn't a theme color */}
              <a
                href="https://wa.me/528180163885"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bf5c] text-white font-sans font-semibold px-5 py-3.5 rounded-lg transition-colors w-full justify-center text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.waBtn}
              </a>

              {/* Service Area — RGV callout */}
              <div className="rounded-xl p-5 border border-border bg-card">
                <div className="flex items-center gap-2 mb-3 text-brand-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={1.6} />
                  <h3 className="font-sans font-semibold text-card-foreground text-xs uppercase tracking-widest">{c.serviceTitle}</h3>
                </div>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{c.serviceDesc}</p>
              </div>

              {/* Hours */}
              <div className="rounded-xl p-5 border border-border bg-card">
                <h3 className="font-sans font-semibold text-card-foreground text-xs uppercase tracking-widest mb-3">{c.hoursTitle}</h3>
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
