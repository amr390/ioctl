import { IToken } from '@models'
import { createContext, ReactNode, useState } from 'react'

type AuthState = {
  auth: IToken,
  setAuth: (auth: IToken)=>void
}

interface IProps {
  children: ReactNode
}

const AuthContext = createContext<AuthState>({} as AuthState)

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<IToken>({} as IToken)
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
