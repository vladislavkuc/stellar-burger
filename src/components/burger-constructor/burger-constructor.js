import { useState } from 'react';
import PropTypes from 'prop-types';
import bcStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientTypes } from './../../utils/types';

const BurgerConstructor = (props) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  const handleClick = () => {
    setModalIsOpen(true);
  }

  const state = {
      bun: props.data.find(ingridient => ingridient.type === 'bun' && ingridient.__v),
      otherIngridients: props.data.reduce((cur, ing) => {
        if (ing.type !== 'bun' && ing.__v) {
          for(let i = 0; i < ing.__v; i++) {
            cur.push(ing);
          }
        }
        return cur;
      }, []),
    };

  return(
    <section className={bcStyles.content}>
      <div className={`pt-5 pb-5 pr-4 ${bcStyles.ingridients}`}>
        {
          state.bun &&
          <span className={`${bcStyles.ingridient} pl-8 pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={state.bun.name + ' (верх)'}
              price={state.bun.price}
              thumbnail={state.bun.image_mobile}
            />
          </span>
        }
        <ul className={`${bcStyles['mains-and-sauces']}`}>
        {state.otherIngridients.map((ingridient, index) =>
          <li className={bcStyles.ingridient}
          key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              isLocked={false}
              text={ingridient.name}
              price={ingridient.price}
              thumbnail={ingridient.image_mobile}
            />
          </li>
        )}
        </ul>
        {
          state.bun &&
          <span className={`${bcStyles.ingridient} pl-8 pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={state.bun.name + ' (низ)'}
              price={state.bun.price}
              thumbnail={state.bun.image_mobile}
            />
          </span>
        }
      </div>

      <div className={bcStyles.info}>
        <div className={bcStyles['price-wrapper']}>
          <span className="mr-2 text text_type_digits-medium">{(state.bun ? state.bun.price*2 : 0) + state.otherIngridients.reduce((cur, el) => cur + el.price, 0)}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

      { modalIsOpen &&
      <Modal closeModal={() => setModalIsOpen(false)} title=''>
        <OrderDetails />
      </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes).isRequired,
}

export default BurgerConstructor;
