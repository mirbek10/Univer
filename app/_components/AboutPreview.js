'use client'
import { useI18n } from '@/shared/lib/useI18n'
import { Award, Rocket, Globe, Users } from 'lucide-react'
import styles from './AboutPreview.module.css'

const COPY = {
  ru: {
    label: 'О нас',
    titlePrefix: 'Больше 30 лет',
    titleAccent: 'формируем',
    titleSuffix: 'профессионалов медицины',
    p1: 'Кыргызский международный медицинский университет, основанный в 1993 году, — это не просто учебное заведение. Это центр медицинской науки, инноваций и качественного образования.',
    p2: 'Сегодня КММУ — это 4 факультета, более 4 000 студентов, сильный преподавательский состав и международные партнёрства.',
    link: 'Узнать историю КММУ',
    cards: [
      { title: 'Качество', desc: 'Международная аккредитация и высокий стандарт обучения.' },
      { title: 'Инновации', desc: 'Современные клиники и цифровые технологии.' },
      { title: 'Международность', desc: 'Партнёрства с ведущими медицинскими университетами мира и академические обмены.' },
      { title: 'Инклюзивность', desc: 'Равный доступ к образованию и поддержка студентов.' },
    ],
  },
  kg: {
    label: 'Биз жөнүндө',
    titlePrefix: '30 жылдан ашык',
    titleAccent: 'калыптандырып',
    titleSuffix: 'келебиз',
    p1: '1993-жылы негизделген Кыргызский эл аралык медицина университети жөн гана окуу жай эмес. Ал медицина илиминин, инновациялардын жана сапаттуу билим берүүнүн борбору.',
    p2: 'Бүгүн КММУ 4 факультетти, 4 000дөн ашык студентти, күчтүү профессордук-окутуучулук курамды жана эл аралык өнөктөштүктөрдү камтыйт.',
    link: 'КММУнун тарыхын билүү',
    cards: [
      { title: 'Сапат', desc: 'Эл аралык аккредитация жана жогорку окутуу стандарты.' },
      { title: 'Инновация', desc: 'Заманбап клиникалар жана санарип технологиялар.' },
      { title: 'Эл аралык', desc: 'Дүйнөлүк медициналык ЖОЖдор менен өнөктөштүк жана алмашуу.' },
      { title: 'Инклюзивдүүлүк', desc: 'Бардык аймактардан келген студенттерди колдоо.' },
    ],
  },
  en: {
    label: 'About Us',
    titlePrefix: 'For more than 30 years we',
    titleAccent: 'have been shaping',
    titleSuffix: 'future doctors',
    p1: 'Founded in 1993, Kyrgyz International Medical University is more than an educational institution. It is a center of medical science, innovation, and quality education.',
    p2: 'Today KMMU brings together 4 faculties, more than 4,000 students, a strong teaching staff, and international partnerships.',
    link: 'Learn KMMU history',
    cards: [
      { title: 'Quality', desc: 'International accreditation and a high teaching standard.' },
      { title: 'Innovation', desc: 'Modern clinics and digital technologies.' },
      { title: 'International', desc: 'Partnerships with leading medical universities worldwide and academic exchange.' },
      { title: 'Inclusion', desc: 'Equal access to education and student support.' },
    ],
  },
}

const ICONS = [
  <Award   key="award"  size={24} strokeWidth={1.8} />,
  <Rocket  key="rocket" size={24} strokeWidth={1.8} />,
  <Globe   key="globe"  size={24} strokeWidth={1.8} />,
  <Users   key="users"  size={24} strokeWidth={1.8} />,
]

export default function AboutPreview() {
  const { lang } = useI18n()
  const copy = COPY[lang] || COPY.ru

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className="section-label">{copy.label}</p>
            <h2 className={styles.title}>
              {copy.titlePrefix} <span className="gradient-text">{copy.titleAccent}</span>
              <br />{copy.titleSuffix}
            </h2>
            <p className={styles.desc}>{copy.p1}</p>
            <p className={styles.desc}>{copy.p2}</p>
            <a href="/about" className={styles.link}>
              {copy.link}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className={styles.right}>
            {copy.cards.map((v, i) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{ICONS[i]}</span>
                <div>
                  <h4 className={styles.valueTitle}>{v.title}</h4>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
