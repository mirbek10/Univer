'use client'
import Link from 'next/link'
import { useI18n } from '@/shared/lib/useI18n'
import styles from './NewsCard.module.css'

const COPY = {
  ru: { readMore: 'Читать далее' },
  kg: { readMore: 'Улантуу' },
  en: { readMore: 'Read more' },
}

const NEWS_COPY = {
  'kgu-rated-top-university-2025': {
    ru: { title: 'КГУ вошёл в топ-5 лучших университетов Центральной Азии по рейтингу QS 2025', excerpt: 'По результатам международного рейтинга QS University Rankings, Кыргызский государственный университет занял 4-е место среди лучших вузов Центральноазиатского региона.', tag: 'Рейтинг', dateFormatted: '15 марта 2025' },
    kg: { title: 'КМУ QS 2025 рейтинги боюнча Борбор Азиядагы мыкты 5 университеттин катарына кирди', excerpt: 'QS University Rankings эл аралык рейтингинин жыйынтыгында Кыргыз мамлекеттик университети Борбор Азиядагы эң мыкты ЖОЖдордун ичинен 4-орунду ээледи.', tag: 'Рейтинг', dateFormatted: '15-март 2025' },
    en: { title: 'KSU entered the top 5 universities in Central Asia in the QS 2025 ranking', excerpt: 'According to QS University Rankings, Kyrgyz State University ranked 4th among the best universities in Central Asia.', tag: 'Ranking', dateFormatted: 'March 15, 2025' },
  },
  'new-it-lab-opening': {
    ru: { title: 'Открытие нового лабораторного корпуса IT-факультета', excerpt: 'В присутствии министра образования и ректора университета состоялось торжественное открытие нового современного учебного корпуса факультета информационных технологий.', tag: 'Инфраструктура', dateFormatted: '1 марта 2025' },
    kg: { title: 'IT факультетинин жаңы лабораториялык корпусу ачылды', excerpt: 'Билим берүү министри жана университеттин ректору катышкан салтанатта маалыматтык технологиялар факультетинин заманбап жаңы окуу корпусу ачылды.', tag: 'Инфраструктура', dateFormatted: '2025-жылдын 1-марты' },
    en: { title: 'New laboratory building of the IT Faculty opened', excerpt: 'In the presence of the minister of education and the university rector, the new modern academic building of the Faculty of Information Technologies was officially opened.', tag: 'Infrastructure', dateFormatted: 'March 1, 2025' },
  },
  'erasmus-partnership-2025': {
    ru: { title: 'КГУ подписал соглашения об академическом обмене с 12 европейскими вузами', excerpt: 'В рамках программы ERASMUS+ подписаны новые соглашения о сотрудничестве с университетами Германии, Франции, Польши и Нидерландов.', tag: 'Партнёрство', dateFormatted: '20 февраля 2025' },
    kg: { title: 'КМУ 12 европалык ЖОЖ менен академиялык алмашуу боюнча келишимдерге кол койду', excerpt: 'ERASMUS+ программасынын алкагында Германия, Франция, Польша жана Нидерланд университеттери менен жаңы кызматташтык келишимдери түзүлдү.', tag: 'Өнөктөштүк', dateFormatted: '2025-жылдын 20-февралы' },
    en: { title: 'KSU signed academic exchange agreements with 12 European universities', excerpt: 'Within the ERASMUS+ program, new cooperation agreements were signed with universities in Germany, France, Poland and the Netherlands.', tag: 'Partnership', dateFormatted: 'February 20, 2025' },
  },
  'student-olympiad-winners': {
    ru: { title: 'Студенты КГУ завоевали 8 медалей на Международной предметной олимпиаде', excerpt: 'Команда КГУ успешно выступила на Международной студенческой олимпиаде по математике и IT в Алматы, завоевав 3 золотые, 3 серебряные и 2 бронзовые медали.', tag: 'Студенты', dateFormatted: '10 февраля 2025' },
    kg: { title: 'КМУ студенттери эл аралык олимпиадада 8 медаль утуп алышты', excerpt: 'КМУ командасы Алматы шаарындагы математика жана IT боюнча эл аралык студенттик олимпиадада 3 алтын, 3 күмүш жана 2 коло медаль жеңип алды.', tag: 'Студенттер', dateFormatted: '2025-жылдын 10-февралы' },
    en: { title: 'KSU students won 8 medals at the International Subject Olympiad', excerpt: 'The KSU team performed successfully at the International Student Olympiad in mathematics and IT in Almaty, winning 3 gold, 3 silver and 2 bronze medals.', tag: 'Students', dateFormatted: 'February 10, 2025' },
  },
  'research-grant-received': {
    ru: { title: 'Учёные КГУ получили грант на исследование в области возобновляемой энергетики', excerpt: 'Коллектив учёных инженерного факультета получил грант размером 500 000 долларов на трёхлетнее исследование в области солнечной энергетики.', tag: 'Наука', dateFormatted: '28 января 2025' },
    kg: { title: 'КМУнун окумуштуулары жаңылануучу энергетика боюнча изилдөө үчүн грант алышты', excerpt: 'Инженердик факультеттин окумуштууларынын тобу күн энергетикасы боюнча үч жылдык изилдөө үчүн 500 000 долларлык грант алышты.', tag: 'Илим', dateFormatted: '2025-жылдын 28-январы' },
    en: { title: 'KSU researchers received a grant to study renewable energy', excerpt: 'A team of engineering faculty researchers received a $500,000 grant for a three-year study in solar energy.', tag: 'Science', dateFormatted: 'January 28, 2025' },
  },
  'spring-open-day': {
    ru: { title: 'День открытых дверей КГУ — весна 2025', excerpt: 'Приглашаем абитуриентов и их родителей на ежегодный День открытых дверей КГУ 12 апреля 2025 года. Узнайте всё о поступлении, программах и жизни в нашем университете.', tag: 'Мероприятие', dateFormatted: '15 января 2025' },
    kg: { title: 'КМУнун ачык эшик күнү — 2025-жаз', excerpt: 'Ата-энелер жана абитуриенттер 2025-жылдын 12-апрелиндеги КМУнун жыл сайын өтүүчү ачык эшик күнүнө чакырылат. Кабыл алуу, программалар жана университет жашоосу тууралуу билип алыңыз.', tag: 'Иш-чара', dateFormatted: '2025-жылдын 15-январы' },
    en: { title: 'KSU Open Day - Spring 2025', excerpt: 'Applicants and parents are invited to the annual KSU Open Day on April 12, 2025. Learn everything about admissions, programs and student life.', tag: 'Event', dateFormatted: 'January 15, 2025' },
  },
  'new-research-journal': {
    ru: { title: 'КГУ запускает новый научный журнал "Вестник КГУ: Цифровая наука"', excerpt: 'Университет основал новый рецензируемый научный журнал, посвящённый исследованиям в области цифровых технологий, IT и кибербезопасности.', tag: 'Наука', dateFormatted: '5 января 2025' },
    kg: { title: 'КМУ “КМУ Жарчысы: Санариптик илим” аттуу жаңы илимий журналды ишке киргизет', excerpt: 'Университет санариптик технологиялар, IT жана киберкоопсуздук боюнча изилдөөлөргө арналган жаңы рецензияланган илимий журналды негиздеди.', tag: 'Илим', dateFormatted: '2025-жылдын 5-январы' },
    en: { title: 'KSU launches a new journal, “KSU Bulletin: Digital Science”', excerpt: 'The university has founded a new peer-reviewed journal dedicated to research in digital technologies, IT and cybersecurity.', tag: 'Science', dateFormatted: 'January 5, 2025' },
  },
  'student-startup-award': {
    ru: { title: 'Стартап студента КГУ победил на национальном конкурсе инноваций', excerpt: 'Студенческий стартап "AgriTech KG" из IT-факультета занял первое место на Национальном конкурсе инновационных проектов и получил финансирование в размере 2 млн сомов.', tag: 'Студенты', dateFormatted: '20 декабря 2024' },
    kg: { title: 'КМУ студентинин стартапы улуттук инновациялар сынагында жеңүүчү болду', excerpt: '"AgriTech KG" студенттик стартапы IT факультетинен Улуттук инновациялык долбоорлор сынагында биринчи орунду алып, 2 млн сомдук каржылоого ээ болду.', tag: 'Студенттер', dateFormatted: '2024-жылдын 20-декабры' },
    en: { title: 'A KSU student startup won the national innovation competition', excerpt: 'The student startup “AgriTech KG” from the IT Faculty took first place in the National Competition of Innovative Projects and received 2 million som in funding.', tag: 'Students', dateFormatted: 'December 20, 2024' },
  },
  'accreditation-renewal-2025': {
    ru: { title: 'КГУ успешно прошёл международную аккредитацию ACQUIN на 5 лет', excerpt: 'Немецкое агентство по аккредитации качества образования ACQUIN продлило аккредитацию КГУ ещё на 5 лет, высоко оценив качество образовательных программ.', tag: 'Аккредитация', dateFormatted: '5 декабря 2024' },
    kg: { title: 'КМУ ACQUIN эл аралык аккредитациясынан 5 жылга ийгиликтүү өттү', excerpt: 'Билим берүүнүн сапатын аккредитациялоо боюнча ACQUIN немис агенттиги КМУнун аккредитациясын дагы 5 жылга узартты жана билим берүү программаларынын сапатын жогору баалады.', tag: 'Аккредитация', dateFormatted: '2024-жылдын 5-декабры' },
    en: { title: 'KSU successfully passed the ACQUIN international accreditation for 5 years', excerpt: 'The German ACQUIN accreditation agency extended KSU’s accreditation for another 5 years, highly evaluating the quality of its academic programs.', tag: 'Accreditation', dateFormatted: 'December 5, 2024' },
  },
}

export default function NewsCard({ article }) {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const localized = NEWS_COPY[article.slug]?.[lang] || NEWS_COPY[article.slug]?.ru || {}
  const formatted = localized.dateFormatted || article.dateFormatted || ''
  const [day, ...rest] = formatted.split(' ')

  return (
    <Link href={`/news/${article.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={article.image} alt={localized.title || article.title} className={styles.image} loading="lazy" />
        <div className={styles.dateOverlay}>
          <span className={styles.day}>{day}</span>
          <span className={styles.monthYear}>{rest.join(' ')}</span>
        </div>
        <span className={styles.tag}>{localized.tag || article.tag}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{localized.title || article.title}</h3>
        <p className={styles.excerpt}>{localized.excerpt || article.excerpt}</p>
        <span className={styles.readMore}>
          {c.readMore}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
