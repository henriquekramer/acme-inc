import Head from "next/head";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeartBroken }from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";
import { formatPrice } from "../../util/format";
import styles from './styles.module.scss'

interface CartItemsAmount {
  [key: number]: number;
}

export default function Favorites(){
  const { favorite, removeFavorite } = useFavorite()
  const { addProduct, cart } = useCart();

  const favoriteFormatted = favorite.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
  }))

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  function handleRemoveFavorite(productId: number) {
    removeFavorite(productId)
  }
  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <>
      <Head>
        <title>Favoritos</title>
      </Head>

      <div className={styles.favoritesTitle}>
        <h2>Meus produtos favoritos</h2>
      </div>

      <ul className={styles.productList}>
        {favoriteFormatted.map(product => (
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
                onClick={() => handleRemoveFavorite(product.id)}
              >
                  <FaHeartBroken size={28} />
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