import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalRoot } from './../../utils/constants';
import { useEffect } from 'react';

const Modal = (props) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscPress);
    return () => window.removeEventListener('keydown', handleEscPress);
  }, []);


  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      props.closeModal();
    }
  }

  return ReactDOM.createPortal(
    (
    <ModalOverlay closeModal={() => props.closeModal()}>
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
    </ModalOverlay>
    ),
    modalRoot
  )
};

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
}

export default Modal;
