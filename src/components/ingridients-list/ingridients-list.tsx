import { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import IngridientMenuCard from '../ingridient-menu-card/ingridient-menu-card';
import IngridientDetails from '../ingridient-details/ingridient-details';
import Modal from '../modal/modal';
import listStyles from './ingridients-list.module.css';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { TIngredient } from '../../services/types';
import { CLOSE_MODAL } from '../../redux/constants/modal';

type Props = {
  type: string;
};

const IngridientsList: FC<Props> = ({ type }): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { modalIsOpen, modalType } = useSelector(store => store.modal);
  const { receivedIngredients } = useSelector(store => store.menu);


  const handleIngridientClick = (ingredient: TIngredient) => {
    navigate(`/ingredients/${ingredient._id}`, { state: { path: pathname, title: 'Конструктор Бургера' } });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return(
    <div className={listStyles['list-wrapper']}>
      <h2 className={`pb-6 text text_type_main-medium ${listStyles.title}`}>
        {
          type === 'bun' ? 'Булки' :
          type === 'sauce' ? 'Соусы' :
          'Начинки'
        }
      </h2>
      <ul className={`pr-4 pl-4 ${listStyles.list}`}>
        {receivedIngredients
        .filter(element => element.type === type)
        .map(element => {
          return(
            <div className={listStyles['ingridient-wrapper']} onClick={() => handleIngridientClick(element)} key={element._id}>
              <IngridientMenuCard
                ingredient={element}
              />
            </div>
          )
        })}
      </ul>
      { modalIsOpen && modalType === 'details' &&
      <Modal closeModal={closeModal} title='Детали ингридиента'>
        <IngridientDetails/>
      </Modal>
      }
    </div>
  )
}

IngridientsList.propTypes = {
  type: PropTypes.string.isRequired,
}

export default IngridientsList;
