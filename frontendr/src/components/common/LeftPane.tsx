import { useAuth } from '@hooks/useAuth'
import Link from 'next/link'
import React, { MouseEventHandler, useState } from 'react'

interface ItemProps {
  active?: boolean
  label: string
  href: string
  first: boolean
  last: boolean
  onClick?: MouseEventHandler
}

const MenuItem = (props: ItemProps) => {
  const selected = props.active ? 'bg-black text-white' : ''
  const first = props.first ? 'rounded-t-lg' : ''
  const last = props.last ? 'rounded-b-lg' : ''
  return (
    <Link href={props.href}>
      <li
        onClick={props.onClick}
        className={`px-6 py-2 border-b border-gray-200 w-full cursor-pointer ${selected} ${first} ${last}`}
      >
        {props.label}
      </li>
    </Link>
  )
}

export const LeftPane = () => {
  const { auth } = useAuth()
  const [items, setItems] = useState<ItemProps[]>([
    { label: 'Profile', href: '/profile', active: true, first: true, last: false, },
    { label: 'Users', href: '/users', active: false, first: false, last: false, },
    { label: 'Tasks', href: '/tasks', active: false, first: false, last: false, },
    { label: 'Settings', href: '/settings', active: false, first: false, last: true, },
  ])

  const handleClick = (item: ItemProps) => {
    items.forEach((it) => (it.active = false))
    let selected = items.find((it) => it.label === item.label)
    if (selected) {
      selected.active = true
    }

    setItems(items)
  }

  const signedInStyle =
    'flex justify-center items-center w-20 h-6 rounded-lg text-black text-xs font-semibold bg-yellow-400'
  const notSignedInStyle =
    'flex justify-center items-center w-20 h-6 rounded-lg text-black text-xs font-semibold bg-gray-300'
  return (
    <div className='w-fixed h-screen w-1/4 flex-shrink flex-grow-0 p-4 bg-white'>
      <section className='border bg-gray-50 border-gray-100 h-full'>
        <article className='flex flex-col p-2 w-full h-18 items-center'>
          <div className='flex relative top-[-10px] w-full h-16 justify-center'>
            <div className='flex flex-row justify-between items-center px-1 border rounded-md w-11/12 bg-black text-white text-center'>
              <span className='text-white text-sm '>Current status</span>
              <span
                className={auth.access_token ? signedInStyle : notSignedInStyle}
              >
                {auth.access_token ? 'SIGNED IN' : 'NOT SIGNED'}
              </span>
            </div>
          </div>
        </article>
        <article className='flex flex-col p-2 w-full items-center rounded-sm'>
          <h2 className='font-bold txt-lg'>Views</h2>
          <div className='flex justify-center w-full'>
            <ul className='bg-white rounded-lg border border-gray-200 w-96 text-gray-900'>
              {items.map((it) => (
                <MenuItem
                  onClick={() => handleClick(it)}
                  key={it.label}
                  {...it}
                />
              ))}
            </ul>
          </div>
        </article>
      </section>
    </div>
  )
}
