import { useContext, useDebugValue } from 'react'
import SettingsContext from '@context/SettingsProvider'

export const useAuth = () => {
  const { auth } = useContext(SettingsContext)
  useDebugValue(auth, (auth) => (auth ? 'loggedIn' : 'Not loggedIn'))

  return useContext(SettingsContext)
}
