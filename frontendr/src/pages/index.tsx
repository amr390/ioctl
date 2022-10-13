import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Layout } from '../components/verde/_layout'
import { authService } from '@services/authenticationService'

const IndexPage = () => {
  const url = authService.isLoggedIn() ? '/profile' : '/login';
  return (
    <Layout>
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
    </Layout>
  )
}

export default IndexPage
