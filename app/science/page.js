'use client'
import { useState } from 'react'
import { useI18n } from '@/shared/lib/useI18n'
import { useToast } from '@/shared/lib/useToast'
import {
  Brain,
  Zap,
  Leaf,
  HeartPulse,
  Building2,
  ChartColumnIncreasing,
  Microscope,
  CalendarDays,
  CircleCheckBig,
  FlaskConical,
  Atom,
  Users2,
  BadgeCheck,
} from 'lucide-react'
import styles from './science.module.css'

const COPY = {
  ru: {
    label: 'Наука',
    title: 'Научная деятельность',
    sub: 'Исследования, меняющие мир',
    stats: [
      { value: '25', label: 'лабораторий' },
      { value: '580+', label: 'учёных' },
      { value: '200+', label: 'публикаций в год' },
      { value: '15', label: 'активных грантов' },
    ],
    tabs: { areas: 'Направления', labs: 'Лаборатории', conferences: 'Конференции', grants: 'Гранты' },
    areasTitle: 'Исследовательские направления',
    labsTitle: 'Лаборатории',
    confUpcoming: 'Предстоящие',
    confPast: 'Прошедшие',
    grantIntro: 'КГУ активно поддерживает учёных в получении международных грантов.',
    apply: 'Подать заявку',
  },
  kg: {
    label: 'Илим',
    title: 'Илимий ишмердүүлүк',
    sub: 'Дүйнөнү өзгөрткөн изилдөөлөр',
    stats: [
      { value: '25', label: 'лаборатория' },
      { value: '580+', label: 'илимпоз' },
      { value: '200+', label: 'жылдык жарыялар' },
      { value: '15', label: 'активдүү грант' },
    ],
    tabs: { areas: 'Багыттар', labs: 'Лабораториялар', conferences: 'Конференциялар', grants: 'Гранттар' },
    areasTitle: 'Изилдөө багыттары',
    labsTitle: 'Лабораториялар',
    confUpcoming: 'Жакында боло тургандар',
    confPast: 'Өткөндөр',
    grantIntro: 'КМУ илимпоздорду эл аралык гранттарды алууда активдүү колдойт.',
    apply: 'Өтүнмө берүү',
  },
  en: {
    label: 'Research',
    title: 'Scientific activity',
    sub: 'Research that changes the world',
    stats: [
      { value: '25', label: 'laboratories' },
      { value: '580+', label: 'researchers' },
      { value: '200+', label: 'publications per year' },
      { value: '15', label: 'active grants' },
    ],
    tabs: { areas: 'Areas', labs: 'Labs', conferences: 'Conferences', grants: 'Grants' },
    areasTitle: 'Research areas',
    labsTitle: 'Laboratories',
    confUpcoming: 'Upcoming',
    confPast: 'Past',
    grantIntro: 'KSU actively supports researchers in obtaining international grants.',
    apply: 'Apply',
  },
}

const AREA_ICONS = {
  ai: Brain,
  energy: Zap,
  ecology: Leaf,
  biomed: HeartPulse,
  construction: Building2,
  economy: ChartColumnIncreasing,
}

