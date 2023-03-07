import { IToken, IUser } from '@models'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type SettingsState = {
  auth: IToken
  setAuth: Dispatch<SetStateAction<IToken>>
  profile: IUser
  setProfile: Dispatch<SetStateAction<IUser>>
  expanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean>>
}

interface IProps {
  children: ReactNode
}

const SettingsContext = createContext<SettingsState>({} as SettingsState)

export const SettingsProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<IToken>({} as IToken)
  const [profile, setProfile] = useState<IUser>({} as IUser)
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <SettingsContext.Provider value={{ auth, setAuth, profile, setProfile, expanded, setExpanded }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext
