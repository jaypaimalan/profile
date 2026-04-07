import { useState, useEffect } from 'react'

// ── Simple password gate — change this to whatever you want ──────────────────
const SECRET = 'fjp2025'

// ── Uses countapi.xyz (free, no signup) ─────────────────────────────────────
// Namespace is unique to your site — change if you ever reset the counter
const NAMESPACE = 'jaypaimalan-portfolio'
const KEY       = 'visitors'
const API       = `https://api.countapi.xyz`

export default function Visitors() {
  const [authed,  setAuthed]  = useState(() => sessionStorage.getItem('vjp') === '1')
  const [pass,    setPass]    = useState('')
  const [count,   setCount]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [wrong,   setWrong]   = useState(false)

  const login = (e) => {
    e.preventDefault()
    if (pass === SECRET) {
      sessionStorage.setItem('vjp', '1')
      setAuthed(true)
      setWrong(false)
    } else {
      setWrong(true)
    }
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    fetch(`${API}/get/${NAMESPACE}/${KEY}`)
      .then(r => r.json())
      .then(d => { setCount(d.value ?? 0); setLoading(false) })
      .catch(() => { setError('Could not fetch count.'); setLoading(false) })
  }, [authed])

  const reset = async () => {
    if (!window.confirm('Reset counter to 0?')) return
    try {
      await fetch(`${API}/set/${NAMESPACE}/${KEY}?value=0`)
      setCount(0)
    } catch { setError('Reset failed.') }
  }

  const s = {
    page:  { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d', fontFamily: "'Lato', sans-serif" },
    box:   { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 48px', minWidth: 320, textAlign: 'center' },
    title: { color: '#fff', fontSize: 14, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 32, opacity: 0.5 },
    big:   { color: '#fff', fontSize: 72, fontWeight: 900, lineHeight: 1, marginBottom: 8 },
    sub:   { color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 32 },
    input: { width: '100%', background: 'rgba(255,255,255,0.07)', border: `1px solid ${wrong ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 12, fontFamily: 'inherit' },
    btn:   { width: '100%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: 'none', borderRadius: 10, padding: '12px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: '.08em' },
    reset: { marginTop: 24, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 18px', color: 'rgba(255,255,255,0.3)', fontSize: 11, cursor: 'pointer', letterSpacing: '.06em' },
    err:   { color: 'rgba(255,150,150,0.9)', fontSize: 12, marginTop: 8 },
  }

  if (!authed) return (
    <div style={s.page}>
      <div style={s.box}>
        <div style={s.title}>Visitor Dashboard</div>
        <form onSubmit={login}>
          <input
            type="password"
            placeholder="Enter password"
            value={pass}
            onChange={e => { setPass(e.target.value); setWrong(false) }}
            style={s.input}
            autoFocus
          />
          {wrong && <div style={s.err}>Incorrect password</div>}
          <button type="submit" style={{ ...s.btn, marginTop: wrong ? 12 : 0 }}>ENTER</button>
        </form>
      </div>
    </div>
  )

  return (
    <div style={s.page}>
      <div style={s.box}>
        <div style={s.title}>Total Visitors</div>
        {loading && <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>Loading…</div>}
        {error   && <div style={s.err}>{error}</div>}
        {!loading && count !== null && (
          <>
            <div style={s.big}>{count.toLocaleString()}</div>
            <div style={s.sub}>visits tracked via countapi.xyz</div>
          </>
        )}
        <button onClick={reset} style={s.reset}>RESET COUNTER</button>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => { sessionStorage.removeItem('vjp'); setAuthed(false) }}
            style={{ ...s.reset, borderColor: 'transparent', color: 'rgba(255,255,255,0.15)' }}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  )
}