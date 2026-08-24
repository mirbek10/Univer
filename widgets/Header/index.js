'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSiteConfig } from '@/shared/config/site'
import { useToast } from '@/shared/lib/useToast'
import { useModal } from '@/shared/lib/useModal'
import { useI18n } from '@/shared/lib/useI18n'
import ApplyModal from '@/features/apply-modal/ui/ApplyModal'
import { Menu, X, Languages, MapPin, Mail } from 'lucide-react'
import styles from './Header.module.css'

const LANGS = [
  { code: 'ru', label: 'RU' },
  { code: 'kg', label: 'KG' },
  { code: 'en', label: 'EN' },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()
  const applyModal = useModal()
  const { t, lang, switchLang } = useI18n()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentLang = mounted ? lang : 'ru'
  const siteConfig = getSiteConfig(currentLang)

  const navLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.faculties, href: '/faculties' },
    { label: t.nav.science, href: '/science' },
    { label: t.nav.international, href: '/international' },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.contacts, href: '/contacts' },
  ]

  const universityName =
    currentLang === 'kg'
      ? 'Кыргыз мамлекеттик университети'
      : currentLang === 'en'
        ? 'Kyrgyz State University'
        : 'Кыргызский государственный университет'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleLangSwitch = (code) => {
    if (code === lang) return
    switchLang(code)
    toast.success(
      code === 'ru'
        ? 'Язык изменён: Русский'
        : code === 'kg'
          ? 'Тил алмаштырылды: Кыргызча'
          : 'Language changed: English'
    )
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.metaRow}>
          <div className={styles.metaInner}>
            <div className={styles.metaLeft}>
              <span className={styles.metaItem}>
                <MapPin size={14} aria-hidden="true" />
                {siteConfig.address}
              </span>
              <a href={`mailto:${siteConfig.email}`} className={styles.metaItemLink}>
                <Mail size={14} aria-hidden="true" />
                {siteConfig.email}
              </a>
            </div>
            <div className={styles.metaRight}>
              <Languages size={14} aria-hidden="true" />
              <div className={styles.langGroup}>
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    className={`${styles.langBtn} ${currentLang === l.code ? styles.langActive : ''}`}
                    onClick={() => handleLangSwitch(l.code)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoBox}>{siteConfig.name}</div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>{siteConfig.name}</span>
              <span className={styles.logoSub}>{universityName}</span>
            </div>
          </Link>

          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? styles.navLinkActive
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.applyBtn} onClick={applyModal.open}>
              {t.nav.apply}
            </button>
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
          <nav>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileLangs}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={`${styles.mobileLangBtn} ${currentLang === l.code ? styles.mobileLangActive : ''}`}
                onClick={() => {
                  handleLangSwitch(l.code)
                  setMenuOpen(false)
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className={styles.mobileApplyBtn}
            onClick={() => {
              applyModal.open()
              setMenuOpen(false)
            }}
          >
            {t.nav.apply}
          </button>
        </div>
      </header>

      <ApplyModal isOpen={applyModal.isOpen} onClose={applyModal.close} />
    </>
  )
}