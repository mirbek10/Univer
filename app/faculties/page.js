'use client'
import { useState } from 'react'
import FacultyCard from '@/entities/faculty/ui/FacultyCard'
import { faculties, facultyCategories } from '@/entities/faculty/model/faculties'
import { useI18n } from '@/shared/lib/useI18n'
import styles from './faculties.module.css'

const COPY = {
  ru: {
    label: 'Образование',
    title: 'Факультеты КММУ',
    sub: '4 факультета · 17 образовательных программ · Специалитет, интернатура, магистратура',
    filters: 'Фильтр по направлению:',
    empty: 'Факультеты по выбранному фильтру не найдены',
    infoPrograms: 'образовательных программ',
    infoLevels: 'уровня обучения',
    infoForms: 'Очная / Заочная',
    infoFormsLabel: 'форма обучения',
    infoAccred: 'Международная',
    infoAccredLabel: 'аккредитация',
  },
  kg: {
    label: 'Билим берүү',
    title: 'КММУнун факультеттери',
    sub: '4 факультет · 17 билим берүү программасы · Специалитет, интернатура, магистратура',
    filters: 'Багыты боюнча чыпка:',
    empty: 'Тандалган чыпка боюнча факультеттер табылган жок',
    infoPrograms: 'билим берүү программалары',
    infoLevels: 'окуу деңгээли',
    infoForms: 'Күндүзгү / Сырткы',
    infoFormsLabel: 'окуу формасы',
    infoAccred: 'Эл аралык',
    infoAccredLabel: 'аккредитация',
  },
  en: {
    label: 'Education',
    title: 'KMMU Faculties',
    sub: '4 faculties · 17 educational programs · Speciality, Internship, Master',
    filters: 'Filter by direction:',
    empty: 'No faculties found for the selected filter',
    infoPrograms: 'educational programs',
    infoLevels: 'levels of study',
    infoForms: 'Full-time / Part-time',
    infoFormsLabel: 'study format',
    infoAccred: 'International',
    infoAccredLabel: 'accreditation',
  },
}

export default function FacultiesPage() {
  const [active, setActive] = useState('all')
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru

  const filtered = active === 'all' ? faculties : faculties.filter((f) => f.category === active)

  const filterLabels = {
    ru: { all: 'Все', medical: 'Медицинские' },
    kg: { all: 'Баары', medical: 'Медициналык' },
    en: { all: 'All', medical: 'Medical' },
  }[lang] || {}

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="section-label">{c.label}</p>
          <h1 className={styles.heroTitle}>{c.title}</h1>
          <p className={styles.heroSub}>{c.sub}</p>
        </div>
      </section>

      <section className={styles.main}>
        <div className="container">
          <div className={styles.filters}>
            <p className={styles.filtersLabel}>{c.filters}</p>
            <div className={styles.filterTabs}>
              {facultyCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterBtn} ${active === cat.value ? styles.filterActive : ''}`}
                  onClick={() => setActive(cat.value)}
                >
                  {filterLabels[cat.value] || cat.label}
                  <span className={styles.filterCount}>
                    {cat.value === 'all' ? faculties.length : faculties.filter((f) => f.category === cat.value).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.grid}>
            {filtered.length === 0 ? (
              <p className={styles.empty}>{c.empty}</p>
            ) : (
              filtered.map((f) => <FacultyCard key={f.id} faculty={f} />)
            )}
          </div>

          <div className={styles.infoBar}>
            <div className={styles.infoItem}>
              <strong>65+</strong>
              <span>{c.infoPrograms}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>3</strong>
              <span>{c.infoLevels}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>{c.infoForms}</strong>
              <span>{c.infoFormsLabel}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>{c.infoAccred}</strong>
              <span>{c.infoAccredLabel}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
