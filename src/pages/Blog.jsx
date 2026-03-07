import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getAllPosts } from '../lib/posts'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const tagColors = {
  Python: 'bg-blue-50 text-blue-600',
  'Power BI': 'bg-amber-50 text-amber-600',
  SQL: 'bg-emerald-50 text-emerald-600',
  ETL: 'bg-violet-50 text-violet-600',
  Dados: 'bg-rose-50 text-rose-600',
}

export default function Blog() {
  const posts = getAllPosts()
  const [activeTag, setActiveTag] = useState(null)

  // Extrair todas as tags únicas
  const allTags = useMemo(() => {
    const tags = new Set()
    posts.forEach((p) => p.meta.tags?.forEach((t) => tags.add(t)))
    return Array.from(tags)
  }, [posts])

  // Filtrar posts
  const filtered = activeTag
    ? posts.filter((p) => p.meta.tags?.includes(activeTag))
    : posts

  return (
    <Layout>
      <main id="main-content" className="pt-28 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="text-sm font-medium tracking-widest uppercase text-[var(--accent)] mb-3">
              Blog
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
              Publicações
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-lg">
              Reflexões, tutoriais e aprendizados sobre dados, Python e
              engenharia de software.
            </p>
          </motion.div>

          {/* Tag filter */}
          {allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              <button
                onClick={() => setActiveTag(null)}
                className={`
                  px-3.5 py-1.5 rounded-full text-xs font-medium
                  border transition-all duration-200
                  ${!activeTag
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]/40'
                  }
                `}
              >
                Todos
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`
                    px-3.5 py-1.5 rounded-full text-xs font-medium
                    border transition-all duration-200
                    ${activeTag === tag
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]/40'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Posts grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((post) => (
              <motion.article key={post.slug} variants={cardVariants}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="
                    group flex flex-col h-full rounded-2xl overflow-hidden
                    bg-[var(--bg-secondary)]
                    border border-[var(--border)]
                    hover:scale-[1.015] hover:shadow-[var(--shadow-md)]
                    transition-all duration-300 ease-out
                  "
                >
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] bg-[var(--border)] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      {post.meta.tags?.[0] && (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColors[post.meta.tags[0]] || 'bg-gray-50 text-gray-600'}`}>
                          <Tag size={10} />
                          {post.meta.tags[0]}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <Clock size={10} />
                        {post.meta.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-semibold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
                      {post.meta.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-2 flex-1">
                      {post.meta.excerpt}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-[var(--text-muted)] mt-4 pt-3 border-t border-[var(--border)]">
                      {post.meta.date}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-[var(--text-muted)] py-16">
              Nenhum post encontrado com essa tag.
            </p>
          )}
        </div>
      </main>
    </Layout>
  )
}
