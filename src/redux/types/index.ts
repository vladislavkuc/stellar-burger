import { store } from '../store';

import { TBurgerActions } from '../actions/burger';
import { TIngredientActions } from '../actions/ingredient';
import { TMenuActions } from '../actions/menu';
import { TModalActions } from '../actions/modal';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/wsActions';

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type TApplicationActions = TBurgerActions
  | TIngredientActions
  | TMenuActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWsActions;

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action<any>, RootState, TApplicationActions>
  >;
