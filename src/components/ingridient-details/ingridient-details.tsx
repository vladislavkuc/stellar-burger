import { FC, ReactElement} from 'react';
import { useSelector } from '../../redux/hooks';
import ingridientDetailsStyles from './ingridient-details.module.css';

const IngridientDetails: FC = (): ReactElement => {
  const { displayedIngredient } = useSelector(store => store.ingredient);

  return (
    <div className={ingridientDetailsStyles.ingridient}>
      <img className='mb-4' src={displayedIngredient.image_large} alt={displayedIngredient.name}/>
      <span className='mb-8 text text_type_main-medium'>{displayedIngredient.name}</span>
      <div className={ingridientDetailsStyles.details}>
        <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
        <p className='text text_type_digits-default text_color_inactive'>{displayedIngredient.calories}</p>
        <p className='text text_type_digits-default text_color_inactive'>{displayedIngredient.proteins}</p>
        <p className='text text_type_digits-default text_color_inactive'>{displayedIngredient.fat}</p>
        <p className='text text_type_digits-default text_color_inactive'>{displayedIngredient.carbohydrates}</p>
      </div>
    </div>
  )
}

export default IngridientDetails;
