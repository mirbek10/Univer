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
    ru: { title: 'КММУ вошёл в топ медицинских вузов Центральной Азии', excerpt: 'По результатам международного рейтинга, Кыргызский международный медицинский университет занял ведущее место среди медицинских вузов региона.', tag: 'Рейтинг', dateFormatted: '15 марта 2025' },
    kg: { title: 'КММУ Борбор Азиядагы эң мыкты медициналык ЖОЖдордун катарына кирди', excerpt: 'Эл аралык рейтингдин жыйынтыгында Кыргызский эл аралык медицина университети аймактагы медициналык ЖОЖдор арасында мыкты орунду ээледи.', tag: 'Рейтинг', dateFormatted: '15-март 2025' },
    en: { title: 'KMMU entered the top medical universities in Central Asia', excerpt: 'According to international rankings, Kyrgyz International Medical University took the leading position among medical universities in the region.', tag: 'Ranking', dateFormatted: 'March 15, 2025' },
  },
  'new-it-lab-opening': {
    ru: { title: 'Открытие нового лабораторного корпуса IT-факультета', excerpt: 'В присутствии министра образования и ректора университета состоялось торжественное открытие нового современного учебного корпуса факультета информационных технологий.', tag: 'Инфраструктура', dateFormatted: '1 марта 2025' },
    kg: { title: 'IT факультетинин жаңы лабораториялык корпусу ачылды', excerpt: 'Билим берүү министри жана университеттин ректору катышкан салтанатта маалыматтык технологиялар факультетинин заманбап жаңы окуу корпусу ачылды.', tag: 'Инфраструктура', dateFormatted: '2025-жылдын 1-марты' },
    en: { title: 'New laboratory building of the IT Faculty opened', excerpt: 'In the presence of the minister of education and the university rector, the new modern academic building of the Faculty of Information Technologies was officially opened.', tag: 'Infrastructure', dateFormatted: 'March 1, 2025' },
  },
  'erasmus-partnership-2025': {
    ru: { title: 'КММУ подписал соглашения об академическом обмене с 12 медицинскими вузами', excerpt: 'В рамках программы обмена подписаны новые соглашения о сотрудничестве с ведущими медицинскими университетами Европы и Азии.', tag: 'Партнёрство', dateFormatted: '20 февраля 2025' },
    kg: { title: 'КММУ 12 медициналык ЖОЖ менен академиялык алмашуу боюнча келишимдерге кол койду', excerpt: 'Алмашуу программасынын алкагында Европа жана Азиянын алдыңкы медициналык университеттери менен жаңы кызматташтык келишимдери түзүлдү.', tag: 'Өнөктөштүк', dateFormatted: '2025-жылдын 20-февралы' },
    en: { title: 'KMMU signed academic exchange agreements with 12 medical universities', excerpt: 'Within the exchange program, new cooperation agreements were signed with leading medical universities in Europe and Asia.', tag: 'Partnership', dateFormatted: 'February 20, 2025' },
  },
  'student-olympiad-winners': {
    ru: { title: 'Студенты КММУ завоевали 8 медалей на Международной медицинской олимпиаде', excerpt: 'Команда КММУ успешно выступила на Международной студенческой олимпиаде по медицине в Алматы, завоевав 3 золотые, 3 серебряные и 2 бронзовые медали.', tag: 'Студенты', dateFormatted: '10 февраля 2025' },
    kg: { title: 'КММУ студенттери эл аралык медицина олимпиадада 8 медаль утуп алышты', excerpt: 'КММУ командасы Алматы шаарындагы медицина боюнча эл аралык студенттик олимпиадада 3 алтын, 3 күмүш жана 2 коло медаль жеңип алды.', tag: 'Студенттер', dateFormatted: '2025-жылдын 10-февралы' },
    en: { title: 'KMMU students won 8 medals at the International Medical Olympiad', excerpt: 'The KMMU team performed successfully at the International Student Olympiad in medicine in Almaty, winning 3 gold, 3 silver and 2 bronze medals.', tag: 'Students', dateFormatted: 'February 10, 2025' },
  },
  'research-grant-received': {
    ru: { title: 'Учёные КММУ получили грант на исследования в области кардиологии', excerpt: 'Коллектив учёных факультета лечебного дела получил грант на трёхлетнее исследование в области кардиологии.', tag: 'Наука', dateFormatted: '28 января 2025' },
    kg: { title: 'КММУнун окумуштуулары кардиология боюнча изилдөө үчүн грант алышты', excerpt: 'Дарылоо иши факультетинин окумуштууларынын тобу кардиология боюнча үч жылдык изилдөө үчүн грант алышты.', tag: 'Илим', dateFormatted: '2025-жылдын 28-январы' },
    en: { title: 'KMMU researchers received a grant to study cardiology', excerpt: 'A team of General Medicine faculty researchers received a grant for a three-year study in cardiology.', tag: 'Science', dateFormatted: 'January 28, 2025' },
  },
  'spring-open-day': {
    ru: { title: 'День открытых дверей КММУ — весна 2025', excerpt: 'Приглашаем абитуриентов и их родителей на ежегодный День открытых дверей КММУ 12 апреля 2025 года. Узнайте всё о поступлении, программах и жизни в нашем университете.', tag: 'Мероприятие', dateFormatted: '15 января 2025' },
    kg: { title: 'КММУнун ачык эшик күнү — 2025-жаз', excerpt: 'Ата-энелер жана абитуриенттер 2025-жылдын 12-апрелиндеги КММУнун жыл сайын өтүүчү ачык эшик күнүнө чакырылат. Кабыл алуу, программалар жана университет жашоосу тууралуу билип алыңыз.', tag: 'Иш-чара', dateFormatted: '2025-жылдын 15-январы' },
    en: { title: 'KMMU Open Day - Spring 2025', excerpt: 'Applicants and parents are invited to the annual KMMU Open Day on April 12, 2025. Learn everything about admissions, programs and student life.', tag: 'Event', dateFormatted: 'January 15, 2025' },
  },
  'new-research-journal': {
    ru: { title: 'КММУ запускает новый научный журнал "Вестник КММУ: Медицина будущего"', excerpt: 'Университет основал новый рецензируемый научный журнал, посвящённый исследованиям в области медицины, стоматологии, фармации и педиатрии.', tag: 'Наука', dateFormatted: '5 января 2025' },
    kg: { title: 'КММУ “КММУ Жарчысы: Медицинанын келечеги” аттуу жаңы илимий журналды ишке киргизет', excerpt: 'Университет медицина, стоматология, фармация жана педиатрия боюнча изилдөөлөргө арналган жаңы рецензияланган илимий журналды негиздеди.', tag: 'Илим', dateFormatted: '2025-жылдын 5-январы' },
    en: { title: 'KMMU launches a new journal, “KMMU Bulletin: Medicine of the Future”', excerpt: 'The university has founded a new peer-reviewed journal dedicated to research in medicine, stomatology, pharmacy and pediatrics.', tag: 'Science', dateFormatted: 'January 5, 2025' },
  },
  'student-startup-award': {
    ru: { title: 'Стартап студента КММУ победил на национальном конкурсе медицинских инноваций', excerpt: 'Студенческий стартап "MedCare KG" из факультета педиатрии занял первое место на Национальном конкурсе инновационных проектов и получил финансирование в размере 2 млн сомов.', tag: 'Студенты', dateFormatted: '20 декабря 2024' },
    kg: { title: 'КММУ студентинин стартапы улуттук медициналык инновациялар сынагында жеңүүчү болду', excerpt: 'Педиатрия факультетинин "MedCare KG" студенттик стартапы Улуттук инновациялык долбоорлор сынагында биринчи орунду алып, 2 млн сомдук каржылоого ээ болду.', tag: 'Студенттер', dateFormatted: '2024-жылдын 20-декабры' },
    en: { title: 'A KMMU student startup won the national medical innovation competition', excerpt: 'The student startup “MedCare KG” from the Faculty of Pediatrics took first place in the National Competition of Innovative Projects and received 2 million som in funding.', tag: 'Students', dateFormatted: 'December 20, 2024' },
  },
  'accreditation-renewal-2025': {
    ru: { title: 'КММУ успешно прошёл международную аккредитацию WFME на 5 лет', excerpt: 'Всемирная федерация медицинского образования WFME продлила аккредитацию КММУ ещё на 5 лет, высоко оценив качество образовательных программ.', tag: 'Аккредитация', dateFormatted: '5 декабря 2024' },
    kg: { title: 'КММУ WFME эл аралык аккредитациясынан 5 жылга ийгиликтүү өттү', excerpt: 'Дүйнөлүк медициналык билим берүү федерациясы КММУнун аккредитациясын дагы 5 жылга узартты жана билим берүү программаларынын сапатын жогору баалады.', tag: 'Аккредитация', dateFormatted: '2024-жылдын 5-декабры' },
    en: { title: 'KMMU successfully passed the WFME international accreditation for 5 years', excerpt: 'The World Federation for Medical Education extended KMMU’s accreditation for another 5 years, highly evaluating the quality of its academic programs.', tag: 'Accreditation', dateFormatted: 'December 5, 2024' },
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
