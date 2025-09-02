'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
//import { useEffect, useState } from 'react';
//import { UserType } from '@/sharedTypes/sharedTypes';
import { logout } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function Sidebar() {
  //const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  // useEffect(() => {
  //   const userDataFromLS = localStorage.getItem('user');

  //   if (userDataFromLS) {
  //     try {
  //       const parsedUser: UserType = JSON.parse(userDataFromLS);
  //       console.log(parsedUser);
  //       setUser(parsedUser);
  //       const storedObject = localStorage.getItem('user');
  //       if (storedObject) {
  //         const parsed = JSON.parse(storedObject);
  //         const userData = parsed.data;
  //         setUser(userData);
  //       }
  //     } catch (error) {
  //       console.log('Ошибка парсинга user из localStorage', error);
  //     }
  //   }
  // }, []);

  const onClickLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
   // setUser(null);
    router.push('/music/main');
    router.refresh();
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {currentUser ? String(currentUser.email) : 'Незнакомец'}
        </p>

        {currentUser ? (
          <div className={styles.sidebar__icon} onClick={onClickLogout}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        ) : (
          ''
        )}
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
