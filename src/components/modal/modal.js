import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {
  return(
    <div className={modalStyles.modal}>
      <div className={modalStyles.controls}>
        <p className='text text_type_main-large'>
          {props.title}
        </p>

        <div className={modalStyles['close-icon-wrapper']} onClick={props.closeModal}>
          <CloseIcon type="primary" />
        </div>
      </div>
      { props.children }
    </div>
  )
};

Modal.propTypes = {
  title: PropTypes.string,
}

export default Modal;
