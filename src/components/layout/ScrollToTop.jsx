import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Smooth scroll customizado com easing ultra suave.
 * Duração: 1200ms com curva ease-out quíntica.
 */
function smoothScrollToTop(duration = 1200) {
  const start = window.scrollY
  if (start === 0) return

  const startTime = performance.now()

  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5)
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutQuint(progress)

    window.scrollTo(0, start * (1 - eased))

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    smoothScrollToTop(1200)
  }, [pathname])

  return null
}
