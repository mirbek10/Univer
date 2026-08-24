'use client'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { news } from '@/entities/news/model/news'
import { useToast } from '@/shared/lib/useToast'
import { useI18n } from '@/shared/lib/useI18n'
import { Calendar, PenLine, Link2 } from 'lucide-react'
import styles from './article.module.css'

const COPY = {
  ru: { home:'Главная', news:'Новости', share:'Поделиться:', copy:'Скопировать ссылку', copied:'Ссылка скопирована!', more:'Другие новости', by:'Автор' },
  kg: { home:'Башкы бет', news:'Жаңылыктар', share:'Бөлүшүү:', copy:'Шилтемени көчүрүү', copied:'Шилтеме көчүрүлдү!', more:'Башка жаңылыктар', by:'Автор' },
  en: { home:'Home', news:'News', share:'Share:', copy:'Copy link', copied:'Link copied!', more:'More news', by:'Author' },
}

export default function NewsDetailPage() {
  const params  = useParams()
  const article = news.find(n => n.slug === params.slug)
  if (!article) notFound()

  const related         = news.filter(n => n.id !== article.id && n.category === article.category).slice(0, 3)
  const fallbackRelated = news.filter(n => n.id !== article.id).slice(0, 3)
  const displayRelated  = related.length > 0 ? related : fallbackRelated

  return <ArticleContent article={article} related={displayRelated} />
}

function ArticleContent({ article, related }) {
  const { lang }  = useI18n()
  const c         = COPY[lang] || COPY.ru
  const { toast } = useToast()

  const handleShare = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href)
    toast.success(c.copied)
  }

  return (
    <>
      <section className={styles.hero}>
        <img src={article.image} alt={article.title} className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <nav className="breadcrumb" style={{ justifyContent:'center', marginBottom:'1.5rem' }}>
            <Link href="/">{c.home}</Link><span>›</span>
            <Link href="/news">{c.news}</Link><span>›</span>
            <span>{article.tag}</span>
          </nav>
          <span className={styles.tag}>{article.tag}</span>
          <h1 className={styles.heroTitle}>{article.title}</h1>
          <div className={styles.meta}>
            <span style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
              <Calendar size={14} strokeWidth={1.8} /> {article.dateFormatted}
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
              <PenLine size={14} strokeWidth={1.8} /> {c.by}: {article.author}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className="container">
          <div className={styles.layout}>
            <article className={styles.article}>
              <p className={styles.lead}>{article.excerpt}</p>
              {article.content?.split('\n\n').map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}

              <div className={styles.shareBar}>
                <span>{c.share}</span>
                <button className={styles.shareBtn} onClick={handleShare} title={c.copy}>
                  <Link2 size={14} strokeWidth={2} style={{ display:'inline', marginRight:'0.3rem' }} />
                  {c.copy}
                </button>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.shareLink}
                >
                  Telegram
                </a>
              </div>
            </article>

            <aside className={styles.sidebar}>
              <h3 className={styles.sideTitle}>{c.more}</h3>
              <div className={styles.sideNews}>
                {related.map(n => (
                  <Link key={n.id} href={`/news/${n.slug}`} className={styles.sideCard}>
                    <img src={n.image} alt={n.title} className={styles.sideImg} />
                    <div className={styles.sideBody}>
                      <span className={styles.sideTag}>{n.tag}</span>
                      <p className={styles.sideTitle2}>{n.title}</p>
                      <span className={styles.sideDate}>{n.dateFormatted}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
