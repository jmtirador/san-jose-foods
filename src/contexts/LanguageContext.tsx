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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server + first client render use 'en' so hydration matches; the effect below
  // then restores a saved choice or detects the browser language.
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'es') {
      setLanguageState(saved)
      return
    }
    // First visit: a Spanish-speaking browser (the primary buyer) gets Spanish.
    if (navigator.language?.toLowerCase().startsWith('es')) {
      setLanguageState('es')
    }
  }, [])

  // Keep <html lang> honest for search engines and screen readers.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage can be unavailable (private mode); language still works in-session.
    }
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
