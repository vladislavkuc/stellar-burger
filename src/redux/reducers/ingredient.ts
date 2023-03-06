import { TIngredient } from '../../services/types';
import { TIngredientActions } from '../actions/ingredient';

import {
  SET_DISPLAYED_INGREDIENT,
  DELETE_DISPLAYED_INGREDIENT
} from '../constants/ingredient';

type TIngredientState = {
  displayedIngredient: TIngredient;
};

const initialState: TIngredientState = {
  displayedIngredient: {
    "_id": '',
    "name": '',
    "type": '',
    "proteins": 0,
    "fat": 0,
    "carbohydrates": 0,
    "calories": 0,
    "price": 0,
    "image": '',
    "image_mobile": '',
    "image_large": '',
    "__v": 0
  }
};

export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
  switch (action.type) {
    case SET_DISPLAYED_INGREDIENT: {
      return {
        ...state,
        displayedIngredient: action.ingredient
      };
    }
    case DELETE_DISPLAYED_INGREDIENT: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
