'use client'
import { useEffect, useRef } from 'react'
import { useModal } from '@/shared/lib/useModal'
import { useI18n } from '@/shared/lib/useI18n'
import ApplyModal from '@/features/apply-modal/ui/ApplyModal'
import Button from '@/shared/ui/Button'
import styles from './Hero.module.css'

function Particles({ count = 30 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 188, 212, ${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}

export default function Hero() {
  const applyModal = useModal()
  const { t } = useI18n()
  const h = t.hero || {}
  const s = t.stats || {}
  const f = t.faculties || {}
  const p = t.partners || {}
  const x = t.heroExtra || {}

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
          alt=""
          className={styles.bgImg}
          aria-hidden="true"
        />
        <div className={styles.bgOverlay} />
      </div>

      <Particles count={30} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {h.badge}
        </div>

        <h1 className={styles.title}>
          {h.title}<br />
          <span className={styles.titleGradient}>{h.titleAccent}</span><br />
          {x.titleEnd}
        </h1>

        <p className={styles.desc}>{h.desc}</p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={applyModal.open}>
            {h.cta1}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <Button href="/about" variant="outline">
            {h.cta2}
          </Button>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.qs}>
            <strong>12 900+</strong>
            <span>{s.students}</span>
          </div>
          <div className={styles.qsDivider} />
          <div className={styles.qs}>
            <strong>6</strong>
            <span>{f.label}</span>
          </div>
          <div className={styles.qsDivider} />
          <div className={styles.qs}>
            <strong>93%</strong>
            <span>{x.employment}</span>
          </div>
          <div className={styles.qsDivider} />
          <div className={styles.qs}>
            <strong>40+</strong>
            <span>{p.label}</span>
          </div>
        </div>
      </div>

      <ApplyModal isOpen={applyModal.isOpen} onClose={applyModal.close} />
    </section>
  )
}
