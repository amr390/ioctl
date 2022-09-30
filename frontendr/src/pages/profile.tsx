import React from 'react'

import { Hero } from '../components/profile/Hero'
import { Contact } from '../components/profile/Contact'
import { Layout } from '../components/profile/_layout'

export default function Profile() {
  return (
    <Layout>
      <Hero />
      <Contact />
    </Layout>
  )
}
