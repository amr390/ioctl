import { useAuth } from '@hooks/useAuth'
import React from 'react'

export const UserDetail = (props: {}) => {
  const { auth } = useAuth()
  const style = `flex justify-center items-center w-20 h-6 rounded-lg text-black text-xs font-semibold bg-yellow-${ auth.access_token ? '400' : '300' }`

  return (
    <article className='flex flex-col p-2 w-full h-18 items-center'>
      <div className='flex relative top-[-10px] w-full h-16 justify-center'>
        <div className='flex flex-row justify-between items-center px-1 border rounded-md w-11/12 bg-black text-white text-center'>
          <span className='text-white text-sm '>Current status</span>
          <span className={style}>
            {auth.access_token ? 'SIGNED IN' : 'NOT SIGNED'}
          </span>
        </div>
      </div>
    </article>
  )
}
