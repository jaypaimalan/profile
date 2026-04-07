import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Visitors from './pages/Visitors.jsx'
import './index.css'

// ── Detect if visitor is on the dashboard page ─────────────────────────────
const isVisitorsPage = window.location.pathname === '/visitors'

// ── Track a visit on public pages only ─────────────────────────────────────
if (!isVisitorsPage) {
  fetch('https://counterapi.dev/hit/jaypaimalan-portfolio/visitors')
    .catch(() => {}) // ignore errors
}

// ── Simple router (keeps everything super light) ───────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {isVisitorsPage ? <Visitors /> : <App />}
  </React.StrictMode>
)