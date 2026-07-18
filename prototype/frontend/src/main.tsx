import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { ScrollToTop } from './components/layout/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Toaster richColors position="top-center" offset={{ top: 72 }} mobileOffset={{ top: 64 }} />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
