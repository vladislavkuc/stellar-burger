import React, { useEffect, FC, ReactElement, FormEvent } from 'react';
import styles from './profile.module.css';
import { EmailInput, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNewAccessToken, getUserInfo, sendLogoutRequest, updateUserInfo } from '../../services/api';
import { getCookie, deleteCookie, setCookie } from '../../services/utils';
import { OrderItems } from '../../components/order-items/order-items';
import Modal from '../../components/modal/modal';
import { OrderPage } from '../index';
import { useSelector } from '../../redux/hooks';
import { CLOSE_MODAL } from '../../redux/constants/modal';
import { openModal } from '../../redux/actions/modal';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_STOP } from '../../redux/constants/wsActions';
import { setUser } from '../../redux/actions/user';
import { RESET_USER } from '../../redux/constants/user';

export const ProfilePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const localState = useLocation().state;
  const { orders, wsConnected } = useSelector(store => store.ws);
  const { modalIsOpen, modalType } = useSelector(store => store.modal);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    isEdit: false
  });

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });;
    navigate('/profile/orders');
  };

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken !== null){
      sendLogoutRequest({ token: refreshToken })
        .then(data => {
          if (data.success){
            if (getCookie('token')) { deleteCookie('token') };
            localStorage.removeItem('refreshToken');
            dispatch({type: RESET_USER});
          } else { Promise.reject(data.message) }
        })
        .catch(error => console.log(`Ошибка: ${error})`))
    };
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    updateUserInfo({ name: state.name, email: state.email})
      .then(data => {
        if (data.success){
          dispatch(setUser(data.user));
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
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      getUserInfo()
        .then(data => {
          setState({
            ...state,
            ...data.user,
            isEdit: false
          });
        })
        .catch(error => console.log(error));
    }
    return () => {
      if (wsConnected) {
        dispatch({type: WS_CONNECTION_CLOSED});
        dispatch({type: WS_CONNECTION_STOP});
      }
    }
  }, []);


  useEffect(() => {
    if (pathname === '/profile/orders' || (id && pathname === `/profile/orders/${id}`)){
      if (!getCookie('token')) {
        getNewAccessToken({token: localStorage.getItem('refreshToken')})
          .then(data => {
            setCookie('token', data.accessToken.split('Bearer ')[1], { expires: 1200 });
            localStorage.setItem('refreshToken', data.refreshToken);
          })
          .catch(error => console.log(error));
      }
      dispatch({type: WS_CONNECTION_START, wsUrl: `wss://norma.nomoreparties.space/orders?token=${getCookie('token')}`});
    } else {
      if (wsConnected) {
        dispatch({type: WS_CONNECTION_CLOSED});
        dispatch({type: WS_CONNECTION_STOP});
      };
    }
  }, [pathname, dispatch, id, wsConnected]);

  useEffect(() => {
    if (pathname !== '/profile/orders' && pathname !== '/profile' && localState) {
      dispatch(openModal('orderInfo'))
    }
  }, [pathname, dispatch, localState]);

  if (pathname !== '/profile/orders' && pathname !== '/profile' && !localState) {
    return <OrderPage isModal={false}/>
  }

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
      <>
      <section className={styles.orders}>
        <OrderItems inProfile={true} orders={orders}/>
      </section>
      { modalIsOpen && modalType === 'orderInfo' &&
      <Modal closeModal={closeModal} title=''>
        <OrderPage isModal={true}/>
      </Modal>
      }
      </>
      }
    </div>
  )
};
