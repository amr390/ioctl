/* import { useRouter } from 'next/router' */
import { useContext, useDebugValue } from 'react'
/* import { APP_ROUTES } from '@utils/constants' */
import AuthContext from '@context/AuthProvider'

export const useAuth = () => {
  /* const router = useRouter() */
  const { auth } = useContext(AuthContext)
  useDebugValue(auth, (auth) => (auth ? 'loggedIn' : 'Not loggedIn'))

  /* if (!auth) { */
  /*   router.push(APP_ROUTES.SIGN_IN) */
  /* } */

  return { auth }
}
