import { useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

/**
 * Custom hook para animações de scroll reveal com Framer Motion.
 * Retorna ref, controls e variants para usar nos componentes.
 */
export function useScrollReveal({ delay = 0, once = true } = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    margin: '-80px',
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return { ref, controls, variants }
}
