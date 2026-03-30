import { F } from '../../theme'
import { EXPERIENCE } from '../../data'

export function About({ T, AC, accentId, grad, gradText, divider, isMobile }) {
  return (
    <section id="sec-about" style={{
      padding: 'clamp(48px,8vw,88px) clamp(24px,5vw,60px)',
      display: 'flex', gap: 50, alignItems: 'flex-start',
      ...divider,
      // On mobile: stack vertically. On desktop: side by side.
      flexDirection: isMobile ? 'column' : 'row',
    }}>

      {/* Text + stats — full width on mobile, flex:1 on desktop */}
      <div data-reveal="up" style={{ flex: isMobile ? 'none' : '1 1 280px', width: isMobile ? '100%' : undefined, minWidth: 0 }}>
        <p style={{ ...F.DM, fontSize: 10, color: T.textMuted, letterSpacing: '.26em', textTransform: 'uppercase', marginBottom: 8 }}>About Me</p>
        <h2 style={{ ...F.BC, fontSize: 'clamp(32px,4vw,44px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 20, color: T.text }}>
          THE PERSON <span key={`about-${accentId}`} style={gradText}>BEHIND THE CODE</span>
        </h2>
        <p style={{ ...F.DM, color: T.textSub, fontSize: 13.5, lineHeight: 1.82, maxWidth: isMobile ? '100%' : 440, marginBottom: 18 }}>
          I'm a Front-End Developer based in Cebu, Philippines with a knack for turning designs into fast, polished digital experiences. Before writing code, I spent years as a 2D animator — and that eye for detail, motion, and composition still shapes every interface I build.
        </p>
        <p style={{ ...F.DM, color: T.textSub, fontSize: 13.5, lineHeight: 1.82, maxWidth: isMobile ? '100%' : 440, marginBottom: 36 }}>
          Armed with a BS in Information Technology and deep hands-on experience across the WordPress ecosystem and modern JavaScript frameworks, I build sites that look great, load fast, and rank well — without cutting corners on accessibility or maintainability.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { v: '50+', l: 'Projects Delivered', c: AC.primary },
            { v: '2+',  l: 'Years Experience',   c: AC.to      },
          ].map(s => (
            <div key={s.l} style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: '20px 26px', textAlign: 'center', transition: 'background 0.35s' }}>
              <div style={{ ...F.BC, fontSize: 32, fontWeight: 900, color: s.c, transition: 'color 0.3s' }}>{s.v}</div>
              <div style={{ ...F.DM, fontSize: 10, color: T.textMuted, marginTop: 4, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience card:
           Desktop → flex child, fixed width, sits beside text
           Mobile  → full width wrapper with centering, card stays 330px */}
      <div style={isMobile
        ? { width: '100%', display: 'flex', justifyContent: 'center' }
        : { flexShrink: 0 }
      }>
        <div
          data-reveal="card" data-reveal-delay="0.1"
          key={`expcard-${accentId}`}
          style={{ width: 330, borderRadius: 28, padding: '32px 28px', background: grad, boxShadow: `0 24px 70px ${AC.from}50` }}>
          <div style={{ ...F.BC, fontWeight: 900, fontSize: 20, marginBottom: 26, color: '#fff' }}>My Experience</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 3, minHeight: 64, background: 'rgba(255,255,255,.35)', borderRadius: 4, flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ ...F.DM, fontSize: 11.5, color: 'rgba(255,255,255,.6)', marginBottom: 4 }}>{e.period}</div>
                  <div style={{ ...F.B, fontWeight: 800, fontSize: 15.5, lineHeight: 1.3, color: '#fff' }}>{e.role}</div>
                  <div style={{ ...F.DM, fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 3 }}>{e.company}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.22)' }}>
            <div style={{ ...F.DM, fontSize: 10, color: 'rgba(255,255,255,.5)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 14 }}>Education</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 3, minHeight: 56, background: 'rgba(255,255,255,.35)', borderRadius: 4, flexShrink: 0, marginTop: 3 }} />
              <div>
                <div style={{ ...F.DM, fontSize: 11.5, color: 'rgba(255,255,255,.6)', marginBottom: 4 }}>Jul 2015 – Jun 2019</div>
                <div style={{ ...F.B, fontWeight: 800, fontSize: 15, lineHeight: 1.3, color: '#fff' }}>BS Information Technology</div>
                <div style={{ ...F.DM, fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 3 }}>ACLC, Mandaue City</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
