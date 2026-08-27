'use client'
import { useI18n } from '@/shared/lib/useI18n'
import { partnerUniversities } from '@/entities/partner/model/partners'
import {
  Globe2,
  PlaneTakeoff,
  GraduationCap,
  Award,
  BookOpenCheck,
  Users2,
  CalendarDays,
  BadgeCheck,
} from 'lucide-react'
import styles from './international.module.css'

const COPY = {
  ru: {
    label: 'Глобальное образование',
    title: 'Международное сотрудничество',
    sub: '40+ партнёров · 15 стран · Программы обмена и академической мобильности',
    stats: [
      { value: '40+', label: 'Партнёров', icon: Users2 },
      { value: '15', label: 'Стран', icon: Globe2 },
      { value: '200+', label: 'Студентов за рубежом', icon: GraduationCap },
      { value: '4', label: 'Крупных программ', icon: Award },
    ],
    programsLabel: 'Возможности',
    programsTitle: 'Программы академического обмена',
    partnerLabel: 'Партнёры',
    partnerTitle: 'Университеты-партнёры',
    processLabel: 'Как участвовать',
    processTitle: 'Процесс подачи заявки',
    testimonialsLabel: 'Отзывы',
    testimonialsTitle: 'Говорят наши студенты',
  },
  kg: {
    label: 'Дүйнөлүк билим берүү',
    title: 'Эл аралык кызматташтык',
    sub: '40+ өнөктөш · 15 өлкө · Алмашуу жана академиялык мобилдүүлүк программалары',
    stats: [
      { value: '40+', label: 'Өнөктөш', icon: Users2 },
      { value: '15', label: 'Өлкө', icon: Globe2 },
      { value: '200+', label: 'Чет өлкөдөгү студенттер', icon: GraduationCap },
      { value: '4', label: 'Негизги программа', icon: Award },
    ],
    programsLabel: 'Мүмкүнчүлүктөр',
    programsTitle: 'Академиялык алмашуу программалары',
    partnerLabel: 'Өнөктөштөр',
    partnerTitle: 'Өнөктөш университеттер',
    processLabel: 'Кантип катышуу керек',
    processTitle: 'Арыз берүү процесси',
    testimonialsLabel: 'Пикирлер',
    testimonialsTitle: 'Биздин студенттердин сөзү',
  },
  en: {
    label: 'Global Education',
    title: 'International cooperation',
    sub: '40+ partners · 15 countries · Exchange and academic mobility programs',
    stats: [
      { value: '40+', label: 'Partners', icon: Users2 },
      { value: '15', label: 'Countries', icon: Globe2 },
      { value: '200+', label: 'Students abroad', icon: GraduationCap },
      { value: '4', label: 'Major programs', icon: Award },
    ],
    programsLabel: 'Opportunities',
    programsTitle: 'Academic Exchange Programs',
    partnerLabel: 'Partners',
    partnerTitle: 'Partner Universities',
    processLabel: 'How to apply',
    processTitle: 'Application process',
    testimonialsLabel: 'Testimonials',
    testimonialsTitle: 'What our students say',
  },
}

