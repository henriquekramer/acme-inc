import Head from "next/head";
import { FavoriteItems } from "../../components/FavoriteItems";
import { useFavorite } from "../../hooks/useFavorite";
import { formatPrice } from "../../util/format";
import styles from './styles.module.scss'


export default function Favorites(){
  const { favorite } = useFavorite()

  const favoriteFormatted = favorite.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
  }))

  const hasFavorite = favoriteFormatted.length > 0 ? true : false

  return (
    <>
      <Head>
        <title>Favoritos | Acme Inc</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.favoritesTitle}>
          <h2>Meus produtos favoritos</h2>
        </div>

        <ul className={styles.productList}>
          {hasFavorite ? <FavoriteItems /> : <h1>Sem produtos favoritados...</h1>}
        </ul> 
      </div> 
    </>
  )
}