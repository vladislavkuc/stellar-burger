import { TIngredient } from '../../services/types';
import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
  SET_MENU_TAB,
  INCREASE_INGREDIENT,
  INCREASE_BUN,
  DECREASE_INGREDIENT
} from '../constants/menu';
import { TMenuActions } from '../actions/menu';

type TMenuState = {
  receivedIngredients: TIngredient[];
  tab: string;
  ingredientsFailed: boolean;
  ingredientsRequest: boolean;
};

const initialState: TMenuState = {
  receivedIngredients: [],
  tab: 'buns',
  ingredientsFailed: false,
  ingredientsRequest: false,
};

export const menuReducer = (state = initialState, action: TMenuActions) : TMenuState => {
  switch (action.type) {
    case DECREASE_INGREDIENT: {
      return {
        ...state,
        receivedIngredients: [...state.receivedIngredients.map((ingredient: TIngredient) =>
          ingredient._id === action.id ? {
            ...ingredient, __v: ingredient.__v - 1
          } : ingredient
        )]
      }
    }
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        receivedIngredients: [...state.receivedIngredients.map((ingredient: TIngredient) =>
          ingredient._id === action.id ? {
            ...ingredient, __v: ingredient.__v + 1
          } : ingredient
        )]
      }
    }
    case INCREASE_BUN: {
      return {
        ...state,
        receivedIngredients: [...state.receivedIngredients.map((ingredient: TIngredient) =>
          ingredient._id === action.id ? {
            ...ingredient, __v: 2
          } : { ...ingredient, __v: 0 }
        )]
      }
    }
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, receivedIngredients: action.ingredients, ingredientsRequest: false };
    }
    case GET_INGRIDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
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
