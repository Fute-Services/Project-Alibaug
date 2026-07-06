import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Preload the brochure PDF in the background after the app has loaded,
// so the Brochure page opens instantly. Dynamic import keeps pdf.js out
// of the main bundle.
const preloadBrochureInBackground = () => {
  const start = () =>
    import('./lib/brochurePdf').then((m) => m.preloadBrochure()).catch(() => { })
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => start(), { timeout: 4000 })
  } else {
    setTimeout(start, 2500)
  }
}

if (document.readyState === 'complete') {
  preloadBrochureInBackground()
} else {
  window.addEventListener('load', preloadBrochureInBackground, { once: true })
}
