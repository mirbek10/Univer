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
  stomatology: {
    ru: { name: 'Факультет стоматологии', description: 'Стоматология, ортодонтия, челюстно-лицевая хирургия. Современные клиники и практика с первого курса.', badge: null },
    kg: { name: 'Стоматология факультети', description: 'Стоматология, ортодонтия, челюст-бет хирургиясы. Заманбап клиникалар жана биринчи курстан практика.', badge: null },
    en: { name: 'Faculty of Stomatology', description: 'Dentistry, orthodontics and maxillofacial surgery. Modern clinics and practice from the first year.', badge: null },
  },
  lechebnoe: {
    ru: { name: 'Факультет лечебного дела', description: 'Терапия, хирургия, внутренние болезни. Клинические базы в ведущих больницах Бишкека.', badge: 'Популярное' },
    kg: { name: 'Дарылоо иши факультети', description: 'Терапия, хирургия, ички оорулар. Бишкектин алдыңкы ооруканаларында клиникалык базалар.', badge: 'Атактуу' },
    en: { name: 'Faculty of General Medicine', description: 'Therapy, surgery and internal medicine. Clinical bases in leading hospitals of Bishkek.', badge: 'Popular' },
  },
  pharmacy: {
    ru: { name: 'Факультет фармации', description: 'Фармация, клиническая фармация, фармакоэкономика. Современные лаборатории и партнёрство с фармацевтическими компаниями.', badge: null },
    kg: { name: 'Фармация факультети', description: 'Фармация, клиникалык фармация, фармакоэкономика. Заманбап лабораториялар жана фармацевтикалык компаниялар менен өнөктөштүк.', badge: null },
    en: { name: 'Faculty of Pharmacy', description: 'Pharmacy, clinical pharmacy and pharmacoeconomics. Modern laboratories and partnerships with pharmaceutical companies.', badge: null },
  },
  pediatrics: {
    ru: { name: 'Факультет педиатрии', description: 'Педиатрия, детская хирургия, неонатология. Углублённая подготовка по работе с детьми всех возрастов.', badge: null },
    kg: { name: 'Педиатрия факультети', description: 'Педиатрия, балдар хирургиясы, неонатология. Бардык курактагы балдар менен иштөө боюнча терең даярдык.', badge: null },
    en: { name: 'Faculty of Pediatrics', description: 'Pediatrics, pediatric surgery and neonatology. In-depth training for working with children of all ages.', badge: null },
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
