import { FC, ReactElement, useEffect } from 'react';
import orderStyles from './order-details.module.css';
import orderDone from './../../images/done.svg';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { sendOrder } from '../../redux/actions/order';
import { CLEAR_INGREDIENTS } from '../../redux/constants/burger';

const OrderDetails: FC = (): ReactElement => {
  const { order } = useSelector(store => store.order);
  const { ingredients, bun } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bun._id !== ''){
      sendOrder({ ingredients: [ bun._id, ...ingredients.map(ing => ing._id), bun._id,]});
    }
    dispatch({ type: CLEAR_INGREDIENTS });
  }, []);

  return(
    <div className={orderStyles.order}>
      <span className='text text_type_digits-large mb-8'>{order.order.number}</span>
      <span className='text text_type_main-medium'>идентификатор заказа</span>
      <img src={orderDone} alt="заказ готовится" className={orderStyles.image}/>
      <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
};

export default OrderDetails;
