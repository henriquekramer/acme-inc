import styles from './home.module.scss'
import Head from 'next/head'
import { useState } from 'react';
import { api } from '../services/api';
import { formatPrice } from '../util/format';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { useCart } from '../hooks/useCart';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useFavorite } from '../hooks/useFavorite';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const { addProduct, cart } = useCart();
  const { addFavorite, favorite} = useFavorite()

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  const[busca, setBusca] = useState('')
  const lowerCaseFilter=busca.toLowerCase()

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(lowerCaseFilter))

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  function handleAddFavorite(id: number){
    addFavorite(id)
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
      </div>

      <ul className={styles.productList}>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <a>
                <img src={product.image} alt={product.title}/>
              </a>
            </Link>
            <strong>{product.title}</strong>
            <span>
              {product.priceFormatted}
              <button 
                type="button"
                data-testid="add-favorite-button"
                onClick={() => handleAddFavorite(product.id)}
              >
                  <AiFillHeart size={28} />
              </button>
            </span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <AiOutlineShoppingCart size={20} color="#FFF" />
                {cartItemsAmount[product.id] || 0} 
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
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


