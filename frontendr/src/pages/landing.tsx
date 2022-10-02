import { Layout } from '../components/landing/_layout'
import { Hero } from '../components/landing/hero/Hero'
import { Services } from '../components/landing/services/Services'
import { Featured } from '../components/landing/featured/Featured'
import { Team } from '../components/landing/team/Team'
import { Finisher } from '../components/landing/finisher/Finisher'
import { Contact } from '../components/landing/contact/Contact'

const IndexPage = () => (
  <Layout title='Home | Next.js + TypeScript Example'>
    <Hero />
    <Services />
    <Featured />
    <Team />
    <Finisher />
    <Contact />
  </Layout>
)

export default IndexPage






