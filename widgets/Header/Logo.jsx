export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00bcd4" />
          <stop offset="1" stopColor="#0d47a1" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0d47a1" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#logoGrad)"
        filter="url(#logoShadow)"
      />
      <path
        d="M32 18v28M18 32h28"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="14" stroke="white" strokeWidth="2.5" opacity="0.35" />
    </svg>
  )
}
