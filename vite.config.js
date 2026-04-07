import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/counter': {
        target: 'https://api.counterapi.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/counter/, ''),
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_COUNTER_API_KEY}`
        }
      }
    }
  }
})