import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { CartProvider } from '../hooks/useCart'


import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
        <ToastContainer autoClose={1500}/>
        <Footer/>
      </CartProvider>
    </>
  )
}

export default MyApp
