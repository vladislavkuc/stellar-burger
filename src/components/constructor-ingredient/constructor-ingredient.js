import constructorIngredientStyles from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { DELETE_INGREDIENT, SORT_INGREDIENT } from '../../redux/actions/burger';
import { DECREASE_INGREDIENT } from '../../redux/actions/menu';

const ConstructorIngredient = (props) => {
  const { ingredient, index } = props;
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'burger-part',
    item: {index}
  });

  const [{isHover}, dropRef] = useDrop({
    accept: 'burger-part',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item){
      dispatch({
        type: SORT_INGREDIENT,
        dragTargetIndex: item.index,
        dropTargetIndex: index
      });
    }
  });

  const handleDeleteIngredient = (id, index) => {
    dispatch({
      type: DELETE_INGREDIENT,
      index
    });
    dispatch({
      type: DECREASE_INGREDIENT,
      id
    });
  };

  return (
  <li className={constructorIngredientStyles.ingredient}
    ref={dragRef}>
    <DragIcon type="primary" />
    <div ref={dropRef} className={constructorIngredientStyles.refwrapper}>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        extraClass={isHover ? constructorIngredientStyles.hover : ''}
        handleClose={() => handleDeleteIngredient(ingredient._id, index)}
      />
    </div>

  </li>)
};

export default ConstructorIngredient;
