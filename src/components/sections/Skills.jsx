import { motion } from 'framer-motion'
import {
  BarChart3,
  Code2,
  Database,
  BrainCircuit,
  Blocks,
  Briefcase,
  Building2,
} from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

/* ── Animação ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ── Configuração estática (ícones, layout) ── */
const skillConfig = [
  { icon: BarChart3, span: 'md:col-span-2' },
  { icon: Code2, span: 'md:col-span-2' },
  { icon: Database, span: 'md:col-span-1' },
  { icon: BrainCircuit, span: 'md:col-span-1', highlight: true },
  { icon: Blocks, span: 'md:col-span-2' },
]

const statIcons = [Briefcase, Building2]

/* ── Componente de badge ── */
function Badge({ children }) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
      {children}
    </span>
  )
}

/* ── Mini gráfico SVG decorativo (para card ML) ── */
function MiniChart() {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      className="w-28 h-10 mt-3 opacity-50"
      aria-hidden="true"
    >
      <polyline
        points="0,35 15,28 30,30 45,18 60,22 75,10 90,14 105,5 120,8"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="105" cy="5" r="3" fill="var(--accent)" opacity="0.6" />
    </svg>
  )
}

/* ── Componente principal ── */
export default function Skills() {
  const { t } = useLang()
  const skillItems = t('skills.items')
  const statItems = t('skills.stats')

  // Merge config estático com texto traduzido
  const skills = skillItems.map((item, i) => ({
    ...item,
    ...skillConfig[i],
  }))

  const stats = statItems.map((item, i) => ({
    ...item,
    icon: statIcons[i],
  }))

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--accent)] mb-3">
            {t('skills.label')}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)]">
            {t('skills.heading')}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Skill cards */}
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                variants={cardVariants}
                className={`
                  group relative p-6 rounded-2xl
                  bg-[var(--bg-secondary)]
                  border border-[var(--border)]
                  card-hover
                  ${skill.span}
                  ${skill.highlight ? 'ring-1 ring-[var(--accent)]/15' : ''}
                `}
              >
                {/* Ícone */}
                <div
                  className={`
                    inline-flex items-center justify-center
                    w-10 h-10 rounded-xl mb-4
                    ${skill.highlight
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    }
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* Título */}
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">
                  {skill.title}
                </h3>

                {/* Descrição */}
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {skill.description}
                </p>

                {/* Badges */}
                {skill.badges && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {skill.badges.map((b) => (
                      <Badge key={b}>{b}</Badge>
                    ))}
                  </div>
                )}

                {/* Mini gráfico no card ML */}
                {skill.highlight && <MiniChart />}
              </motion.div>
            )
          })}

          {/* Stat cards */}
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="
                  group flex items-center gap-4 p-6 rounded-2xl
                  bg-[var(--bg-secondary)]
                  border border-[var(--border)]
                  card-hover
                  md:col-span-2
                "
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)] leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
