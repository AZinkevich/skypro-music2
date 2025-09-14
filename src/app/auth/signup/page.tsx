'use client';

import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { registr } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentUser } from '@/store/features/userSlice';
import { setIsLoading } from '@/store/features/loadingSlice';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [errorMessage, setErrorMessage] = useState('');
  const [regInput, setRegInput] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

    useEffect(() => {
    dispatch(setIsLoading(false));
  }, [dispatch]);

  const onChangeRegInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegInput({ ...regInput, [name]: value });
  };

  const onSubmitRegData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrorMessage('');

    if (
      !regInput.email.trim() ||
      !regInput.username.trim() ||
      !regInput.password.trim() ||
      !regInput.confirmPassword.trim()
    ) {
      setErrorMessage('Заполните все поля');
      return;
    }

    if (regInput.password !== regInput.confirmPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }
    setIsLoading(true);
    const { ...dataToSend } = regInput;

    dispatch(setIsLoading(true));
    registr(dataToSend)
      .then((res) => {
        dispatch(setCurrentUser(res));
        localStorage.setItem('user', JSON.stringify(res));
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
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="email"
        value={regInput.email}
        placeholder="Почта"
        autoComplete="email"
        onChange={onChangeRegInput}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        value={regInput.username}
        placeholder="Имя пользователя"
        autoComplete="username"
        onChange={onChangeRegInput}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={regInput.password}
        autoComplete="new-password"
        onChange={onChangeRegInput}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="confirmPassword"
        value={regInput.confirmPassword}
        placeholder="Повторите пароль"
        autoComplete="new-password"
        onChange={onChangeRegInput}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmitRegData}
        className={classNames(styles.modal__btnSignupEnt, {[styles.loading_btn]: isLoading,})}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
