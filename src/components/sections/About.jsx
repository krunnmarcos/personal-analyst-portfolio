import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export default function About() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6"
        >
          {/* Label */}
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium tracking-widest uppercase text-[var(--accent)]"
          >
            Sobre mim
          </motion.p>

          {/* Bio text */}
          <motion.p
            variants={itemVariants}
            className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-[var(--text-primary)]"
          >
            Sou analista de dados no Grupo RIC, onde transformo números em
            decisões. Trabalho com Power BI, Python e SQL para construir
            pipelines e dashboards que fazem a diferença na inteligência
            financeira da empresa.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl"
          >
            Estudo Engenharia de Software na UNIBRASIL e acredito que a
            intersecção entre dados e desenvolvimento é onde as melhores
            soluções nascem. Fora do trabalho, exploro machine learning,
            automações e formas de tornar dados mais acessíveis para todos.
          </motion.p>

          {/* Link Ler mais */}
          <motion.div variants={itemVariants}>
            <Link
              to="/sobre"
              className="
                inline-flex items-center gap-1.5
                text-sm font-medium text-[var(--accent)]
                hover:gap-3 transition-all duration-300
              "
            >
              Ler mais
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
