import { Hero } from '../components/starterkit/profile/Hero'
import { Contact } from '../components/starterkit/profile/Contact'
import { Layout } from '../components/starterkit/profile/_layout'
/* import { APP_ROUTES } from '@utils/constants' */

export default function Profile() {

  return (
    <Layout>
      <Hero />
      <Contact />
    </Layout>
  )
}
