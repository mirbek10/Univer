'use client'

import { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

export default function Modal({ isOpen, onClose, children, maxWidth = '600px' }) {
  const backdropRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} style={{ maxWidth }}>
        {/* Close button in its own row — never overlaps content */}
        <div className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
