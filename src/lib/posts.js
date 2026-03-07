/**
 * Gerenciador de posts do blog com suporte a i18n.
 */

const postModulesPt = import.meta.glob('/src/content/posts/*.mdx', { eager: true })
const postModulesEn = import.meta.glob('/src/content/posts/en/*.mdx', { eager: true })

function buildPosts(modules) {
  return Object.entries(modules).map(([filepath, mod]) => {
    const slug = filepath.split('/').pop().replace('.mdx', '')
    return {
      slug,
      meta: mod.meta || {},
      component: mod.default,
    }
  })
}

/**
 * Retorna todos os posts ordenados por data (mais recente primeiro)
 */
export function getAllPosts(lang = 'pt') {
  const posts = lang === 'en' ? buildPosts(postModulesEn) : buildPosts(postModulesPt)

  return posts.sort((a, b) => {
    const dateA = new Date(a.meta.date || 0)
    const dateB = new Date(b.meta.date || 0)
    return dateB - dateA
  })
}

/**
 * Retorna um post por slug
 */
export function getPostBySlug(slug, lang = 'pt') {
  const posts = getAllPosts(lang)
  return posts.find((p) => p.slug === slug) || null
}
