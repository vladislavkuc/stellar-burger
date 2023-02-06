import {
  SET_USER,
  RESET_USER
} from './../actions/user';

const initialState = {
  email: '',
  name: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USER: {
      return { email: action.payload.email, name: action.payload.name};
    }
    case RESET_USER: {
      return { ...initialState  };
    }
    default: {
      return state;
    }
  }
};
