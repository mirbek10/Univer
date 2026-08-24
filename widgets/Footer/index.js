'use client'
import Link from 'next/link'
import { useI18n } from '@/shared/lib/useI18n'
import { getSiteConfig, getFooterLinks } from '@/shared/config/site'
import styles from './Footer.module.css'

export default function Footer() {
  const { lang, t } = useI18n()
  const siteConfig = getSiteConfig(lang)
  const footerLinks = getFooterLinks(lang)
  const footer = t.footer || {}
  const footerExtra = t.footerExtra || {}
  const nav = t.nav || {}

  return (
    <footer className={styles.footer}>
      <div className={styles.topGradient} />
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* ── Brand ── */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoBox}>{siteConfig.name}</div>
              <div>
                <div className={styles.logoName}>{siteConfig.name}</div>
                <div className={styles.logoFull}>{siteConfig.fullName}</div>
              </div>
            </Link>
            <p className={styles.desc}>{siteConfig.shortDesc}</p>
            <div className={styles.social}>
              <a href={siteConfig.social.facebook} aria-label="Facebook" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href={siteConfig.social.instagram} aria-label="Instagram" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href={siteConfig.social.telegram} aria-label="Telegram" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.829.941z" />
                </svg>
              </a>
              <a href={siteConfig.social.youtube} aria-label="YouTube" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── University links ── */}
          <div>
            <h4 className={styles.colTitle}>{footer.university}</h4>
            <ul className={styles.linkList}>
              {(footerLinks.university || []).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
              <li><Link href="/international" className={styles.footerLink}>{nav.international}</Link></li>
              <li><Link href="/contacts" className={styles.footerLink}>{nav.contacts}</Link></li>
            </ul>
          </div>

          {/* ── Admission links ── */}
          <div>
            <h4 className={styles.colTitle}>{footer.forApplicants}</h4>
            <ul className={styles.linkList}>
              {(footerLinks.admission || []).map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contacts ── */}
          <div>
            <h4 className={styles.colTitle}>{nav.contacts}</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>{siteConfig.address}</span>
              </div>
              {siteConfig.phone.map((p) => (
                <div key={p} className={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.34l3-1.23a2 2 0 0 1 2.27.52L10.49 5a2 2 0 0 1-.5 2.29l-.13.11a15.6 15.6 0 0 0 6.63 6.63l.11-.13a2 2 0 0 1 2.29-.5l3.37 1.62a2 2 0 0 1 1.14 2.18z" />
                  </svg>
                  <a href={`tel:${p.replace(/\s/g, '')}`} className={styles.footerLink}>{p}</a>
                </div>
              ))}
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${siteConfig.email}`} className={styles.footerLink}>{siteConfig.email}</a>
              </div>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{siteConfig.workHours}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. {footer.rights}</p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>{footerExtra.privacy}</a>
            <a href="#" className={styles.bottomLink}>{footerExtra.terms}</a>
            <a href="#" className={styles.bottomLink}>{footerExtra.sitemap}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
