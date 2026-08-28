import type { Metadata } from 'next'
import { Bricolage_Grotesque, Faustina, Chivo_Mono } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import './globals.css'
import type { Language } from '@/translations'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Bricolage Grotesque carries display + UI: the most-installed new Google
// sans-serif of the last two years, with real ink-trap character instead of
// a neo-grotesque default. Faustina carries reading text and the
// counterpart-language italic; Chivo Mono is confined to typed values/codes.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['opsz'],
})

const faustina = Faustina({
  subsets: ['latin'],
  variable: '--font-faustina',
  style: ['normal', 'italic'],
  display: 'swap',
})

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--font-chivo-mono',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://san-jose-foods.vercel.app'),
  title: {
    default: 'San Jose Foods · International Meat Trade | Comercio Internacional de Carnes',
    template: '%s · San Jose Foods',
  },
  description:
    'Res, cerdo y pollo de mayoreo desde plantas USDA, CFIA y SIF en EE.UU., Canadá y Brasil para el mercado mexicano. Crédito respaldado por LLC, carga asegurada, respuesta comercial 24/7. Hidalgo, TX.',
  keywords: [
    'meat exports', 'exportación de carne', 'mayoreo de carne', 'res cerdo pollo',
    'USDA', 'CFIA', 'SIF', 'Hidalgo TX', 'suministro cárnico México', 'wholesale meat Mexico',
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

// Resolve the language on the server so the first paint is already in the
// visitor's language: saved cookie first, then the browser's Accept-Language
// (the primary buyer browses in Spanish). Client-side detection alone flashed
// English at every first-time Spanish visitor before swapping.
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
    <html lang={initialLanguage} suppressHydrationWarning className={`${bricolage.variable} ${faustina.variable} ${chivoMono.variable}`}>
      <body>
        {/* Without JS, scroll-reveal sections would stay hidden — force them visible. */}
        <noscript>
          <style>{`.reveal-on-scroll{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider initialLanguage={initialLanguage}>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
