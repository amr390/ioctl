import { PropsWithChildren } from 'react'
import Head from 'next/head'
import { LeftPane } from './LeftPane'
import { MainPane } from './MainPane'
import { RightPane } from './RightPane'
// import Navbar from '../layout/Navbar'
// import Footer from '../layout/Footer'

interface Props {
  title?: string
  transparent?: boolean
}

// based on this: https://dev.to/codeply/helpful-page-layouts-using-tailwind-css-1a3k
export const Layout = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div
        className='bg-cover bg-center bg-no-repeat bg-gradient-to-b bg-gray-50'
        /* style={{ minHeight: '100vh' }} */
      >
        {/* <header> */}
        {/*   <Navbar transparent={true} /> */}
        {/* </header> */}
        <div className='w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow'>
          <LeftPane />
          <MainPane>{props.children}</MainPane>
          <RightPane />
        </div>
        {/* <Footer></Footer> */}
      </div>
    </>
  )
}
