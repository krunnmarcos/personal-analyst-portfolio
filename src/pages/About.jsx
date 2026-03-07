import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import {
  Briefcase,
  GraduationCap,
  Heart,
  MapPin,
  Calendar,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

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

export default function AboutPage() {
  return (
    <Layout>
      <main id="main-content" className="pt-28 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Intro */}
            <div className="space-y-6">
              <motion.p
                variants={itemVariants}
                className="text-sm font-medium tracking-widest uppercase text-[var(--accent)]"
              >
                Sobre mim
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl leading-[1.1] text-[var(--text-primary)]"
              >
                Marcos Irenos
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed text-[var(--text-secondary)]"
              >
                Sou analista de dados no Grupo RIC, onde faço parte da equipe de
                Inteligência Financeira. Meu dia a dia envolve transformar dados
                brutos em insights que orientam decisões estratégicas — usando
                Power BI, Python e SQL como minhas ferramentas principais.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed text-[var(--text-secondary)]"
              >
                Estudo Engenharia de Software na UNIBRASIL (2023–2026) e
                acredito que a intersecção entre análise de dados e
                desenvolvimento de software é onde as soluções mais criativas e
                escaláveis acontecem. Gosto de automatizar o que é repetitivo e
                dar clareza ao que é complexo.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg leading-relaxed text-[var(--text-secondary)]"
              >
                Fora do trabalho, estudo machine learning, contribuo em projetos
                pessoais e busco formas de tornar dados mais acessíveis para
                quem não é técnico.
              </motion.p>
            </div>

            {/* Info cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  icon: Briefcase,
                  label: 'Cargo atual',
                  value: 'Analista de Dados Jr. — Grupo RIC',
                },
                {
                  icon: GraduationCap,
                  label: 'Formação',
                  value: 'Eng. de Software — UNIBRASIL',
                },
                {
                  icon: MapPin,
                  label: 'Localização',
                  value: 'Curitiba, PR — Brasil',
                },
                {
                  icon: Calendar,
                  label: 'Experiência',
                  value: '2+ anos em análise de dados',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shrink-0">
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--text-muted)] mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* O que me motiva */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart
                  size={18}
                  className="text-[var(--accent)]"
                />
                <h2 className="font-display text-2xl text-[var(--text-primary)]">
                  O que me motiva
                </h2>
              </div>
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                Acredito que dados bem apresentados mudam perspectivas. Me motiva
                ver um dashboard que desenhei ajudando alguém a tomar uma decisão
                melhor, ou um script que economiza horas de trabalho manual. A
                tecnologia existe para servir pessoas — e é isso que me guia.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </Layout>
  )
}
