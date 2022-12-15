import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
  SET_MENU_TAB,
  INCREASE_INGREDIENT,
  INCREASE_BUN,
  DECREASE_INGREDIENT
} from '../actions/menu';

const initialState = {
  receivedIngridients: [],
  tab: 'buns'
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case DECREASE_INGREDIENT: {
      return {
        ...state,
        receivedIngridients: [...state.receivedIngridients.map(ingredient =>
          ingredient._id === action.id ? {
            ...ingredient, __v: ingredient.__v - 1
          } : ingredient
        )]
      }
    }
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        receivedIngridients: [...state.receivedIngridients.map(ingredient =>
          ingredient._id === action.id ? {
            ...ingredient, __v: ingredient.__v + 1
          } : ingredient
        )]
      }
    }
    case INCREASE_BUN: {
      return {
        ...state,
        receivedIngridients: [...state.receivedIngridients.map(ingredient =>
          ingredient._id === action.id ? {
            ...ingredient, __v: 2
          } : { ...ingredient, __v: 0 }
        )]
      }
    }
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        ingridientsRequest: true
      };
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return { ...state, ingridientsFailed: false, receivedIngridients: action.ingridients, ingridientsRequest: false };
    }
    case GET_INGRIDIENTS_FAILED: {
      return { ...state, ingridientsFailed: true, ingridientsRequest: false };
    }
    case SET_MENU_TAB: {
      return {
        ...state,
        tab: action.tab
      }
    }
    default: {
      return state;
    }
  }
};
