import Link from 'next/link';
import styles from './navMenu.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/userSlice';

export default function NavMenu() {
  const access = useAppSelector((state) => state.users.access);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    router.push('/music/main');
    router.refresh();
  };

  const onClickToLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className={styles.nav__menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <Link href="/music/main" className={styles.menu__link}>
            Главное
          </Link>
        </li>
        {access ? (
          <li className={styles.menu__item}>
            <Link href="/music/favorite" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
        ) : null}
        {access ? (
          <li onClick={onClickLogout} className={styles.menu__item}>
            <p className={styles.menu__link}>Выйти</p>
          </li>
        ) : (
          <li onClick={onClickToLogin} className={styles.menu__item}>
            <p className={styles.menu__link}>Войти</p>
          </li>
        )}
      </ul>
    </div>
  );
}
