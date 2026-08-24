'use client'
import { useState } from 'react'
import { getSiteConfig } from '@/shared/config/site'
import { useToast } from '@/shared/lib/useToast'
import { useI18n } from '@/shared/lib/useI18n'
import { MapPin, Phone, Mail, Clock, ParkingCircle, Link2 } from 'lucide-react'
import styles from './contacts.module.css'

const COPY = {
  ru: {
    label: 'Связь', title: 'Контакты', sub: 'Мы всегда рады ответить на ваши вопросы',
    address: 'Адрес', phones: 'Телефоны', workHours: 'Пн–Пт: 08:00–17:00',
    email: 'Email', answer24: 'Ответим в течение 24 часов',
    map: 'Мы на карте', contactUs: 'Написать нам',
    name: 'Ваше имя', subject: 'Тема', message: 'Сообщение',
    send: 'Отправить сообщение', sending: 'Отправляем...',
    showMap: 'Показать на карте →',
    parking: 'Парковка доступна на территории университета',
    topics: { admission: 'Поступление', academics: 'Учёба', international: 'Международное', science: 'Наука и гранты', other: 'Другое' },
    placeholders: { name: 'Айбек Уметов', email: 'example@email.com', message: 'Ваше сообщение...' },
    errors: { name: 'Введите ваше имя', email: 'Введите корректный email', subject: 'Выберите тему', message: 'Сообщение должно содержать не менее 10 символов' },
    success: 'Сообщение отправлено! Мы ответим в течение 24 часов.',
  },
  kg: {
    label: 'Байланыш', title: 'Байланыштар', sub: 'Биз сиздин суроолоруңузга жооп берүүгө дайым даярбыз',
    address: 'Дарек', phones: 'Телефондор', workHours: 'Дш–Жш: 08:00–17:00',
    email: 'Email', answer24: '24 сааттын ичинде жооп беребиз',
    map: 'Картадан көрүү', contactUs: 'Бизге жазуу',
    name: 'Сиздин атыңыз', subject: 'Тема', message: 'Билдирүү',
    send: 'Билдирүү жөнөтүү', sending: 'Жөнөтүлүүдө...',
    showMap: 'Картадан көрсөтүү →',
    parking: 'Университеттин аймагында унаа токтотмо бар',
    topics: { admission: 'Кабыл алуу', academics: 'Окуу', international: 'Эл аралык', science: 'Илим жана гранттар', other: 'Башка' },
    placeholders: { name: 'Айбек Уметов', email: 'example@email.com', message: 'Сиздин билдирүүңүз...' },
    errors: { name: 'Атыңызды жазыңыз', email: 'Туура email жазыңыз', subject: 'Теманы тандаңыз', message: 'Билдирүүдө кеминде 10 белги болушу керек' },
    success: 'Билдирүү жөнөтүлдү! Биз 24 саат ичинде жооп беребиз.',
  },
  en: {
    label: 'Contact', title: 'Contacts', sub: 'We are always happy to answer your questions',
    address: 'Address', phones: 'Phones', workHours: 'Mon-Fri: 08:00-17:00',
    email: 'Email', answer24: 'We respond within 24 hours',
    map: 'Find us on the map', contactUs: 'Write to us',
    name: 'Your name', subject: 'Subject', message: 'Message',
    send: 'Send message', sending: 'Sending...',
    showMap: 'Show on map →',
    parking: 'Parking is available on university grounds',
    topics: { admission: 'Admissions', academics: 'Studies', international: 'International', science: 'Science & grants', other: 'Other' },
    placeholders: { name: 'Aibek Umetov', email: 'example@email.com', message: 'Your message...' },
    errors: { name: 'Enter your name', email: 'Enter a valid email', subject: 'Choose a subject', message: 'Message must be at least 10 characters' },
    success: 'Message sent! We will reply within 24 hours.',
  },
}

const SUBJECT_VALUES = ['admission', 'academics', 'international', 'science', 'other']

