'use client'
import { useI18n } from '@/shared/lib/useI18n'
import { useModal } from '@/shared/lib/useModal'
import ApplyModal from '@/features/apply-modal/ui/ApplyModal'
import styles from './CTASection.module.css'

const COPY = {
  ru: {
    label: 'Поступи в КГУ',
    title: 'Готов начать своё академическое путешествие?',
    sub: 'Подай документы уже сейчас и стань частью семьи КГУ. Приём заявок открыт до 31 июля 2026.',
    btn: 'Подать заявку сейчас',
    secondary: 'Условия поступления',
    badge1: 'Бесплатно и без обязательств',
    badge2: 'Ответ в течение 24 часов',
    badge3: 'Международная аккредитация',
  },
  kg: {
    label: 'КМУга тапшырыңыз',
    title: 'Академиялык жолуңузду баштоого даярсызбы?',
    sub: 'Азыр эле документтериңизди тапшырып, КМУ үй-бүлөсүнүн бир бөлүгү болуңуз. Өтүнмөлөр 2026-жылдын 31-июлуна чейин ачык.',
    btn: 'Азыр тапшыруу',
    secondary: 'Кабыл алуу шарттары',
    badge1: 'Акысыз жана милдеттенмесиз',
    badge2: '24 саат ичинде жооп',
    badge3: 'Эл аралык аккредитация',
  },
  en: {
    label: 'Apply to KSU',
    title: 'Ready to start your academic journey?',
    sub: 'Submit your documents now and become part of the KSU family. Applications are open until July 31, 2026.',
    btn: 'Apply now',
    secondary: 'Admission requirements',
    badge1: 'Free and non-binding',
    badge2: 'Reply within 24 hours',
    badge3: 'International accreditation',
  },
}

export default function CTASection() {
  const applyModal = useModal()
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru

  return (
    <section className={styles.section}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.label}>{c.label}</p>
        <h2 className={styles.title}>{c.title}</h2>
        <p className={styles.sub}>{c.sub}</p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={applyModal.open}>
            {c.btn}
          </button>
          <a href="/admission" className={styles.btnOutline}>
            {c.secondary}
          </a>
        </div>
        <div className={styles.badges}>
          <span>{c.badge1}</span>
          <span>{c.badge2}</span>
          <span>{c.badge3}</span>
        </div>
      </div>
      <ApplyModal isOpen={applyModal.isOpen} onClose={applyModal.close} />
    </section>
  )
}
