// ── FJ Logo ───────────────────────────────────────────────────────────────────
export function FJLogo({ from, to }) {
  const id = `lg-${from.replace('#', '')}`
  return (
    <svg width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="none" stroke={`url(#${id})`} strokeWidth="1.8" />
      <text x="22" y="28" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif"
        fontWeight="900" fontSize="18" fill={`url(#${id})`} letterSpacing="-0.5">FJ</text>
    </svg>
  )
}

// ── Thin horizontal divider ───────────────────────────────────────────────────
export function SbDivider({ color }) {
  return <div style={{ width: 36, height: 1, background: color, margin: '2px auto' }} />
}
