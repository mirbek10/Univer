'use client'
import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { faculties } from '@/entities/faculty/model/faculties'
import { useModal } from '@/shared/lib/useModal'
import { useI18n } from '@/shared/lib/useI18n'
import ApplyModal from '@/features/apply-modal/ui/ApplyModal'
import { BookOpen, GraduationCap, Users, Trophy, Mail, Phone } from 'lucide-react'
import styles from './faculty.module.css'

const COPY = {
  ru: {
    home: 'Главная', faculties: 'Факультеты', about: 'О факультете',
    study: 'Обучение', programs: 'Образовательные программы',
    staff: 'Преподаватели', teachers: 'Наши профессора',
    contactTitle: 'Контакты факультета',
    degree: 'Степень', duration: 'Срок обучения', cost: 'Стоимость', form: 'Форма',
    applyFaculty: 'Подать заявку на факультет',
    applyProgram: 'Подать на эту программу',
    applyDocs: 'Подать документы',
    fullTime: 'Очная / Заочная',
    programsCount: 'программ', studentsCount: 'студентов', teachersCount: 'преподавателей',
  },
  kg: {
    home: 'Башкы бет', faculties: 'Факультеттер', about: 'Факультет жөнүндө',
    study: 'Окуу', programs: 'Билим берүү программалары',
    staff: 'Мугалимдер', teachers: 'Биздин профессорлор',
    contactTitle: 'Факультеттин байланыштары',
    degree: 'Даража', duration: 'Окуу мөөнөтү', cost: 'Баасы', form: 'Форма',
    applyFaculty: 'Факультетке арыз берүү',
    applyProgram: 'Бул программага арыз берүү',
    applyDocs: 'Документ тапшыруу',
    fullTime: 'Күндүзгү / Сырттан',
    programsCount: 'программа', studentsCount: 'студенттер', teachersCount: 'мугалимдер',
  },
  en: {
    home: 'Home', faculties: 'Faculties', about: 'About the faculty',
    study: 'Study', programs: 'Educational programs',
    staff: 'Faculty staff', teachers: 'Our professors',
    contactTitle: 'Faculty contacts',
    degree: 'Degree', duration: 'Duration', cost: 'Cost', form: 'Study format',
    applyFaculty: 'Apply to this faculty',
    applyProgram: 'Apply for this program',
    applyDocs: 'Submit documents',
    fullTime: 'Full-time / Part-time',
    programsCount: 'programs', studentsCount: 'students', teachersCount: 'teachers',
  },
}