const AREA_DATA = {
  ru: [
    { icon: 'ai', title: 'Искусственный интеллект', desc: 'Алгоритмы машинного обучения, компьютерное зрение и NLP.' },
    { icon: 'energy', title: 'Возобновляемая энергетика', desc: 'Солнечная и ветровая энергетика для горных условий Кыргызстана.' },
    { icon: 'ecology', title: 'Экология и климат', desc: 'Мониторинг экосистем и влияние климатических изменений.' },
    { icon: 'biomed', title: 'Биомедицина', desc: 'Новые методы диагностики и лечения.' },
    { icon: 'construction', title: 'Строительные технологии', desc: 'Сейсмостойкое строительство и энергоэффективные материалы.' },
    { icon: 'economy', title: 'Цифровая экономика', desc: 'Блокчейн, финтех и электронные госуслуги.' },
  ],
  kg: [
    { icon: 'ai', title: 'Жасалма интеллект', desc: 'Машина үйрөнүү, компьютердик көрүү жана NLP.' },
    { icon: 'energy', title: 'Кайра жаралуучу энергетика', desc: 'Тоолуу Кыргызстан үчүн күн жана шамал энергетикасы.' },
    { icon: 'ecology', title: 'Экология жана климат', desc: 'Экосистемаларды мониторингдөө жана климаттын өзгөрүшү.' },
    { icon: 'biomed', title: 'Биомедицина', desc: 'Диагностика жана дарылоонун жаңы ыкмалары.' },
    { icon: 'construction', title: 'Курулуш технологиялары', desc: 'Сейсмого туруктуу курулуш жана энергия үнөмдөөчү материалдар.' },
    { icon: 'economy', title: 'Санарип экономика', desc: 'Блокчейн, финтех жана электрондук кызматтар.' },
  ],
  en: [
    { icon: 'ai', title: 'Artificial Intelligence', desc: 'Machine learning, computer vision and NLP.' },
    { icon: 'energy', title: 'Renewable Energy', desc: 'Solar and wind energy adapted for mountainous Kyrgyzstan.' },
    { icon: 'ecology', title: 'Ecology and Climate', desc: 'Ecosystem monitoring and climate change impact.' },
    { icon: 'biomed', title: 'Biomedicine', desc: 'New diagnostic and treatment methods.' },
    { icon: 'construction', title: 'Construction Technologies', desc: 'Seismic-resistant construction and energy-efficient materials.' },
    { icon: 'economy', title: 'Digital Economy', desc: 'Blockchain, fintech and e-government services.' },
  ],
}

const LAB_DATA = {
  ru: [
    { name: 'Лаборатория ИИ и больших данных', faculty: 'IT-факультет', equipment: 'GPU-кластер', staff: 18 },
    { name: 'Центр биомедицинских исследований', faculty: 'Медицинский факультет', equipment: 'ПЦР-анализаторы', staff: 24 },
    { name: 'Лаборатория возобновляемой энергетики', faculty: 'Инженерный факультет', equipment: 'Солнечные панели', staff: 14 },
    { name: 'Экологическая лаборатория', faculty: 'Инженерный факультет', equipment: 'Масс-спектрометры', staff: 12 },
    { name: 'Лаборатория цифровой экономики', faculty: 'Экономический факультет', equipment: 'Аналитические платформы', staff: 10 },
    { name: 'Лингвистический центр', faculty: 'Педагогический факультет', equipment: 'Интерактивные доски', staff: 8 },
  ],
  kg: [
    { name: 'Жасалма интеллект жана чоң маалыматтар лабораториясы', faculty: 'IT факультети', equipment: 'GPU кластер', staff: 18 },
    { name: 'Биомедициналык изилдөөлөр борбору', faculty: 'Медицина факультети', equipment: 'ПЦР анализаторлор', staff: 24 },
    { name: 'Кайра жаралуучу энергетика лабораториясы', faculty: 'Инженердик факультет', equipment: 'Күн панелдери', staff: 14 },
    { name: 'Экологиялык лаборатория', faculty: 'Инженердик факультет', equipment: 'Масс-спектрометрлер', staff: 12 },
    { name: 'Санарип экономика лабораториясы', faculty: 'Экономика факультети', equipment: 'Аналитикалык платформалар', staff: 10 },
    { name: 'Лингвистикалык борбор', faculty: 'Педагогика факультети', equipment: 'Интерактивдүү такталар', staff: 8 },
  ],
  en: [
    { name: 'AI and Big Data Lab', faculty: 'IT Faculty', equipment: 'GPU cluster', staff: 18 },
    { name: 'Biomedical Research Center', faculty: 'Medical Faculty', equipment: 'PCR analyzers', staff: 24 },
    { name: 'Renewable Energy Lab', faculty: 'Engineering Faculty', equipment: 'Solar panels', staff: 14 },
    { name: 'Ecology Lab', faculty: 'Engineering Faculty', equipment: 'Mass spectrometers', staff: 12 },
    { name: 'Digital Economy Lab', faculty: 'Economics Faculty', equipment: 'Analytics platforms', staff: 10 },
    { name: 'Linguistics Center', faculty: 'Pedagogy Faculty', equipment: 'Interactive boards', staff: 8 },
  ],
}

