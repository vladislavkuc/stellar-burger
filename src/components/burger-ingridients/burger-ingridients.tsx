import { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import biStyles from './burger-ingridients.module.css';
import IngridientsList from "../ingridients-list/ingridients-list";
import { useSelector } from '../../redux/hooks';
import { SET_MENU_TAB } from '../../redux/constants/menu';

const BurgerIngridients: FC = (): ReactElement => {
  const { tab } = useSelector(store => store.menu);

  const dispatch = useDispatch();

  useEffect(() => {
    const menu = document.getElementById('ingredientsContainer');
    if (menu !== null) {
      menu.addEventListener('scroll', () => {
        let bunsOfftop = 0;
        let saucesOfftop = 1;
        let mainsOfftop = 2;

        if (menu.children[0] instanceof HTMLElement) bunsOfftop = Math.abs(menu.children[0].offsetTop - menu.scrollTop);
        if (menu.children[1] instanceof HTMLElement) saucesOfftop = Math.abs(menu.children[1].offsetTop - menu.scrollTop);
        if (menu.children[2] instanceof HTMLElement) mainsOfftop = Math.abs(menu.children[2].offsetTop - menu.scrollTop);

        const tab = bunsOfftop < mainsOfftop && bunsOfftop < saucesOfftop ? 'buns'
        : mainsOfftop < bunsOfftop && mainsOfftop < saucesOfftop ? 'mains' : 'sauces';
        dispatch({ type: SET_MENU_TAB, tab })
      });
    }
  }, []);

  return(
    <section className={biStyles.content}>
      <h1 className="pb-5 text text_type_main-large">
        Соберите бургер
      </h1>
      <menu className={`pb-10 ${biStyles.menu}`} >
        <Tab value="buns" active={tab === 'buns'} onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="sauces" active={tab === 'sauces'} onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="mains" active={tab === 'mains'} onClick={() => {}}>
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
