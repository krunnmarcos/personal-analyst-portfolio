import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, lang, toggleLang } = useLang()

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/sobre' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.contact'), href: '/contato' },
  ]

  // Detecta scroll para ajustar sombra do header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      {/* Header fixo com glass effect */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <nav
          className={`
            px-6 py-3 flex items-center justify-between rounded-full
            transition-shadow duration-300
            ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : 'shadow-[0_4px_24px_rgba(0,0,0,0.06)]'}
          `}
          style={{
            background: 'rgba(242, 242, 240, 0.72)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl tracking-tight select-none shrink-0"
          >
            D<span className="text-[var(--accent)]">/</span>A
          </Link>

          {/* Nav Links — Desktop */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`
                      relative py-1 transition-colors duration-200
                      ${isActive
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }
                    `}
                  >
                    {item.label}
                    {/* Indicador ativo */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Language toggle + Hamburger — Mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] bg-[var(--bg-secondary)]/60 border border-[var(--border)] transition-colors duration-200"
              aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe size={13} />
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <button
              className="md:hidden p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile — Fullscreen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{
              background: 'rgba(242, 242, 240, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <nav>
              <ul className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={item.href}
                      className="font-display text-4xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