const CONFERENCES = {
  ru: {
    upcoming: [
      { title: 'International Conference on Digital Innovations', date: '15–17 апреля 2025', location: 'Бишкек, КГУ' },
      { title: 'Центральноазиатский форум по возобновляемой энергетике', date: '6–8 мая 2025', location: 'Бишкек, КГУ' },
      { title: 'Конференция молодых учёных КГУ', date: '22 марта 2025', location: 'Бишкек, КГУ' },
    ],
    past: [
      { title: 'IV Евразийская конференция по биомедицине', date: '10–12 октября 2024', location: 'Алматы / онлайн' },
      { title: 'Forum of Educators of Central Asia', date: '5–7 сентября 2024', location: 'Бишкек, КГУ' },
    ],
  },
  kg: {
    upcoming: [
      { title: 'Digital Innovations эл аралык конференциясы', date: '2025-жылдын 15–17-апрели', location: 'Бишкек, КМУ' },
      { title: 'Кайра жаралуучу энергетика боюнча Борбор Азия форуму', date: '2025-жылдын 6–8-майы', location: 'Бишкек, КМУ' },
      { title: 'КМУнун жаш илимпоздор конференциясы', date: '2025-жылдын 22-марты', location: 'Бишкек, КМУ' },
    ],
    past: [
      { title: 'Биомедицина боюнча IV Евразия конференциясы', date: '2024-жылдын 10–12-октябры', location: 'Алматы / онлайн' },
      { title: 'Борбор Азиянын мугалимдер форуму', date: '2024-жылдын 5–7-сентябры', location: 'Бишкек, КМУ' },
    ],
  },
  en: {
    upcoming: [
      { title: 'International Conference on Digital Innovations', date: 'April 15–17, 2025', location: 'Bishkek, KSU' },
      { title: 'Central Asian Forum on Renewable Energy', date: 'May 6–8, 2025', location: 'Bishkek, KSU' },
      { title: 'KSU Young Scientists Conference', date: 'March 22, 2025', location: 'Bishkek, KSU' },
    ],
    past: [
      { title: 'IV Eurasian Conference on Biomedicine', date: 'October 10–12, 2024', location: 'Almaty / online' },
      { title: 'Forum of Educators of Central Asia', date: 'September 5–7, 2024', location: 'Bishkek, KSU' },
    ],
  },
}

const GRANTS = {
  ru: [
    { name: 'USAID Research Grant', amount: '$500 000', area: 'Возобновляемая энергетика', deadline: '01.06.2025' },
    { name: 'ERASMUS+ Staff Exchange', amount: '€80 000', area: 'Все направления', deadline: '15.05.2025' },
    { name: 'DAAD Graduate Scholarship', amount: '€12 600/год', area: 'Науки и технологии', deadline: '30.04.2025' },
    { name: 'Грант НАН КР', amount: '1 200 000 сом', area: 'Приоритетные отрасли', deadline: '01.07.2025' },
  ],
  kg: [
    { name: 'USAID Research Grant', amount: '$500 000', area: 'Кайра жаралуучу энергетика', deadline: '01.06.2025' },
    { name: 'ERASMUS+ Staff Exchange', amount: '€80 000', area: 'Бардык багыттар', deadline: '15.05.2025' },
    { name: 'DAAD Graduate Scholarship', amount: '€12 600/жыл', area: 'Илим жана технологиялар', deadline: '30.04.2025' },
    { name: 'КР УИА гранты', amount: '1 200 000 сом', area: 'Приоритеттүү тармактар', deadline: '01.07.2025' },
  ],
  en: [
    { name: 'USAID Research Grant', amount: '$500 000', area: 'Renewable Energy', deadline: '01.06.2025' },
    { name: 'ERASMUS+ Staff Exchange', amount: '€80 000', area: 'All areas', deadline: '15.05.2025' },
    { name: 'DAAD Graduate Scholarship', amount: '€12 600/year', area: 'Science & Technology', deadline: '30.04.2025' },
    { name: 'NAS KR Grant', amount: '1,200,000 som', area: 'Priority sectors', deadline: '01.07.2025' },
  ],
}

