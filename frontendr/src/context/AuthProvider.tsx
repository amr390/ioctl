import { IToken, IUser } from '@models'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type AuthState = {
  auth: IToken,
  setAuth: Dispatch<SetStateAction<IToken>>
  profile: IUser
  setProfile: Dispatch<SetStateAction<IUser>>
}

interface IProps {
  children: ReactNode
}

const AuthContext = createContext<AuthState>({} as AuthState)

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<IToken>({} as IToken)
  const [profile, setProfile] = useState<IUser>({} as IUser)
  return (
    <AuthContext.Provider value={{auth, setAuth, profile, setProfile}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
