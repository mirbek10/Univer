'use client'
import { useState } from 'react'
import { useI18n } from '@/shared/lib/useI18n'
import Modal from '@/shared/ui/Modal'
import styles from './GalleryGrid.module.css'

const COPY = {
  ru: {
    label: 'Кампус',
    title: 'Жизнь университета',
    sub: 'Атмосфера, в которой хочется учиться и развиваться',
    prev: 'Предыдущее',
    next: 'Следующее',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', alt: 'Главный корпус КММУ', span: 'wide' },
      { id: 2, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', alt: 'Студенты в библиотеке' },
      { id: 3, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', alt: 'Торжественная церемония' },
      { id: 4, src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', alt: 'Учебный класс', span: 'tall' },
      { id: 5, src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', alt: 'Лаборатория IT' },
      { id: 6, src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', alt: 'Инженерная лаборатория' },
      { id: 7, src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80', alt: 'Конференц-зал', span: 'wide' },
      { id: 8, src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80', alt: 'Студенческий кампус' },
    ],
  },
  kg: {
    label: 'Кампус',
    title: 'Университеттин жашоосу',
    sub: 'Окууга жана өнүгүүгө шыктандырган атмосфера',
    prev: 'Мурунку',
    next: 'Кийинки',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', alt: 'КММУнун башкы корпусу', span: 'wide' },
      { id: 2, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', alt: 'Китепканадагы студенттер' },
      { id: 3, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', alt: 'Салтанаттуу азем' },
      { id: 4, src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', alt: 'Окуу классы', span: 'tall' },
      { id: 5, src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', alt: 'IT лабораториясы' },
      { id: 6, src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', alt: 'Инженердик лаборатория' },
      { id: 7, src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80', alt: 'Конференц-зал', span: 'wide' },
      { id: 8, src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80', alt: 'Студенттик кампус' },
    ],
  },
  en: {
    label: 'Campus',
    title: 'University Life',
    sub: 'An atmosphere where you want to study and grow',
    prev: 'Previous',
    next: 'Next',
    images: [
      { id: 1, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', alt: 'Main building of KMMU', span: 'wide' },
      { id: 2, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', alt: 'Students in the library' },
      { id: 3, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', alt: 'Graduation ceremony' },
      { id: 4, src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', alt: 'Classroom', span: 'tall' },
      { id: 5, src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', alt: 'IT lab' },
      { id: 6, src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', alt: 'Engineering lab' },
      { id: 7, src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80', alt: 'Conference hall', span: 'wide' },
      { id: 8, src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80', alt: 'Student campus' },
    ],
  },
}

export default function GalleryGrid() {
  const [active, setActive] = useState(null)
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const images = c.images
  const activeIdx = images.findIndex((img) => img.id === active?.id)
  const prev = () => setActive(images[(activeIdx - 1 + images.length) % images.length])
  const next = () => setActive(images[(activeIdx + 1) % images.length])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>{c.label}</p>
        <h2 className={styles.heading}>{c.title}</h2>
        <p className={styles.sub}>{c.sub}</p>
        <div className={styles.grid}>
          {images.map((img) => (
            <button
              key={img.id}
              className={`${styles.cell} ${img.span === 'wide' ? styles.wide : ''} ${img.span === 'tall' ? styles.tall : ''}`}
              onClick={() => setActive(img)}
              aria-label={img.alt}
            >
              <img src={img.src} alt={img.alt} className={styles.img} loading="lazy" />
              <div className={styles.overlay}>
                <span className={styles.zoomIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </span>
                <span className={styles.altText}>{img.alt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={!!active} onClose={() => setActive(null)} maxWidth="900px">
        {active && (
          <div className={styles.lightbox}>
            <button className={styles.navBtn} onClick={prev} aria-label={c.prev}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className={styles.lightboxImgWrap}>
              <img src={active.src} alt={active.alt} className={styles.lightboxImg} />
              <p className={styles.lightboxCaption}>{active.alt}</p>
              <div className={styles.lightboxNav}>
                <button className={styles.navBtn} onClick={prev} aria-label={c.prev}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className={styles.navBtn} onClick={next} aria-label={c.next}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
            <button className={styles.navBtn} onClick={next} aria-label={c.next}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </Modal>
    </section>
  )
}
