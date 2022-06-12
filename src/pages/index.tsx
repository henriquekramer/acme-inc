import styles from './home.module.scss'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { formatPrice } from '../util/format';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCart } from '../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export default function Home() {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

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

  const[busca, setBusca] = useState('')
  const lowerCaseFilter=busca.toLowerCase()

  // const filteredProducts = useMemo(()=> {
  //   const lowerCaseFilter=busca.toLowerCase()
  //   return products.filter(product => product.title.toLowerCase().includes(lowerCaseFilter))
  // }, [busca]) 
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(lowerCaseFilter))

  function handleAddProduct(id: number) {
    addProduct(id)
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
            <img src={product.image} alt={product.title}/>
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
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
