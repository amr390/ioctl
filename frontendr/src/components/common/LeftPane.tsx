import SettingsContext from '@context/SettingsProvider'
import React, { useContext } from 'react'
import Menu from './Menu'
import { UserDetail } from './UserDetail'

export const LeftPane = () => {
  const { expanded, setExpanded } = useContext(SettingsContext)
  return (<>
    <div className='hidden bg-white lg:flex lg:flex-shrink lg:flex-grow-1 lg:p-4 lg:h-screen'>
      <section className='border bg-gray-50 border-gray-100 h-full'>
        <UserDetail />
        <Menu />
      </section>
    </div>
    <div className='hidden bg-white lg:hidden'>
      <section className='border bg-gray-50 border-gray-100 h-full'>
        side pane
      </section>
    </div>
</>
  )
}
