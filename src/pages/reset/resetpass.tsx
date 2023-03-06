import React, { FC, FormEvent, ReactElement } from 'react';
import styles from './resetpass.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendResetPasswordResquest } from '../../services/api';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export const ResetPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = React.useState({
    token: '',
    password: '',
    error: ''
  });

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    sendResetPasswordResquest(state)
      .then(data => {
        if (data.success) {
          setState({
            token: '',
            password: '',
            error: ''
          });
          navigate('/login');
        } else {
          setState({
            ...state,
            error: data.message
          });
        }
      })
      .catch(error => console.log(error));
  };

  if (localStorage.getItem('refreshToken')) {
    return (
      <Navigate to="/" replace/>
    );
  };

  if (!location.state || (location.state && location.state.path !== '/forgot-password')) {
    return (
      <Navigate to="/forgot-password" replace/>
    );
  };

  return(
    <form  onSubmit={handleReset} className={styles.wrapper}>
      <p className="text text_type_main-medium mb-6">
        Восстановление пароля
      </p>

      <PasswordInput
        onChange={e => setState({ ...state, password: e.target.value })}
        value={state.password}
        name={'password'}
        extraClass="mb-6"
        placeholder='Введите новый пароль'
      />

      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={e => setState({ ...state, token: e.target.value })}
        value={state.token}
        name={'token'}
        error={state.error !== ''}
        errorText={state.error}
        size={'default'}
        extraClass="mb-6"
      />

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Сохранить
      </Button>

      <p className={`text text_type_main-default text_color_inactive ${styles.link}`}>
        <span className='text mr-2'>Вспомнили пароль?</span><Link className={`text ${styles.path}`} to='/login'>Войти</Link>
      </p>
    </form>
  )
};
