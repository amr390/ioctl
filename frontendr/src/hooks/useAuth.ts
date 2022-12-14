import { useContext, useDebugValue } from 'react'
import AuthContext from '@context/AuthProvider'

export const useAuth = () => {
  const { auth } = useContext(AuthContext)
  useDebugValue(auth, (auth) => (auth ? 'loggedIn' : 'Not loggedIn'))

  return useContext(AuthContext)
}
