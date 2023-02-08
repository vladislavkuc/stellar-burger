import { ADD_INGREDIENT, DELETE_INGREDIENT, SORT_INGREDIENT, CLEAR_INGREDIENTS } from '../actions/burger';

const initialState = {
  ingredients: [],
  bun: {},
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_INGREDIENTS: {
      return {
        ...initialState
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredient.type === 'bun' ? [ ...state.ingredients ] : [...state.ingredients, action.ingredient],
        bun: action.ingredient.type === 'bun' ? action.ingredient : state.bun
      }
    }
    case DELETE_INGREDIENT : {
      return {
        ...state,
        ingredients: [...state.ingredients.filter((ing, index) => index !== action.index)]
      }
    }
    case SORT_INGREDIENT : {
      const sortedIngredients = [...state.ingredients];
      const movedIngredient = sortedIngredients.splice(action.dragTargetIndex, 1)[0];
      sortedIngredients.splice(action.dropTargetIndex, 0, movedIngredient)
      return {
        ...state,
        ingredients: [...sortedIngredients]
      }
    }
    default: {
      return state;
    }
  }
};
