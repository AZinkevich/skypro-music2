'use client';

import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { registr } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setCurrentUser } from '@/store/features/userSlice';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [regInput, setRegInput] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

    registr(dataToSend)
      .then((res) => {
        console.log(res);
        dispatch(setCurrentUser(res));
        localStorage.setItem('user', JSON.stringify(res));
        console.log('Регистрация прошла успешно!');
        router.push('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
            setErrorMessage('Ошибка. Попробуйте позже');
          } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            console.log('Error', error.message);
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })    
      .finally(() => {
         setIsLoading(false);
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
