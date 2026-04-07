import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Visitors from './pages/Visitors.jsx'
import './index.css'

// ── Detect if visitor is on the dashboard page ─────────────────────────────
const isVisitorsPage = window.location.pathname === '/visitors'

// ── Track a visit on public pages only ─────────────────────────────────────
if (!isVisitorsPage) {
  // Increment counter for public visits
  const API_KEY = import.meta.env.VITE_COUNTER_API_KEY // For Vite
  // const API_KEY = process.env.REACT_APP_COUNTER_API_KEY // For Create React App
  
  if (API_KEY) {
    fetch('https://api.counterapi.dev/v2/francis-jay-paimalans-team-3630/first-counter-3630/up', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    }).catch(() => {
      // Silent fail - don't break the user experience
      console.error('Failed to track visitor')
    })
  }
}

// ── Simple router (keeps everything super light) ───────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {isVisitorsPage ? <Visitors /> : <App />}
  </React.StrictMode>
)