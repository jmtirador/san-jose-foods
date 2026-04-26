'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const INK  = '#0D0508'
const INK_S = '#180B10'
const RED  = '#D9182E'

const inputClass =
  'w-full border border-white/8 rounded px-4 py-3 text-sm font-sans focus:outline-none focus:ring-1 focus:border-brand-600 transition text-gray-200 placeholder-gray-700'

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
      <div
        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: `${RED}15`, color: RED }}
      >
        {icon}
      </div>
      <div>
        <div className="font-sans text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">{label}</div>
        {href ? (
          <a href={href} className="font-sans text-gray-300 hover:text-white transition-colors text-sm font-medium">
            {value}
          </a>
        ) : (
          <span className="font-sans text-gray-300 text-sm font-medium">{value}</span>
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
      <section className="py-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: RED }} />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600">
              Let's talk
            </span>
          </div>
          <h1
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}
          >
            {c.pageTitle}
          </h1>
          <p className="font-sans text-gray-500 text-lg max-w-2xl leading-relaxed">{c.pageSub}</p>
        </div>
      </section>

      {/* Main */}
      <section className="py-20" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form — 3 cols */}
            <div
              className="lg:col-span-3 rounded p-8 border border-white/5"
              style={{ background: INK_S }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-5 h-px" style={{ background: RED }} />
                <h2 className="font-display font-bold text-white text-xl">{c.formTitle}</h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `${RED}20` }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke={RED} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-sans text-gray-300 font-medium text-lg">{c.submitted}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{c.name}</label>
                      <input
                        name="name" type="text" required
                        placeholder={c.namePh} value={form.name} onChange={handleChange}
                        className={inputClass}
                        style={{ background: `${INK}cc` }}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{c.company}</label>
                      <input
                        name="company" type="text"
                        placeholder={c.companyPh} value={form.company} onChange={handleChange}
                        className={inputClass}
                        style={{ background: `${INK}cc` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{c.email}</label>
                      <input
                        name="email" type="email" required
                        placeholder={c.emailPh} value={form.email} onChange={handleChange}
                        className={inputClass}
                        style={{ background: `${INK}cc` }}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{c.phone}</label>
                      <input
                        name="phone" type="tel"
                        placeholder={c.phonePh} value={form.phone} onChange={handleChange}
                        className={inputClass}
                        style={{ background: `${INK}cc` }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{c.interest}</label>
                    <select
                      name="interest" value={form.interest} onChange={handleChange}
                      className={inputClass}
                      style={{ background: INK_S }}
                    >
                      <option value="">{c.interestPh}</option>
                      {c.interestOpts.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{c.message}</label>
                    <textarea
                      name="message" rows={5} required
                      placeholder={c.messagePh} value={form.message} onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      style={{ background: `${INK}cc` }}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center font-sans">
                    {c.submit}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Info — 2 cols */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-5 h-px" style={{ background: RED }} />
                  <h2 className="font-display font-bold text-white text-xl">{c.infoTitle}</h2>
                </div>
                <div className="space-y-5">
                  <InfoItem
                    label={c.usOffice}
                    value="+1 (555) 555-0100"
                    href="tel:+15555550100"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                  <InfoItem
                    label={c.mxLine}
                    value="+52 (555) 555-0200"
                    href="tel:+525555550200"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                  <InfoItem
                    label={c.emailLabel}
                    value="info@sanjosefoods.com"
                    href="mailto:info@sanjosefoods.com"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/15555550100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bf5c] text-white font-sans font-semibold px-5 py-3.5 rounded transition-colors w-full justify-center text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.waBtn}
              </a>

              {/* Service Area — RGV callout */}
              <div className="rounded p-5 border border-white/5" style={{ background: INK_S }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={RED} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-sans font-semibold text-white text-xs uppercase tracking-widest">{c.serviceTitle}</h3>
                </div>
                <p className="font-sans text-gray-500 text-sm leading-relaxed">{c.serviceDesc}</p>
              </div>

              {/* Hours */}
              <div className="rounded p-5 border border-white/5" style={{ background: INK_S }}>
                <h3 className="font-sans font-semibold text-white text-xs uppercase tracking-widest mb-3">{c.hoursTitle}</h3>
                {c.hours.split('\n').map((line) => (
                  <p key={line} className="font-sans text-gray-500 text-sm">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
