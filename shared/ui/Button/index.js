import Link from 'next/link'
import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
