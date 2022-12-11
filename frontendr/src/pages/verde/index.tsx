import Image from 'next/image'
import React from 'react'
import { Hero } from '@components/starterkit/landing/hero/Hero'

const IndexPage = () => {
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
          alt='...'
        />
      </section>
      <Hero />
      {/* <section style={{ */}
      {/*   minHeight: '50vh' */}
      {/* }}>Section 2</section> */}
    </>
  )
}

export default IndexPage
