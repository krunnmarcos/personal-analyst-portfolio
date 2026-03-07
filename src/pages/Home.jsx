import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
    </Layout>
  )
}
