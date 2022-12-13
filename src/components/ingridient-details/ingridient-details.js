import ingridientDetailsStyles from './ingridient-details.module.css';
import { ingredientTypes } from './../../utils/types';

const IngridientDetails = (props) => {
  return (
    <div className={ingridientDetailsStyles.ingridient}>
      <img className='mb-4' src={props.ingridient.image_large} alt={props.ingridient.name}/>
      <span className='mb-8 text text_type_main-medium'>{props.ingridient.name}</span>
      <div className={ingridientDetailsStyles.details}>
        <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.ingridient.calories}</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.ingridient.proteins}</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.ingridient.fat}</p>
        <p className='text text_type_digits-default text_color_inactive'>{props.ingridient.carbohydrates}</p>
      </div>
    </div>
  )
}

IngridientDetails.propTypes = {
  ingridient: ingredientTypes
}

export default IngridientDetails;
