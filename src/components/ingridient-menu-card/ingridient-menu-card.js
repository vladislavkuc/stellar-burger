import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientStyles from './ingridient-menu-card.module.css';
import { ingredientTypes } from './../../utils/types';

const IngridientMenuCard = (props) => {
  return(
    <li className={`pl-4 pr-4 mb-8 ${ingridientStyles.item}`}>
      {props.ingridient.__v !== 0 && <Counter count={props.ingridient.__v} size="default" /> }

      <img src={props.ingridient.image} alt={props.ingridient.name}/>
      <div className={`pt-2 pb-2 ${ingridientStyles['price-wrapper']}`}>
        <span className="text text_type_digits-default mr-2">{props.ingridient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`pb-4 text text_type_main-default ${ingridientStyles.name}`}>{props.ingridient.name}</p>
    </li>
  )
}


IngridientMenuCard.propTypes = {
  ingridient: ingredientTypes
}

export default IngridientMenuCard;
