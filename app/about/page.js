'use client'
import { useState } from 'react'
import { useI18n } from '@/shared/lib/useI18n'
import { Award, Rocket, Globe, Users } from 'lucide-react'
import styles from './about.module.css'

const VALUE_ICONS = [
  <Award  key="award"  size={26} strokeWidth={1.7} />,
  <Rocket key="rocket" size={26} strokeWidth={1.7} />,
  <Globe  key="globe"  size={26} strokeWidth={1.7} />,
  <Users  key="users"  size={26} strokeWidth={1.7} />,
]

const COPY = {
  ru: {
    heroLabel: 'История',
    heroTitle: 'О Кыргызском государственном университете',
    heroSub: 'Основан в 1932 году · 90+ лет образования · Топ-5 вузов Центральной Азии',
    facts: [
      { num: '1932', label: 'Год основания' },
      { num: '90+', label: 'Лет истории' },
      { num: '150 000+', label: 'Выпускников' },
      { num: '12 900+', label: 'Студентов сегодня' },
    ],
    valuesLabel: 'Наши принципы',
    valuesTitle: 'Ценности КГУ',
    values: [
      { title: 'Качество', desc: 'Международная аккредитация и высокий стандарт обучения.' },
      { title: 'Инновации', desc: 'Современные лаборатории и цифровые технологии.' },
      { title: 'Открытость', desc: 'Обмены, партнёрства и совместные исследования.' },
      { title: 'Инклюзивность', desc: 'Поддержка студентов из разных регионов и групп.' },
    ],
    timelineLabel: 'Хронология',
    timelineTitle: 'История КГУ',
    timeline: [
      { year: '1932', title: 'Основание университета', desc: 'КГУ начал работу как педагогический институт.' },
      { year: '1951', title: 'Статус университета', desc: 'Институт был реорганизован в полноценный университет.' },
      { year: '1968', title: 'Новый главный корпус', desc: 'Открыт главный учебный корпус на улице Киевской.' },
      { year: '1991', title: 'Эпоха независимости', desc: 'Университет получил новый импульс к развитию.' },
      { year: '2005', title: 'Международная аккредитация', desc: 'КГУ вышел на новый уровень международного признания.' },
      { year: '2015', title: 'IT-факультет', desc: 'Открыт факультет информационных технологий.' },
      { year: '2020', title: 'Цифровая трансформация', desc: 'Запущены электронные платформы и цифровой документооборот.' },
      { year: '2024', title: 'Топ-5 ЦА', desc: 'КГУ вошёл в топ-5 вузов Центральной Азии.' },
    ],
    leadershipLabel: 'Руководство',
    leadershipTitle: 'Жетекчилик',
    leadership: [
      { name: 'Исаков Алмазбек Рысбекович', role: 'Ректор', desc: 'Доктор технических наук, профессор. Возглавляет университет с 2018 года.' },
      { name: 'Мамытова Жылдыз Кубатовна', role: 'Проректор по учебной работе', desc: 'Координирует образовательные программы и качество обучения.' },
      { name: 'Бакытбеков Нурлан Асанович', role: 'Проректор по науке', desc: 'Отвечает за исследования и международное сотрудничество.' },
      { name: 'Токоева Айгуль Сейтбековна', role: 'Проректор по финансам', desc: 'Управляет финансовыми ресурсами и стратегическим развитием.' },
    ],
    accLabel: 'Признание',
    accTitle: 'Аккредитации',
    accSub: 'Наши программы признаны ведущими международными организациями',
    accreditations: [
      { name: 'ACQUIN', country: 'Германия', year: '2024', type: 'Институциональная' },
      { name: 'NARIC', country: 'ЕС', year: '2023', type: 'Академическое признание' },
      { name: 'QS Stars', country: 'Международная', year: '2024', type: 'Рейтинговая' },
      { name: 'ISO 9001', country: 'Международная', year: '2022', type: 'Система менеджмента' },
    ],
  },
  kg: {
    heroLabel: 'Тарых',
    heroTitle: 'Кыргыз мамлекеттик университети жөнүндө',
    heroSub: '1932-жылы негизделген · 90+ жылдык билим берүү · Борбор Азиядагы алдыңкы 5 ЖОЖдун бири',
    facts: [
      { num: '1932', label: 'Негизделген жыл' },
      { num: '90+', label: 'Тарых жылдары' },
      { num: '150 000+', label: 'Бүтүрүүчүлөр' },
      { num: '12 900+', label: 'Бүгүнкү студенттер' },
    ],
    valuesLabel: 'Биздин принциптер',
    valuesTitle: 'КМУнун баалуулуктары',
    values: [
      { title: 'Сапат', desc: 'Эл аралык аккредитация жана жогорку окутуу стандарты.' },
      { title: 'Инновация', desc: 'Заманбап лабораториялар жана санарип технологиялар.' },
      { title: 'Ачыктык', desc: 'Алмашуулар, өнөктөштүк жана биргелешкен изилдөөлөр.' },
      { title: 'Инклюзивдүүлүк', desc: 'Ар түрдүү аймактардан келген студенттерди колдоо.' },
    ],
    timelineLabel: 'Хронология',
    timelineTitle: 'КМУнун тарыхы',
    timeline: [
      { year: '1932', title: 'Университеттин негизделиши', desc: 'КМУ педагогикалык институт катары иштей баштаган.' },
      { year: '1951', title: 'Университет макамы', desc: 'Институт толук кандуу университетке айланган.' },
      { year: '1968', title: 'Жаңы башкы корпус', desc: 'Киев көчөсүндө башкы окуу корпусу ачылган.' },
      { year: '1991', title: 'Эгемендик доору', desc: 'Университет өнүгүүгө жаңы дем алган.' },
      { year: '2005', title: 'Эл аралык аккредитация', desc: 'КМУ эл аралык таанылуунун жаңы деңгээлине чыккан.' },
      { year: '2015', title: 'IT факультети', desc: 'Маалыматтык технологиялар факультети ачылган.' },
      { year: '2020', title: 'Санарип трансформация', desc: 'Электрондук платформалар жана санарип документооборот ишке кирген.' },
      { year: '2024', title: 'Борбор Азиядагы Top-5', desc: 'КМУ Борбор Азиядагы мыкты 5 ЖОЖдун катарына кирди.' },
    ],
    leadershipLabel: 'Жетекчилик',
    leadershipTitle: 'Жетекчилик',
    leadership: [
      { name: 'Исаков Алмазбек Рысбекович', role: 'Ректор', desc: 'Техникалык илимдердин доктору, профессор. 2018-жылдан бери жетектейт.' },
      { name: 'Мамытова Жылдыз Кубатовна', role: 'Окуу иштери боюнча проректор', desc: 'Билим берүү программаларын жана окутуунун сапатын координациялайт.' },
      { name: 'Бакытбеков Нурлан Асанович', role: 'Илим боюнча проректор', desc: 'Илимий ишмердүүлүк жана эл аралык кызматташтык үчүн жооптуу.' },
      { name: 'Токоева Айгуль Сейтбековна', role: 'Каржы боюнча проректор', desc: 'Каржылык ресурстарды жана стратегиялык өнүгүүнү башкарат.' },
    ],
    accLabel: 'Таанылуу',
    accTitle: 'Аккредитациялар',
    accSub: 'Биздин программалар эл аралык уюмдар тарабынан таанылган',
    accreditations: [
      { name: 'ACQUIN', country: 'Германия', year: '2024', type: 'Институционалдык' },
      { name: 'NARIC', country: 'ЕБ', year: '2023', type: 'Академиялык таануу' },
      { name: 'QS Stars', country: 'Эл аралык', year: '2024', type: 'Рейтинги' },
      { name: 'ISO 9001', country: 'Эл аралык', year: '2022', type: 'Менеджмент тутуму' },
    ],
  },
  en: {
    heroLabel: 'History',
    heroTitle: 'About Kyrgyz State University',
    heroSub: 'Founded in 1932 · 90+ years of education · Top-5 university in Central Asia',
    facts: [
      { num: '1932', label: 'Founded' },
      { num: '90+', label: 'Years of history' },
      { num: '150 000+', label: 'Graduates' },
      { num: '12 900+', label: 'Students today' },
    ],
    valuesLabel: 'Our Principles',
    valuesTitle: 'KSU Values',
    values: [
      { title: 'Quality', desc: 'International accreditation and a strong teaching standard.' },
      { title: 'Innovation', desc: 'Modern labs and digital technologies.' },
      { title: 'Openness', desc: 'Exchanges, partnerships and joint research.' },
      { title: 'Inclusion', desc: 'Support for students from different regions and groups.' },
    ],
    timelineLabel: 'Timeline',
    timelineTitle: 'KSU History',
    timeline: [
      { year: '1932', title: 'University founded', desc: 'KSU started as a pedagogical institute.' },
      { year: '1951', title: 'University status', desc: 'The institute was reorganized into a full university.' },
      { year: '1968', title: 'New main building', desc: 'The main academic building opened on Kievskaya Street.' },
      { year: '1991', title: 'Independence era', desc: 'The university gained a new impulse for growth.' },
      { year: '2005', title: 'International accreditation', desc: 'KSU reached a new level of global recognition.' },
      { year: '2015', title: 'IT Faculty', desc: 'The Faculty of Information Technology was launched.' },
      { year: '2020', title: 'Digital transformation', desc: 'Electronic platforms and digital document flow were introduced.' },
      { year: '2024', title: 'Top-5 in Central Asia', desc: 'KSU entered the top-5 universities in Central Asia.' },
    ],
    leadershipLabel: 'Leadership',
    leadershipTitle: 'Leadership',
    leadership: [
      { name: 'Isakov Almazbek Rysbekovich', role: 'Rector', desc: 'Doctor of Technical Sciences, Professor. Leading the university since 2018.' },
      { name: 'Mamytova Zhyldyz Kubatovna', role: 'Vice Rector for Academic Affairs', desc: 'Coordinates educational programs and quality assurance.' },
      { name: 'Bakytbekov Nurlan Asanovich', role: 'Vice Rector for Science', desc: 'Responsible for research and international cooperation.' },
      { name: 'Tokoeva Aigul Seitbekovna', role: 'Vice Rector for Finance', desc: 'Manages financial resources and strategic development.' },
    ],
    accLabel: 'Recognition',
    accTitle: 'Accreditations',
    accSub: 'Our programs are recognized by leading international organizations',
    accreditations: [
      { name: 'ACQUIN', country: 'Germany', year: '2024', type: 'Institutional' },
      { name: 'NARIC', country: 'EU', year: '2023', type: 'Academic recognition' },
      { name: 'QS Stars', country: 'International', year: '2024', type: 'Ranking' },
      { name: 'ISO 9001', country: 'International', year: '2022', type: 'Management system' },
    ],
  },
}

