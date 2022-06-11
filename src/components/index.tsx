import styles from './styles.module.scss'
import { AiFillHeart } from 'react-icons/ai'
import { MdShoppingBasket } from 'react-icons/md';

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <a href="#" className={styles.logo}>Acme <span>Inc</span>.</a>
        <div >
          <ul className={styles.menu}>
            <li><a href="#">Início</a></li>
            <li className={styles.myFavorites}>
              <a href="#">Meus Favoritos</a>
              <AiFillHeart size={28}/>
            </li>
            <li className={styles.myCart}>
              <div>
                <a href="#">Meu Carrinho</a>
                <small>2 items</small>
              </div>
              <MdShoppingBasket size={36}/>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}