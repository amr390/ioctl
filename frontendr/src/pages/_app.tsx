import { Layout } from '@components/common/_layout'
import { AuthProvider } from '@context/AuthProvider'
import { MenuProvider } from '@context/MenuProvider'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MenuProvider>
      <AuthProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </MenuProvider>
  )
}

export default MyApp
