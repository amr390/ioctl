import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { authService } from '@services/authService'
import { APP_ROUTES } from '@utils/constants'

export const useAuth = () => {
  const router = useRouter()
  let auth = useRef('')

  useEffect(() => {
    auth.current = authService.getToken()
    const getUserDetails = () => {
      if (!auth) {
        router.push(APP_ROUTES.SIGN_IN)
        return
      }
    }

    getUserDetails()
  }, [router])

  return auth
}
