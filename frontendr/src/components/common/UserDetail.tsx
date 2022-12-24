import { useAuth } from '@hooks/useAuth'
import { useProfile } from '@hooks/useProfile'
import React from 'react'

export const UserDetail = () => {
  const { auth } = useAuth()
  const profile = useProfile()
  const style = `flex justify-center items-center w-20 h-6 rounded-lg text-sm font-semibold ${auth.access_token ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-white' }`


  return (
    <article className='flex flex-col p-2 w-full h-18 items-center'>
      <div className='flex relative top-[-10px] w-full h-16 justify-center'>
        <div className='flex flex-row justify-between items-center px-1 border rounded-md w-11/12 bg-black text-white text-center'>
          <span className='text-white text-sm pl-2'>
            {profile ? `${profile.full_name}` : 'Status'}
          </span>
          <span className={style}>
            {auth.access_token ? 'LOGOUT' : 'SIGN IN'}
          </span>
        </div>
      </div>
    </article>
  )
}