export default function AboutPage() {
  const { lang } = useI18n()
  const copy = COPY[lang] || COPY.ru
  const [openItem, setOpenItem] = useState(null)

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <div className={styles.heroContent}>
            <p className="section-label">{copy.heroLabel}</p>
            <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
            <p className={styles.heroSub}>{copy.heroSub}</p>
          </div>
        </div>
      </section>

      <section className={styles.factsBar}>
        <div className="container">
          <div className={styles.facts}>
            {copy.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <strong className={styles.factNum}>{f.num}</strong>
                <span className={styles.factLabel}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{copy.valuesLabel}</p>
            <h2 className="section-title">{copy.valuesTitle}</h2>
          </div>
          <div className={styles.valuesGrid}>
            {copy.values.map((v, i) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{VALUE_ICONS[i]}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="history">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{copy.timelineLabel}</p>
            <h2 className="section-title">{copy.timelineTitle}</h2>
          </div>
          <div className={styles.timeline}>
            {copy.timeline.map((item, i) => (
              <div key={item.year} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightBg}`} id="leadership">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{copy.leadershipLabel}</p>
            <h2 className="section-title">{copy.leadershipTitle}</h2>
          </div>
          <div className={styles.leaderGrid}>
            {copy.leadership.map((l) => (
              <div key={l.name} className={styles.leaderCard}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt={l.name} className={styles.leaderImg} />
                <div className={styles.leaderInfo}>
                  <h3 className={styles.leaderName}>{l.name}</h3>
                  <p className={styles.leaderRole}>{l.role}</p>
                  <p className={styles.leaderDesc}>{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="accreditations">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="section-label">{copy.accLabel}</p>
            <h2 className="section-title">{copy.accTitle}</h2>
            <p className="section-sub">{copy.accSub}</p>
          </div>
          <div className={styles.accredGrid}>
            {copy.accreditations.map((a) => (
              <div key={a.name} className={styles.accredCard}>
                <div className={styles.accredBadge}>{a.name}</div>
                <p className={styles.accredCountry}>{a.country}</p>
                <p className={styles.accredType}>{a.type}</p>
                <span className={styles.accredYear}>{lang === 'en' ? 'Received in' : lang === 'kg' ? 'Алынган жылы' : 'Получена в'} {a.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
