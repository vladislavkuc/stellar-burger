import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './login.module.css';
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '../services/api';
import { setCookie } from '../services/utils';
import { SET_USER } from '../redux/actions/user';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    email: '',
    password: '',
    loginFailed: false,
    errorText: ''
  })

  const handleLogin = (e) => {
    e.preventDefault();
    sendLoginRequest({email: state.email, password: state.password})
      .then(data => {
        if (data.success) {
          setCookie('token', data.accessToken.split('Bearer ')[1], { expires: 1200 });
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch({type: SET_USER, payload: data.user});
          setState({
            email: '',
            password: '',
            loginFailed: false,
            errorText: ''
          });
        } else {
          setState({...state, loginFailed: true, errorText: data.message});
        }
      })
      .catch(error => console.log(`Ошибка: ${error})`));
  };

  if (localStorage.getItem('refreshToken')) {
    return (
      <Navigate to="/" replace/>
    );
  };

  return(
    <form  onSubmit={handleLogin} className={styles.wrapper}>
      <p className="text text_type_main-medium mb-6">
        Вход
      </p>

      <EmailInput
        placeholder={'E-mail'}
        onChange={e => setState({ ...state, email: e.target.value })}
        value={state.email}
        name={'email'}
        size={'default'}
        extraClass="mb-6"
      />

      <PasswordInput
        onChange={e => setState({ ...state, password: e.target.value })}
        value={state.password}
        name={'password'}
        extraClass="mb-6"
        errorText={state.errorText}
        error={state.loginFailed}
      />

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Войти
      </Button>

      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.link}`}>
        <span className='text mr-2'>Вы — новый пользователь?</span>
        <Link className={`text ${styles.path}`} to='/register'>Зарегистрироваться</Link>
      </p>

      <p className={`text text_type_main-default text_color_inactive ${styles.link}`}>
        <span className='text mr-2'>Забыли пароль?</span>
        <Link className={`text ${styles.path}`} to='/forgot-password'>Восстановить пароль</Link>
      </p>
    </form>
  )
};
