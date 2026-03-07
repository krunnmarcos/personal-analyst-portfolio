import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Variants para animação staggered
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const photoVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Coluna de texto */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Saudação */}
            <motion.p
              variants={itemVariants}
              className="text-sm font-light tracking-wide text-[var(--text-muted)] mb-4"
            >
              Bem-vindo (a)
            </motion.p>

            {/* Título principal */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[var(--text-primary)] mb-4"
            >
              Analista de Dados{' '}
              <span className="text-[var(--accent)]">&amp;</span>
              <br />
              Engenharia de Software
            </motion.h1>

            {/* Nome */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl font-semibold text-[var(--text-secondary)] mb-8"
            >
              Marcos Irenos
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link
                to="/contato"
                className="
                  inline-flex items-center gap-2
                  px-7 py-3.5
                  bg-[var(--accent)] text-white
                  rounded-full text-sm font-medium
                  hover:brightness-110 active:scale-95
                  transition-all duration-200
                  shadow-[0_4px_16px_rgba(91,74,240,0.3)]
                  hover:shadow-[0_6px_24px_rgba(91,74,240,0.4)]
                "
              >
                Contate-me
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Coluna da foto */}
          <motion.div
            className="flex-shrink-0"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              {/* Container da foto com borda grain */}
              <div
                className="
                  w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72
                  rounded-full overflow-hidden
                  ring-2 ring-[var(--border)]
                  shadow-[var(--shadow-md)]
                "
              >
                {/* 
                  Substitua o src abaixo pelo caminho real da foto.
                  Exemplo: src="/foto-marcos.jpg" 
                */}
                <img
                  src="https://placehold.co/320x320/EAEAE7/555555?text=MI"
                  alt="Foto de Marcos Irenos, analista de dados e estudante de engenharia de software"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Grain overlay sutil na borda */}
              <div
                className="
                  absolute inset-0 rounded-full pointer-events-none
                  mix-blend-overlay opacity-30
                "
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
