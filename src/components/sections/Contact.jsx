import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react'

const socials = [
  {
    label: 'Email',
    href: 'mailto:marcosaurelioirenos@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/marcos-irenos',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/krunnmarcos',
    icon: Github,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Contact() {
  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-8"
        >
          {/* Label */}
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium tracking-widest uppercase text-[var(--accent)]"
          >
            Contato
          </motion.p>

          {/* Frase impactante */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-[var(--text-primary)]"
          >
            Vamos construir algo{' '}
            <span className="text-[var(--accent)]">juntos</span>?
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg mx-auto"
          >
            Estou sempre aberto a novas oportunidades, colaborações e conversas
            sobre dados e tecnologia.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <a
              href="mailto:marcosaurelioirenos@gmail.com"
              className="
                inline-flex items-center gap-2
                px-8 py-4
                bg-[var(--accent)] text-white
                rounded-full text-base font-medium
                hover:brightness-110 active:scale-95
                transition-all duration-200
                shadow-[0_4px_20px_rgba(91,74,240,0.3)]
                hover:shadow-[0_8px_32px_rgba(91,74,240,0.4)]
              "
            >
              Entrar em contato
              <ArrowUpRight size={18} />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 pt-4"
          >
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    flex items-center justify-center
                    w-11 h-11 rounded-full
                    bg-[var(--bg-secondary)]
                    border border-[var(--border)]
                    text-[var(--text-secondary)]
                    hover:text-[var(--accent)] hover:border-[var(--accent)]/30
                    card-hover
                  "
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
