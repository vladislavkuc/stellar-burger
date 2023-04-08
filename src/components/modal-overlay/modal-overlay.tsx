import { FC, ReactElement, HTMLAttributes, MouseEvent } from 'react';
import overlayStyles from './modal-overlay.module.css';

type Props = {
  closeModal: () => void;
} & HTMLAttributes<HTMLDivElement>;

const ModalOverlay: FC<Props> = ({ closeModal, children}): ReactElement => {
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div
      className={overlayStyles.overlay}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  )
};

export default ModalOverlay;
