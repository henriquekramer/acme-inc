import Head from "next/head";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import styles from './styles.module.scss'

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
      <div className={styles.container}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>
                <img src="./tenis1.jpg" alt="" />
              </td>
              <td>
                <strong>Tenis</strong>
                <span>R$10,00</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    // disabled={product.amount <= 1}
                    // onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    // value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    // onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                {/* <strong>{product.subTotal}</strong> */}
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  // onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <footer>
          <button type="button">Finalizar pedido</button>
          <div className={styles.total}> 
            <span>TOTAL</span>
            <strong>R$50,00</strong>
          </div>
        </footer>
      </div>
    </>


  )
}