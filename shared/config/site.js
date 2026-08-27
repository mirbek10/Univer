import { defaultLang, translations } from '@/shared/lib/i18n/translations'

const siteConfigByLang = {
  ru: {
    name: 'КММУ',
    fullName: 'Кыргызский международный медицинский университет',
    shortDesc: 'Ведущий вуз Центральной Азии с 1932 года',
    address: 'г. Бишкек, ул. Киевская 96, 720001',
    phone: ['+996 (312) 32 45 11', '+996 (312) 32 45 12'],
    email: 'info@kgsu.edu.kg',
    emailAdmission: 'priem@kgsu.edu.kg',
    workHours: 'Пн–Пт: 09:00 – 17:00',
    social: {
      facebook: '#',
      instagram: '#',
      telegram: '#',
      youtube: '#',
    },
    stats: [
      { value: 15000, label: 'Студентов', icon: 'fas fa-users' },
      { value: 850, label: 'Преподавателей', icon: 'fas fa-chalkboard-teacher' },
      { value: 120, label: 'Направлений', icon: 'fas fa-flask' },
      { value: 45, label: 'Стран-партнёров', icon: 'fas fa-globe-americas' },
    ],
  },
  kg: {
    name: 'КММУ',
    fullName: 'Кыргызский эл аралык медицина университети',
    shortDesc: '1932-жылдан берки Борбор Азиянын алдыңкы жогорку окуу жайы',
    address: 'Бишкек ш., Киевская к. 96, 720001',
    phone: ['+996 (312) 32 45 11', '+996 (312) 32 45 12'],
    email: 'info@kgsu.edu.kg',
    emailAdmission: 'priem@kgsu.edu.kg',
    workHours: 'Дш–Жш: 09:00 – 17:00',
    social: {
      facebook: '#',
      instagram: '#',
      telegram: '#',
      youtube: '#',
    },
    stats: [
      { value: 15000, label: 'Студенттер', icon: 'fas fa-users' },
      { value: 850, label: 'Мугалимдер', icon: 'fas fa-chalkboard-teacher' },
      { value: 120, label: 'Багыттар', icon: 'fas fa-flask' },
      { value: 45, label: 'Өлкө-партнерлер', icon: 'fas fa-globe-americas' },
    ],
  },
  en: {
    name: 'KMMU',
    fullName: 'Kyrgyz International Medical University',
    shortDesc: 'A leading university in Central Asia since 1932',
    address: 'Bishkek, 96 Kievskaya St., 720001',
    phone: ['+996 (312) 32 45 11', '+996 (312) 32 45 12'],
    email: 'info@kgsu.edu.kg',
    emailAdmission: 'priem@kgsu.edu.kg',
    workHours: 'Mon-Fri: 09:00 - 17:00',
    social: {
      facebook: '#',
      instagram: '#',
      telegram: '#',
      youtube: '#',
    },
    stats: [
      { value: 15000, label: 'Students', icon: 'fas fa-users' },
      { value: 850, label: 'Faculty Members', icon: 'fas fa-chalkboard-teacher' },
      { value: 120, label: 'Programs', icon: 'fas fa-flask' },
      { value: 45, label: 'Partner Countries', icon: 'fas fa-globe-americas' },
    ],
  },
}

const admissionsByLang = {
  ru: {
    applicationStart: '20 июня',
    applicationEnd: '15 августа',
    examDate: '1–20 августа',
    resultsDate: '25 августа',
    enrollmentStart: '26 августа',
  },
  kg: {
    applicationStart: '20-июнь',
    applicationEnd: '15-август',
    examDate: '1–20-август',
    resultsDate: '25-август',
    enrollmentStart: '26-август',
  },
  en: {
    applicationStart: 'June 20',
    applicationEnd: 'August 15',
    examDate: 'August 1–20',
    resultsDate: 'August 25',
    enrollmentStart: 'August 26',
  },
}

const footerLinksByLang = {
  ru: {
    university: [
      { label: 'История', href: '/about' },
      { label: 'Ректорат', href: '/about#leadership' },
      { label: 'Структура', href: '/about#structure' },
      { label: 'Документы', href: '/about#docs' },
      { label: 'Вакансии', href: '/contacts' },
    ],
    admission: [
      { label: 'Правила приёма', href: '/admission' },
      { label: 'Специальности', href: '/faculties' },
      { label: 'Стипендии', href: '/admission#scholarships' },
      { label: 'Подготовительные курсы', href: '/admission#courses' },
      { label: 'Дни открытых дверей', href: '/admission#events' },
    ],
  },
  kg: {
    university: [
      { label: 'Тарых', href: '/about' },
      { label: 'Ректорат', href: '/about#leadership' },
      { label: 'Түзүм', href: '/about#structure' },
      { label: 'Документтер', href: '/about#docs' },
      { label: 'Бош орундар', href: '/contacts' },
    ],
    admission: [
      { label: 'Кабыл алуу эрежелери', href: '/admission' },
      { label: 'Багыттар', href: '/faculties' },
      { label: 'Стипендиялар', href: '/admission#scholarships' },
      { label: 'Даярдоо курстары', href: '/admission#courses' },
      { label: 'Ачык эшик күндөрү', href: '/admission#events' },
    ],
  },
  en: {
    university: [
      { label: 'History', href: '/about' },
      { label: 'Rectorate', href: '/about#leadership' },
      { label: 'Structure', href: '/about#structure' },
      { label: 'Documents', href: '/about#docs' },
      { label: 'Vacancies', href: '/contacts' },
    ],
    admission: [
      { label: 'Admission Rules', href: '/admission' },
      { label: 'Specialties', href: '/faculties' },
      { label: 'Scholarships', href: '/admission#scholarships' },
      { label: 'Preparatory Courses', href: '/admission#courses' },
      { label: 'Open Doors Days', href: '/admission#events' },
    ],
  },
}

function resolveLang(lang) {
  return siteConfigByLang[lang] ? lang : defaultLang
}

export function getSiteConfig(lang = defaultLang) {
  return siteConfigByLang[resolveLang(lang)]
}

export function getAdmissionDates(lang = defaultLang) {
  return admissionsByLang[resolveLang(lang)]
}

export function getFooterLinks(lang = defaultLang) {
  return footerLinksByLang[resolveLang(lang)]
}

export function getNavLinks(lang = defaultLang) {
  const t = translations[resolveLang(lang)] || translations[defaultLang]
  return [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.faculties, href: '/faculties' },
    { label: t.nav.science, href: '/science' },
    { label: t.nav.international, href: '/international' },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.contacts, href: '/contacts' },
  ]
}

export const siteConfig = siteConfigByLang[defaultLang]
export const admissionDates = admissionsByLang[defaultLang]
export const footerLinks = footerLinksByLang[defaultLang]
export const navLinks = getNavLinks(defaultLang)
