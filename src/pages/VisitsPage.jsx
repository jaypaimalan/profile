import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const PAGE_SIZE = 10

export default function VisitsPage() {
  const [count, setCount] = useState(null)
  const [logs, setLogs] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [logsLoading, setLogsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const { error: rpcError } = await supabase.rpc('increment_visits')
        if (rpcError) throw rpcError

        const [countRes, logsRes] = await Promise.all([
          supabase.from('visits').select('count').eq('id', 1).single(),
          supabase
            .from('visits_log')
            .select('id, visited_at')
            .order('visited_at', { ascending: false })
            .range(0, PAGE_SIZE),
        ])

        if (countRes.error) throw countRes.error
        if (logsRes.error) throw logsRes.error

        setCount(countRes.data.count)
        setLogs(logsRes.data)
        setHasMore(logsRes.data.length === PAGE_SIZE + 1)
        setTimeout(() => setVisible(true), 100)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const loadMore = async () => {
    setLogsLoading(true)
    const nextPage = page + 1
    const from = nextPage * PAGE_SIZE
    const { data, error } = await supabase
      .from('visits_log')
      .select('id, visited_at')
      .order('visited_at', { ascending: false })
      .range(from, from + PAGE_SIZE)

    if (!error) {
      setLogs(prev => [...prev, ...data])
      setHasMore(data.length === PAGE_SIZE + 1)
      setPage(nextPage)
    }
    setLogsLoading(false)
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;600&display=swap');

        .visits-root {
          min-height: 100vh;
          background: #080b0f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 5rem 1.5rem;
          font-family: 'Rajdhani', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .visits-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 255, 180, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 180, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .visits-vignette {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, #080b0f 100%);
          pointer-events: none;
        }

        .visits-card {
          position: relative;
          z-index: 1;
          border: 1px solid rgba(0, 255, 180, 0.15);
          padding: 3rem 4rem;
          text-align: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          background: rgba(8, 11, 15, 0.6);
          backdrop-filter: blur(2px);
          width: 100%;
          max-width: 640px;
          margin-bottom: 1.5rem;
        }

        .visits-card.show { opacity: 1; transform: translateY(0); }

        .visits-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          color: rgba(0, 255, 180, 0.5);
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .visits-label::before { content: '> '; color: rgba(0, 255, 180, 0.25); }

        .visits-number {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(4rem, 12vw, 7rem);
          color: #00ffb4;
          line-height: 1;
          text-shadow: 0 0 40px rgba(0, 255, 180, 0.2);
          margin-bottom: 1.5rem;
          animation: countIn 0.4s ease;
        }

        @keyframes countIn {
          0%   { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        .visits-sub {
          font-size: 0.85rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
        }

        .visits-divider {
          width: 40px; height: 1px;
          background: rgba(0, 255, 180, 0.2);
          margin: 1.25rem auto;
        }

        /* Log table */
        .log-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 640px;
          border: 1px solid rgba(0, 255, 180, 0.1);
          background: rgba(8, 11, 15, 0.6);
          backdrop-filter: blur(2px);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }

        .log-panel.show { opacity: 1; transform: translateY(0); }

        .log-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(0, 255, 180, 0.08);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(0, 255, 180, 0.4);
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
        }

        .log-row {
          display: grid;
          grid-template-columns: 2rem 1fr 1fr;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          align-items: center;
          transition: background 0.15s;
        }

        .log-row:last-child { border-bottom: none; }
        .log-row:hover { background: rgba(0, 255, 180, 0.03); }

        .log-index {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: rgba(0, 255, 180, 0.2);
          text-align: right;
        }

        .log-date {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .log-time {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: rgba(0, 255, 180, 0.6);
          text-align: right;
        }

        .load-more {
          width: 100%;
          padding: 0.875rem;
          background: transparent;
          border: none;
          border-top: 1px solid rgba(0, 255, 180, 0.08);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(0, 255, 180, 0.35);
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }

        .load-more:hover {
          color: rgba(0, 255, 180, 0.7);
          background: rgba(0, 255, 180, 0.03);
        }

        .visits-loading {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: rgba(0, 255, 180, 0.4);
          letter-spacing: 0.2em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .visits-loading::after {
          content: '';
          display: inline-block;
          width: 8px; height: 14px;
          background: rgba(0, 255, 180, 0.5);
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .corner { position: absolute; width: 10px; height: 10px; border-color: rgba(0, 255, 180, 0.3); border-style: solid; }
        .corner-tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .corner-tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }
      `}</style>

      <div className="visits-root">
        <div className="visits-grid" />
        <div className="visits-vignette" />

        {/* Counter card */}
        <div className={`visits-card ${visible ? 'show' : ''}`}>
          <div className="corner corner-tl" /><div className="corner corner-tr" />
          <div className="corner corner-bl" /><div className="corner corner-br" />

          <p className="visits-label">total visits recorded</p>

          {loading && <div className="visits-loading">fetching</div>}
          {error && <p style={{ fontFamily: 'monospace', color: 'rgba(255,80,80,0.7)', fontSize: '0.75rem' }}>ERR: {error}</p>}

          {!loading && !error && count !== null && (
            <>
              <div className="visits-number">{count.toLocaleString()}</div>
              <div className="visits-divider" />
              <p className="visits-sub">and counting</p>
            </>
          )}
        </div>

        {/* Log panel */}
        {!loading && !error && (
          <div className={`log-panel ${visible ? 'show' : ''}`}>
            <div className="log-header">
              <span>visit log</span>
              <span>{logs.length} entries shown</span>
            </div>

            {logs.map((entry, i) => {
              const { date, time } = formatDate(entry.visited_at)
              return (
                <div className="log-row" key={entry.id}>
                  <span className="log-index">{i + 1}</span>
                  <span className="log-date">{date}</span>
                  <span className="log-time">{time}</span>
                </div>
              )
            })}

            {hasMore && (
              <button className="load-more" onClick={loadMore} disabled={logsLoading}>
                {logsLoading ? 'loading...' : '+ load more'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}