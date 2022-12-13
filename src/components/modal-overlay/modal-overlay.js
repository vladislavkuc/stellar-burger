import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  }

  return (
    <div
      className={overlayStyles.overlay}
      onClick={handleOverlayClick}
    >
      {props.children}
    </div>
  )
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;
