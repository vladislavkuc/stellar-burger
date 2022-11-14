import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import biStyles from './burger-ingridients.module.css';
import IngridientsList from "../ingridients-list/ingridients-list";
import PropTypes from 'prop-types';
import { ingredientTypes } from './../../utils/types';

const BurgerIngridients = (props) => {
  return(
    <section className={biStyles.content}>
      <h1 className="pb-5 text text_type_main-large">
        Соберите бургер
      </h1>
      <menu className={`pb-10 ${biStyles.menu}`}>
        <Tab value="one" active={props.current === 'buns'}>
          Булки
        </Tab>
        <Tab value="two" active={props.current === 'sauces'}>
          Соусы
        </Tab>
        <Tab value="three" active={props.current === 'main'}>
          Начинки
        </Tab>
      </menu>
      <div className={biStyles['ingridients-lists']}>
        <IngridientsList data={props.data.filter(element => element.type === 'bun')} title='Булки'/>
        <IngridientsList data={props.data.filter(element => element.type === 'sauce')} title='Соусы'/>
        <IngridientsList data={props.data.filter(element => element.type === 'main')} title='Начинки'/>
      </div>
    </section>
  )
}


BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes).isRequired,
}

export default BurgerIngridients;
