import styles from './order-items.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { getIngridientsRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const OrderItems = ({orders, inProfile}) => {
  const navigate = useNavigate();
  const [ ingredientsList, setIngredientsList ] = useState([]);

  useEffect(() => {
    getIngridientsRequest()
      .then(res => setIngredientsList([...res.data]))
      .catch(error => console.log(`Ошибка:${error}`));
  }, []);

  useEffect(() => {
    console.log()
  }, [ingredientsList]);

  const handleClick = (order) => {
    const pathto = inProfile ? `/profile/orders/${order._id}` : `/feed/${order._id}`;
    navigate(pathto, {state: { order: {...order}}});
  };

  return (
    <ul className={styles.wrapper}>
      {
      orders.map(order => {
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
                  <p className='text text_type_main-medium mb-2'>Death Star Starship Main бургер</p>
                  {
                    order.status === 'done' ?
                    <p className={`${styles.done} text text_type_main-small mb-4`}>Выполнен</p> :
                    order.status === 'pending' ?
                    <p className={'text text_type_main-small mb-4'}>Готовится</p> :
                    <p className={'text text_type_main-small mb-4'}>Создан</p>
                  }
                </>
              : <p className='text text_type_main-medium mb-6'>Death Star Starship Main бургер</p>
            }
            <div className={styles.headers}>
              {ingredientsList.length !== 0 &&
                <>
                  <div className={styles.ingredients}>
                    {
                      order.ingredients.slice(0, 6).map((ingredient, index) => {
                        return <div className={styles.ingredient} key={`${index}-${ingredient}`}>
                          <img className={styles.image} src={ingredientsList.find(obj => obj._id == ingredient).image_mobile} />
                          { index === 5 && <p className={` ${styles.count} text text_type_main-default`}>+{order.ingredients.length - 5}</p>}
                        </div>
                      })
                    }
                  </div>
                  <div className={styles.price}>
                    <span className='mr-2 text text_type_digits-default'>{
                      order.ingredients.reduce((sum, ingredient) => sum + ingredientsList.find(obj => obj._id == ingredient).price, 0)
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
