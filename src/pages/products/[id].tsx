import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";
import { api } from "../../services/api"
import { formatPrice } from "../../util/format";
import styles from './styles.module.scss'

interface CartItemsAmount {
  [key: number]: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  priceFormatted: string
}
interface ProductProps extends Product{
  product: Product;
}

export default function Product({ product }: ProductProps){
  const { addProduct, cart } = useCart();
  const { addFavorite, isFavorited } = useFavorite();

  function handleAddProduct(id: number) {
    addProduct(id)
  }
  function handleAddFavorite(id: number){
    addFavorite(id)
  }

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  const[isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  useEffect(()=> {
    if(router.isReady){
      setIsLoading(false)
    }
  }, [router.isReady])

  return !isLoading?(
    <>
      <Head>
        <title>Produto | {product.title}</title>
      </Head>
      <div className={styles.container}>
        <h1>{product.title}</h1>
        <div className={styles.productContent}>
          <img src={product.image} alt={product.title}/>
          <div>
            <h3>Descrição</h3>
            <p>{product.description}</p>
            <h3>Valor</h3>
            <div className={styles.priceFavorite}>
              <strong>
                {product.priceFormatted}
              </strong>
              <button 
                  type="button"
                  data-testid="add-favorite-button"
                  onClick={() => handleAddFavorite(product.id)}
                >
                  {isFavorited(product.id)}
              </button>
            </div>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div>
                <AiOutlineShoppingCart size={20} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
            
          </div>
        </div>
      </div>

    </>
  ) : <p>Carregando...</p>
}

export const getStaticProps: GetStaticProps = async(context) => {
  const {params} = context

  try {
    const response = await api.get<Product>(`products/${params?.id}`)
    const product = {
      id: response.data.id,
      title: response.data.title,
      description: response.data.description,
      price: response.data.price,
      image: response.data.image,
      priceFormatted: formatPrice(response.data.price)
    }
  
    return {
      props: {
        product
      }
    }
  }catch(err) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async() => {
  const response = await api.get<Product[]>('products')

  const paths = response.data.map(id => {
    return {
      params: {
        id: `${id.id}`
      }
    }
  })

  return {
    paths,
    fallback: true,
  }
}