'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Language, translations, Translations } from '@/translations'

const STORAGE_KEY = 'sjf-lang'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode
  initialLanguage: Language
}) {
  // The server resolves the language per request (cookie, then Accept-Language)
  // in layout.tsx, so the first paint is already in the right language — no
  // English flash for the Spanish-speaking primary buyer.
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  const persist = (lang: Language) => {
    document.cookie = `${STORAGE_KEY}=${lang}; path=/; max-age=31536000; samesite=lax`
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage can be unavailable (private mode); the cookie still holds.
    }
  }

  useEffect(() => {
    // Migration: visitors who picked a language before the cookie existed have
    // it only in localStorage. Honor it once and promote it to the cookie.
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if ((saved === 'en' || saved === 'es') && saved !== initialLanguage && !document.cookie.includes(`${STORAGE_KEY}=`)) {
      setLanguageState(saved)
      persist(saved)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep <html lang> honest for search engines and screen readers.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    persist(lang)
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
