import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useEffect, useState } from 'react';
import { UserType } from '@/sharedTypes/sharedTypes';
import { logout } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userDataFromLS = localStorage.getItem('user');
    if (userDataFromLS) {
      try {
        const parsedUser: UserType = JSON.parse(userDataFromLS);
        console.log(parsedUser);
        setUser(parsedUser);
        const storedObject = localStorage.getItem('user');
        if (storedObject) {
          const parsed = JSON.parse(storedObject);
          const userData = parsed.data;
          setUser(userData);
        }
      } catch (error) {
        console.log('Ошибка парсинга user из localStorage', error);
      }
    }
  }, []);

  console.log(user);

  const onClickLogout = () => {
    logout();
    localStorage.removeItem('user');
    setUser(null);
    router.refresh();
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        {user && user.username ? (
          <p className={styles.sidebar__personalName}>{user.username}</p>
        ) : (
          <p className={styles.sidebar__personalName}>Незнакомец</p>
        )}

        <div className={styles.sidebar__icon} onClick={onClickLogout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
