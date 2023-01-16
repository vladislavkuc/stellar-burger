import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal';

const initialState = {
  modalIsOpen: false,
  modalType: ''
};

export const modalReducer = (state = initialState, action) => {
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
