import { TModalActions } from '../actions/modal';
import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants/modal';

type TModalState = {
  modalIsOpen: boolean;
  modalType: string;
};

const initialState: TModalState = {
  modalIsOpen: false,
  modalType: ''
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modalIsOpen: true,
        modalType: action.modalType
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalIsOpen: false,
        modalType: ''
       };
    }
    default: {
      return state;
    }
  }
};
