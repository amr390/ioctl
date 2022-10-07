import { PropsWithChildren } from 'react'
import Head from 'next/head'
// import Navbar from '../layout/Navbar'
// import Footer from '../layout/Footer'

interface Props {
  title?: string
  transparent?: boolean
}

export const Layout = (props: PropsWithChildren<Props>) => {
  return (
    <div
      className='bg-cover bg-center bg-no-repeat bg-gradient-to-b bg-gray-200'
      style={{ minHeight: '100vh' }}
    >
      <Head>
        <title>{props.title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      {/* <header> */}
      {/*   <Navbar transparent={true} /> */}
      {/* </header> */}
      <main>{props.children}</main>
      {/* <Footer></Footer> */}
    </div>
  )
}
