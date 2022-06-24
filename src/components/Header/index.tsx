import styles from './styles.module.scss'
import { AiFillHeart } from 'react-icons/ai'
import { MdShoppingBasket } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { ActiveLink } from '../ActiveLink';
import Link from 'next/link';

export function Header() {
  const { cart } = useCart();
  const cartSize = cart.length;

  // const totalItems = cart.reduce((sumTotal, product) => {
  //   return sumTotal + product.amount;
  // }, 0)

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <Link href="/"> 
          <a className={styles.logo}>Acme <span>Inc</span>.</a>
        </Link>
        <div >
          <ul className={styles.menu}>
            <li>
              <ActiveLink activeClassName={styles.active} href="/">
                <a>Início</a>
              </ActiveLink>
            </li>
            <li className={styles.myFavorites}>
              <ActiveLink activeClassName={styles.active} href="/favorites">
                <a>Meus Favoritos</a>
              </ActiveLink>
              <AiFillHeart size={28}/>
            </li>
            <li className={styles.myCart}>
              <div>
                <ActiveLink activeClassName={styles.active} href="/cart">
                  <a>Meu Carrinho</a>
                </ActiveLink>
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