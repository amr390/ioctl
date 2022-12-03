import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authService } from '@services/authService'
import { APP_ROUTES } from '@utils/constants'

export const useAuth = () => {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const getUserDetails = () => {
      const { authenticated, userId } = authService.getDetails()
      if (!authenticated) {
        router.push(APP_ROUTES.SIGN_IN)
        return
      }
      setUserId(userId)
      setAuthenticated(authenticated)
    }

    getUserDetails()
  }, [router])
  return { userId, authenticated }
}
