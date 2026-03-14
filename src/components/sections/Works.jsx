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
          <div data-reveal="card" data-reveal-delay={wi * 0.12} key={wi} style={{ display: 'flex', flexDirection: 'column', marginTop: wi === 1 ? 'clamp(0px,3vw,40px)' : 0 }}>
            {/* Thumbnail */}
            <a href={w.link} style={{ textDecoration: 'none', display: 'block', marginBottom: 16 }}>
              <div
                style={{ height: 218, borderRadius: 22, background: w.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = 'none' }}>
                {wi === 0 ? <WorkCard0 accent={w.accent} /> : <WorkCard1 accent={w.accent} />}
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
              VIEW PROJECT →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function WorkCard0({ accent }) {
  return (
    <div style={{ width: 80, height: 146, background: '#0e1c26', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 44px rgba(0,0,0,.45)', gap: 10, padding: 10 }}>
      <div style={{ width: 52, height: 88, background: 'linear-gradient(160deg,#1a3d50,#0d2535)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 36, height: 22, background: `linear-gradient(135deg,${accent},#30a89e)`, borderRadius: 6 }} />
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {[0, 1, 2].map(j => <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: j === 1 ? accent : 'rgba(255,255,255,.3)' }} />)}
      </div>
    </div>
  )
}

function WorkCard1({ accent }) {
  return (
    <div style={{ width: 165, height: 112, background: '#fff', borderRadius: 12, boxShadow: '0 12px 36px rgba(0,0,0,.18)', padding: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ height: 12, background: '#f3f4f6', borderRadius: 4 }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {[0, 1, 2, 3].map(j => <div key={j} style={{ height: 28, background: '#f0f0f0', borderRadius: 5 }} />)}
      </div>
      <div style={{ height: 10, width: '55%', background: `linear-gradient(135deg,${accent},#f59e0b)`, borderRadius: 5 }} />
    </div>
  )
}
