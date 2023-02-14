import { IToken } from '@models'
import { createContext, Dispatch, ReactNode, useState } from 'react'

interface IProps {
  children: ReactNode
}

const MenuContext = createContext<string>("start")

export const MenuProvider = ({ children }: IProps) => {
  const [menu, setMenu] = useState<string>("start")
  return (
    <MenuContext.Provider value={{menu, setMenu}}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext;
