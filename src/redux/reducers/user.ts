import {
  SET_USER,
  RESET_USER
} from '../constants/user';

import { TUserPayload } from '../../services/types';
import { TUserActions } from '../actions/user';

type TUserState = {
  email: string;
  name: string;
};

const initialState: TUserState = {
  email: '',
  name: '',
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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
