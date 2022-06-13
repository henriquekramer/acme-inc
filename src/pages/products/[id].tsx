import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../hooks/useCart";
import { api } from "../../services/api"
import { formatPrice } from "../../util/format";
import styles from './styles.module.scss'

interface CartItemsAmount {
  [key: number]: number;
}

interface Product {
  id: number;
  description: string;
  title: string;
  price: number;
  image: string;
  priceFormatted: string
}

interface ProductProps extends Product {
  product: Product;
}

export default function Product({ product }: ProductProps){
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <>
      <Head>
        <title>Produto {product.id}</title>
      </Head>
      <div className={styles.container}>
        <h1>{product.title}</h1>
        <div className={styles.productContent}>
          <img src={product.image} alt={product.title}/>
          <div>
            <h3>Descrição</h3>
            <p>{product.description}</p>
            <h3>Valor</h3>
            <strong>{product.priceFormatted}</strong>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <AiOutlineShoppingCart size={20} color="#FFF" />
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export const getStaticProps: GetStaticProps = async(context) => {
  const {params} = context

  const response = await api.get<Product>(`products/${params?.id}`)
  const product = {
    ...response.data,
    priceFormatted: formatPrice(response.data.price)
  }

  return {
    props: {
      product
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