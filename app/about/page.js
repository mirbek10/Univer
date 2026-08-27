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
    heroTitle: 'О Кыргызском международном медицинском университете',
    heroSub: 'Основан в 1993 году · 30+ лет медицинского образования · Ведущий медицинский вуз Кыргызстана',
    facts: [
      { num: '1993', label: 'Год основания' },
      { num: '30+', label: 'Лет истории' },
      { num: '8 000+', label: 'Выпускников' },
      { num: '4 000+', label: 'Студентов сегодня' },
    ],
    valuesLabel: 'Наши принципы',
    valuesTitle: 'Ценности КММУ',
    values: [
      { title: 'Качество', desc: 'Международная аккредитация WFME и ACQUIN.' },
      { title: 'Инновации', desc: 'Современные клиники и симуляционный центр.' },
      { title: 'Открытость', desc: 'Обмены с ведущими медицинскими университетами мира.' },
      { title: 'Инклюзивность', desc: 'Поддержка студентов из всех регионов Кыргызстана.' },
    ],
    timelineLabel: 'Хронология',
    timelineTitle: 'История КММУ',
    timeline: [
      { year: '1993', title: 'Основание университета', desc: 'КММУ начал работу как первый частный медицинский университет Кыргызстана.' },
      { year: '2000', title: 'Первая международная аккредитация', desc: 'КММУ получил признание международных медицинских организаций.' },
      { year: '2008', title: 'Новый клинический корпус', desc: 'Открыт современный клинический корпус с собственными больницами.' },
      { year: '2015', title: 'Факультет стоматологии', desc: 'Открыт факультет стоматологии с собственной клиникой.' },
      { year: '2020', title: 'Цифровая медицина', desc: 'Запущены цифровые платформы для обучения и телемедицины.' },
      { year: '2024', title: 'Лидер медицинского образования', desc: 'КММУ вошёл в топ-3 медицинских вузов Центральной Азии.' },
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
    valuesTitle: 'КММУнун баалуулуктары',
    values: [
      { title: 'Сапат', desc: 'Эл аралык аккредитация жана жогорку окутуу стандарты.' },
      { title: 'Инновация', desc: 'Заманбап лабораториялар жана санарип технологиялар.' },
      { title: 'Ачыктык', desc: 'Алмашуулар, өнөктөштүк жана биргелешкен изилдөөлөр.' },
      { title: 'Инклюзивдүүлүк', desc: 'Ар түрдүү аймактардан келген студенттерди колдоо.' },
    ],
    timelineLabel: 'Хронология',
    timelineTitle: 'КММУнун тарыхы',
    timeline: [
      { year: '1993', title: 'Университеттин негизделиши', desc: 'КММУ Кыргызстандагы биринчи жеке медициналык университет катары иштей баштаган.' },
      { year: '2000', title: 'Биринчи эл аралык аккредитация', desc: 'КММУ эл аралык медициналык уюмдардын таанылуусун алган.' },
      { year: '2008', title: 'Жаңы клиникалык корпус', desc: 'Өз ооруканалары бар заманбап клиникалык корпус ачылган.' },
      { year: '2015', title: 'Стоматология факультети', desc: 'Өз клиникасы бар стоматология факультети ачылган.' },
      { year: '2020', title: 'Санарип медицина', desc: 'Окуу жана телемедицина үчүн санарип платформалар ишке кирген.' },
      { year: '2024', title: 'Медициналык билим берүүдөгү лидер', desc: 'КММУ Борбор Азиядагы мыкты 3 медициналык ЖОЖдун катарына кирди.' },
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
    heroTitle: 'About Kyrgyz International Medical University',
    heroSub: 'Founded in 1993 · 30+ years of medical education · Leading medical university in Kyrgyzstan',
    facts: [
      { num: '1993', label: 'Founded' },
      { num: '30+', label: 'Years of history' },
      { num: '8 000+', label: 'Graduates' },
      { num: '4 000+', label: 'Students today' },
    ],
    valuesLabel: 'Our Principles',
    valuesTitle: 'KMMU Values',
    values: [
      { title: 'Quality', desc: 'International accreditation and a strong teaching standard.' },
      { title: 'Innovation', desc: 'Modern labs and digital technologies.' },
      { title: 'Openness', desc: 'Exchanges, partnerships and joint research.' },
      { title: 'Inclusion', desc: 'Support for students from different regions and groups.' },
    ],
    timelineLabel: 'Timeline',
    timelineTitle: 'KMMU History',
    timeline: [
      { year: '1993', title: 'University founded', desc: 'KMMU started as the first private medical university in Kyrgyzstan.' },
      { year: '2000', title: 'First international accreditation', desc: 'KMMU received recognition from international medical organizations.' },
      { year: '2008', title: 'New clinical building', desc: 'A modern clinical building with its own hospitals opened.' },
      { year: '2015', title: 'Faculty of Stomatology', desc: 'The Faculty of Stomatology with its own clinic was launched.' },
      { year: '2020', title: 'Digital Medicine', desc: 'Digital platforms for education and telemedicine were introduced.' },
      { year: '2024', title: 'Leader in Medical Education', desc: 'KMMU entered the top-3 medical universities in Central Asia.' },
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
