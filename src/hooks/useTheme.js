import { useState, useEffect, useRef } from 'react'
import { ACCENTS, DARK, LIGHT, F } from '../theme'
import { NAV } from '../data'
import { smoothScrollTo } from './useScrollAnimations'

export const SCROLL_ID = 'main-scroll'

export function useTheme() {
  const [isDark,   setIsDark]   = useState(() => localStorage.getItem('fjp-mode') !== 'light') 
  const [accentId, setAccentId] = useState(() => localStorage.getItem('fjp-accent') || 'blue')
  const [active,   setActive]   = useState('Home')

  // When user clicks a nav item we lock out the scroll-based active update
  // for a short window so the active state doesn't flicker back to the old section.
  const scrollLockRef = useRef(false)
  const lockTimer     = useRef(null)

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

  const scrollTo = (id, label) => {
    // Immediately set the active tab — no flicker
    setActive(label)

    // Lock the scroll listener for 1 s so it can't override our choice
    scrollLockRef.current = true
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { scrollLockRef.current = false }, 1000)

    const target    = document.getElementById(id)
    if (!target) return
    const container = document.getElementById(SCROLL_ID)
                   || document.getElementById(`${SCROLL_ID}-mobile`)
    if (container) smoothScrollTo(container, target.offsetTop)
  }

  // Scroll-position based active nav — fires on every scroll event
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.getElementById(SCROLL_ID)
                     || document.getElementById(`${SCROLL_ID}-mobile`)
      if (!container) return

      const getSections = () =>
        NAV.map(({ label, id }) => ({ label, el: document.getElementById(id) }))
           .filter(({ el }) => el)

      const onScroll = () => {
        // Skip if we're in the locked window after a manual nav click
        if (scrollLockRef.current) return

        const sections = getSections()
        const scrollMid = container.scrollTop + container.clientHeight * 0.4

        let best = sections[0]
        for (const s of sections) {
          if (s.el.offsetTop <= scrollMid) best = s
        }
        if (best) setActive(best.label)
      }

      container.addEventListener('scroll', onScroll, { passive: true })
      onScroll()

      return () => container.removeEventListener('scroll', onScroll)
    }, 150)

    return () => {
      clearTimeout(timer)
      clearTimeout(lockTimer.current)
    }
  }, [])

  return { T, AC, ACCENTS, isDark, accentId, active, setActive, grad, gradText, divider, tagStyle, toggleMode, setAccent, scrollTo }
}
