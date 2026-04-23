import profileImg from '../../assets/profile.png'
import { F } from '../../theme'
import { IC } from '../../icons'

export function Hero({ T, AC, isDark, accentId, grad, gradText, scrollTo }) {
  return (
    <section id="sec-home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 60px', background: T.bgAlt, overflow: 'hidden', transition: 'background 0.35s', flexWrap: 'wrap', gap: 40 }}>

      {/* Inner blobs */}
      <div style={{ position: 'absolute', width: 500, height: 500, background: `${AC.from}20`, borderRadius: '50%', filter: 'blur(100px)', right: 80, top: 20, pointerEvents: 'none', transition: 'background 0.5s' }} />
      <div style={{ position: 'absolute', width: 280, height: 280, background: `${AC.to}15`,   borderRadius: '50%', filter: 'blur(80px)',  right: 0,  top: 200, pointerEvents: 'none', transition: 'background 0.5s' }} />

      {/* Text */}
      <div data-reveal="up" style={{ flex: '1 1 300px', zIndex: 2, minWidth: 0 }}>
        <p style={{ ...F.DM, color: AC.primary, fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', marginBottom: 20, transition: 'color 0.3s' }}>
          WordPress Developer · Based in Cebu, Philippines
        </p>
        <div style={{ ...F.BC, lineHeight: 0.93, marginBottom: 26 }}>
          <div style={{ fontSize: 'clamp(42px,6vw,66px)', fontWeight: 900, color: T.text, letterSpacing: '-1.5px' }}>MY NAME IS</div>
          <div key={`h1-${accentId}`} style={{ fontSize: 'clamp(42px,6vw,66px)', fontWeight: 900, letterSpacing: '-1.5px', ...gradText }}>FRANCIS</div>
          <div key={`h2-${accentId}`} style={{ fontSize: 'clamp(42px,6vw,66px)', fontWeight: 900, letterSpacing: '-1.5px', ...gradText }}>JAY...</div>
        </div>
        <p style={{ ...F.DM, color: T.textSub, fontSize: 13.5, lineHeight: 1.8, maxWidth: 370, marginBottom: 36 }}>
            I craft performant, accessible, and SEO-ready websites—combining WordPress expertise with clean front-end development practices. Previously a 2D animator, I approach every build with precision, clarity, and thoughtful visual detail.
          </p>
        <button
          onClick={() => scrollTo('sec-contact', 'Contact')}
          style={{ ...F.B, border: 'none', cursor: 'pointer', color: '#fff', padding: '13px 30px', borderRadius: 50, fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, background: grad, boxShadow: `0 8px 28px ${AC.from}50`, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
         Let's Work Together {IC.arrow}
        </button>
      </div>

      {/* Profile photo */}
      <div data-reveal="right" data-reveal-delay="0.15" style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
        <div style={{ position: 'relative', width: 'clamp(240px,28vw,300px)', height: 'clamp(240px,28vw,300px)' }}>

          {/* Themed blobs behind the transparent PNG */}
          <div key={`pb1-${accentId}`} style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', width: '85%', height: '85%', borderRadius: '50%', background: `radial-gradient(ellipse, ${AC.from}${isDark ? 'cc' : '99'} 0%, ${AC.to}${isDark ? 'aa' : '77'} 50%, transparent 75%)`, filter: 'blur(36px)', transition: 'background 0.4s', zIndex: 1 }} />
          <div key={`pb2-${accentId}`} style={{ position: 'absolute', bottom: '12%', right: '8%', width: '45%', height: '45%', borderRadius: '50%', background: `radial-gradient(ellipse, ${AC.to}${isDark ? 'bb' : '88'} 0%, transparent 70%)`, filter: 'blur(24px)', transition: 'background 0.4s', zIndex: 1 }} />

          {/* Circle frame */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', zIndex: 2, boxShadow: `0 0 0 3px ${AC.from}50, 0 20px 60px ${AC.from}40` }}>
            <img src={profileImg} alt="Francis Jay Paimalan"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%', display: 'block' }}
            />
          </div>

          {/* Badge */}
          <div key={`badge-${accentId}`} style={{ position: 'absolute', bottom: -4, left: -16, background: grad, borderRadius: 16, padding: '11px 18px', textAlign: 'center', boxShadow: `0 12px 36px ${AC.from}70`, transition: 'all 0.35s', zIndex: 4 }}>
            <div style={{ ...F.BC, fontSize: 26, fontWeight: 900, lineHeight: 1, color: '#fff' }}>2+</div>
            <div style={{ ...F.DM, fontSize: 9, letterSpacing: '.14em', opacity: .88, marginTop: 3, color: '#fff' }}>YRS EXPERIENCE</div>
          </div>
        </div>
      </div>
    </section>
  )
}
