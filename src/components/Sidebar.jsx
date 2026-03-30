import { ACCENTS, F } from '../theme'
import { IC } from '../icons'
import { NAV, SOCIAL_LINKS } from '../data'
import { FJLogo, SbDivider } from './UI'

export function Sidebar({ T, AC, isDark, accentId, active, grad, scrollTo, toggleMode, setAccent }) {
  return (
    <aside style={{
      flexShrink: 0,
      width: 74, height: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '18px 0 14px', zIndex: 10,
      background: T.sidebar,
      borderRight: `1px solid ${T.sidebarBorder}`,
      transition: 'background 0.35s',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <FJLogo from={AC.from} to={AC.to} />
      </div>

      <SbDivider color={T.sidebarBorder} />

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: '10px 0', flex: 1, width: '100%', alignItems: 'center', overflowY: 'auto' }}>
        {NAV.map(({ label, icon, id }) => {
          const on = active === label
          return (
            <button
              key={label}
              onClick={() => scrollTo(id, label)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0', width: '100%' }}
              onMouseEnter={e => {
                if (on) return
                // Change both icon and label to accent color
                const iconDiv = e.currentTarget.querySelector('.nav-icon')
                const span    = e.currentTarget.querySelector('span')
                if (iconDiv) iconDiv.style.color = AC.primary
                if (span)    span.style.color    = AC.primary
              }}
              onMouseLeave={e => {
                if (on) return
                const iconDiv = e.currentTarget.querySelector('.nav-icon')
                const span    = e.currentTarget.querySelector('span')
                if (iconDiv) iconDiv.style.color = T.textMuted
                if (span)    span.style.color    = T.textMuted
              }}
            >
              <div
                className="nav-icon"
                style={{
                  width: 46, height: 46, borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: on ? grad : 'transparent',
                  color: on ? '#fff' : T.textMuted,
                  boxShadow: on ? `0 6px 18px ${AC.from}55` : 'none',
                  transition: 'background .22s, box-shadow .22s, color .22s',
                }}>
                {icon}
              </div>
              <span style={{
                ...F.DM, fontSize: 8.5,
                fontWeight: on ? 600 : 400,
                color: on ? AC.primary : T.textMuted,
                letterSpacing: '.04em',
                transition: 'color .2s',
              }}>
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      <SbDivider color={T.sidebarBorder} />

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, flexShrink: 0 }}>
        {/* Mode toggle */}
        <button onClick={toggleMode} title={isDark ? 'Light mode' : 'Dark mode'}
          style={{ width: 46, height: 36, borderRadius: 10, background: 'none', border: `1px solid ${T.sidebarBorder}`, cursor: 'pointer', color: T.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color .2s, border-color .2s', marginBottom: 14 }}
          onMouseEnter={e => { e.currentTarget.style.color = AC.primary; e.currentTarget.style.borderColor = `${AC.from}55` }}
          onMouseLeave={e => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.sidebarBorder }}>
          {isDark ? IC.sun : IC.moon}
        </button>

        {/* Accent swatches */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginBottom: 14 }}>
          {ACCENTS.map(a => (
            <button key={a.id} onClick={() => setAccent(a.id)} title={a.id}
              style={{ width: 14, height: 14, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: `linear-gradient(135deg, ${a.from}, ${a.to})`, outline: accentId === a.id ? `2.5px solid ${a.primary}` : '2.5px solid transparent', outlineOffset: 2, transform: accentId === a.id ? 'scale(1.35)' : 'scale(1)', transition: 'all .2s' }}
            />
          ))}
        </div>

        <SbDivider color={T.sidebarBorder} />

        {/* Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', paddingTop: 12, paddingBottom: 4 }}>
          {SOCIAL_LINKS.map(s => (
            <a key={s.title} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" title={s.title}
              style={{ color: T.textMuted, display: 'flex', transition: 'color .2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = AC.primary}
              onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
