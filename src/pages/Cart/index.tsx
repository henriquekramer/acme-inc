import Head from "next/head";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export default function Cart(){
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))
  
  return (
    <>
      <Head>
        <title>Meu Carrinho | Acme Inc.</title>
      </Head>
      <h1>Carrinho de Compras</h1>
    </>


  )
}