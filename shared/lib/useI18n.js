'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { defaultLang, translations } from './i18n/translations'

const I18nContext = createContext(null)
const STORAGE_KEY = 'kgu-lang'

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return defaultLang
    return window.localStorage.getItem(STORAGE_KEY) || defaultLang
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [lang])

  const switchLang = useCallback((newLang) => {
    setLang(newLang)
  }, [])

  const t = translations[lang] || translations[defaultLang]

  return (
    <I18nContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
