import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Visitors from './pages/Visitors.jsx'
import './index.css'

// ── Track a visit whenever someone loads the main portfolio ──────────────────
const isVisitorsPage = window.location.pathname === '/visitors'

if (!isVisitorsPage) {
  fetch('https://api.countapi.xyz/hit/jaypaimalan-portfolio/visitors')
    .catch(() => {}) // silent fail — never break the portfolio
}

// ── Simple path-based router (no React Router needed) ───────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {isVisitorsPage ? <Visitors /> : <App />}
  </React.StrictMode>
)