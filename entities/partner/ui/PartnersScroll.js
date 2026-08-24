'use client'
import { useI18n } from '@/shared/lib/useI18n'
import { partners } from '../model/partners'
import styles from './PartnersScroll.module.css'

const COPY = {
  ru: { label: 'Наши партнёры', title: 'Доверяют ведущие организации мира' },
  kg: { label: 'Өнөктөштөрүбүз', title: 'Дүйнөнүн алдыңкы уюмдары ишенет' },
  en: { label: 'Our Partners', title: 'Trusted by leading organizations worldwide' },
}

export default function PartnersScroll() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const doubled = [...partners, ...partners]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>{c.label}</p>
        <h2 className={styles.heading}>{c.title}</h2>
      </div>
      <div className={styles.track}>
        <div className={styles.inner}>
          {doubled.map((p, i) => (
            <div key={`${p.id}-${i}`} className={styles.item}>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.fullName}>{p.fullName}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
