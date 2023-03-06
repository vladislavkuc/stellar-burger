import { FC, ReactElement } from 'react';
import bcStyles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../redux/actions/burger';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types';
import { openModal } from '../../redux/actions/modal';
import { CLOSE_MODAL } from '../../redux/constants/modal';
import { DELETE_DISPLAYED_INGREDIENT } from '../../redux/constants/ingredient';
import { increaseBun, increaseIngredient } from '../../redux/actions/menu';


const BurgerConstructor: FC = (): ReactElement => {
  const { modalIsOpen, modalType } = useSelector(store => store.modal);
  const { ingredients, bun } = useSelector(store => store.burger);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (localStorage.getItem('refreshToken')) {
      if (bun.name !== '') { dispatch(openModal('order')) };
    } else {
      navigate('/login');
    }
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: DELETE_DISPLAYED_INGREDIENT });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop: (item: TIngredient) => {
      dispatch(addIngredient(item));
      item.type === 'bun' ? dispatch(increaseBun(item._id)) : dispatch(increaseIngredient(item._id));
    }
  });

  return(
    <section className={bcStyles.content}>
      <div className={`pt-5 pb-5 pr-4 ${bcStyles.ingridients} ${isHover ? bcStyles.hover : ''}`} ref={dropTarget}>
        {bun.name !== '' && <span className={`${bcStyles.ingridient} pl-8 pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </span>}
        <ul className={`${bcStyles['mains-and-sauces']}`}>
        {ingredients.map((ingredient, index) =>
          <ConstructorIngredient ingredient={ingredient} index={index}
          key={ingredient._id + ':' + index}/>
        )}
        </ul>
        { bun.name !== '' &&
          <span className={`${bcStyles.ingridient} pl-8 pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </span>
        }
      </div>

      <div className={bcStyles.info}>
        <div className={bcStyles['price-wrapper']}>
          <span className="mr-2 text text_type_digits-medium">{(bun.price ? bun.price*2 : 0) + ingredients.reduce((cur, el) => cur + el.price, 0)}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

      { modalIsOpen && modalType === 'order' &&
      <Modal closeModal={closeModal} title=''>
        <OrderDetails />
      </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;
