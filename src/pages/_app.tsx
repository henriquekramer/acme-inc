import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { CartProvider } from '../hooks/useCart'
import { FavoriteProvider } from '../hooks/useFavorite'
import 'react-toastify/dist/ReactToastify.css'


import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FavoriteProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
          <ToastContainer autoClose={1000}/>
          <Footer/>
        </CartProvider>
      </FavoriteProvider>
    </>
  )
}

export default MyApp