const FACULTY_COPY = {
  stomatology: {
    ru: { name: 'Факультет стоматологии', badge: null, description: 'Стоматология, ортодонтия, челюстно-лицевая хирургия.', about: 'Современная стоматологическая клиника и практика с первого курса.', contact: 'Декан: Абдыкалыкова Айгуль Бактыбековна' },
    kg: { name: 'Стоматология факультети', badge: null, description: 'Стоматология, ортодонтия, челюст-бет хирургиясы.', about: 'Заманбап стоматология клиникасы жана биринчи курстан практика.', contact: 'Декан: Абдыкалыкова Айгуль Бактыбековна' },
    en: { name: 'Faculty of Stomatology', badge: null, description: 'Dentistry, orthodontics and maxillofacial surgery.', about: 'Modern dental clinic and practice from the first year.', contact: 'Dean: Abdykalykova Aigul Baktybekovna' },
  },
  lechebnoe: {
    ru: { name: 'Факультет лечебного дела', badge: 'Популярное', description: 'Терапия, хирургия, внутренние болезни.', about: 'Клинические базы в ведущих больницах Бишкека.', contact: 'Декан: Джумалиева Нурзат Асановна' },
    kg: { name: 'Дарылоо иши факультети', badge: 'Атактуу', description: 'Терапия, хирургия, ички оорулар.', about: 'Бишкектин алдыңкы ооруканаларында клиникалык базалар.', contact: 'Декан: Джумалиева Нурзат Асановна' },
    en: { name: 'Faculty of General Medicine', badge: 'Popular', description: 'Therapy, surgery and internal medicine.', about: 'Clinical bases in leading hospitals of Bishkek.', contact: 'Dean: Jumalieva Nurzat Asanovna' },
  },
  pharmacy: {
    ru: { name: 'Факультет фармации', badge: null, description: 'Фармация, клиническая фармация, фармакоэкономика.', about: 'Современные лаборатории и партнёрство с фармацевтическими компаниями.', contact: 'Декан: Байгазиев Айбек Маратович' },
    kg: { name: 'Фармация факультети', badge: null, description: 'Фармация, клиникалык фармация, фармакоэкономика.', about: 'Заманбап лабораториялар жана фармацевтикалык компаниялар менен өнөктөштүк.', contact: 'Декан: Байгазиев Айбек Маратович' },
    en: { name: 'Faculty of Pharmacy', badge: null, description: 'Pharmacy, clinical pharmacy and pharmacoeconomics.', about: 'Modern laboratories and partnerships with pharmaceutical companies.', contact: 'Dean: Baigaziev Aibek Maratovich' },
  },
  pediatrics: {
    ru: { name: 'Факультет педиатрии', badge: null, description: 'Педиатрия, детская хирургия, неонатология.', about: 'Углублённая подготовка по работе с детьми всех возрастов.', contact: 'Декан: Токтоболотова Мира Кыдырбековна' },
    kg: { name: 'Педиатрия факультети', badge: null, description: 'Педиатрия, балдар хирургиясы, неонатология.', about: 'Бардык курактагы балдар менен иштөө боюнча терең даярдык.', contact: 'Декан: Токтоболотова Мира Кыдырбековна' },
    en: { name: 'Faculty of Pediatrics', badge: null, description: 'Pediatrics, pediatric surgery and neonatology.', about: 'In-depth training for working with children of all ages.', contact: 'Dean: Toktobolotova Mira Kydyrbekovna' },
  },
}

