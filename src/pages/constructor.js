import { useEffect } from 'react';
import BurgerIngridients from '../components/burger-ingridients/burger-ingridients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './login.module.css';
import { getIngridients } from '../redux/actions/menu';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import IngridientDetails from '../components/ingridient-details/ingridient-details';
import { SET_DISPLAYED_INGREDIENT } from '../redux/actions/ingredient';
import { OPEN_MODAL } from '../redux/actions/modal';
import { getIngridientsRequest } from '../services/api';

export const ConstructorPage = () => {
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  useEffect(() => {if (id) {
    getIngridientsRequest()
      .then(res => {
        dispatch({
          type: SET_DISPLAYED_INGREDIENT,
          ingredient : res.data.find(ingredient => ingredient._id === id)
        });

        if (state) {
          dispatch({
            type: OPEN_MODAL,
            modalType: 'details'
          });
        }
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }}, [dispatch, id]);

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
