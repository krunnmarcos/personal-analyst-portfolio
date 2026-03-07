import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

/* ── Dados das experiências ── */
const experiences = [
  {
    company: 'Grupo RIC',
    role: 'Analista de Dados Jr.',
    period: 'Mar 2024 — Presente',
    location: 'Curitiba, PR',
    bullets: [
      'Desenvolvimento de dashboards estratégicos em Power BI para a equipe de Inteligência Financeira',
      'Construção de pipelines ETL com Python (Pandas, Openpyxl) para automação de relatórios',
      'Consultas SQL complexas em Oracle e GCP BigQuery para extração e análise de dados',
      'Automações com Power Platform e VBA para otimização de processos internos',
    ],
  },
  {
    company: 'SLB OneSubsea',
    role: 'Estagiário — Qualidade de Fornecedores',
    period: 'Ago 2023 — Mar 2024',
    location: 'Curitiba, PR',
    bullets: [
      'Análise de dados de qualidade de fornecedores com Excel e ferramentas internas',
      'Suporte na geração de relatórios e indicadores de performance (KPIs)',
      'Colaboração com equipes multidisciplinares para melhoria contínua de processos',
    ],
  },
  {
    company: 'RM2 Intelligence Partner',
    role: 'Estagiário — Dados',
    period: 'Fev 2023 — Ago 2023',
    location: 'Curitiba, PR',
    bullets: [
      'Primeiro contato profissional com análise de dados e business intelligence',
      'Apoio na criação de dashboards e tratamento de bases de dados',
      'Aprendizado prático em SQL, Excel avançado e ferramentas de BI',
    ],
  },
]

/* ── Animações ── */
const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Experience() {
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
            Experiência
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)]">
            Minha trajetória profissional
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px bg-[var(--border)] origin-top"
          />

          {/* Cards */}
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-10 md:pl-12"
              >
                {/* Dot na timeline */}
                <motion.div
                  variants={dotVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={`
                    absolute left-0 top-2
                    w-[23px] h-[23px] md:w-[31px] md:h-[31px]
                    rounded-full border-[3px]
                    flex items-center justify-center
                    ${i === 0
                      ? 'border-[var(--accent)] bg-[var(--accent)]'
                      : 'border-[var(--border)] bg-[var(--bg-primary)]'
                    }
                  `}
                >
                  <div
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
                      i === 0 ? 'bg-white' : 'bg-[var(--border)]'
                    }`}
                  />
                </motion.div>

                {/* Card content */}
                <div
                  className="
                    p-5 sm:p-6 rounded-2xl
                    bg-[var(--bg-secondary)]
                    border border-[var(--border)]
                    hover:shadow-[var(--shadow-sm)]
                    transition-shadow duration-300
                  "
                >
                  {/* Header do card */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {exp.company}
                      </h3>
                      <p className="text-sm font-medium text-[var(--accent)]">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-0.5">
                      <span className="text-xs font-medium text-[var(--text-muted)]">
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text-secondary)]"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--text-muted)] shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
