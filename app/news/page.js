'use client'
import { useState } from 'react'
import NewsCard from '@/entities/news/ui/NewsCard'
import { news } from '@/entities/news/model/news'
import { useI18n } from '@/shared/lib/useI18n'
import styles from './news.module.css'

const COPY = {
  ru: {
    label: 'Новости',
    title: 'Университетские новости',
    sub: 'Будьте в курсе важных событий кампуса',
    categories: { all: 'Все', science: 'Наука', events: 'События', partnership: 'Партнёрство', students: 'Студенты' },
    empty: 'Новости по выбранному фильтру не найдены',
  },
  kg: {
    label: 'Жаңылыктар',
    title: 'Университеттин жаңылыктары',
    sub: 'Кампустагы маанилүү окуялардан кабардар болуңуз',
    categories: { all: 'Баары', science: 'Илим', events: 'Иш-чаралар', partnership: 'Өнөктөштүк', students: 'Студенттер' },
    empty: 'Тандалган фильтр боюнча жаңылыктар табылган жок',
  },
  en: {
    label: 'News',
    title: 'University news',
    sub: 'Stay updated with important campus events',
    categories: { all: 'All', science: 'Science', events: 'Events', partnership: 'Partnership', students: 'Students' },
    empty: 'No news found for the selected filter',
  },
}

const PER_PAGE = 6

export default function NewsPage() {
  const [active, setActive] = useState('all')
  const [page, setPage] = useState(1)
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru

  const categories = [
    { id: 'all', label: c.categories.all },
    { id: 'science', label: c.categories.science },
    { id: 'events', label: c.categories.events },
    { id: 'partnership', label: c.categories.partnership },
    { id: 'students', label: c.categories.students },
  ]

  const filtered = active === 'all' ? news : news.filter((a) => a.category === active)
  const total = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCat = (id) => {
    setActive(id)
    setPage(1)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className="section-label">{c.label}</p>
          <h1 className={styles.heroTitle}>{c.title}</h1>
          <p className={styles.heroSub}>{c.sub}</p>
        </div>
      </section>

      <section className={styles.main}>
        <div className="container">
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tab} ${active === cat.id ? styles.tabActive : ''}`}
                onClick={() => handleCat(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {paginated.length > 0 ? (
            <div className={styles.grid}>
              {paginated.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{c.empty}</p>
          )}

          {total > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Prev"
              >
                ←
              </button>
              {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className={styles.pageBtn}
                disabled={page === total}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
