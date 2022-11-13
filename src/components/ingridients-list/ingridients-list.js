import { useState } from 'react';
import IngridientMenuCard from '../ingridient-menu-card/ingridient-menu-card';
import IngridientDetails from '../ingridient-details/ingridient-details';
import Modal from '../modal/modal';
import listStyles from './ingridients-list.module.css';
import PropTypes from 'prop-types';
import { ingredientTypes } from './../../utils/constants';

const IngridientsList = (props) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ currentIngridient, setCurrentIngridient ] = useState(null);

  const handleIngridientClick = (element) => {
    setCurrentIngridient({...element});
    setModalIsOpen(true);
  }

  return(
    <div className={listStyles['list-wrapper']}>
      <h2 className={`pb-6 text text_type_main-medium ${listStyles.title}`}>{props.title}</h2>
      <ul className={`pr-4 pl-4 ${listStyles.list}`}>
        {props.data.map(element => {
          return(
            <div className={listStyles['ingridient-wrapper']} onClick={() => handleIngridientClick(element)} key={element._id}>
              <IngridientMenuCard
                {...element}
              />
            </div>
          )
        })}
      </ul>
      { modalIsOpen &&
      <Modal closeModal={() => setModalIsOpen(false)} title='Детали ингридиента'>
        {currentIngridient &&
        <IngridientDetails {...currentIngridient}/>
        }
      </Modal>
      }
    </div>
  )
}

IngridientsList.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes).isRequired,
}

export default IngridientsList;
