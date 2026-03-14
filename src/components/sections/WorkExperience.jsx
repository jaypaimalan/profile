import { useState, useRef, useEffect } from 'react'
import { F } from '../../theme'
import { IC } from '../../icons'
import { EXPERIENCE } from '../../data'

/** Animated expandable panel — height transitions from 0 → auto */
function AnimatedPanel({ open, children }) {
  const ref    = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (open) {
      // Measure natural height then animate to it
      el.style.height    = '0px'
      el.style.opacity   = '0'
      el.style.overflow  = 'hidden'
      // Force reflow
      el.getBoundingClientRect()
      const h = el.scrollHeight
      el.style.transition = 'height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease'
      el.style.height     = h + 'px'
      el.style.opacity    = '1'
      // After transition, remove height constraint so it adapts to content changes
      frameRef.current = setTimeout(() => {
        el.style.height   = 'auto'
        el.style.overflow = 'visible'
      }, 420)
    } else {
      // Animate back to 0
      el.style.overflow  = 'hidden'
      el.style.height    = el.scrollHeight + 'px'
      el.getBoundingClientRect()
      el.style.transition = 'height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease'
      el.style.height     = '0px'
      el.style.opacity    = '0'
    }

    return () => clearTimeout(frameRef.current)
  }, [open])

  return (
    <div ref={ref} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
      {children}
    </div>
  )
}

export function WorkExperience({ T, AC, grad, divider }) {
  const [openExp, setOpenExp] = useState(0)

  return (
    <section data-reveal="up" style={{ padding: 'clamp(48px,8vw,80px) clamp(24px,5vw,60px)', ...divider }}>
      <p style={{ ...F.DM, fontSize: 10, color: AC.primary, letterSpacing: '.28em', textTransform: 'uppercase', marginBottom: 7, transition: 'color 0.3s' }}>Career</p>
      <h2 style={{ ...F.BC, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, letterSpacing: '-.4px', marginBottom: 44, color: T.text }}>WORK EXPERIENCE</h2>

      {EXPERIENCE.map((exp, i) => {
        const on = openExp === i
        return (
          <div key={i} style={{ borderBottom: `1px solid ${T.divider}` }}>
            <button
              onClick={() => setOpenExp(on ? null : i)}
              className="accordion-btn"
              style={{ ...F.B, background: 'none', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0', gap: 16, transition: 'opacity 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, textAlign: 'left', minWidth: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: grad, flexShrink: 0, transition: 'background 0.3s, transform 0.3s', transform: on ? 'scale(1.4)' : 'scale(1)' }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ ...F.BC, fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 900, color: T.text }}>{exp.role}</div>
                  <div style={{ ...F.DM, fontSize: 12, color: T.textMuted, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {exp.company} · {exp.period}
                  </div>
                </div>
              </div>
              {/* Animated + → × */}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${on ? 'transparent' : T.dividerStrong}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 300,
                color: on ? '#fff' : T.text,
                background: on ? grad : 'transparent',
                transform: on ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
              }}>+</div>
            </button>

            <AnimatedPanel open={on}>
              <ul style={{ listStyle: 'none', paddingLeft: 28, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, marginTop: 2, color: AC.primary, width: 20, height: 20, borderRadius: '50%', background: `${AC.from}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                      {IC.check}
                    </div>
                    <span style={{ ...F.DM, color: T.textSub, fontSize: 13.5, lineHeight: 1.72 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </AnimatedPanel>
          </div>
        )
      })}
    </section>
  )
}
