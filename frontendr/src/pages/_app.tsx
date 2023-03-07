import { Layout } from '@components/common/_layout'
import { SettingsProvider } from '@context/SettingsProvider'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SettingsProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
  )
}

export default MyApp
