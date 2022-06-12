import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai'
import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>Acme <span>Inc</span>.</a>
          <p>© 2022 Henrique Kramer</p>
          <p>Todos os direitos reservados.</p>
        </div>
        <div className={styles.social}>
          <a href="https://instagram.com" target="_blank"><AiOutlineInstagram size={36}/></a>
          <a href="https://facebook.com" target="_blank"><AiOutlineFacebook size={36}/></a>
          <a href="https://youtube.com" target="_blank"><AiOutlineYoutube size={36}/></a>
        </div>
      </div>
    </footer>
  )
}