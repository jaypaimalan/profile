import { useState, useEffect } from 'react'

// ── Password for dashboard ───────────────────────────────
const SECRET = 'fjp2025'

// ── CounterAPI.dev settings ──────────────────────────────
const API_BASE = '/api/counter/v2/francis-jay-paimalans-team-3630/first-counter-3630'
const API_KEY = import.meta.env.VITE_COUNTER_API_KEY
 
 

export default function Visitors() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('vjp') === '1')
  const [pass, setPass] = useState('')
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [wrong, setWrong] = useState(false)
  const [stats, setStats] = useState(null)
  const [showStats, setShowStats] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

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

  // Helper function for API calls with auth header
  const fetchWithAuth = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return response.json()
  }

  // ── Fetch current visitors ─────────────────────────────
  const fetchCount = async () => {
    if (!authed) return
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchWithAuth('')
      setCount(data.value ?? 0)
    } catch (err) {
      setError('Failed to fetch counter.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ── Increment counter ─────────────────────────────────
  const increment = async () => {
    setActionLoading(true)
    setError(null)
    
    try {
      const data = await fetchWithAuth('/up', { method: 'POST' })
      setCount(data.value ?? count + 1)
    } catch (err) {
      setError('Failed to increment counter.')
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  // ── Decrement counter ─────────────────────────────────
  const decrement = async () => {
    setActionLoading(true)
    setError(null)
    
    try {
      const data = await fetchWithAuth('/down', { method: 'POST' })
      setCount(data.value ?? count - 1)
    } catch (err) {
      setError('Failed to decrement counter.')
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  // ── Fetch statistics ─────────────────────────────────
  const fetchStats = async () => {
    setActionLoading(true)
    setError(null)
    
    try {
      const data = await fetchWithAuth('/stats')
      setStats(data)
      setShowStats(true)
    } catch (err) {
      setError('Failed to fetch statistics.')
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  // ── Reset counter to 0 ─────────────────────────────────
  const reset = async () => {
    if (!window.confirm('Reset counter to 0?')) return
    
    setActionLoading(true)
    setError(null)
    
    try {
      // Get current value and decrement until 0
      const currentData = await fetchWithAuth('')
      const currentValue = currentData.value ?? 0
      
      for (let i = 0; i < currentValue; i++) {
        await fetchWithAuth('/down', { method: 'POST' })
      }
      
      setCount(0)
      setShowStats(false)
      setStats(null)
    } catch (err) {
      setError('Reset failed.')
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  // ── Fetch count on auth ───────────────────────────────
  useEffect(() => {
    if (authed) {
      fetchCount()
    }
  }, [authed])

  // ── Styles ────────────────────────────────────────────
  const s = {
    page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d', fontFamily: "'Lato', sans-serif" },
    box: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 48px', minWidth: 320, textAlign: 'center' },
    title: { color: '#fff', fontSize: 14, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 32, opacity: 0.5 },
    big: { color: '#fff', fontSize: 72, fontWeight: 900, lineHeight: 1, marginBottom: 8 },
    sub: { color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 32 },
    input: { width: '100%', background: 'rgba(255,255,255,0.07)', border: `1px solid ${wrong ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 10, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 12 },
    btn: { width: '100%', background: 'linear-gradient(135deg,#7c3aed,#ec4899)', border: 'none', borderRadius: 10, padding: '12px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', letterSpacing: '.08em', transition: 'opacity 0.2s' },
    btnSecondary: { background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)', borderRadius: 10, padding: '10px', color: '#fff', fontWeight: 600, fontSize: 12, cursor: 'pointer', letterSpacing: '.06em', transition: 'all 0.2s' },
    actionGroup: { display: 'flex', gap: 12, marginBottom: 24 },
    actionBtn: { flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'all 0.2s' },
    reset: { marginTop: 12, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 18px', color: 'rgba(255,255,255,0.3)', fontSize: 11, cursor: 'pointer', letterSpacing: '.06em' },
    err: { color: 'rgba(255,150,150,0.9)', fontSize: 12, marginTop: 8 },
    statsBox: { marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' },
    statsTitle: { color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 },
    statsRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 },
    statsLabel: { color: 'rgba(255,255,255,0.4)' },
    statsValue: { color: '#fff', fontWeight: 600 },
    disabled: { opacity: 0.5, cursor: 'not-allowed' },
  }

  // ── Login Screen ───────────────────────────────────────
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

  // ── Dashboard ─────────────────────────────────────────
  return (
    <div style={s.page}>
      <div style={s.box}>
        <div style={s.title}>Total Visitors</div>

        {loading && <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>Loading…</div>}
        {error && <div style={s.err}>{error}</div>}

        {!loading && count !== null && (
          <>
            <div style={s.big}>{count.toLocaleString()}</div>
            <div style={s.sub}>tracked via CounterAPI.dev</div>
            
            {/* Action Buttons */}
            <div style={s.actionGroup}>
              <button 
                onClick={decrement} 
                disabled={actionLoading}
                style={{ ...s.actionBtn, ...(actionLoading && s.disabled) }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                −
              </button>
              <button 
                onClick={increment} 
                disabled={actionLoading}
                style={{ ...s.actionBtn, ...(actionLoading && s.disabled) }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                +
              </button>
            </div>

            {/* Secondary Buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button 
                onClick={fetchStats} 
                disabled={actionLoading}
                style={{ ...s.btnSecondary, flex: 1, ...(actionLoading && s.disabled) }}
              >
                VIEW STATS
              </button>
              <button 
                onClick={reset} 
                disabled={actionLoading}
                style={{ ...s.btnSecondary, flex: 1, ...(actionLoading && s.disabled) }}
              >
                RESET
              </button>
            </div>
          </>
        )}

        {/* Statistics Panel */}
        {showStats && stats && (
          <div style={s.statsBox}>
            <div style={s.statsTitle}>Statistics</div>
            <div style={s.statsRow}>
              <span style={s.statsLabel}>Total Increments</span>
              <span style={s.statsValue}>{stats.increments?.total || 0}</span>
            </div>
            <div style={s.statsRow}>
              <span style={s.statsLabel}>Total Decrements</span>
              <span style={s.statsValue}>{stats.decrements?.total || 0}</span>
            </div>
            <div style={s.statsRow}>
              <span style={s.statsLabel}>Highest Value</span>
              <span style={s.statsValue}>{stats.highest || count}</span>
            </div>
            <div style={s.statsRow}>
              <span style={s.statsLabel}>Last Updated</span>
              <span style={s.statsValue}>{stats.updated_at ? new Date(stats.updated_at).toLocaleString() : 'N/A'}</span>
            </div>
            <button 
              onClick={() => setShowStats(false)}
              style={{ ...s.reset, marginTop: 12, width: '100%' }}
            >
              HIDE STATS
            </button>
          </div>
        )}

        <button
          onClick={() => { 
            sessionStorage.removeItem('vjp'); 
            setAuthed(false);
            setShowStats(false);
            setStats(null);
          }}
          style={{ ...s.reset, marginTop: showStats ? 12 : 20, borderColor: 'transparent', color: 'rgba(255,255,255,0.15)' }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  )
}