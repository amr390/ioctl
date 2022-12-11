import Register from '@components/Register'
import Login from '@components/Login'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const LoginPage = () => {
  const [isLoggin, setLoggin] = useState<boolean>(true)

  return (
    <AnimatePresence>
      {isLoggin ? (
        <Login setLoggin={setLoggin} />
      ) : (
        <Register setLoggin={setLoggin} />
      )}
    </AnimatePresence>
  )
}

export default LoginPage
