import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

/* ── Animações ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ── Tag color map ── */
const tagColors = {
  Python: 'bg-blue-50 text-blue-600',
  'Power BI': 'bg-amber-50 text-amber-600',
  SQL: 'bg-emerald-50 text-emerald-600',
}

export default function BlogPreview() {
  const { t } = useLang()
  const posts = t('blogPreview.posts')

  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-[var(--accent)] mb-3">
              {t('blogPreview.label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)]">
              {t('blogPreview.heading')}
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all duration-300"
          >
            {t('blogPreview.viewAll')}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block">
            <motion.article
              variants={cardVariants}
              className="
                group flex flex-col rounded-2xl overflow-hidden
                bg-[var(--bg-secondary)]
                border border-[var(--border)]
                card-hover
                cursor-pointer
                h-full
              "
            >
              {/* Imagem placeholder */}
              <div className="aspect-[16/9] bg-[var(--border)] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-40"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="flex flex-col flex-1 p-5">
                {/* Meta: tag + reading time */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tagColors[post.tag] || 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Tag size={10} />
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock size={10} />
                    {post.readingTime}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                {/* Data */}
                <p className="text-xs text-[var(--text-muted)] mt-4 pt-3 border-t border-[var(--border)]">
                  {post.date}
                </p>
              </div>
            </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
