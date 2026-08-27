'use client'
import { useState } from 'react'
import { useModal } from '@/shared/lib/useModal'
import { useI18n } from '@/shared/lib/useI18n'
import ApplyModal from '@/features/apply-modal/ui/ApplyModal'
import { admissionDates } from '@/shared/config/site'
import { Trophy, GraduationCap, Heart, Globe } from 'lucide-react'
import styles from './admission.module.css'

const GRANT_ICONS = [
  <Trophy       key="trophy" size={28} strokeWidth={1.6} />,
  <GraduationCap key="grad"  size={28} strokeWidth={1.6} />,
  <Heart        key="heart"  size={28} strokeWidth={1.6} />,
  <Globe        key="globe"  size={28} strokeWidth={1.6} />,
]

const COPY = {
  ru: {
    label: 'Абитуриентам',
    title: 'Приёмная кампания 2026',
    sub: 'Всё, что нужно знать о поступлении в КММУ',
    process: 'Процесс',
    processTitle: 'Как поступить в КММУ',
    finance: 'Финансирование',
    financeTitle: 'Стипендии и гранты',
    financeSub: 'Мы стремимся сделать качественное медицинское образование доступным для каждого',
    faqLabel: 'Вопросы',
    faqTitle: 'Часто задаваемые вопросы',
    ctaTitle: 'Готов стать студентом КММУ?',
    ctaSub: 'Подай заявку сейчас и начни карьеру в медицине. Мы ответим в течение 24 часов.',
    ctaBtn: 'Подать заявку на поступление',
    ctaLink: 'Задать вопрос →',
    applyLabel: 'Абитуриентам',
    applyTitle: 'Заполните заявку и получите консультацию',
    dateLabels: {
      applicationStart: 'Начало приёма',
      applicationEnd: 'Конец приёма',
      examDate: 'Экзамены',
      resultsDate: 'Результаты',
      enrollmentStart: 'Зачисление',
    },
    steps: [
      { num: '01', title: 'Подача заявки', desc: 'Заполните онлайн-заявку на нашем сайте или лично в приёмной комиссии. Укажите выбранный факультет и форму обучения.' },
      { num: '02', title: 'Сбор документов', desc: 'Подготовьте необходимые документы: аттестат, паспорт, 6 фотографий 3×4, медицинскую справку форма 086-у.' },
      { num: '03', title: 'Вступительные испытания', desc: 'Сдайте вступительные экзамены или предоставьте результаты ОРТ (государственного тестирования).' },
      { num: '04', title: 'Зачисление', desc: 'По результатам испытаний вы получите уведомление о зачислении. Внесите оплату за обучение и получите студенческий билет.' },
    ],
    faq: [
      { q: 'Какие документы нужны для поступления?', a: 'Аттестат об общем среднем образовании (или диплом), удостоверение личности/паспорт, 6 фотографий 3×4, медицинская справка 086-у, результаты ОРТ (при наличии).' },
      { q: 'Каков минимальный балл ОРТ для поступления?', a: 'Минимальный балл ОРТ для поступления составляет 110 по двум обязательным предметам. Для отдельных факультетов установлены более высокие пороговые значения.' },
      { q: 'Можно ли поступить без ОРТ?', a: 'Да. При отсутствии результатов ОРТ вы проходите вступительные экзамены непосредственно в университете. Расписание экзаменов публикуется на сайте в июне каждого года.' },
      { q: 'Есть ли бюджетные места?', a: 'Да, КММУ предоставляет государственные гранты (бюджетные места). Количество грантов по каждому факультету определяется ежегодно Министерством образования.' },
      { q: 'Какова стоимость обучения?', a: 'Стоимость зависит от факультета и формы обучения: от 25 000 до 65 000 сомов в год. Точные данные уточняйте в приёмной комиссии.' },
    ],
    grants: [
      { name: 'Государственный грант', desc: 'Полное или частичное освобождение от оплаты для победителей ОРТ с высокими баллами.' },
      { name: 'Грант ректора',          desc: 'Предоставляется лучшим студентам факультетов по итогам каждого учебного года.' },
      { name: 'Социальная стипендия',   desc: 'Для студентов из малообеспеченных семей, сирот и детей из отдалённых районов.' },
      { name: 'Международный грант',    desc: 'Гранты DAAD, Fulbright, ERASMUS+ для обмена и стажировки за рубежом.' },
    ],
  },
  kg: {
    label: 'Абитуриенттерге',
    title: '2026-жылдагы кабыл алуу өнөктүгү',
    sub: 'КММУга тапшыруу тууралуу билишиңиз керек болгон бардык маалымат',
    process: 'Процесс',
    processTitle: 'КММУга кантип тапшыруу керек',
    finance: 'Каржылоо',
    financeTitle: 'Стипендиялар жана гранттар',
    financeSub: 'Биз сапаттуу медицина билимин ар бир адам үчүн жеткиликтүү кылууга умтулабыз',
    faqLabel: 'Суроолор',
    faqTitle: 'Көп берилүүчү суроолор',
    ctaTitle: 'КММУнун студенти болууга даярсызбы?',
    ctaSub: 'Азыр арыз бериңиз жана медициналык карьераны баштаңыз. Биз 24 саат ичинде жооп беребиз.',
    ctaBtn: 'Кабыл алууга арыз берүү',
    ctaLink: 'Суроо берүү →',
    applyLabel: 'Абитуриенттерге',
    applyTitle: 'Арызды толтуруңуз жана консультация алыңыз',
    dateLabels: {
      applicationStart: 'Кабыл алуу башталышы',
      applicationEnd: 'Кабыл алуу аягы',
      examDate: 'Экзамендер',
      resultsDate: 'Натыйжалар',
      enrollmentStart: 'Каттоо',
    },
    steps: [
      { num: '01', title: 'Арыз берүү', desc: 'Сайт аркылуу же кабыл алуу комиссиясында жеке түрдө онлайн арыз толтуруңуз. Тандалган факультетти жана окуу формасын көрсөтүңүз.' },
      { num: '02', title: 'Документтерди топтоо', desc: 'Керектүү документтерди даярдаңыз: аттестат, паспорт, 3×4 өлчөмүндө 6 сүрөт, 086-у формадагы медициналык маалымкат.' },
      { num: '03', title: 'Кирүү экзамендери', desc: 'Кирүү экзамендерин тапшырыңыз же ОРТ жыйынтыгын көрсөтүңүз.' },
      { num: '04', title: 'Каттоо', desc: 'Жыйынтыктар боюнча кабыл алынганыңыз тууралуу билдирүү аласыз. Окуу акысын төлөп, студенттик билетиңизди алыңыз.' },
    ],
    faq: [
      { q: 'Кабыл алуу үчүн кандай документтер керек?', a: 'Орто билим тууралуу аттестат (же диплом), инсандыгын күбөлөндүргөн документ/паспорт, 3×4 өлчөмүндө 6 сүрөт, 086-у медициналык маалымкат, ОРТ жыйынтыгы (бар болсо).' },
      { q: 'Кабыл алуу үчүн ОРТнын минималдуу упайы канча?', a: 'Кабыл алуу үчүн минималдуу упай эки милдеттүү предмет боюнча 110 балл. Айрым факультеттер үчүн жогору талаптар бар.' },
      { q: 'ОРТсыз тапшырууга болобу?', a: 'Ооба. ОРТ жыйынтыгы жок болсо, университеттин ичинде түздөн-түз кирүү экзамендерин тапшырасыз. Экзамендердин графиги жыл сайын июнда жарыяланат.' },
      { q: 'Бюджеттик орундар барбы?', a: 'Ооба, КММУ мамлекеттик гранттарды сунуштайт. Ар бир факультет боюнча гранттардын саны жыл сайын Билим берүү министрлиги тарабынан аныкталат.' },
      { q: 'Окуу акысы канча?', a: 'Баасы факультетке жана окуу формасына жараша: жылына 25 000 сомдон 65 000 сомго чейин. Так маалыматты кабыл алуу комиссиясынан билиңиз.' },
    ],
    grants: [
      { name: 'Мамлекеттик грант', desc: 'ОРТдан жогорку упай алган талапкерлер үчүн толук же жарым-жартылай акысыз окуу.' },
      { name: 'Ректордун гранты',  desc: 'Окуу жылынын жыйынтыгы боюнча мыкты студенттерге берилет.' },
      { name: 'Социалдык стипендия', desc: 'Аз камсыз болгон үй-бүлөлөрдөн, жетим балдардан жана алыскы аймактардан келген студенттер үчүн.' },
      { name: 'Эл аралык грант',   desc: 'Алмашуу жана чет өлкөдө стажировка үчүн DAAD, Fulbright, ERASMUS+ гранттары.' },
    ],
  },
  en: {
    label: 'Applicants',
    title: 'Admissions campaign 2026',
    sub: 'Everything you need to know about applying to KMMU',
    process: 'Process',
    processTitle: 'How to apply to KMMU',
    finance: 'Funding',
    financeTitle: 'Scholarships and grants',
    financeSub: 'We strive to make quality medical education accessible to everyone',
    faqLabel: 'Questions',
    faqTitle: 'Frequently asked questions',
    ctaTitle: 'Ready to become a KMMU student?',
    ctaSub: 'Apply now and start your medical career. We will respond within 24 hours.',
    ctaBtn: 'Apply for admission',
    ctaLink: 'Ask a question →',
    applyLabel: 'Applicants',
    applyTitle: 'Fill out the application and get a consultation',
    dateLabels: {
      applicationStart: 'Start of admissions',
      applicationEnd: 'End of admissions',
      examDate: 'Exams',
      resultsDate: 'Results',
      enrollmentStart: 'Enrollment',
    },
    steps: [
      { num: '01', title: 'Submit application', desc: 'Fill out the online application on our website or in person at the admissions office. Specify the chosen faculty and study format.' },
      { num: '02', title: 'Collect documents', desc: 'Prepare the required documents: certificate, passport, 6 photos 3×4, medical certificate form 086-u.' },
      { num: '03', title: 'Entrance exams', desc: 'Take the entrance exams or provide your ORT results (national testing).' },
      { num: '04', title: 'Enrollment', desc: 'Based on the results, you will receive an enrollment notice. Pay the tuition fee and receive your student ID.' },
    ],
    faq: [
      { q: 'What documents are needed for admission?', a: 'Secondary education certificate (or diploma), ID/passport, 6 photos 3×4, medical certificate 086-u, ORT results if available.' },
      { q: 'What is the minimum ORT score for admission?', a: 'The minimum ORT score is 110 for the two mandatory subjects. Some faculties have higher thresholds.' },
      { q: 'Can I apply without ORT?', a: 'Yes. If you do not have ORT results, you can take entrance exams directly at the university. The exam schedule is published on the website every June.' },
      { q: 'Are there budget places?', a: 'Yes, KMMU provides state grants (budget places). The number of grants per faculty is determined annually by the Ministry of Education.' },
      { q: 'How much is tuition?', a: 'The cost depends on the faculty and study format: from 25,000 to 65,000 som per year. Check the admissions office for exact figures.' },
    ],
    grants: [
      { name: 'State grant', desc: 'Full or partial tuition exemption for high-scoring ORT winners.' },
      { name: 'Rector’s grant', desc: 'Awarded to the best students of each faculty at the end of the academic year.' },
      { name: 'Social scholarship', desc: 'For students from low-income families, orphans and students from remote regions.' },
      { name: 'International grant', desc: 'DAAD, Fulbright, ERASMUS+ grants for exchange and study abroad.' },
    ],
  },
}

