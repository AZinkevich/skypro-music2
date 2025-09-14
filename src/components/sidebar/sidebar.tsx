'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { logout } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Skeleton } from '../skeleton/skeleton';

export default function Sidebar() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  const onClickLogout = () => {
    dispatch(logout());
    router.push('/music/main');
  };

  return (
    <div className={styles.main__sidebar}>
      
      <div className={styles.sidebar__personal}>
          {isLoading ? <Skeleton /> :  (currentUser ?  
          (<p className={styles.sidebar__personalName}>{currentUser.email}</p>)
           : (<p className={styles.sidebar__personalName}>Незнакомец</p>))}
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
{isLoading ? <Skeleton /> : (
          <><div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div></>
        )}

{isLoading ? <Skeleton /> : (
          <><div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div></>
        )}

{isLoading ? <Skeleton /> : (          
          <><div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div></>
        )}
        </div>
      </div>
    </div>
  );
}
