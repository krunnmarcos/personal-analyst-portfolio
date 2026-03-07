import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Certifications from '../components/sections/Certifications'

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
      </main>
    </Layout>
  )
}
