import styles from './home.module.scss'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { formatPrice } from '../util/format';
import { AiOutlineShoppingCart } from 'react-icons/ai'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  useEffect(() => {
    async function loadProducts() {
     const response = await api.get<Product[]>('products')
     const data = response.data.map(product => ({
       ...product,
       priceFormatted: formatPrice(product.price)
     }))

     setProducts(data);
    }

    loadProducts();
  }, []);


  return (
    <>
      <Head>
        <title>Início | Acme Inc.</title>
      </Head>

      <div className={styles.searchItem}>
        <h2 >Produtos</h2>
        <input placeholder='busque aqui seu produto'/>
      </div>

      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title}/>
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              data-testid="add-product-button"
              // onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <AiOutlineShoppingCart size={20} color="#FFF" />
                {/* {cartItemsAmount[product.id] || 0}  */}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ul>     
    
    </>
  )
}
