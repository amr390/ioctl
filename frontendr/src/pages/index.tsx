import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@hooks/useAuth'

const IndexPage = () => {
  const auth = useAuth()
  const url = auth ? '/profile' : '/login'
  //TODO: replace by context
  const [me, setMe] = useState(null)

  return (
    <>
      <section
        className='flex flex-1 flex-col justify-center items-center'
        style={{
          minHeight: '25vh',
        }}
      >
        <Image
          src='/img/Logo.svg'
          width='100'
          height='100'
          layout='fixed'
          alt=''
        />
      </section>
      <section
        className='flex flex-1 flex-col justify-center items-center'
        style={{
          minHeight: '75vh',
        }}
      >
        <Link
          href={url}
          className='px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center'
        >
          Start your trip...
        </Link>
      </section>
    </>
  )
}

export default IndexPage
