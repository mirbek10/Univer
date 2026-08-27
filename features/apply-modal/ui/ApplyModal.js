'use client'
import { useState } from 'react'
import { useI18n } from '@/shared/lib/useI18n'
import Modal from '@/shared/ui/Modal'
import { useToast } from '@/shared/lib/useToast'
import { faculties } from '@/entities/faculty/model/faculties'
import { useForm, ValidationError } from '@formspree/react'
import styles from './ApplyModal.module.css'

const COPY = {
  ru: {
    title: 'Подача документов',
    step1: 'Личные данные',
    step2: 'Программа',
    step3: 'Документы',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Email',
    phone: 'Телефон',
    selectFaculty: 'Выберите факультет',
    studyForm: 'Форма обучения',
    fullTime: 'Очная',
    partTime: 'Заочная',
    evening: 'Вечерняя',
    degree: 'Степень',
    bachelor: 'Бакалавриат',
    master: 'Магистратура',
    phd: 'Докторантура',
    student: 'Студент',
    faculty: 'Факультет',
    docsReady: 'Документы готовы к предоставлению',
    hasSchool: 'Я завершил(а) среднее / высшее образование',
    moreInfo: 'Дополнительная информация',
    notesPlaceholder: 'Любые вопросы или комментарии...',
    back: 'Назад',
    next: 'Далее',
    submit: 'Отправить заявку',
    successMsg: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
  },
  kg: {
    title: 'Документтерди тапшыруу',
    step1: 'Жеке маалыматтар',
    step2: 'Программа',
    step3: 'Документтер',
    firstName: 'Аты',
    lastName: 'Фамилиясы',
    email: 'Email',
    phone: 'Телефон',
    selectFaculty: 'Факультетти тандаңыз',
    studyForm: 'Окуу формасы',
    fullTime: 'Күндүзгү',
    partTime: 'Сырткы',
    evening: 'Кечки',
    degree: 'Даража',
    bachelor: 'Бакалавр',
    master: 'Магистр',
    phd: 'Докторантура',
    student: 'Студент',
    faculty: 'Факультет',
    docsReady: 'Документтер тапшырууга даяр',
    hasSchool: 'Мен орто / жогорку билимди аяктадым',
    moreInfo: 'Кошумча маалымат',
    notesPlaceholder: 'Суроолор же комментарийлер...',
    back: 'Артка',
    next: 'Алга',
    submit: 'Өтүнмө жөнөтүү',
    successMsg: 'Өтүнмө ийгиликтүү жөнөтүлдү! Жакынкы аралыкта сиз менен байланышабыз.',
  },
  en: {
    title: 'Submit Application',
    step1: 'Personal Info',
    step2: 'Program',
    step3: 'Documents',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    selectFaculty: 'Select faculty',
    studyForm: 'Study form',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    evening: 'Evening',
    degree: 'Degree',
    bachelor: 'Bachelor',
    master: 'Master',
    phd: 'Doctorate',
    student: 'Student',
    faculty: 'Faculty',
    docsReady: 'Documents are ready to provide',
    hasSchool: 'I completed secondary / higher education',
    moreInfo: 'Additional information',
    notesPlaceholder: 'Any questions or comments...',
    back: 'Back',
    next: 'Next',
    submit: 'Submit application',
    successMsg: 'Application submitted successfully! We will contact you soon.',
  },
}

function StepIndicator({ current, steps }) {
  return (
    <div className={styles.stepIndicator}>
      {steps.map((label, i) => (
        <div key={i} className={styles.stepGroup}>
          <div className={`${styles.stepDot} ${i < current ? styles.done : ''} ${i === current ? styles.active : ''}`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`${styles.stepLabel} ${i === current ? styles.activeLabel : ''}`}>{label}</span>
          {i < steps.length - 1 && <div className={`${styles.stepLine} ${i < current ? styles.doneLine : ''}`} />}
        </div>
      ))}
    </div>
  )
}

