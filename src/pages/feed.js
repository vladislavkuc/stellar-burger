import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderItems } from '../components/order-items/order-items';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_STOP } from '../redux/actions/wsActions';
import styles from './feed.module.css';
import { OrderPage } from './order';
import Modal from '../components/modal/modal';
import { CLOSE_MODAL, OPEN_MODAL } from '../redux/actions/modal';
import { useLocation, useNavigate } from 'react-router-dom';

export const FeedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, state } = useLocation();
  const { modalIsOpen, modalType } = useSelector(store => store.modal);
  const { orders, total, totalToday } = useSelector(store => store.ws);

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });;
    navigate('/feed');
  };

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START, wsUrl: 'wss://norma.nomoreparties.space/orders/all'});
    return () => {
      dispatch({type: WS_CONNECTION_CLOSED});
      dispatch({type: WS_CONNECTION_STOP});
    }
  }, []);

  useEffect(() => {
    if (pathname !== '/feed' && state) {
      dispatch({
        type: OPEN_MODAL,
        modalType: 'orderInfo'
      })
    }
  }, [pathname]);

  if (pathname !== '/feed' && !state) {
    return <OrderPage isModal={false}/>
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_main-large mb-5 ${styles.heading}`}>Лента заказов</h1>
      <section className={styles.column}>
        <OrderItems orders={orders}/>
      </section>
      <section className={styles.column}>
        <div className={styles.status}>
          <div className={styles.subcolumn}>
            <p className={`text text_type_main-medium mb-6 ${styles.subheading}`}>Готовы:</p>
            <ul className={styles.orders}>
              {
              orders.filter(order => order.status === 'done')
              .slice(0, 10)
              .map(order => <li key={order.number} className={`${styles.done} text text_type_digits-default mb-2`}>{order.number}</li> )
              }
            </ul>
            { orders.filter(order => order.status === 'done').length > 10 &&
            <ul className={styles.orders}>
              {
              orders.filter(order => order.status === 'done')
              .slice(10, 20)
              .map(order => <li key={order.number} className={`${styles.done} text text_type_digits-default mb-2`}>{order.number}</li> )
              }
            </ul>
            }
          </div>
          <div className={styles.subcolumn}>
            <p className={`text text_type_main-medium mb-6 ${styles.subheading}`}>В работе:</p>
              <ul className={styles.orders}>
                {
                orders.filter(order => order.status === 'pending')
                .slice(0, 10)
                .map(order => <li key={order.number} className={`${styles.nodone} text text_type_digits-default mb-2`}>{order.number}</li> )
                }
              </ul>
              { orders.filter(order => order.status === 'pending').length > 10 &&
              <ul className={styles.orders}>
                {
                orders.filter(order => order.status === 'pending')
                .slice(10, 20)
                .map(order => <li key={order.number} className={`${styles.nodone} text text_type_digits-default mb-2`}>{order.number}</li> )
                }
              </ul>
            }
          </div>
        </div>
        <p className='mt-15 text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.shiny} text text_type_digits-large`}>{ total }</p>
        <p className='mt-15 text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.shiny} text text_type_digits-large`}>{ totalToday }</p>
      </section>
      { modalIsOpen && modalType === 'orderInfo' &&
      <Modal closeModal={closeModal} title=''>
        <OrderPage isModal={true}/>
      </Modal>
      }
    </div>
  )
};
