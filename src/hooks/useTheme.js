import { useState, useEffect } from 'react'
import { ACCENTS, DARK, LIGHT, F } from '../theme'
import { NAV } from '../data'
import { smoothScrollTo } from './useScrollAnimations'

export const SCROLL_ID = 'main-scroll'

export function useTheme() {
  const [isDark,   setIsDark]   = useState(() => localStorage.getItem('fjp-mode') !== 'light')
  const [accentId, setAccentId] = useState(() => localStorage.getItem('fjp-accent') || 'purple')
  const [active,   setActive]   = useState('Home')

  const T  = isDark ? DARK : LIGHT
  const AC = ACCENTS.find(a => a.id === accentId) || ACCENTS[0]

  const grad     = `linear-gradient(135deg, ${AC.from}, ${AC.to})`
  const gradText = { background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
  const divider  = { borderTop: `1px solid ${T.divider}` }
  const tagStyle = {
    background: `${AC.from}18`,
    border: `1px solid ${AC.from}40`,
    color: isDark ? AC.primary : AC.from,
    borderRadius: 8, padding: '5px 12px',
    fontSize: 12, ...F.DM, fontWeight: 500,
    transition: 'all 0.3s',
  }

  const toggleMode = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('fjp-mode', next ? 'dark' : 'light')
  }
  const setAccent = (id) => {
    setAccentId(id)
    localStorage.setItem('fjp-accent', id)
  }

  // Smooth scroll using rAF-based easing (no external library)
  const scrollTo = (id, label) => {
    setActive(label)
    const target    = document.getElementById(id)
    if (!target) return
    const container = document.getElementById(SCROLL_ID)
                   || document.getElementById(`${SCROLL_ID}-mobile`)
    if (container) smoothScrollTo(container, target.offsetTop)
  }

  // Scroll-based active nav — watches scrollTop directly for reliability in both
  // directions. Finds whichever section's top edge is closest above the center
  // of the visible area. This avoids IntersectionObserver skipping short sections.
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.getElementById(SCROLL_ID)
                     || document.getElementById(`${SCROLL_ID}-mobile`)
      if (!container) return

      const getSections = () =>
        NAV.map(({ label, id }) => ({ label, el: document.getElementById(id) }))
           .filter(({ el }) => el)

      const onScroll = () => {
        const sections = getSections()
        const scrollMid = container.scrollTop + container.clientHeight * 0.4

        let best = sections[0]
        for (const s of sections) {
          if (s.el.offsetTop <= scrollMid) best = s
        }
        if (best) setActive(best.label)
      }

      container.addEventListener('scroll', onScroll, { passive: true })
      onScroll() // set initial

      return () => container.removeEventListener('scroll', onScroll)
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return { T, AC, ACCENTS, isDark, accentId, active, setActive, grad, gradText, divider, tagStyle, toggleMode, setAccent, scrollTo }
}