export default function ContactsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const siteConfig = getSiteConfig(lang)
  const { toast } = useToast()
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending,setSending]= useState(false)

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = c.errors.name
    if (!form.email.trim() || !form.email.includes('@')) errs.email = c.errors.email
    if (!form.subject) errs.subject = c.errors.subject
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = c.errors.message
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setForm({ name: '', email: '', subject: '', message: '' })
      toast.success(c.success)
    }, 1200)
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

      {/* ── Contact cards ── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.cards}>
            <div className={styles.contactCard}>
              <span className={styles.cardIcon}><MapPin size={28} strokeWidth={1.5} /></span>
              <h3 className={styles.cardTitle}>{c.address}</h3>
              <p className={styles.cardText}>{siteConfig.address}</p>
              <a href="https://maps.google.com/?q=Bishkek+Kievskaya+96" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                {c.showMap}
              </a>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.cardIcon}><Phone size={28} strokeWidth={1.5} /></span>
              <h3 className={styles.cardTitle}>{c.phones}</h3>
              {siteConfig.phone.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g,'')}`} className={styles.cardText} style={{ textDecoration:'none', display:'block' }}>{p}</a>
              ))}
              <p className={styles.cardSub}>{c.workHours}</p>
            </div>
            <div className={styles.contactCard}>
              <span className={styles.cardIcon}><Mail size={28} strokeWidth={1.5} /></span>
              <h3 className={styles.cardTitle}>{c.email}</h3>
              <a href={`mailto:${siteConfig.email}`} className={styles.cardText} style={{ textDecoration:'none' }}>{siteConfig.email}</a>
              <p className={styles.cardSub}>{c.answer24}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map + Form ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.mapFormGrid}>
            <div className={styles.mapWrap}>
              <h2 className={styles.mapTitle}>{c.map}</h2>
              <div className={styles.mapEmbed}>
                <iframe
                  title={c.map}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.9!2d74.5975!3d42.8746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb790f3c45b45%3A0x44e87de3e2e9c1f5!2z0JrQtdGC0L7Qu9GM!5e0!3m2!1sru!2skg!4v1700000000000!5m2!1sru!2skg"
                  width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className={styles.mapInfo}>
                <p style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <Clock size={15} strokeWidth={1.5} style={{ flexShrink:0, color:'#00838f' }} />
                  {c.workHours}
                </p>
                <p style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <ParkingCircle size={15} strokeWidth={1.5} style={{ flexShrink:0, color:'#00838f' }} />
                  {c.parking}
                </p>
              </div>
            </div>

            <div className={styles.formWrap}>
              <h2 className={styles.formTitle}>{c.contactUs}</h2>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{c.name} <span className={styles.req}>*</span></label>
                  <input className={`${styles.input} ${errors.name ? styles.inputError:''}`} value={form.name} onChange={e=>update('name',e.target.value)} placeholder={c.placeholders.name} />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{c.email} <span className={styles.req}>*</span></label>
                  <input className={`${styles.input} ${errors.email ? styles.inputError:''}`} type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder={c.placeholders.email} />
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{c.subject} <span className={styles.req}>*</span></label>
                  <div className={styles.subjectGroup}>
                    {SUBJECT_VALUES.map(v => (
                      <label key={v} className={`${styles.subjectPill} ${form.subject===v ? styles.subjectActive:''}`}>
                        <input type="radio" name="subject" value={v} checked={form.subject===v} onChange={()=>update('subject',v)} />
                        {c.topics[v]}
                      </label>
                    ))}
                  </div>
                  {errors.subject && <span className={styles.error}>{errors.subject}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{c.message} <span className={styles.req}>*</span></label>
                  <textarea className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError:''}`} rows={5} value={form.message} onChange={e=>update('message',e.target.value)} placeholder={c.placeholders.message} />
                  {errors.message && <span className={styles.error}>{errors.message}</span>}
                </div>
                <button className={styles.submitBtn} type="submit" disabled={sending}>
                  {sending ? c.sending : c.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
