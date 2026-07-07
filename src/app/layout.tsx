import type { Metadata } from 'next'
import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// Serif italic accent only — the "heritage / translation" register for Spanish
// flourishes and one accent word per major headline. Never body copy.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://san-jose-foods.vercel.app'),
  title: {
    default: 'San Jose Foods — International Meat Trade | Comercio Internacional de Carnes',
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
    title: 'San Jose Foods — Comercio Internacional de Carnes',
    description:
      'Res, cerdo y pollo de mayoreo desde plantas USDA, CFIA y SIF en EE.UU., Canadá y Brasil para el mercado mexicano. Hidalgo, TX · 24/7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Jose Foods — Comercio Internacional de Carnes',
    description:
      'Res, cerdo y pollo de mayoreo · EE.UU. · Canadá · Brasil → México · USDA · CFIA · SIF · Hidalgo, TX.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable}`}>
      <body>
        {/* Without JS, scroll-reveal sections would stay hidden — force them visible. */}
        <noscript>
          <style>{`.reveal-on-scroll{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