export default function AdmissionPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const [openFaq, setOpenFaq] = useState(null)
  const applyModal = useModal()

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="section-label">{c.label}</p>
          <h1 className={styles.heroTitle}>{c.title}</h1>
          <p className={styles.heroSub}>{c.sub}</p>
          <div className={styles.dates}>
            {Object.entries(admissionDates).map(([key, val]) => (
              <div key={key} className={styles.dateCard}>
                <span className={styles.dateLabel}>{c.dateLabels[key]}</span>
                <strong className={styles.dateValue}>{val}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.process}</p>
            <h2 className="section-title">{c.processTitle}</h2>
          </div>
          <div className={styles.stepsGrid}>
            {c.steps.map((s) => (
              <div key={s.num} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.finance}</p>
            <h2 className="section-title">{c.financeTitle}</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              {c.financeSub}
            </p>
          </div>
          <div className={styles.scholarGrid}>
            {c.grants.map((s, i) => (
              <div key={s.name} className={styles.scholarCard}>
                <span className={styles.scholarIcon}>{GRANT_ICONS[i]}</span>
                <h3 className={styles.scholarName}>{s.name}</h3>
                <p className={styles.scholarDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{c.faqLabel}</p>
            <h2 className="section-title">{c.faqTitle}</h2>
          </div>
          <div className={styles.faq}>
            {c.faq.map((item, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqBtn} onClick={() => toggleFaq(i)}>
                  <span>{item.q}</span>
                  <span className={styles.faqIcon}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={styles.faqContent}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
          <p className={styles.ctaSub}>{c.ctaSub}</p>
          <div className={styles.ctaActions}>
            <button className={styles.ctaBtn} onClick={applyModal.open}>
              {c.ctaBtn}
            </button>
            <a href="/contacts" className={styles.ctaLink}>{c.ctaLink}</a>
          </div>
        </div>
      </section>

      <ApplyModal isOpen={applyModal.isOpen} onClose={applyModal.close} />
    </>
  )
}
