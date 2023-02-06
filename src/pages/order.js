import styles from './order.module.css';
import { useEffect, useState } from 'react';
import { getIngridientsRequest } from '../services/api';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

export const OrderPage = () => {
  const { state } = useLocation();
  const { order } = state;

  const [ ingredientsList, setIngredientsList ] = useState([]);
  const [ orderIngredients, setOrderIngredients ] = useState([]);

  useEffect(() => {
    getIngridientsRequest()
      .then(res => setIngredientsList([...res.data]))
      .catch(error => console.log(`Ошибка:${error}`));
  }, []);

  useEffect(() => {
    setOrderIngredients([...ingredientsList
    .filter(ingredient => order.ingredients.find(id => id === ingredient._id))
    .map(ingredient =>
      {
        return { count: order.ingredients.reduce((sum, val) => val == ingredient._id ? sum + 1 : sum, 0), ...ingredient }
      }
    )]);
  }, [ingredientsList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.order}>
        <p className={`${styles.number} text text_type_digits-default`}>#{order.number}</p>
        <p className='text text text_type_main-medium mb-3'>Death Star Starship Main бургер</p>
        { order.status === 'done' ?
          <p className={`${styles.done} text text_type_main-small mb-15`}>Выполнен</p> :
          order.status === 'pending' ?
          <p className={'text text_type_main-small mb-15'}>Готовится</p> :
          <p className={'text text_type_main-small mb-15'}>Создан</p>
        }
        <p className='text text text_type_main-medium mb-6'>Состав:</p>
        <ul className={`mb-6 ${styles.ingredients}`}>
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
  )
};
