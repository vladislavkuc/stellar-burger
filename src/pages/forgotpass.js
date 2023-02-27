import React from 'react';
import styles from './login.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { sendForgotPasswordResquest } from '../services/api';

export const ForgotPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');

  const { pathname } = useLocation();
  const url = window.location.href;

  const handleForgot = (e) => {
    e.preventDefault();
    sendForgotPasswordResquest({email})
      .then(res => {
        if (res.success) {
          setEmail('');
          navigate("/reset-password", { state: { path: pathname, url, title: 'Восстановление пароля' } });
        } else {
          setEmail(email);
        }
      })
      .catch(error => console.log(error));
  };

  if (localStorage.getItem('refreshToken')) {
    return (
      <Navigate to="/" replace/>
    );
  };

  return(
    <form  onSubmit={handleForgot} className={styles.wrapper}>
      <p className="text text_type_main-medium mb-6">
        Восстановление пароля
      </p>

      <EmailInput
        placeholder={'Укажите e-mail'}
        onChange={e => setEmail(e.target.value)}
        value={email}
        name={'name'}
        size={'default'}
        extraClass="mb-6"
      />

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Восстановить
      </Button>

      <p className={`text text_type_main-default text_color_inactive ${styles.link}`}>
        <span className='text mr-2'>Вспомнили пароль?</span><Link className={`text ${styles.path}`} to='/login'>Войти</Link>
      </p>
    </form>
  )
};
