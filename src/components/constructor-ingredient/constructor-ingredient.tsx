import { FC, ReactElement} from 'react';
import constructorIngredientStyles from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { TIngredient } from '../../services/types';
import { deleteIngredient, sortIngredients } from '../../redux/actions/burger';
import { decreaseIngredient } from '../../redux/actions/menu';

type Props = {
  ingredient: TIngredient;
  index: number;
};

const ConstructorIngredient: FC<Props> = ({ ingredient, index }): ReactElement  => {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'burger-part',
    item: { index }
  });

  const [{isHover}, dropRef] = useDrop({
    accept: 'burger-part',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop: (item: { index: number }) => {
      dispatch(sortIngredients(item.index, index));
    }
  });

  const handleDeleteIngredient = (id: string, index: number) => {
    dispatch(deleteIngredient(index));
    dispatch(decreaseIngredient(id));
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
