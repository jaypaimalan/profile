# FJP Portfolio — Francis Jay Paimalan

A pixel-perfect personal portfolio built with **Vite + React**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
fjp-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── profile.png       ← your profile photo
│   ├── App.jsx               ← main portfolio component
│   ├── index.css             ← global styles
│   └── main.jsx              ← React entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🛠 Tech Stack

- **Vite** — lightning-fast dev server & bundler
- **React 18** — UI library
- **Barlow Condensed + DM Sans** — Google Fonts
- Pure inline styles + CSS classes (no external UI library)

## ✏️ Customizing

- Update your info in `src/App.jsx` under the `// ─── Data ───` section
- Replace `src/assets/profile.png` with any photo (keep the filename)
- Adjust colors in `src/index.css` (search for `#7c3aed` for purple, `#ec4899` for pink)
