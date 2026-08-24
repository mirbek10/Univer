'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/shared/lib/useToast'
import styles from './Toast.module.css'

const ICONS = {
  success: 'fas fa-check-circle',
  error: 'fas fa-times-circle',
  warning: 'fas fa-exclamation-triangle',
  info: 'fas fa-info-circle',
}

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10)
    const leaveTimer = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => onRemove(toast.id), 300)
    }, toast.duration || 4000)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(leaveTimer)
    }
  }, [toast.id, toast.duration, onRemove])

  const handleClose = () => {
    setLeaving(true)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${visible ? styles.visible : ''} ${leaving ? styles.leaving : ''}`}
    >
      <div className={styles.icon}>
        <i className={ICONS[toast.type]} />
      </div>
      <p className={styles.message}>{toast.message}</p>
      <button className={styles.close} onClick={handleClose} aria-label="Закрыть">
        <i className="fas fa-times" />
      </button>
      <div
        className={styles.progress}
        style={{ animationDuration: `${toast.duration || 4000}ms` }}
      />
    </div>
  )
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  )
}
