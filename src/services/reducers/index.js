import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { menuReducer } from './menu';
import { ingredientReducer } from './ingredient';
import { modalReducer } from './modal';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  ingredient: ingredientReducer,
  menu: menuReducer,
  modal: modalReducer,
  order: orderReducer
});
