import { Layout } from '@components/common/_layout'
import { AuthProvider } from '@context/AuthProvider'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
  )
}

export default MyApp
