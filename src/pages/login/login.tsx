import React, { FC, ReactElement, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '../../services/api';
import { setCookie } from '../../services/utils';
import { setUser } from '../../redux/actions/user';

export const LoginPage: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    email: '',
    password: '',
    loginFailed: false,
    errorText: ''
  })

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    sendLoginRequest({email: state.email, password: state.password})
      .then(data => {
        if (data.success) {
          setCookie('token', data.accessToken.split('Bearer ')[1], { expires: 1200 });
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch(setUser(data.user));
          setState({
            email: '',
            password: '',
            loginFailed: false,
            errorText: ''
          });
          navigate("/");
        } else {
          setState({...state, loginFailed: true, errorText: data.message});
        }
      })
      .catch(error => console.log(`Ошибка: ${error})`));
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
