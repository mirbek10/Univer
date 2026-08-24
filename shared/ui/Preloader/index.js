'use client'

import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  if (hidden) return null

  return (
    <div className={styles.preloader}>
      <div className={styles.logo}>КГУ</div>
      <div className={styles.spinner} />
      <p className={styles.text}>ЗАГРУЗКА...</p>
    </div>
  )
}
