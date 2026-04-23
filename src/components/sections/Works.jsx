import { F } from '../../theme'
import { WORKS } from '../../data'

export function Works({ T, AC, grad, divider }) {
  return (
    <section id="sec-works" style={{ padding: 'clamp(48px,8vw,80px) clamp(24px,5vw,60px)', ...divider }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <p style={{ ...F.DM, fontSize: 10, color: AC.primary, letterSpacing: '.28em', textTransform: 'uppercase', marginBottom: 7, transition: 'color 0.3s' }}>Latest Projects</p>
        <h2 style={{ ...F.H, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: T.text }}>SELECTED WORKS</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {WORKS.map((w, wi) => (
          <div data-reveal="card" data-reveal-delay={wi * 0.12} key={wi} style={{ display: 'flex', flexDirection: 'column', marginTop: wi % 2 === 1 ? 'clamp(0px,3vw,40px)' : 0 }}>
            {/* Thumbnail */}
            <a href={w.link} style={{ textDecoration: 'none', display: 'block', marginBottom: 16 }}>
              <div
                style={{ height: 218, borderRadius: 22, background: w.bg, overflow: 'hidden', display: 'flex', alignItems: 'start', justifyContent: 'center', transition: 'transform 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = 'none' }}>
                   <img src={w.imgsrc} loading="lazy" alt={w.title} style={{ width: '100%' }} /> 
              </div>
            </a>

            {/* Title + type */}
            <div style={{ fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 4, ...F.H }}>{w.title}</div>
            <div style={{ ...F.DM, color: T.textMuted, fontSize: 12, marginBottom: 14 }}>{w.type}</div>

            {/* View button — same pill style as form submit */}
            <a href={w.link}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '11px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: grad, color: '#fff',
                fontWeight: 700, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
                textDecoration: 'none', ...F.B,
                boxShadow: `0 6px 20px ${AC.from}40`,
                transition: 'opacity 0.2s, box-shadow 0.2s',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              VIEW SITE →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
