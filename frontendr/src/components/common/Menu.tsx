import Link from 'next/link'
import { MouseEventHandler, useState } from 'react'

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

const Menu = () => {
  const [items, setItems] = useState<ItemProps[]>([
    { label: 'Start', href: '/', active: true, first: true, last: false, },
    { label: 'Users', href: '/users', active: false, first: false, last: false, },
    { label: 'Profile', href: '/profile', active: false, first: false, last: false, },
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

  return (
    <article className='flex flex-col p-2 w-full items-center rounded-sm'>
      <h2 className='font-bold txt-lg'>Views</h2>
      <div className='flex justify-center w-full'>
        <ul className='bg-white rounded-lg border border-gray-200 w-96 text-gray-900'>
          {items.map((it) => (
            <MenuItem onClick={() => handleClick(it)} key={it.label} {...it} />
          ))}
        </ul>
      </div>
    </article>
  )
}

export default Menu
