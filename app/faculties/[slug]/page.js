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
  economics: {
    ru: { name: 'Экономический факультет', badge: 'Популярное', description: 'Финансы, бухгалтерский учёт, мировая экономика и цифровой бизнес.', about: 'Экономический факультет КГУ готовит специалистов для банков, бизнеса и государственного сектора.', contact: 'Декан: Асанов Бакыт Нурланович' },
    kg: { name: 'Экономика факультети', badge: 'Атактуу', description: 'Каржы, бухгалтердик эсеп, дүйнөлүк экономика жана санарип бизнес.', about: 'КМУнун экономика факультети банктар, бизнес жана мамлекеттик сектор үчүн адистерди даярдайт.', contact: 'Декан: Асанов Бакыт Нурланович' },
    en: { name: 'Faculty of Economics', badge: 'Popular', description: 'Finance, accounting, global economics and digital business.', about: 'KSU Faculty of Economics prepares specialists for banks, business and the public sector.', contact: 'Dean: Asanov Bakyt Nurlanovich' },
  },
  medicine: {
    ru: { name: 'Медицинский факультет', badge: null, description: 'Лечебное дело, стоматология, фармация.', about: 'Современная клиническая база и практика в ведущих больницах страны.', contact: 'Декан: Джумалиева Нурзат Асановна' },
    kg: { name: 'Медицина факультети', badge: null, description: 'Дарылоо иши, стоматология, фармация.', about: 'Заманбап клиникалык база жана өлкөнүн алдыңкы ооруканаларында практика.', contact: 'Декан: Джумалиева Нурзат Асановна' },
    en: { name: 'Faculty of Medicine', badge: null, description: 'General medicine, dentistry and pharmacy.', about: 'Modern clinical base and practice in the country\'s leading hospitals.', contact: 'Dean: Jumalieva Nurzat Asanovna' },
  },
  it: {
    ru: { name: 'Факультет IT и программирования', badge: 'IT', description: 'Искусственный интеллект, кибербезопасность, разработка ПО.', about: 'Быстроразвивающийся факультет с партнёрством с Google, Microsoft и Yandex.', contact: 'Декан: Токтосунов Марат Бекович' },
    kg: { name: 'IT жана программалоо факультети', badge: 'IT', description: 'Жасалма интеллект, киберкоопсуздук, программалык камсыздоо.', about: 'Google, Microsoft жана Yandex менен кызматташа турган эң ылдам өнүгүп жаткан факультет.', contact: 'Декан: Токтосунов Марат Бекович' },
    en: { name: 'Faculty of IT and Programming', badge: 'IT', description: 'Artificial intelligence, cybersecurity and software development.', about: 'A fast-growing faculty in partnership with Google, Microsoft and Yandex.', contact: 'Dean: Toktosunov Marat Bekovich' },
  },
  pedagogy: {
    ru: { name: 'Педагогический факультет', badge: null, description: 'Начальное, среднее и дополнительное образование.', about: 'Лидер в подготовке учителей для школ Кыргызстана.', contact: 'Декан: Исматов Кубаныч Алиевич' },
    kg: { name: 'Педагогика факультети', badge: null, description: 'Башталгыч, орто жана кошумча билим берүү.', about: 'Кыргызстандын мектептери үчүн мугалимдерди даярдоодогу лидер.', contact: 'Декан: Исматов Кубаныч Алиевич' },
    en: { name: 'Faculty of Pedagogy', badge: null, description: 'Primary, secondary and additional education.', about: 'A leader in training teachers for schools across Kyrgyzstan.', contact: 'Dean: Ismatov Kubanych Alievich' },
  },
  engineering: {
    ru: { name: 'Инженерный факультет', badge: null, description: 'Строительство, энергетика, автоматизация.', about: 'Готовим специалистов для строительной отрасли, энергетики и промышленности.', contact: 'Декан: Бейшенов Азиз Тилекович' },
    kg: { name: 'Инженердик факультет', badge: null, description: 'Курулуш, энергетика, автоматташтыруу.', about: 'Курулуш тармагы, энергетика жана өнөр жай үчүн адистерди даярдайбыз.', contact: 'Декан: Бейшенов Азиз Тилекович' },
    en: { name: 'Faculty of Engineering', badge: null, description: 'Construction, energy and automation.', about: 'We train specialists for construction, energy and industry.', contact: 'Dean: Beyshenov Aziz Tilekovich' },
  },
  law: {
    ru: { name: 'Юридический факультет', badge: null, description: 'Гражданское, уголовное и международное право.', about: 'Кузница правовых кадров Кыргызстана.', contact: 'Декан: Мамытова Айгуль Сейтбековна' },
    kg: { name: 'Юридикалык факультет', badge: null, description: 'Жарандык, кылмыш жана эл аралык укук.', about: 'Кыргызстандын укук кадрларын даярдоочу мектеп.', contact: 'Декан: Мамытова Айгуль Сейтбековна' },
    en: { name: 'Faculty of Law', badge: null, description: 'Civil, criminal and international law.', about: 'A forge of legal professionals for Kyrgyzstan.', contact: 'Dean: Mamytova Aigul Seitbekovna' },
  },
}

const PROFESSORS = {
  economics: [
    { name: 'Асанов Бакыт Нурланович', title: 'Декан', subject: 'Макроэкономика', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Бакытбекова Айгуль', title: 'Профессор', subject: 'Финансы и кредит', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'Дуйшенбеков Марат', title: 'Доцент', subject: 'Менеджмент', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  ],
  medicine: [
    { name: 'Джумалиева Нурзат', title: 'Декан', subject: 'Педиатрия', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80' },
    { name: 'Алимов Айбек', title: 'Профессор', subject: 'Хирургия', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80' },
    { name: 'Кенжебаева Гульнара', title: 'Доцент', subject: 'Фармакология', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80' },
  ],
  it: [
    { name: 'Токтосунов Марат', title: 'Декан', subject: 'Алгоритмы и структуры', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
    { name: 'Эшматов Данияр', title: 'Профессор', subject: 'Искусственный интеллект', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
    { name: 'Сейткалиева Инара', title: 'Доцент', subject: 'Кибербезопасность', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  ],
  pedagogy: [
    { name: 'Исматов Кубаныч', title: 'Декан', subject: 'Педагогика', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
    { name: 'Мамытова Айгуль', title: 'Профессор', subject: 'Методика обучения', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'Бакиров Нурлан', title: 'Доцент', subject: 'Психология', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  ],
  engineering: [
    { name: 'Бейшенов Азиз', title: 'Декан', subject: 'Строительные конструкции', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
    { name: 'Осмонов Тилек', title: 'Профессор', subject: 'Энергетика', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Карабекова Зинат', title: 'Доцент', subject: 'Экология', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  ],
  law: [
    { name: 'Мамытова Айгуль', title: 'Декан', subject: 'Конституционное право', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { name: 'Кадыров Максат', title: 'Профессор', subject: 'Уголовное право', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { name: 'Сулайманов Искен', title: 'Доцент', subject: 'Международное право', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
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
