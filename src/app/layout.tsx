import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Chivo_Mono } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import './globals.css'
import type { Language } from '@/translations'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Switzer (Fontshare, ITF Free Font License: commercial use and self-hosting
// allowed) carries every word on the site. Variable weight 100-900, one file
// per style. Chivo Mono is confined to codes and typed values.
const switzer = localFont({
  src: [
    { path: './fonts/Switzer-Variable.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/Switzer-VariableItalic.woff2', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-switzer',
  display: 'swap',
})

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--font-chivo-mono',
  weight: ['400', '500'],
  display: 'swap',
})

const SITE = 'https://san-jose-foods.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'San Jose Foods · International Meat Trade | Comercio Internacional de Carnes',
    template: '%s · San Jose Foods',
  },
  description:
    'Res, cerdo y pollo de mayoreo desde plantas USDA, CFIA y SIF en EE.UU., Canadá y Brasil para el mercado mexicano. Crédito respaldado por LLC, carga asegurada, respuesta comercial 24/7. Hidalgo, TX.',
  keywords: [
    'meat exports', 'exportación de carne', 'mayoreo de carne', 'res cerdo pollo',
    'USDA', 'CFIA', 'SIF', 'IMPS', 'Hidalgo TX', 'suministro cárnico México', 'wholesale meat Mexico',
  ],
  openGraph: {
    type: 'website',
    siteName: 'San Jose Foods',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    title: 'San Jose Foods · Comercio Internacional de Carnes',
    description:
      'Res, cerdo y pollo de mayoreo desde plantas USDA, CFIA y SIF en EE.UU., Canadá y Brasil para el mercado mexicano. Hidalgo, TX · 24/7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Jose Foods · Comercio Internacional de Carnes',
    description:
      'Res, cerdo y pollo de mayoreo · EE.UU. · Canadá · Brasil → México · USDA · CFIA · SIF · Hidalgo, TX.',
  },
}

// Real, public organization facts only. No ratings, no invented figures.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'San Jose Foods LLC',
  url: SITE,
  logo: `${SITE}/icon.svg`,
  email: 'ventas1@sanjosefoods.net',
  telephone: '+52 81 8016 3885',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1020 E. Produce Rd.',
    addressLocality: 'Hidalgo',
    addressRegion: 'TX',
    postalCode: '78557',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'Country', name: 'Mexico' },
  knowsLanguage: ['es', 'en'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+52 81 8016 3885',
      email: 'ventas1@sanjosefoods.net',
      availableLanguage: ['Spanish', 'English'],
    },
  ],
}

// Resolve the language on the server so the first paint is already in the
// visitor's language: saved cookie first, then the browser's Accept-Language
// (the primary buyer browses in Spanish).
async function resolveLanguage(): Promise<Language> {
  const saved = (await cookies()).get('sjf-lang')?.value
  if (saved === 'en' || saved === 'es') return saved
  const accept = (await headers()).get('accept-language') ?? ''
  return accept.trim().toLowerCase().startsWith('es') ? 'es' : 'en'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialLanguage = await resolveLanguage()
  return (
    <html lang={initialLanguage} suppressHydrationWarning className={`${switzer.variable} ${chivoMono.variable}`}>
      <body>
        {/* Without JS, Motion's server-rendered `initial` styles would leave
            entrances hidden. Force visible anything whose inline style opens
            at opacity 0, plus the corridor paths. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"],.reveal,.reveal path{opacity:1 !important;transform:none !important;filter:none !important;stroke-dasharray:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider initialLanguage={initialLanguage}>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  )
}
