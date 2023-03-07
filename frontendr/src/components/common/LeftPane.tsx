import SettingsContext from '@context/SettingsProvider'
import React, { useContext } from 'react'
import Menu from './Menu'
import { UserDetail } from './UserDetail'

export const LeftPane = () => {
  const { expanded, setExpanded } = useContext(SettingsContext)
  return (
    <div className='w-fixed h-screen w-1/4 flex-shrink flex-grow-0 p-4 bg-white'>
      <section className='border bg-gray-50 border-gray-100 h-full'>
        <UserDetail />
        <Menu />
      </section>
    </div>
  )
}
