import {
  SET_DISPLAYED_INGREDIENT,
  DELETE_DISPLAYED_INGREDIENT
} from '../actions/ingredient';

const initialState = {
  displayedIngredient: {}
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAYED_INGREDIENT: {
      return {
        ...state,
        displayedIngredient: action.ingredient
      };
    }
    case DELETE_DISPLAYED_INGREDIENT: {
      return {
        ...state,
        displayedIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
};
