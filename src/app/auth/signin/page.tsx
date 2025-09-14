'use client';

import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { getTokens, login } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setAccessToken,
  setCurrentUser,
  setRefreshToken,
} from '@/store/features/userSlice';
import { setIsLoading } from '@/store/features/loadingSlice';

export default function Signin() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const router = useRouter();

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, [dispatch]);  

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    dispatch(setIsLoading(true));
    login({ email, password })
      .then((res) => {
        dispatch(setCurrentUser(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
        return getTokens({ email, password });
      })
      .then((resToken) => {
        dispatch(setAccessToken(resToken.access));
        dispatch(setRefreshToken(resToken.refresh));
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
              setErrorMessage('Ошибка. Попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
