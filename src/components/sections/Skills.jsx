import { F } from '../../theme'
import { SKILLS } from '../../data'

export function Skills({ T, AC, divider, tagStyle }) {
  return (
    <section data-reveal="up" style={{ padding: 'clamp(48px,8vw,80px) clamp(24px,5vw,60px)', ...divider }}>
      <p style={{ ...F.DM, fontSize: 10, color: AC.primary, letterSpacing: '.28em', textTransform: 'uppercase', marginBottom: 7, transition: 'color 0.3s' }}>Tech Stack</p>
      <h2 style={{ ...F.BC, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, letterSpacing: '-.4px', marginBottom: 44, color: T.text }}>MY SKILLS</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {SKILLS.map((group, gi) => (
          <div key={gi}>
            <div style={{ ...F.DM, fontSize: 11, color: T.textMuted, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 14 }}>{group.category}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {group.items.map(skill => (
                <span key={skill} style={tagStyle}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
