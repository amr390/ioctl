import Image from 'next/image'
import React from 'react'
import { Layout } from '../components/verde/_layout'
import { Hero } from '../components/verde/landing/Hero'

const IndexPage = () => {
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
        <Hero />
      </section>
    </Layout>
  )
}

export default IndexPage
