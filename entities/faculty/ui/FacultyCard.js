'use client'
import Link from 'next/link'
import { useI18n } from '@/shared/lib/useI18n'
import styles from './FacultyCard.module.css'

const COPY = {
  ru: { programs: 'программ', readMore: 'Подробнее' },
  kg: { programs: 'программа', readMore: 'Толугураак' },
  en: { programs: 'programs', readMore: 'Read more' },
}

const FACULTY_COPY = {
  economics: {
    ru: { name: 'Экономический факультет', description: 'Финансы, бухгалтерский учёт, мировая экономика и цифровой бизнес.', badge: 'Популярное' },
    kg: { name: 'Экономика факультети', description: 'Каржы, бухгалтердик эсеп, дүйнөлүк экономика жана санарип бизнес.', badge: 'Атактуу' },
    en: { name: 'Faculty of Economics', description: 'Finance, accounting, global economics and digital business.', badge: 'Popular' },
  },
  medicine: {
    ru: { name: 'Медицинский факультет', description: 'Лечебное дело, стоматология, фармация.', badge: null },
    kg: { name: 'Медицина факультети', description: 'Дарылоо иши, стоматология, фармация.', badge: null },
    en: { name: 'Faculty of Medicine', description: 'General medicine, dentistry and pharmacy.', badge: null },
  },
  it: {
    ru: { name: 'Факультет IT и программирования', description: 'Искусственный интеллект, кибербезопасность, разработка ПО.', badge: 'IT' },
    kg: { name: 'IT жана программалоо факультети', description: 'Жасалма интеллект, киберкоопсуздук, программалык камсыздоо.', badge: 'IT' },
    en: { name: 'Faculty of IT and Programming', description: 'Artificial intelligence, cybersecurity and software development.', badge: 'IT' },
  },
  pedagogy: {
    ru: { name: 'Педагогический факультет', description: 'Начальное, среднее и дополнительное образование.', badge: null },
    kg: { name: 'Педагогика факультети', description: 'Башталгыч, орто жана кошумча билим берүү.', badge: null },
    en: { name: 'Faculty of Pedagogy', description: 'Primary, secondary and additional education.', badge: null },
  },
  engineering: {
    ru: { name: 'Инженерный факультет', description: 'Строительство, энергетика, автоматизация.', badge: null },
    kg: { name: 'Инженердик факультет', description: 'Курулуш, энергетика, автоматташтыруу.', badge: null },
    en: { name: 'Faculty of Engineering', description: 'Construction, energy and automation.', badge: null },
  },
  law: {
    ru: { name: 'Юридический факультет', description: 'Гражданское, уголовное и международное право.', badge: null },
    kg: { name: 'Юридикалык факультет', description: 'Жарандык, кылмыш жана эл аралык укук.', badge: null },
    en: { name: 'Faculty of Law', description: 'Civil, criminal and international law.', badge: null },
  },
}

export default function FacultyCard({ faculty }) {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const localized = FACULTY_COPY[faculty.slug]?.[lang] || FACULTY_COPY[faculty.slug]?.ru || {}

  return (
    <Link href={`/faculties/${faculty.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={faculty.image} alt={localized.name || faculty.name} className={styles.image} loading="lazy" />
        <div className={styles.overlay} />
        {(localized.badge || faculty.badge) && <span className={styles.badge}>{localized.badge || faculty.badge}</span>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{localized.name || faculty.name}</h3>
        <p className={styles.desc}>{localized.description || faculty.description}</p>
        <div className={styles.meta}>
          <span className={styles.programs}>
            <i className="fas fa-book" aria-hidden="true" /> {faculty.programs} {c.programs}
          </span>
          <span className={styles.link}>{c.readMore} →</span>
        </div>
      </div>
    </Link>
  )
}
