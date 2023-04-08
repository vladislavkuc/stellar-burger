import styles from './order-items.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement, useEffect, useState } from 'react';
import { getIngredientsRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { TIngredient, TWsOrder } from '../../services/types';

type Props = {
  orders: TWsOrder[];
  inProfile?: boolean;
};

export const OrderItems: FC<Props> = ({orders, inProfile}): ReactElement => {
  const navigate = useNavigate();
  const [ ingredientsList, setIngredientsList ] = useState<Array<TIngredient>>([]);

  useEffect(() => {
    getIngredientsRequest()
      .then((res: { data: TIngredient[] }) => setIngredientsList([...res.data]))
      .catch(error => console.log(`Ошибка:${error}`));
  }, []);

  const handleClick = (order: TWsOrder) => {
    const pathto = inProfile ? `/profile/orders/${order._id}` : `/feed/${order._id}`;
    navigate(pathto, {state: { order: {...order}}});
  };

  return (
    <ul className={styles.wrapper}>
      {
      orders.map((order: TWsOrder) => {
        return(
          <li className={`${styles.order} mb-4`} key={order._id} onClick={() => handleClick(order)}>
            <div className={`${styles.headers} mb-6`}>
              <span className='text text_type_digits-default'>#{order.number}</span>
              <span className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order.updatedAt)} /> i-GMT+3</span>
            </div>
            {
            inProfile
              ? <>
                  <p className='text text_type_main-medium mb-2'>{order.name}</p>
                  {
                    order.status === 'done' ?
                    <p className={`${styles.done} text text_type_main-small mb-4`}>Выполнен</p> :
                    order.status === 'pending' ?
                    <p className={'text text_type_main-small mb-4'}>Готовится</p> :
                    <p className={'text text_type_main-small mb-4'}>Создан</p>
                  }
                </>
              : <p className='text text_type_main-medium mb-6'>{order.name}</p>
            }
            <div className={styles.headers}>
              {ingredientsList.length !== 0 &&
                <>
                  <div className={styles.ingredients}>
                    {
                      order.ingredients.slice(0, 6).map((ingredient, index) => {
                        let info = ingredientsList.find(obj => obj._id == ingredient);
                        if (info !== undefined) {
                          return <div className={styles.ingredient} key={`${index}-${ingredient}`}>
                            <img className={styles.image} src={info.image_mobile} />
                            { index === 5 && <p className={` ${styles.count} text text_type_main-default`}>+{order.ingredients.length - 5}</p>}
                          </div>
                        }
                      })
                    }
                  </div>
                  <div className={styles.price}>
                    <span className='mr-2 text text_type_digits-default'>{
                      order.ingredients.reduce((sum, ingredient) => {
                        let info = ingredientsList.find(obj => obj._id == ingredient);
                        if (info !== undefined) {
                          return sum + info.price
                        }
                        return sum
                      }, 0)
                    }</span>
                    <CurrencyIcon type="primary" />
                  </div>
                </>
              }
            </div>
          </li>
        )
      })
      }
    </ul>
  )
};
