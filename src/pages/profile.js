import React, { useEffect } from 'react';
import styles from './profile.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_USER, SET_USER } from '../redux/actions/user';
import { getNewAccessToken, getUserInfo, sendLogoutRequest, updateUserInfo } from '../services/api';
import { getCookie, deleteCookie, setCookie } from '../services/utils';
import { OrderItems } from '../components/order-items/order-items';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../redux/actions/wsActions';

export const ProfilePage = () => {
  const { orders } = useSelector(store => store.ws);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    isEdit: false
  });

  const inputNameRef = React.useRef(null);
  const onIconClick = (ref) => {
    setTimeout(() => ref.current.focus(), 0);
  };

  const handleLogout = () => {
    sendLogoutRequest({token: localStorage.getItem('refreshToken')})
      .then(data => {
        if (data.success){
          if (getCookie('token')) { deleteCookie('token') };
          localStorage.removeItem('refreshToken');
          dispatch({type: RESET_USER});
        } else { Promise.reject(data.message) }
      })
      .catch(error => console.log(`Ошибка: ${error})`));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateUserInfo({ name: state.name, email: state.email})
      .then(data => {
        if (data.success){
          dispatch({type: SET_USER, payload: data.user});
        } else { Promise.reject(data.message) }
      })
      .catch(error => console.log(`Ошибка: ${error})`));
  };

  const handleCancel = () => {
    getUserInfo()
      .then(data => {
        setState({
          ...state,
          ...data.user,
          isEdit: false
        });
      })
      .catch(error => console.log(error));
  };

  const defaultClassName = `text_type_main-medium text_color_inactive ${styles['nav-link']}`;

  useEffect(() => {
    getUserInfo()
      .then(data => {
        setState({
          ...state,
          ...data.user,
          isEdit: false
        });
      })
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    if (!getCookie('token')) {
      getNewAccessToken({token: localStorage.getItem('refreshToken')})
        .then(data => setCookie('token', data.accessToken.split('Bearer ')[1], { expires: 1200 }))
        .catch(error => console.log(error));
    }
    dispatch({type: WS_CONNECTION_START, wsUrl: `wss://norma.nomoreparties.space/orders?token=${getCookie('token')}`});
    return () => dispatch({type: WS_CONNECTION_CLOSED})
  }, []);

  return(
    <div className={styles.wrapper}>
      <div className={`mr-15 ${styles.column}`}>
        <nav className={`mb-20 mt-20 ${styles.nav}`}>
          <Link
            className={pathname === '/profile' ? `${styles['nav-link_active']} ${defaultClassName}` : defaultClassName}
            to='/profile'
          >
            Профиль
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles['nav-link_active']} ${defaultClassName}` : defaultClassName
            }
            to='/profile/orders'
          >
            История заказов
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles['nav-link_active']} ${defaultClassName}` : defaultClassName
            }
            to="/login"
            onClick={handleLogout}
          >
            Выход
          </NavLink>
        </nav>
        <p className={`text text_type_main-default text_color_inactive ${styles.description}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>

      {
      pathname === '/profile'
      ?
      <form onSubmit={handleEdit} className={`${styles.column} mt-20`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setState({ ...state, name: e.target.value, isEdit: true})}
          value={state.name}
          name={'name'}
          error={false}
          ref={inputNameRef}
          onIconClick={() => onIconClick(inputNameRef)}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
          icon="EditIcon"
        />

        <EmailInput
          placeholder={'E-mail'}
          onChange={e => setState({ ...state, email: e.target.value, isEdit: true})}
          value={state.email}
          name={'email'}
          size={'default'}
          extraClass="mb-6"
          icon="EditIcon"
        />

        <PasswordInput
          onChange={e => setState({ ...state, password: e.target.value, isEdit: true})}
          value={state.password}
          name={'password'}
          icon="EditIcon"
          extraClass="mb-6"
        />

        {
          state.isEdit &&
          <div className={styles.buttons}>
            <Button htmlType="button" type="primary" size="medium" extraClass={`mr-5 ${styles['cancel-button']}`} onClick={handleCancel}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        }
      </form>
      :
      <section className={styles.orders}>
        <OrderItems inProfile={true} orders={orders}/>
      </section>
      }
    </div>
  )
};
