import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

/* ── Dados das certificações ── */
const certifications = [
  { name: 'Supervised Machine Learning', platform: 'Stanford / Deeplearning.ai' },
  { name: 'Data Visualization', platform: 'Coursera' },
  { name: 'SQL Bootcamp', platform: 'Udemy' },
  { name: 'Power BI', platform: 'Microsoft / Alura' },
  { name: 'Python para Data Science', platform: 'Alura' },
  { name: 'Soft Skills', platform: 'IBM' },
]

/* ── Card de certificação ── */
function CertCard({ cert }) {
  return (
    <div
      className="
        flex items-center gap-3
        px-5 py-3.5
        rounded-full
        bg-[var(--bg-secondary)]
        border border-[var(--border)]
        shrink-0
      "
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] shrink-0">
        <Award size={15} />
      </div>
      <div className="whitespace-nowrap">
        <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
          {cert.name}
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          {cert.platform}
        </p>
      </div>
    </div>
  )
}

export default function Certifications() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
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
            Certificações
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)]">
            Aprendizado contínuo
          </h2>
        </motion.div>
      </div>

      {/* Marquee — scroll infinito para a esquerda */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        {/* Inline style garante que a animação nunca é purgeada/sobrescrita */}
        <style>{`
          @keyframes scroll-left {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            gap: 1rem;
            padding: 0.5rem 0;
            animation: scroll-left 35s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="marquee-track">
          {/* Renderiza 2× para loop contínuo sem corte */}
          {[...certifications, ...certifications].map((cert, i) => (
            <CertCard key={i} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
