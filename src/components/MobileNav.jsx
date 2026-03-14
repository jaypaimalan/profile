import { useState, useEffect } from 'react'
import { ACCENTS, F } from '../theme'
import { IC } from '../icons'
import { NAV, SOCIAL_LINKS } from '../data'
import { FJLogo, SbDivider } from './UI'

export function MobileNav({ T, AC, isDark, accentId, active, grad, scrollTo, toggleMode, setAccent }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const close = () => setOpen(false)
  const handleNav = (id, label) => { scrollTo(id, label); close() }

  return (
    <>
      {/* ── Transparent top bar — always visible in mobile layout ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 56,
        zIndex: 400,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
        background: 'transparent',
        pointerEvents: 'none', // let clicks fall through except children
        backdropFilter: 'blur(30px)'
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <FJLogo from={AC.from} to={AC.to} />
        </div>
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(255,255,255,0.18)`,
            borderRadius: 11, cursor: 'pointer',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40,
            transition: 'transform 0.2s',
          }}>
          {open ? IC.close : IC.menu}
        </button>
      </header>

      {/* ── Drawer overlay ── */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 399, display: 'flex' }}>
          {/* Backdrop */}
          <div onClick={close}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }} />

          {/* Drawer panel */}
          <div style={{
            position: 'relative', width: 220, height: '100%',
            background: T.sidebar, borderRight: `1px solid ${T.sidebarBorder}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '80px 0 24px', zIndex: 1,
          }}>
            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', paddingBottom: 16 }}>
              {NAV.map(({ label, icon, id }) => {
                const on = active === label
                return (
                  <button key={label} onClick={() => handleNav(id, label)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '12px 24px', width: '100%', transition: 'opacity 0.15s' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? grad : `${T.card}`, color: on ? '#fff' : T.textMuted, flexShrink: 0, boxShadow: on ? `0 4px 14px ${AC.from}50` : 'none', transition: 'all .2s' }}>
                      {icon}
                    </div>
                    <span style={{ ...F.DM, fontSize: 15, fontWeight: on ? 700 : 400, color: on ? T.text : T.textMuted }}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </nav>

            <SbDivider color={T.sidebarBorder} />

            {/* Mode + accent swatches */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '18px 24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={toggleMode}
                style={{ width: 38, height: 38, borderRadius: 10, background: 'none', border: `1px solid ${T.sidebarBorder}`, cursor: 'pointer', color: T.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                {isDark ? IC.sun : IC.moon}
              </button>
              {ACCENTS.map(a => (
                <button key={a.id} onClick={() => setAccent(a.id)}
                  style={{ width: 16, height: 16, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: `linear-gradient(135deg, ${a.from}, ${a.to})`, outline: accentId === a.id ? `2.5px solid ${a.primary}` : '2.5px solid transparent', outlineOffset: 2, transform: accentId === a.id ? 'scale(1.3)' : 'scale(1)', transition: 'all .2s' }} />
              ))}
            </div>

            <SbDivider color={T.sidebarBorder} />

            {/* Social */}
            <div style={{ display: 'flex', gap: 22, padding: '16px 24px' }}>
              {SOCIAL_LINKS.map(s => (
                <a key={s.title} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  style={{ color: T.textMuted, display: 'flex', textDecoration: 'none' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
