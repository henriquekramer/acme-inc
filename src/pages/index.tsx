import styles from './home.module.scss'
import Head from 'next/head'
import { useState } from 'react';
import { api } from '../services/api';
import { formatPrice } from '../util/format';
import { GetStaticProps } from 'next';
import { FavoriteItems } from '../components/FavoriteItems';
import { HomeItems } from '../components/HomeItems';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  priceFormatted: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const[busca, setBusca] = useState('')
  const lowerCaseFilter=busca.toLowerCase()

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(lowerCaseFilter))

  const [showFavorites, setShowFavorites] = useState(false)

  function handleShowFavorites(){
    setShowFavorites(!showFavorites)
  }

  return (
    <>
      <Head>
        <title>Início | Acme Inc.</title>
      </Head>

      <div className={styles.searchItem}>
        <h2 >Produtos</h2>
        <input
          type="text"
          placeholder='busque aqui seu produto'
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
        />
        <form>
          <input type="checkbox" id="myCheck" onClick={handleShowFavorites} />
          <label htmlFor='myCheck'>Favoritos</label>
        </form>
      </div>

      <ul className={styles.productList}>
        {showFavorites ? <FavoriteItems /> : <HomeItems products={filteredProducts}/>}
      </ul>     
    
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<Product[]>('products')
  const data = response.data.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price)
  }))

  const products = data.map(product => {
    let nameLength = product.title.split(' ').length
    let descrLength = product.description.length

    return {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      priceFormatted: product.priceFormatted,
      finalPrice: formatPrice(10 + nameLength * ((500 - descrLength)/ (3 - nameLength)))
    }
  })

  return {
    props: {
      products
    }
  }
}


