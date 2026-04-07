import { useState, useEffect } from 'react'
import { useTheme, SCROLL_ID } from './hooks/useTheme'
import { useScrollAnimations }  from './hooks/useScrollAnimations'
import { AmbientBlobs }    from './components/AmbientBlobs'
import { Sidebar }         from './components/Sidebar'
import { MobileNav }       from './components/MobileNav'
import { Hero }            from './components/sections/Hero'
import { About }           from './components/sections/About'
import { WorkExperience }  from './components/sections/WorkExperience'
import { Skills }          from './components/sections/Skills'
import { Works }           from './components/sections/Works'
import { Contact }         from './components/sections/Contact'
import { F }               from './theme'

function Sections({ shared, scrollTo }) {
  return (
    <>
      <Hero           {...shared} scrollTo={scrollTo} />
      <About          {...shared} />
      <WorkExperience {...shared} />
      <Skills         {...shared} />
      <Works          {...shared} />
      <Contact        {...shared} />
    </>
  )
}

export default function App() {
  const {
    T, AC, ACCENTS, isDark, accentId,
    active, grad, gradText, divider, tagStyle,
    toggleMode, setAccent, scrollTo,
  } = useTheme()

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Attach GSAP roller reveal animations
  useScrollAnimations(isMobile)

  const shared   = { T, AC, isDark, accentId, grad, gradText, divider, tagStyle, isMobile }
  const navProps = { ...shared, active, scrollTo, toggleMode, setAccent, ACCENTS }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: T.bg, color: T.text,
      transition: 'background 0.35s, color 0.35s',
      overflow: 'hidden', ...F.B,
    }}>
      <AmbientBlobs AC={AC} isDark={isDark} />

      {isMobile ? (
        /* ═══ MOBILE ═══════════════════════════════════════════ */
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', zIndex: 1 }}>
          <MobileNav {...navProps} />
          <main
            id={`${SCROLL_ID}-mobile`}
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}
          >
            <Sections shared={shared} scrollTo={scrollTo} />
          </main>
        </div>
      ) : (
        /* ═══ DESKTOP ══════════════════════════════════════════
           Fixed outer shell → centered 1200px → sidebar | main
        ═══════════════════════════════════════════════════════ */
        <div style={{
          display: 'flex',
          width: '100%', 
          maxWidth: 1200,
          height: '100vh',
          margin: '0 auto',
          position: 'relative', 
          zIndex: 1,
          backgroundColor: T.wrapperBG,
        }}>
          <Sidebar {...navProps} />
          <main
            id={SCROLL_ID}
            style={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
          >
            <Sections shared={shared} scrollTo={scrollTo} />
                      <p>
                      Total Visitors:{" "}
                      <SiteViews projectName="my-portfolio" />
                      </p>
          </main>
        </div>
      )}
    </div>
  )
}
