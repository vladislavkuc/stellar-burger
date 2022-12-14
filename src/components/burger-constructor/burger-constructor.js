import bcStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_MODAL, CLOSE_MODAL } from '../../services/actions/modal';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT} from '../../services/actions/burger';
import { INCREASE_BUN, INCREASE_INGREDIENT } from '../../services/actions/menu';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';

const BurgerConstructor = () => {
  const { modalIsOpen, modalType } = useSelector(store => store.modal);
  const { ingredients, bun } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      modalType: 'order'
    })
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    })
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item){
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: item
      });
      item.type === 'bun' ?
      dispatch({
        type: INCREASE_BUN,
        id: item._id
      }) :
      dispatch({
        type: INCREASE_INGREDIENT,
        id: item._id
      });
    }
  });

  return(
    <section className={bcStyles.content}>
      <div className={`pt-5 pb-5 pr-4 ${bcStyles.ingridients} ${isHover ? bcStyles.hover : ''}`} ref={dropTarget}>
        {bun.name && <span className={`${bcStyles.ingridient} pl-8 pr-4`}>
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
          key={index}/>
        )}
        </ul>
        { bun.name &&
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
