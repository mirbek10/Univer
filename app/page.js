'use client'
import Hero from '@/widgets/Hero'
import StatsSection from '@/features/stats-counter/ui/StatsSection'
import FacultyCard from '@/entities/faculty/ui/FacultyCard'
import NewsCard from '@/entities/news/ui/NewsCard'
import GalleryGrid from '@/features/gallery/ui/GalleryGrid'
import PartnersScroll from '@/entities/partner/ui/PartnersScroll'
import Preloader from '@/shared/ui/Preloader'
import CTASection from '@/app/_components/CTASection'
import AboutPreview from '@/app/_components/AboutPreview'
import { faculties } from '@/entities/faculty/model/faculties'
import { news } from '@/entities/news/model/news'
import { useI18n } from '@/shared/lib/useI18n'

const COPY = {
  ru: {
    facultiesLabel: 'Направления',
    facultiesTitle: 'Наши факультеты',
    facultiesSub: 'Выберите направление, которое откроет для вас новые горизонты',
    allFaculties: 'Все факультеты →',
    newsLabel: 'Актуально',
    newsTitle: 'Новости университета',
    allNews: 'Все новости →',
  },
  kg: {
    facultiesLabel: 'Багыттар',
    facultiesTitle: 'Биздин факультеттер',
    facultiesSub: 'Сиз үчүн жаңы мүмкүнчүлүктөрдү ачкан багытты тандаңыз',
    allFaculties: 'Бардык факультеттер →',
    newsLabel: 'Жаңылыктар',
    newsTitle: 'Университеттин жаңылыктары',
    allNews: 'Бардык жаңылыктар →',
  },
  en: {
    facultiesLabel: 'Directions',
    facultiesTitle: 'Our Faculties',
    facultiesSub: 'Choose a direction that opens new horizons for you',
    allFaculties: 'All faculties →',
    newsLabel: 'Latest',
    newsTitle: 'University News',
    allNews: 'All news →',
  },
}

export default function HomePage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const topFaculties = faculties.slice(0, 6)
  const latestNews = news.slice(0, 3)

  return (
    <>
      <Preloader />
      <Hero />
      <AboutPreview />
      <StatsSection />

      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label">{c.facultiesLabel}</p>
            <h2 className="section-title">{c.facultiesTitle}</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>{c.facultiesSub}</p>
          </div>
          <div className="cards-grid">
            {topFaculties.map((f) => (
              <FacultyCard key={f.id} faculty={f} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/faculties" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: '50px',
              border: '1.5px solid #e2e8f0',
              color: '#475569', textDecoration: 'none', fontWeight: 600,
              fontSize: '0.9rem', transition: 'all 0.2s',
              background: '#ffffff',
            }}>
              {c.allFaculties}
            </a>
          </div>
        </div>
      </section>

      <GalleryGrid />

      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="section-label">{c.newsLabel}</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>{c.newsTitle}</h2>
            </div>
            <a href="/news" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              {c.allNews}
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {latestNews.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        </div>
      </section>

      <PartnersScroll />
      <CTASection />
    </>
  )
}
