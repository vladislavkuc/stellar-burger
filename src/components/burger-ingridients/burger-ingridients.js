import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import biStyles from './burger-ingridients.module.css';
import IngridientsList from "../ingridients-list/ingridients-list";
import { getIngridients, SET_MENU_TAB } from '../../services/actions/menu';

const BurgerIngridients = () => {
  const { tab } = useSelector(store => store.menu);

  const dispatch = useDispatch();

  useEffect(() => {
    const menu = document.getElementById('ingredientsContainer');
    menu.addEventListener('scroll', (e) => {
      const bunsOfftop = Math.abs(menu.childNodes[0].offsetTop - menu.scrollTop);
      const saucesOfftop = Math.abs(menu.childNodes[1].offsetTop - menu.scrollTop);
      const mainsOfftop = Math.abs(menu.childNodes[2].offsetTop - menu.scrollTop);

      const tab = bunsOfftop < mainsOfftop && bunsOfftop < saucesOfftop ? 'buns'
      : mainsOfftop < bunsOfftop && mainsOfftop < saucesOfftop ? 'mains' : 'sauces';
      dispatch({ type: SET_MENU_TAB, tab })
    });
  }, []);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  return(
    <section className={biStyles.content}>
      <h1 className="pb-5 text text_type_main-large">
        Соберите бургер
      </h1>
      <menu className={`pb-10 ${biStyles.menu}`} >
        <Tab value="buns" active={tab === 'buns'}>
          Булки
        </Tab>
        <Tab value="sauces" active={tab === 'sauces'}>
          Соусы
        </Tab>
        <Tab value="mains" active={tab === 'mains'}>
          Начинки
        </Tab>
      </menu>
      <div className={biStyles['ingridients-lists'] } id="ingredientsContainer">
        <IngridientsList type='bun'/>
        <IngridientsList type='sauce'/>
        <IngridientsList type='main'/>
      </div>
    </section>
  )
}

export default BurgerIngridients;
