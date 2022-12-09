import { Layout } from '@components/starterkit/landing/_layout'
import { Hero } from '@components/starterkit/landing/hero/Hero'
import { Services } from '@components/starterkit/landing/services/Services'
import { Featured } from '@components/starterkit/landing/featured/Featured'
import { Team } from '@components/starterkit/landing/team/Team'
import { Finisher } from '@components/starterkit/landing/finisher/Finisher'
import { Contact } from '@components/starterkit/landing/contact/Contact'

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






