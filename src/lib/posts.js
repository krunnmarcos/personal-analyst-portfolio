/**
 * Gerenciador de posts do blog.
 * Importa os posts MDX manualmente (Vite eager import).
 * Cada post exporta metadados via frontmatter simulado.
 */

// Import de cada post como módulo
const postModules = import.meta.glob('/src/content/posts/*.mdx', { eager: true })

/**
 * Retorna todos os posts ordenados por data (mais recente primeiro)
 */
export function getAllPosts() {
  const posts = Object.entries(postModules).map(([filepath, mod]) => {
    const slug = filepath.split('/').pop().replace('.mdx', '')
    return {
      slug,
      meta: mod.meta || {},
      component: mod.default,
    }
  })

  // Ordena por data decrescente
  return posts.sort((a, b) => {
    const dateA = new Date(a.meta.date || 0)
    const dateB = new Date(b.meta.date || 0)
    return dateB - dateA
  })
}

/**
 * Retorna um post por slug
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}
