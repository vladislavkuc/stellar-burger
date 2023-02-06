import React from 'react';
import styles from './login.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { sendRegisterRequest } from '../services/api';
import { setCookie } from '../services/utils';
import { SET_USER } from '../redux/actions/user';


export const RegisterPage = () => {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    registerFailed: false,
    errorText: ''
  });
  const dispatch = useDispatch();

  const inputNameRef = React.useRef(null);
  const onIconClick = (ref) => {
    setTimeout(() => ref.current.focus(), 0);
  };

  const handleReg = (e) => {
    e.preventDefault();
    sendRegisterRequest ({email: state.email, password: state.password})
      .then(data => {
        if (data.success) {
          setCookie('token', data.accessToken.split('Bearer ')[1], { expires: 1200 });
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch({type: SET_USER, payload: data.user});
          setState({
            email: '',
            password: '',
            registerFailed: false,
            errorText: ''
          });
        } else {
          setState({...state, registerFailed: true, errorText: data.message});
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
    <form  onSubmit={handleReg} className={styles.wrapper}>
      <p className="text text_type_main-medium mb-6">
        Регистрация
      </p>

      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setState({ ...state, name: e.target.value})}
        value={state.name}
        name={'name'}
        ref={inputNameRef}
        onIconClick={() => onIconClick(inputNameRef)}
        size={'default'}
        extraClass="mb-6"
      />

      <EmailInput
        placeholder={'E-mail'}
        onChange={e => setState({ ...state, email: e.target.value })}
        value={state.email}
        name={'email'}
        size={'default'}
        extraClass="mb-6"
      />

      <PasswordInput
        onChange={e => setState({ ...state, password: e.target.value})}
        value={state.password}
        name={'password'}
        extraClass="mb-6"
        errorText={state.errorText}
        error={state.registerFailed}
      />

      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Зарегистрироваться
      </Button>

      <p className={`text text_type_main-default text_color_inactive ${styles.link}`}>
        <span className='text mr-2'>Уже зарегистрированы?</span><Link className={`text ${styles.path}`} to='/login'>Войти</Link>
      </p>
    </form>
  )
};
