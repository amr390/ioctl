import { Hero } from '../components/profile/Hero'
import { Contact } from '../components/profile/Contact'
import { Layout } from '../components/profile/_layout'
/* import { APP_ROUTES } from '@utils/constants' */

export default function Profile() {

  return (
    <Layout>
      <Hero />
      <Contact />
    </Layout>
  )
}
