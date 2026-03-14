import { useEffect } from 'react'
import { SCROLL_ID } from './useTheme'

/**
 * Pure vanilla JS roller-reveal animations.
 * No external dependencies — uses IntersectionObserver + CSS transitions.
 *
 * Elements with [data-reveal] animate as they enter the viewport:
 *   "up"    — rises from below with a skew (roller drum feel)
 *   "card"  — subtle scale + rise
 *   "left"  — slides in from left with skewX
 *   "right" — slides in from right with skewX
 *   data-reveal-delay — CSS transition delay in seconds
 */

const INITIAL_STYLES = {
  up:    'translateY(80px) skewY(4deg)',
  card:  'translateY(60px) skewY(2.5deg) scale(0.97)',
  left:  'translateX(-70px) skewX(3deg)',
  right: 'translateX(70px) skewX(-3deg)',
}

function applyInitial(el) {
  const type  = el.dataset.reveal || 'up'
  const delay = el.dataset.revealDelay || '0'
  el.style.opacity   = '0'
  el.style.transform = INITIAL_STYLES[type] || INITIAL_STYLES.up
  el.style.transformOrigin = (type === 'left') ? 'left center'
    : (type === 'right') ? 'right center'
    : 'center bottom'
  el.style.transition = `opacity 0.75s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.75s ${delay}s cubic-bezier(0.22,1,0.36,1)`
  el.style.willChange = 'transform, opacity'
}

function reveal(el) {
  el.style.opacity   = '1'
  el.style.transform = 'none'
}

export function useScrollAnimations(isMobile) {
  useEffect(() => {
    const containerId = isMobile ? `${SCROLL_ID}-mobile` : SCROLL_ID
    const container   = document.getElementById(containerId)
    if (!container) return

    const els = container.querySelectorAll('[data-reveal]')
    els.forEach(applyInitial)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { root: container, threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )

    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [isMobile])
}

/**
 * Smooth nav scroll — eased using requestAnimationFrame.
 * No GSAP, no ScrollToPlugin needed.
 */
export function smoothScrollTo(container, targetY, duration = 700) {
  if (!container) return
  const startY = container.scrollTop
  const diff   = targetY - startY
  let start    = null

  function easeInOutCubic(t) {
    return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
  }

  function step(timestamp) {
    if (!start) start = timestamp
    const elapsed  = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    container.scrollTop = startY + diff * easeInOutCubic(progress)
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
