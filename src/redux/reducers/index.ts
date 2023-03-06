import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { menuReducer } from './menu';
import { ingredientReducer } from './ingredient';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './wsReducer';


export const rootReducer = combineReducers({
  burger: burgerReducer,
  ingredient: ingredientReducer,
  menu: menuReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer
});
