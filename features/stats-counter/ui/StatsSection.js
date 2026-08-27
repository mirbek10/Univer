'use client'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/shared/lib/useI18n'
import { GraduationCap, BookOpen, Building2, Briefcase } from 'lucide-react'
import styles from './StatsSection.module.css'

const COPY = {
  ru: {
    label: 'КММУ в цифрах',
    title: 'Наши достижения говорят за себя',
    sub: 'Более 30 лет мы формируем будущих врачей Кыргызстана и мира',
    items: [
      { value: 4000, suffix: '+', label: 'Студентов',       description: 'обучаются сегодня' },
      { value: 205,   suffix: '+', label: 'Преподавателей',  description: 'опытных специалистов' },
      { value: 4,     suffix: '',  label: 'Факультета',     description: 'всех направлений' },
      { value: 93,    suffix: '%', label: 'Трудоустройство', description: 'выпускников работают' },
    ],
  },
  kg: {
    label: 'КММУ сандарда',
    title: 'Биздин жетишкендиктер өзү айтат',
    sub: '30 жылдан ашык убакыт бою биз Кыргызстандын келечегин калыптандырабыз',
    items: [
      { value: 4000, suffix: '+', label: 'Студент',         description: 'бүгүн окуйт' },
      { value: 205,   suffix: '+', label: 'Окутуучу',         description: 'тажрыйбалуу адис' },
      { value: 4,     suffix: '',  label: 'Факультет',       description: 'бардык багыттар' },
      { value: 93,    suffix: '%', label: 'Жумушка орношуу',    description: 'бүтүрүүчүлөр иштейт' },
    ],
  },
  en: {
    label: 'KMMU in Numbers',
    title: 'Our achievements speak for themselves',
    sub: 'For over 30 years we have been shaping future doctors of Kyrgyzstan and the world',
    items: [
      { value: 4000, suffix: '+', label: 'Students',        description: 'are studying today' },
      { value: 205,   suffix: '+', label: 'Faculty',         description: 'experienced specialists' },
      { value: 4,     suffix: '',  label: 'Faculties',       description: 'all fields' },
      { value: 93,    suffix: '%', label: 'Employment',      description: 'graduates are employed' },
    ],
  },
}

const STAT_ICONS = [
  <GraduationCap key="grad"     size={28} strokeWidth={1.6} />,
  <BookOpen      key="book"     size={28} strokeWidth={1.6} />,
  <Building2     key="building" size={28} strokeWidth={1.6} />,
  <Briefcase     key="brief"    size={28} strokeWidth={1.6} />,
]

function Counter({ target, suffix, active }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target])
  return <span className={styles.number}>{count.toLocaleString('ru')}{suffix}</span>
}

export default function StatsSection() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect() }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>{c.label}</p>
          <h2 className={styles.heading}>{c.title}</h2>
          <p className={styles.sub}>{c.sub}</p>
        </div>
        <div className={styles.grid}>
          {c.items.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>
                {STAT_ICONS[i]}
              </div>
              <Counter target={s.value} suffix={s.suffix} active={active} />
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statDesc}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
