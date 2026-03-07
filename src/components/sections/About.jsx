import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

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
  const { t } = useLang()
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
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium tracking-widest uppercase text-[var(--accent)]"
          >
            {t('aboutMini.label')}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-[var(--text-primary)]"
          >
            {t('aboutMini.p1')}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl"
          >
            {t('aboutMini.p2')}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              to="/sobre"
              className="
                inline-flex items-center gap-1.5
                text-sm font-medium text-[var(--accent)]
                hover:gap-3 transition-all duration-300
              "
            >
              {t('aboutMini.readMore')}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
