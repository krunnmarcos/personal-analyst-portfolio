import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import Contact from '../components/sections/Contact'

export default function ContactPage() {
  return (
    <Layout>
      <main className="pt-28 pb-0 md:pt-32">
        <Contact />
      </main>
    </Layout>
  )
}