export default function ApplyModal({ isOpen, onClose }) {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.ru
  const { toast } = useToast()
  
  // Инициализируем Formspree (ID: mnpqawek)
  const [state, handleSubmitFormspree] = useForm('mnpqawek')

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    faculty: '', degree: 'bachelor', studyForm: 'full',
    hasDocuments: false, hasSchool: false, notes: '',
  })
  const [errors, setErrors] = useState({})

  const steps = [c.step1, c.step2, c.step3]
  const studyForms = [
    { value: 'full', label: c.fullTime },
    { value: 'part', label: c.partTime },
    { value: 'evening', label: c.evening },
  ]
  const degrees = [
    { value: 'bachelor', label: c.bachelor },
    { value: 'master', label: c.master },
    { value: 'phd', label: c.phd },
  ]

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }))
    setErrors((e) => ({ ...e, [field]: '' }))
  }

  const validateStep0 = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = `${c.firstName} required`
    if (!form.lastName.trim()) errs.lastName = `${c.lastName} required`
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required'
    if (!form.phone.trim()) errs.phone = `${c.phone} required`
    return errs
  }

  const validateStep1 = () => {
    const errs = {}
    if (!form.faculty) errs.faculty = `${c.selectFaculty} required`
    return errs
  }

  const next = () => {
    const errs = step === 0 ? validateStep0() : step === 1 ? validateStep1() : {}
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStep((s) => s + 1)
  }

  const back = () => setStep((s) => s - 1)

  const handleFinalSubmit = async (e) => {
    e.preventDefault()

    const faculty = faculties.find((item) => item.id === form.faculty)
    const degree = degrees.find((item) => item.value === form.degree)
    const studyForm = studyForms.find((item) => item.value === form.studyForm)

    // Формируем аккуратный текст для письма, которое придет на вашу почту
    const fullMessage = [
      `Имя: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Телефон: ${form.phone}`,
      `Факультет: ${faculty?.name || form.faculty}`,
      `Степень: ${degree?.label || form.degree}`,
      `Форма обучения: ${studyForm?.label || form.studyForm}`,
      `Документы готовы: ${form.hasDocuments ? 'Да' : 'Нет'}`,
      `Образование завершено: ${form.hasSchool ? 'Да' : 'Нет'}`,
      `Дополнительная информация: ${form.notes || 'Нет'}`,
    ].join('\n')

    // Создаем объект с данными для Formspree (скрытые поля)
    const formData = new FormData()
    formData.append('email', form.email)
    formData.append('subject', `Заявка на поступление: ${form.firstName} ${form.lastName}`)
    formData.append('message', fullMessage)

    // Отправляем через Formspree
    await handleSubmitFormspree(formData)

    toast.success(c.successMsg)
    onClose()
    setStep(0)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px" title={c.title}>
      <form onSubmit={handleFinalSubmit}>
        <StepIndicator current={step} steps={steps} />

        {step === 0 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>{c.step1}</h3>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>{c.firstName} <span className={styles.req}>*</span></label>
                <input className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder={c.firstName} />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </div>
              <div className={styles.field}>
                <label>{c.lastName} <span className={styles.req}>*</span></label>
                <input className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder={c.lastName} />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              </div>
            </div>
            <div className={styles.field}>
              <label>{c.email} <span className={styles.req}>*</span></label>
              <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="example@email.com" />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <label>{c.phone} <span className={styles.req}>*</span></label>
              <input className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+996 700 000 000" />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>{c.step2}</h3>
            <div className={styles.field}>
              <label>{c.selectFaculty} <span className={styles.req}>*</span></label>
              <div className={styles.facultyGrid}>
                {faculties.map((f) => (
                  <label key={f.id} className={`${styles.facultyCard} ${form.faculty === f.id ? styles.facultyActive : ''}`}>
                    <input type="radio" name="faculty" value={f.id} checked={form.faculty === f.id} onChange={() => update('faculty', f.id)} />
                    <span>{f.shortName}</span>
                  </label>
                ))}
              </div>
              {errors.faculty && <span className={styles.error}>{errors.faculty}</span>}
            </div>
            <div className={styles.field}>
              <label>{c.degree}</label>
              <div className={styles.radioGroup}>
                {degrees.map((d) => (
                  <label key={d.value} className={`${styles.radioCard} ${form.degree === d.value ? styles.radioCardActive : ''}`}>
                    <input type="radio" name="degree" value={d.value} checked={form.degree === d.value} onChange={() => update('degree', d.value)} />
                    <span className={styles.radioLabel}>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <label>{c.studyForm}</label>
              <div className={styles.radioGroup}>
                {studyForms.map((sf) => (
                  <label key={sf.value} className={`${styles.radioCard} ${form.studyForm === sf.value ? styles.radioCardActive : ''}`}>
                    <input type="radio" name="studyForm" value={sf.value} checked={form.studyForm === sf.value} onChange={() => update('studyForm', sf.value)} />
                    <span className={styles.radioLabel}>{sf.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>{c.step3}</h3>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>{c.student}:</span>
                <strong>{form.firstName} {form.lastName}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>{c.faculty}:</span>
                <strong>{faculties.find((f) => f.id === form.faculty)?.name || '—'}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>{c.studyForm}:</span>
                <strong>{degrees.find((d) => d.value === form.degree)?.label} / {studyForms.find((s) => s.value === form.studyForm)?.label}</strong>
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={form.hasDocuments} onChange={(e) => update('hasDocuments', e.target.checked)} className={styles.checkbox} />
                <span>{c.docsReady}</span>
              </label>
            </div>
            <div className={styles.field}>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={form.hasSchool} onChange={(e) => update('hasSchool', e.target.checked)} className={styles.checkbox} />
                <span>{c.hasSchool}</span>
              </label>
            </div>
            <div className={styles.field}>
              <label>{c.moreInfo}</label>
              <textarea className={styles.textarea} rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder={c.notesPlaceholder} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {step > 0 && <button type="button" className={styles.btnBack} onClick={back}>{c.back}</button>}
          {step < 2 ? (
            <button type="button" className={styles.btnNext} onClick={next}>{c.next}</button>
          ) : (
            <button type="submit" className={styles.btnSubmit} disabled={state.submitting}>
              {c.submit}
            </button>
          )}
        </div>
      </form>
    </Modal>
  )
}