const PROGRAMS = {
  ru: [
    { name: 'ERASMUS+', icon: PlaneTakeoff, desc: 'Академический обмен с европейскими университетами.', eligibility: '3–4 курс бакалавриата, средний балл ≥ 3.8', deadline: '15 февраля 2026' },
    { name: 'DAAD', icon: BookOpenCheck, desc: 'Стипендии и обмены для обучения в Германии.', eligibility: 'Студенты и аспиранты всех факультетов', deadline: '31 октября 2026' },
    { name: 'Fulbright', icon: GraduationCap, desc: 'Магистерское и докторское обучение в США.', eligibility: 'Выпускники бакалавриата, возраст 18–35 лет', deadline: '15 сентября 2026' },
    { name: 'OSI', icon: Globe2, desc: 'Стипендии Института открытого общества.', eligibility: 'Студенты всех уровней обучения', deadline: '1 апреля 2026' },
  ],
  kg: [
    { name: 'ERASMUS+', icon: PlaneTakeoff, desc: 'Европалык университеттер менен академиялык алмашуу.', eligibility: 'Бакалавриаттын 3–4-курс студенттери, орточо баа ≥ 3.8', deadline: '2026-жылдын 15-февралы' },
    { name: 'DAAD', icon: BookOpenCheck, desc: 'Германияда окуу үчүн стипендиялар жана алмашуулар.', eligibility: 'Бардык факультеттердин студенттери жана аспиранттары', deadline: '2026-жылдын 31-октябры' },
    { name: 'Fulbright', icon: GraduationCap, desc: 'АКШда магистрдик жана доктордук окуу.', eligibility: 'Бакалавр бүтүрүүчүлөрү, 18–35 жаш', deadline: '2026-жылдын 15-сентябры' },
    { name: 'OSI', icon: Globe2, desc: 'Ачык коом институтунун стипендиялары.', eligibility: 'Бардык деңгээлдеги студенттер', deadline: '2026-жылдын 1-апрели' },
  ],
  en: [
    { name: 'ERASMUS+', icon: PlaneTakeoff, desc: 'Academic exchange with European universities.', eligibility: '3rd-4th year undergraduates, GPA ≥ 3.8', deadline: 'February 15, 2026' },
    { name: 'DAAD', icon: BookOpenCheck, desc: 'Scholarships and exchanges for study in Germany.', eligibility: 'Students and PhD candidates from all faculties', deadline: 'October 31, 2026' },
    { name: 'Fulbright', icon: GraduationCap, desc: 'Master’s and doctoral study in the USA.', eligibility: 'Bachelor graduates, age 18–35', deadline: 'September 15, 2026' },
    { name: 'OSI', icon: Globe2, desc: 'Open Society Institute scholarships.', eligibility: 'Students of all study levels', deadline: 'April 1, 2026' },
  ],
}

const PROCESS = {
  ru: [
    { step: '01', title: 'Выберите программу', desc: 'Изучите доступные программы обмена и требования.' },
    { step: '02', title: 'Подайте заявку в КММУ', desc: 'Заполните заявку в международном отделе и получите одобрение.' },
    { step: '03', title: 'Подготовьте документы', desc: 'Соберите сертификаты, рекомендательные письма и необходимые формы.' },
    { step: '04', title: 'Отправьтесь в принимающий вуз', desc: 'Завершите подачу документов в университет-партнёр.' },
  ],
  kg: [
    { step: '01', title: 'Программаны тандаңыз', desc: 'Жеткиликтүү алмашуу программаларын жана талаптарын изилдеңиз.' },
    { step: '02', title: 'КММУга арыз бериңиз', desc: 'Эл аралык бөлүмдө арызды толтуруп, жактырылууну алыңыз.' },
    { step: '03', title: 'Документтерди даярдаңыз', desc: 'Сертификаттарды, сунуш каттарды жана керектүү формаларды топтоңуз.' },
    { step: '04', title: 'Кабыл алган ЖОЖго жөнөңүз', desc: 'Документтерди өнөктөш университетке тапшырууну аяктаңыз.' },
  ],
  en: [
    { step: '01', title: 'Choose a program', desc: 'Review available exchange programs and requirements.' },
    { step: '02', title: 'Apply to KMMU', desc: 'Fill out the application with the international office and get approval.' },
    { step: '03', title: 'Prepare documents', desc: 'Collect certificates, recommendation letters and required forms.' },
    { step: '04', title: 'Go to the host university', desc: 'Complete the submission to the partner university.' },
  ],
}

