import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientStyles from './ingridient-menu-card.module.css';
import { ingredientTypes } from './../../utils/constants';

const IngridientMenuCard = (props) => {
  return(
    <li key={props._id} className={`pl-4 pr-4 mb-8 ${ingridientStyles.item}`}>
      {props.__v !== 0 && <Counter count={props.__v} size="default" /> }

      <img src={props.image} alt={props.name}/>
      <div className={`pt-2 pb-2 ${ingridientStyles['price-wrapper']}`}>
        <span className="text text_type_digits-default mr-2">{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`pb-4 text text_type_main-default ${ingridientStyles.name}`}>{props.name}</p>
    </li>
  )
}

IngridientMenuCard.propTypes = {
  data: ingredientTypes.isRequired,
}

export default IngridientMenuCard;