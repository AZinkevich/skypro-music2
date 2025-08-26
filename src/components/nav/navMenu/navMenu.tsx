import Link from 'next/link';
import styles from './navMenu.module.css';

export default function NavMenu() {
  const data = localStorage.getItem('user');
  return (
    <div className={styles.nav__menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          {/*TODO: a -> Link*/}
          <Link href="#" className={styles.menu__link}>
            Главное
          </Link>
        </li>
        <li className={styles.menu__item}>
          <Link href="#" className={styles.menu__link}>
            Мой плейлист
          </Link>
        </li>
        {!data ? (
          <li className={styles.menu__item}>
            <Link href="/auth/signin" className={styles.menu__link}>
              Войти
            </Link>
          </li>
        ) : '' }
      </ul>
    </div>
  );
}
