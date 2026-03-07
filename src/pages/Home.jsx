import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Certifications from '../components/sections/Certifications'
import BlogPreview from '../components/sections/BlogPreview'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <BlogPreview />
        <Contact />
      </main>
    </Layout>
  )
}
