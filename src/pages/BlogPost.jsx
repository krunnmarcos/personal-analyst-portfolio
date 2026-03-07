import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getPostBySlug } from '../lib/posts'
import { useLang } from '../i18n/LanguageContext'

/* Barra de progresso de leitura */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
      <div
        className="h-full bg-[var(--accent)] transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const post = getPostBySlug(slug, lang)

  if (!post) {
    return (
      <Layout>
        <main className="pt-28 pb-24 md:pt-32 md:pb-32">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-display text-3xl text-[var(--text-primary)] mb-4">
              {t('blogPost.notFound')}
            </h1>
            <Link
              to="/blog"
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              {t('blogPost.backToBlog')}
            </Link>
          </div>
        </main>
      </Layout>
    )
  }

  const Content = post.component

  return (
    <Layout>
      <ReadingProgress />
      <main id="main-content" className="pt-28 pb-24 md:pt-32 md:pb-32">
        <article className="max-w-3xl mx-auto px-6">
          {/* Voltar */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 mb-10"
            >
              <ArrowLeft size={14} />
              {t('blogPost.backToBlog')}
            </Link>
          </motion.div>

          {/* Header do post */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.meta.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent-soft)] text-[var(--accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-[var(--text-primary)] mb-4">
              {post.meta.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <span>{post.meta.date}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <span>{post.meta.readingTime}</span>
            </div>
          </motion.header>

          {/* Conteúdo MDX */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose-custom"
          >
            <Content />
          </motion.div>
        </article>
      </main>
    </Layout>
  )
}
