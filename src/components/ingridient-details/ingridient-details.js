import PropTypes from 'prop-types';
import ingridientDetailsStyles from './ingridient-details.module.css';
import { ingredientTypes } from './../../utils/constants';

const IngridientDetails = (props) => {
  return (
    <div className={ingridientDetailsStyles.ingridient}>
      <img className='mb-4' src={props.image_large} alt={props.name}/>
      <span className='mb-8 text text_type_main-medium'>{props.name}</span>
      <div className={ingridientDetailsStyles.details}>
        <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.calories}</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.proteins}</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.fat}</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.carbohydrates}</p>
      </div>
    </div>
  )
}

IngridientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired
}

export default IngridientDetails;
