import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'


import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
      <Footer/>
    </>
  )
}

export default MyApp
