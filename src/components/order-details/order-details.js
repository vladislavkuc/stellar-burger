import orderStyles from './order-details.module.css';
import orderDone from './../../images/done.svg';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../services/actions/order';

const OrderDetails = () => {
  const { order } = useSelector(store => store.order);
  const { ingredients, bun } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      sendOrder(
        {
          ingredients: [
            bun._id,
            ...ingredients.map(ing => ing._id),
            bun._id,
          ]
        }
      )
    )
  }, []);

  return(
    <div className={orderStyles.order}>
      <span className='text text_type_digits-large mb-8'>{order.number}</span>
      <span className='text text_type_main-medium'>идентификатор заказа</span>
      <img src={orderDone} alt="заказ готовится" className={orderStyles.image}/>
      <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
};

export default OrderDetails;
