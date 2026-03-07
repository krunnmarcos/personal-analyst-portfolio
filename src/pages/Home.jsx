import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'

export default function Home() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
      </main>
    </Layout>
  )
}
