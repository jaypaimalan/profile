import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Visitors from './pages/Visitors.jsx' // Import your component
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* This handles everything else (your existing app) */}
        <Route path="/*" element={<App />} />
        
        {/* This handles the specific visitors URL */}
        <Route path="/visitors" element={<Visitors />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
