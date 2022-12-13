import PropTypes from 'prop-types';
import { useState } from 'react';
import orderStyles from './order-details.module.css';
import { order as testOrderData } from './../../utils/constants';
import orderDone from './../../images/done.svg';

const OrderDetails = () => {
  const [order, setOrder] = useState({...testOrderData});

  return(
    <div className={orderStyles.order}>
      <span className='text text_type_digits-large mb-8'>{order.id}</span>
      <span className='text text_type_main-medium'>идентификатор заказа</span>
      <img src={orderDone} alt="заказ готовится" className={orderStyles.image}/>
      <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string
  })
}

export default OrderDetails;
