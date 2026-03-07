import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ContactPage from './pages/Contact'

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0, left: 0 })}
    >
      <motion.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Accent blur blobs */}
        <div className="bg-blur-blob bg-blur-blob--top" aria-hidden="true" />
        <div className="bg-blur-blob bg-blur-blob--bottom" aria-hidden="true" />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent)] focus:text-white focus:text-sm"
        >
          Pular para o conteúdo
        </a>
        <AnimatedRoutes />
      </Router>
    </LanguageProvider>
  )
}

export default App
