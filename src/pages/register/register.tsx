import React, { FC, FormEvent, ReactElement } from 'react';
import styles from './register.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendRegisterRequest } from '../../services/api';
import { setCookie } from '../../services/utils';
import { setUser } from '../../redux/actions/user';


export const RegisterPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    registerFailed: false,
    errorText: ''
  });
  const dispatch = useDispatch();

  const handleReg = (e: FormEvent) => {
    e.preventDefault();
    sendRegisterRequest ({email: state.email, password: state.password, name: state.name})
      .then(data => {
        if (data.success) {
          setCookie('token', data.accessToken.split('Bearer ')[1], { expires: 1200 });
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch(setUser(data.user));
          navigate("/profile");
          setState({
            email: '',
            password: '',
            registerFailed: false,
            errorText: '',
            name: ''
          });
        } else {
          setState({...state, registerFailed: true, errorText: data.message});
        }
      })
      .catch(error => console.log(`Ошибка: ${error})`));
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
