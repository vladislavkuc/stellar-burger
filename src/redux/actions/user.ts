import {
  SET_USER,
  RESET_USER
} from '../constants/user';

import { TUserPayload } from '../../services/types';

export type TSetUser = {
  readonly type: typeof SET_USER;
  readonly payload: { email: string, name: string };
}

export type TResetUser = {
  readonly type: typeof RESET_USER;
}

export type TUserActions = TSetUser
  | TResetUser;

export const setUser = (payload: TUserPayload): TSetUser => ({
  type: SET_USER,
  payload
});
