import React, { useEffect } from 'react'

import { Hero } from '../components/profile/Hero'
import { Contact } from '../components/profile/Contact'
import { Layout } from '../components/profile/_layout'
import { useUser } from '@hooks/useUser'
import { useRouter } from 'next/router'
import { APP_ROUTES } from '@utils/constants'
import toast from 'react-hot-toast'

export default function Profile() {
  const router = useRouter()
  const { userId, authenticated } = useUser()

  return (
    <Layout>
      <Hero />
      <Contact />
    </Layout>
  )
}
