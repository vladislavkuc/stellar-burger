import styles from './order.module.css';
import { useEffect, useState, FC, ReactElement } from 'react';
import { getIngredientsRequest } from '../../services/api';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { TIngredient, TWsOrder } from '../../services/types';

type Props = {
  isModal? : boolean;
};

export const OrderPage: FC<Props> = ({isModal}): ReactElement => {
  const modal = false || isModal;
  const { state } = useLocation();
  const { id } = useParams();
  const { orders } = useSelector(store => store.ws);
  const [ ingredientsList, setIngredientsList ] = useState<Array<TIngredient>>([]);
  const [ orderIngredients, setOrderIngredients ] = useState<Array<TIngredient & { count: number }>>([]);
  const [ order, setOrder ] = useState<TWsOrder>();

  useEffect(() => {
    getIngredientsRequest()
      .then(res => setIngredientsList([...res.data]))
      .catch(error => console.log(`Ошибка:${error}`));
  }, []);

  useEffect(() => {
    if (state) {
      setOrder({...state.order});
    } else {
      setOrder({...(orders.find(ord => ord._id === id))!});
    }
  }, [orders, id, state]);

  useEffect(() => {
    if (order && order.ingredients && ingredientsList) {
      setOrderIngredients([...ingredientsList
      .filter(ingredient => order.ingredients.find(id => id === ingredient._id))
      .map(ingredient =>
        {
          return { count: order.ingredients.reduce((sum, val) => val === ingredient._id ? sum + 1 : sum, 0), ...ingredient }
        }
      )]);
    }
  }, [ingredientsList, order]);

  return (
    order ?
    <div className={styles.wrapper}>
      <div className={modal ? styles.modal : styles.order}>
        <p className={`${styles.number} text text_type_digits-default`}>#{order.number}</p>
        <p className='text text text_type_main-medium mb-3'>{order.name}</p>
        { order.status === 'done' ?
          <p className={`${styles.done} text text_type_main-small mb-15`}>Выполнен</p> :
          order.status === 'pending' ?
          <p className={'text text_type_main-small mb-15'}>Готовится</p> :
          <p className={'text text_type_main-small mb-15'}>Создан</p>
        }
        <p className='text text text_type_main-medium mb-6'>Состав:</p>
        <ul className={`mb-6 ${modal ? styles.modalingredients : styles.ingredients}`}>
          { orderIngredients &&
            orderIngredients.map(ingredient => {
              return(
                <li key={ingredient._id} className={styles.ingredient}>
                  <div className={styles['image-wrapper']}>
                    <img className={styles.image} alt={ingredient.name} src={ingredient.image_mobile}/>
                  </div>
                  <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
                  <div className={styles.price}>
                    <span className='text text_type_digits-default mr-2'>{`${ingredient.count} x ${ingredient.price}`}</span>
                    <CurrencyIcon type='primary'/>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className={`${styles.footer} mb-6`}>
          <span className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order.updatedAt)} /> i-GMT+3</span>
          { orderIngredients &&
          <div className={styles.price}>
            <span className='text text_type_digits-default mr-2'>{orderIngredients.reduce((sum, ingredient) => sum + ingredient.price * ingredient.count, 0)}</span>
            <CurrencyIcon type='primary'/>
          </div>
          }
        </div>
      </div>
    </div>
    :
    <div className={styles.wrapper}>
      <div className={modal ? styles.modal : styles.order}>
        <p className='text text text_type_main-medium mb-3'>Заказ не найден</p>
      </div>
    </div>
  )
};
