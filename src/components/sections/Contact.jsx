import { useState } from 'react'
import { F } from '../../theme'
import { IC } from '../../icons'
import { CONTACT_INFO } from '../../data'

const getKey = () => { try { return atob(import.meta.env.VITE_W3F).trim() } catch { return '' } }
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export function Contact({ T, AC, accentId, grad, gradText, divider, isMobile }) {
  const [form,    setForm]    = useState({ name: '', email: '', msg: '' })
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [sendErr, setSendErr] = useState(false)

  const validate = (f) => {
    const e = {}
    if (!f.name.trim())              e.name  = 'Name is required'
    if (!f.email.trim())             e.email = 'Email is required'
    else if (!isValidEmail(f.email)) e.email = 'Please enter a valid email address'
    if (!f.msg.trim())               e.msg   = 'Message is required'
    return e
  }

  const handleBlur   = (field) => { setTouched(t => ({ ...t, [field]: true })); setErrors(validate(form)) }
  const handleChange = (field, val) => {
    const next = { ...form, [field]: val }
    setForm(next)
    if (touched[field]) setErrors(validate(next))
  }

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, msg: true })
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setSending(true); setSendErr(false)
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: getKey(), name: form.name, email: form.email, message: form.msg, subject: `Portfolio Inquiry from ${form.name}` }),
      })
      const data = await res.json()
      if (data.success) { setSent(true); setForm({ name: '', email: '', msg: '' }); setTouched({}) }
      else setSendErr(true)
    } catch { setSendErr(true) }
    setSending(false)
  }

  const fieldStyle = (field) => ({
    background: 'rgba(255,255,255,0.18)',
    border: `1.5px solid ${touched[field] && errors[field] ? 'rgba(255,100,100,0.8)' : 'rgba(255,255,255,0.22)'}`,
    color: '#fff', borderRadius: 12, padding: '11px 14px',
    fontSize: 13, width: '100%', outline: 'none', ...F.DM,
    transition: 'border-color 0.2s',
    boxShadow: touched[field] && errors[field] ? '0 0 0 3px rgba(255,100,100,0.15)' : 'none',
  })

  const errRow = (field) => touched[field] && errors[field] && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, color: T.errText, fontSize: 11, ...F.DM, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
      {IC.warn} {errors[field]}
    </div>
  )

  const formCard = (
    <div
      data-reveal="card" data-reveal-delay="0.1"
      key={`form-${accentId}`}
      style={{ width: 300, flexShrink: 0, borderRadius: 24, padding: '26px 22px', background: grad, boxShadow: `0 20px 56px ${AC.from}50` }}>
      {sent ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🎉</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 8 }}>Message Sent!</div>
          <div style={{ ...F.DM, color: 'rgba(255,255,255,.75)', fontSize: 13 }}>Thanks! I'll get back to you soon.</div>
          <button onClick={() => setSent(false)} style={{ marginTop: 20, background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', borderRadius: 10, padding: '10px 20px', cursor: 'pointer', ...F.DM, fontSize: 12 }}>Send Another</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Your Name',     key: 'name',  type: 'text',  ph: 'Enter your name'  },
            { label: 'Email Address', key: 'email', type: 'email', ph: 'Enter your email' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 10, color: 'rgba(255,255,255,.8)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5, display: 'block', ...F.DM, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} value={form[f.key]}
                onChange={e => handleChange(f.key, e.target.value)}
                onBlur={() => handleBlur(f.key)}
                style={fieldStyle(f.key)} />
              {errRow(f.key)}
            </div>
          ))}

          <div>
            <label style={{ fontSize: 10, color: 'rgba(255,255,255,.8)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5, display: 'block', ...F.DM, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>Message</label>
            <textarea rows={4} placeholder="Type your message here..." value={form.msg}
              onChange={e => handleChange('msg', e.target.value)}
              onBlur={() => handleBlur('msg')}
              style={{ ...fieldStyle('msg'), resize: 'none' }} />
            {errRow('msg')}
          </div>

          {sendErr && (
            <div style={{ ...F.DM, color: T.errText, fontSize: 12, display: 'flex', alignItems: 'center', gap: 5, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
              {IC.warn} Something went wrong. Please try again.
            </div>
          )}

          <button onClick={handleSubmit} disabled={sending}
            style={{ background: T.sendBg, color: T.sendText, fontWeight: 800, letterSpacing: '.1em', fontSize: 12, border: 'none', cursor: sending ? 'not-allowed' : 'pointer', borderRadius: 12, width: '100%', padding: '13px', opacity: sending ? 0.7 : 1, transition: 'opacity .2s, transform .2s', ...F.B, marginTop: 2 }}>
            {sending ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <section id="sec-contact" style={{
      padding: 'clamp(48px,8vw,80px) clamp(24px,5vw,60px) clamp(60px,10vw,100px)',
      ...divider,
      display: 'flex', gap: 50, alignItems: 'flex-start',
      // Mobile: stack vertically. Desktop: side by side.
      flexDirection: isMobile ? 'column' : 'row',
    }}>

      {/* Left — heading + contact info — always full width on mobile */}
      <div data-reveal="left" style={{ flex: '1 1 260px', minWidth: 0 }}>
        <h2 style={{ ...F.BC, fontSize: 'clamp(36px,5vw,52px)', fontWeight: 900, lineHeight: .92, color: T.text }}>REACH OUT</h2>
        <h2 key={`reach-${accentId}`} style={{ ...F.BC, fontSize: 'clamp(36px,5vw,52px)', fontWeight: 900, lineHeight: .92, marginBottom: 22, ...gradText }}>TO ME...</h2>
        <p style={{ ...F.DM, color: T.textSub, fontSize: 13.5, lineHeight: 1.78, maxWidth: 'clamp(100%, 60vw, 300px)', marginBottom: 36 }}>
          Have a project in mind? Let's talk about how I can help you build something amazing. Open for freelance and full-time opportunities.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {CONTACT_INFO.map(c => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: `${AC.from}18`, border: `1px solid ${AC.from}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: AC.primary, flexShrink: 0 }}>
                {c.icon}
              </div>
              <div>
                <div style={{ ...F.DM, fontSize: 9, color: T.textMuted, letterSpacing: '.16em', textTransform: 'uppercase' }}>{c.label}</div>
                {c.href
                  ? <a href={c.href} style={{ fontSize: 14, fontWeight: 600, marginTop: 2, color: T.text, textDecoration: 'none', display: 'block' }}>{c.value}</a>
                  : <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2, color: T.text }}>{c.value}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form card:
           Desktop → plain flex child (sits beside info)
           Mobile  → wrapped in centering div, card stays 300px wide */}
      {isMobile
        ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>{formCard}</div>
        : formCard
      }
    </section>
  )
}
