import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Toaster />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