const PROFESSORS = {
  stomatology: [
    { name: 'Абдыкалыкова Айгуль', title: 'Декан', subject: 'Стоматология', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80' },
    { name: 'Алимов Айбек', title: 'Профессор', subject: 'Хирургия полости рта', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80' },
    { name: 'Кенжебаева Гульнара', title: 'Доцент', subject: 'Ортодонтия', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80' },
  ],
  lechebnoe: [
    { name: 'Джумалиева Нурзат', title: 'Декан', subject: 'Терапия', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80' },
    { name: 'Алимов Айбек', title: 'Профессор', subject: 'Хирургия', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80' },
    { name: 'Кенжебаева Гульнара', title: 'Доцент', subject: 'Фармакология', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80' },
  ],
  pharmacy: [
    { name: 'Байгазиев Айбек', title: 'Декан', subject: 'Фармацевтическая химия', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
    { name: 'Эшматов Данияр', title: 'Профессор', subject: 'Фармакоэкономика', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
    { name: 'Сейткалиева Инара', title: 'Доцент', subject: 'Клиническая фармация', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  ],
  pediatrics: [
    { name: 'Токтоболотова Мира', title: 'Декан', subject: 'Педиатрия', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'Кадыров Максат', title: 'Профессор', subject: 'Детская хирургия', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Сулайманов Искен', title: 'Доцент', subject: 'Неонатология', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  ],
}

export default function FacultyDetailPage() {
  const params     = useParams()
  const { lang }   = useI18n()
  const c          = COPY[lang] || COPY.ru
  const faculty    = faculties.find(f => f.slug === params.slug)

  if (!faculty) notFound()

  const copy       = FACULTY_COPY[params.slug]?.[lang] || FACULTY_COPY[params.slug]?.ru || {}
  const profs      = PROFESSORS[params.slug] ?? PROFESSORS.economics
  const [openProg, setOpenProg] = useState(null)
  const applyModal = useModal()

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <img src={faculty.image} alt={copy.name || faculty.name} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <nav className="breadcrumb" style={{ justifyContent:'center', marginBottom:'1.5rem' }}>
            <Link href="/">{c.home}</Link><span>›</span>
            <Link href="/faculties">{c.faculties}</Link><span>›</span>
            <span>{copy.name || faculty.name}</span>
          </nav>
          {copy.badge && <span className={styles.badge}>{copy.badge}</span>}
          <h1 className={styles.heroTitle}>{copy.name || faculty.name}</h1>
          <p className={styles.heroDesc}>{copy.description || faculty.description}</p>
          <div className={styles.heroMeta}>
            <span style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <BookOpen size={16} strokeWidth={1.8} />
              {faculty.programs} {c.programsCount}
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <GraduationCap size={16} strokeWidth={1.8} />
              {faculty.students?.toLocaleString('ru')} {c.studentsCount}
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <Users size={16} strokeWidth={1.8} />
              {faculty.teachers} {c.teachersCount}
            </span>
          </div>
          <button className={styles.applyBtn} onClick={applyModal.open}>{c.applyFaculty}</button>
        </div>
      </section>

      {/* ── About ── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.about}</p>
            <h2 className="section-title">{copy.name || faculty.name}</h2>
          </div>
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            <p style={{ fontSize:'1rem', color:'#475569', lineHeight:1.8, marginBottom:'2rem' }}>
              {copy.about || faculty.fullDescription}
            </p>
            {faculty.achievements?.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {faculty.achievements.map((ach, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.875rem', background:'#f0f7ff', border:'1px solid #e0f0ff', borderRadius:12, padding:'0.875rem 1.25rem' }}>
                    <Trophy size={18} strokeWidth={1.8} style={{ color:'#0d47a1', flexShrink:0 }} />
                    <span style={{ fontSize:'0.9rem', color:'#1e3a5f', fontWeight:600 }}>{ach}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.study}</p>
            <h2 className="section-title">{c.programs}</h2>
          </div>
          <div className={styles.programs}>
            {faculty.programsList.map((prog, i) => (
              <div key={i} className={`${styles.accordItem} ${openProg===i ? styles.open:''}`}>
                <button className={styles.accordBtn} onClick={()=>setOpenProg(openProg===i ? null:i)}>
                  <span>{prog.name}</span>
                  <div className={styles.accordMeta}>
                    <span className={styles.degree}>{prog.degree}</span>
                    <span className={styles.accordIcon}>{openProg===i ? '−':'+'}</span>
                  </div>
                </button>
                <div className={styles.accordContent}>
                  <div className={styles.progDetails}>
                    <div className={styles.progDetail}><span>{c.degree}</span><strong>{prog.degree}</strong></div>
                    <div className={styles.progDetail}><span>{c.duration}</span><strong>{prog.duration}</strong></div>
                    <div className={styles.progDetail}><span>{c.cost}</span><strong>{prog.cost}</strong></div>
                    <div className={styles.progDetail}><span>{c.form}</span><strong>{c.fullTime}</strong></div>
                  </div>
                  <button className={styles.applySmBtn} onClick={applyModal.open}>{c.applyProgram}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Professors ── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.staff}</p>
            <h2 className="section-title">{c.teachers}</h2>
          </div>
          <div className={styles.profGrid}>
            {profs.map(p => (
              <div key={p.name} className={styles.profCard}>
                <img src={p.img} alt={p.name} className={styles.profImg} />
                <h3 className={styles.profName}>{p.name}</h3>
                <p className={styles.profTitle}>{p.title}</p>
                <p className={styles.profSubject}>{p.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacts ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.contactBox}>
            <div>
              <h3 className={styles.contactTitle}>{c.contactTitle}</h3>
              <p className={styles.contactSub}>{copy.contact || faculty.dean}</p>
            </div>
            <div className={styles.contactInfo}>
              <a href={`mailto:${faculty.email}`} className={styles.contactLink} style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <Mail size={15} strokeWidth={1.8} /> {faculty.email}
              </a>
              <a href={`tel:${faculty.phone.replace(/\s/g,'')}`} className={styles.contactLink} style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <Phone size={15} strokeWidth={1.8} /> {faculty.phone}
              </a>
            </div>
            <button className={styles.applyBtn} onClick={applyModal.open}>{c.applyDocs}</button>
          </div>
        </div>
      </section>

      <ApplyModal isOpen={applyModal.isOpen} onClose={applyModal.close} />
    </>
  )
}