const TESTIMONIALS = {
  ru: [
    { name: 'Айзат Токтосунова', program: 'ERASMUS+ — Берлин, 2023–2024', faculty: 'IT-факультет', text: 'Год в Германии полностью изменил мой взгляд на учёбу и карьеру.' },
    { name: 'Адилет Успбеков', program: 'DAAD — Мюнхен, 2022', faculty: 'Инженерный факультет', text: 'Практика в немецкой компании дала бесценный опыт.' },
    { name: 'Нурзат Мамбетова', program: 'Fulbright — Бостон, 2023', faculty: 'Экономический факультет', text: 'Программа Fulbright открыла мне двери для международной карьеры.' },
  ],
  kg: [
    { name: 'Айзат Токтосунова', program: 'ERASMUS+ — Берлин, 2023–2024', faculty: 'IT факультети', text: 'Германиядагы бир жыл окуу жана карьера тууралуу көз карашымды толугу менен өзгөрттү.' },
    { name: 'Адилет Успбеков', program: 'DAAD — Мюнхен, 2022', faculty: 'Инженердик факультет', text: 'Немис компаниясындагы практика баа жеткис тажрыйба берди.' },
    { name: 'Нурзат Мамбетова', program: 'Fulbright — Бостон, 2023', faculty: 'Экономика факультети', text: 'Fulbright программасы мага эл аралык карьера үчүн мүмкүнчүлүк ачты.' },
  ],
  en: [
    { name: 'Aizat Toktosunova', program: 'ERASMUS+ — Berlin, 2023–2024', faculty: 'IT Faculty', text: 'A year in Germany completely changed my view of study and career.' },
    { name: 'Adilet Uspbekov', program: 'DAAD — Munich, 2022', faculty: 'Engineering Faculty', text: 'An internship in a German company gave me invaluable experience.' },
    { name: 'Nurzat Mambetova', program: 'Fulbright — Boston, 2023', faculty: 'Economics Faculty', text: 'Fulbright opened the doors to an international career for me.' },
  ],
}

export default function InternationalPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const programs = PROGRAMS[lang] || PROGRAMS.ru
  const processSteps = PROCESS[lang] || PROCESS.ru
  const testimonials = TESTIMONIALS[lang] || TESTIMONIALS.ru

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="section-label">{c.label}</p>
          <h1 className={styles.heroTitle}>{c.title}</h1>
          <p className={styles.heroSub}>{c.sub}</p>
          <div className={styles.heroStats}>
            {c.stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label}>
                  <Icon size={18} strokeWidth={2} />
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.programsLabel}</p>
            <h2 className="section-title">{c.programsTitle}</h2>
          </div>
          <div className={styles.programsGrid}>
            {programs.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.name} className={styles.programCard}>
                  <div className={styles.programHeader}>
                    <span className={styles.programIcon}><Icon size={26} strokeWidth={2.1} /></span>
                    <h3 className={styles.programName}>{p.name}</h3>
                  </div>
                  <p className={styles.programDesc}>{p.desc}</p>
                  <div className={styles.programMeta}>
                    <div>
                      <span className={styles.metaLabel}>{lang === 'en' ? 'Eligibility:' : lang === 'kg' ? 'Талаптар:' : 'Требования:'}</span>
                      <span className={styles.metaVal}>{p.eligibility}</span>
                    </div>
                    <div>
                      <span className={styles.metaLabel}>{lang === 'en' ? 'Deadline:' : lang === 'kg' ? 'Мөөнөтү:' : 'Дедлайн:'}</span>
                      <span className={styles.metaDeadline}>{p.deadline}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.partnerLabel}</p>
            <h2 className="section-title">{c.partnerTitle}</h2>
          </div>
          <div className={styles.uniGrid}>
            {partnerUniversities.map((u) => (
              <div key={u.id} className={styles.uniCard}>
                <div className={styles.uniFlag}>{u.flag}</div>
                <h3 className={styles.uniName}>{u.name}</h3>
                <p className={styles.uniCountry}>{u.country}</p>
                <p className={styles.uniSince}>{lang === 'en' ? 'Partner since' : lang === 'kg' ? 'Өнөктөш болгон' : 'Партнёр с'} {u.since}</p>
                <div className={styles.uniPrograms}>
                  {u.programs.map((prog) => (
                    <span key={prog} className={styles.uniProgramTag}>{prog}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.processLabel}</p>
            <h2 className="section-title">{c.processTitle}</h2>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((s) => (
              <div key={s.step} className={styles.processCard}>
                <span className={styles.processStep}>{s.step}</span>
                <h3 className={styles.processTitle}>{s.title}</h3>
                <p className={styles.processDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.testimonialsLabel}</p>
            <h2 className="section-title">{c.testimonialsTitle}</h2>
          </div>
          <div className={styles.testimonials}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialAuthor}>
                  <div>
                    <strong className={styles.testimonialName}>{t.name}</strong>
                    <p className={styles.testimonialProgram}>{t.program}</p>
                    <p className={styles.testimonialFaculty}>{t.faculty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
