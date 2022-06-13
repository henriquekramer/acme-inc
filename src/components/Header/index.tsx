import styles from './styles.module.scss'
import { AiFillHeart } from 'react-icons/ai'
import { MdShoppingBasket } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import Link from 'next/link';

export function Header() {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <Link href="/"> 
          <a className={styles.logo}>Acme <span>Inc</span>.</a>
        </Link>
        <div >
          <ul className={styles.menu}>
            <li>
              <Link href="/">
                <a>Início</a>
              </Link>
            </li>
            <li className={styles.myFavorites}>
              <Link href="/favorites">
                <a>Meus Favoritos</a>
              </Link>
              <AiFillHeart size={28}/>
            </li>
            <li className={styles.myCart}>
              <div>
                <Link href="/cart">
                  <a>Meu Carrinho</a>
                </Link>
                <small>{cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}</small>
              </div>
              <MdShoppingBasket size={36}/>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}