export default function SciencePage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('areas')

  const handleGrantApply = () => {
    toast.info(
      lang === 'en'
        ? 'Go to the admissions page to submit a grant application.'
        : lang === 'kg'
          ? 'Грантка өтүнмө берүү үчүн кабыл алуу барагына өтүңүз.'
          : 'Перейдите на страницу приёмной комиссии для подачи заявки на грант.'
    )
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <div className={styles.heroContent}>
            <p className="section-label">{c.label}</p>
            <h1 className={styles.heroTitle}>{c.title}</h1>
            <p className={styles.heroSub}>{c.sub}</p>
            <div className={styles.heroStats}>
              {c.stats.map((s, idx) => {
                const StatIcon = idx === 0 ? FlaskConical : idx === 1 ? Users2 : idx === 2 ? BadgeCheck : CalendarDays
                return (
                  <div key={s.label}>
                    <StatIcon size={18} strokeWidth={2} />
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.tabNav}>
        <div className="container">
          <div className={styles.tabs}>
            {[
              { id: 'areas', label: c.tabs.areas },
              { id: 'labs', label: c.tabs.labs },
              { id: 'conferences', label: c.tabs.conferences },
              { id: 'grants', label: c.tabs.grants },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className={styles.content}>
        <div className="container">
          {activeTab === 'areas' && (
            <div className={styles.areasGrid}>
              {AREA_DATA[lang || 'ru'].map((area) => {
                const Icon = AREA_ICONS[area.icon] || Brain
                return (
                  <div key={area.title} className={styles.areaCard}>
                    <div className={styles.areaIcon}>
                      <Icon size={34} strokeWidth={1.9} />
                    </div>
                    <h3 className={styles.areaTitle}>{area.title}</h3>
                    <p className={styles.areaDesc}>{area.desc}</p>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'labs' && (
            <div className={styles.labsGrid}>
              {LAB_DATA[lang || 'ru'].map((lab) => (
                <div key={lab.name} className={styles.labCard}>
                  <div className={styles.labIcon}>
                    <Microscope size={28} strokeWidth={1.8} />
                  </div>
                  <div className={styles.labInfo}>
                    <h3 className={styles.labName}>{lab.name}</h3>
                    <p className={styles.labFaculty}>{lab.faculty}</p>
                    <p className={styles.labEquipment}>{lab.equipment}</p>
                    <span className={styles.labStaff}>
                      <Users2 size={14} /> {lab.staff} {lang === 'en' ? 'staff' : lang === 'kg' ? 'кызматкер' : 'сотрудников'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'conferences' && (
            <div className={styles.confWrapper}>
              <div className={styles.confSection}>
                <h3 className={styles.confSectionTitle}>
                  <CalendarDays size={18} /> {c.confUpcoming}
                </h3>
                {CONFERENCES[lang || 'ru'].upcoming.map((conf) => (
                  <div key={conf.title} className={`${styles.confItem} ${styles.upcoming}`}>
                    <div className={styles.confInfo}>
                      <h4 className={styles.confTitle}>{conf.title}</h4>
                      <p className={styles.confMeta}>{conf.date} · {conf.location}</p>
                    </div>
                    <button className={styles.confBtn} onClick={handleGrantApply}>
                      {lang === 'en' ? 'Register' : lang === 'kg' ? 'Катталуу' : 'Зарегистрироваться'}
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.confSection} style={{ marginTop: '2rem' }}>
                <h3 className={styles.confSectionTitle}>
                  <CircleCheckBig size={18} /> {c.confPast}
                </h3>
                {CONFERENCES[lang || 'ru'].past.map((conf) => (
                  <div key={conf.title} className={`${styles.confItem} ${styles.past}`}>
                    <div className={styles.confInfo}>
                      <h4 className={styles.confTitle}>{conf.title}</h4>
                      <p className={styles.confMeta}>{conf.date} · {conf.location}</p>
                    </div>
                    <span className={styles.confPastBadge}>{lang === 'en' ? 'Completed' : lang === 'kg' ? 'Аякталды' : 'Завершена'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grants' && (
            <div>
              <p className={styles.grantsIntro}>{c.grantIntro}</p>
              <div className={styles.grantsGrid}>
                {GRANTS[lang || 'ru'].map((g) => (
                  <div key={g.name} className={styles.grantCard}>
                    <div className={styles.grantAmount}>{g.amount}</div>
                    <h3 className={styles.grantName}>{g.name}</h3>
                    <p className={styles.grantArea}>{g.area}</p>
                    <p className={styles.grantDeadline}>
                      <CalendarDays size={14} /> {lang === 'en' ? 'Deadline' : lang === 'kg' ? 'Мөөнөтү' : 'Дедлайн'}: {g.deadline}
                    </p>
                    <button className={styles.grantBtn} onClick={handleGrantApply}>
                      {c.apply}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
