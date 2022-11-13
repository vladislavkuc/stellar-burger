import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import overlayStyles from './modal-overlay.module.css';
import { modalRoot } from './../../utils/constants';

const ModalOverlay = (props) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscPress);
    return () => window.removeEventListener('keydown', handleEscPress);
  }, []);

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      props.closeModal();
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  }

  return ReactDOM.createPortal(
    (
    <div
      className={overlayStyles.overlay}
      onClick={handleOverlayClick}
    >
      {props.children}
    </div>
    ),
    modalRoot
  )
};


ModalOverlay.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func
}


export default ModalOverlay;
