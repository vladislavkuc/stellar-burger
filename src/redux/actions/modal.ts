import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants/modal';

export type TOpenModal = {
  readonly type: typeof OPEN_MODAL;
  readonly modalType: string;
}

export type TCloseModal = {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = TOpenModal
  | TCloseModal;

export const openModal = (modalType: string): TOpenModal => ({
  type: OPEN_MODAL,
  modalType
});
