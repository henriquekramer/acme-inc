import Head from "next/head";
import Link from "next/link";
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

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 })
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 })
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  function checkout(){
    const checkoutData = cartFormatted.map(product =>{
      return {
        Produto: product.title,
        Quantidade: product.amount,
        PreçoUnitário: product.priceFormatted,
        SubTotal: product.subTotal,
      }
    })

    const checkoutFinal = {
      ...checkoutData,
      PreçoFinal: total,
    }

    // console.log(`Resumo da compra formato JSON: ${JSON.stringify(checkoutFinal)}`)
    // alert(`Resumo da compra formato JSON: ${JSON.stringify(checkoutFinal)}`)
  }
 
  return (
    <>
      <Head>
        <title>Meu Carrinho | Acme Inc.</title>
      </Head>

      <div className={styles.cartTitle}>
        <h2>Meu carrinho</h2>
      </div>

      <div className={styles.container}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QUANTIDADE</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {cartFormatted.map(product => (
              <tr key={product.id} data-testid="product">
                <td>
                  <Link href={`/products/${product.id}`}>
                    <a>
                      <img src={product.image} alt={product.title} />
                    </a>
                  </Link>
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={26} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <button type="button" onClick={()=> checkout()}
          >
            Finalizar pedido
          </button>
          <div className={styles.total}> 
            <span>TOTAL</span>
            <strong>{total}</strong>
          </div>
        </footer>
      </div>
    </>
  )
}