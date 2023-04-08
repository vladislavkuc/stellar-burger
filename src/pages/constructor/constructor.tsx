import { useEffect, FC, ReactElement } from 'react';
import BurgerIngridients from '../../components/burger-ingridients/burger-ingridients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './constructor.module.css';
import { getIngredientsByRequest } from '../../redux/actions/menu';
import { useLocation, useParams } from 'react-router-dom';
import IngridientDetails from '../../components/ingridient-details/ingridient-details';
import { openModal } from '../../redux/actions/modal';
import { getIngredientsRequest } from '../../services/api';
import { TIngredient } from '../../services/types';
import { setDisplayedIngredient } from '../../redux/actions/ingredient';
import { useDispatch } from '../../redux/hooks';

export const ConstructorPage: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getIngredientsByRequest());
  }, []);

  useEffect(() => {
    if (id) {
      getIngredientsRequest()
        .then(res => {
          dispatch(setDisplayedIngredient(res.data.find((ingredient: TIngredient) => ingredient._id === id)));
          if (state) {
            dispatch(openModal('details'));
          }
        })
        .catch(error => console.log(`Ошибка: ${error}`));
    }
  }, [dispatch, id]);

  if (state === null && pathname !== '/') {
    return(
      <div className={styles.ingredient}>
        <IngridientDetails />
      </div>
    )
  }

  return(
    <DndProvider backend={HTML5Backend}>
      <div className={`pt-10 ${styles.constructor}`}>
        <BurgerIngridients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  )
};
