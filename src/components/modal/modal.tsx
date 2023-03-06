import { FC, ReactElement, useEffect, HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalRoot } from '../../services/constants';

type Props = {
  closeModal: () => void;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

const Modal: FC<Props> = ({ closeModal, title, children }):ReactElement => {
  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscPress);
    return () => window.removeEventListener('keydown', handleEscPress);
  }, []);

  const handleClose = () => {
    closeModal();;
  };

  return ReactDOM.createPortal(
    (
    <ModalOverlay closeModal={() => closeModal()}>
      <div className={modalStyles.modal}>
        <div className={modalStyles.controls}>
          <p className='text text_type_main-large'>
            {title}
          </p>

          <div className={modalStyles['close-icon-wrapper']} onClick={handleClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        { children }
      </div>
    </ModalOverlay>
    ),
    modalRoot
  )
};

export default Modal;
