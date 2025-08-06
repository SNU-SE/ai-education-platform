import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// GitHub Pages SPA 라우팅 지원
function Main() {
  useEffect(() => {
    // GitHub Pages SPA 리다이렉트 처리
    const search = window.location.search
    if (search.includes('/?/')) {
      const path = search.slice(3).replace(/~and~/g, '&')
      window.history.replaceState(null, '', path)
    }
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)