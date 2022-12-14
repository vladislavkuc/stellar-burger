import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientStyles from './ingridient-menu-card.module.css';
import { ingredientTypes } from './../../utils/types';
import { useDrag } from 'react-dnd';

const IngridientMenuCard = (props) => {
  const { ingredient } = props;

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ...ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return(
    <li
      className={`pl-4 pr-4 mb-8 ${ingridientStyles.item}`}
      ref={ref}
      style={{opacity}}
    >
      {ingredient.__v !== 0 && <Counter count={ingredient.__v} size="default" /> }
      <img src={ingredient.image} alt={ingredient.name}/>
      <div className={`pt-2 pb-2 ${ingridientStyles['price-wrapper']}`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`pb-4 text text_type_main-default ${ingridientStyles.name}`}>{ingredient.name}</p>
    </li>
  )
}


IngridientMenuCard.propTypes = {
  ingredient: ingredientTypes
}

export default IngridientMenuCard;
