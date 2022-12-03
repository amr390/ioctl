import { createContext, ReactNode, useState } from 'react'

type AuthState = {
  auth: string,
  setAuth: (auth: string)=>void
}

interface IProps {
  children: ReactNode
}

const AuthContext = createContext<AuthState>({} as AuthState)

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<string>("")
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
