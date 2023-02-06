import { useSelector, useDispatch } from 'react-redux';
import IngridientMenuCard from '../ingridient-menu-card/ingridient-menu-card';
import IngridientDetails from '../ingridient-details/ingridient-details';
import Modal from '../modal/modal';
import listStyles from './ingridients-list.module.css';
import PropTypes from 'prop-types';
import { CLOSE_MODAL } from '../../redux/actions/modal';
import { useLocation, useNavigate } from 'react-router-dom';

const IngridientsList = (props) => {
  const { type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { modalIsOpen, modalType } = useSelector(store => store.modal);
  const { receivedIngridients } = useSelector(store => store.menu);


  const handleIngridientClick = (ingredient) => {
    navigate(`/ingredients/${ingredient._id}`, { state: { path: pathname, title: 'Конструктор Бургера' } });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL })
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
        {receivedIngridients
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
