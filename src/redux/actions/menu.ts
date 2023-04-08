import { getIngredientsRequest } from "../../services/api";
import { TIngredient } from "../../services/types";
import {
  INCREASE_INGREDIENT,
  INCREASE_BUN,
  DECREASE_INGREDIENT,
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
  SET_MENU_TAB
} from '../constants/menu';
import { AppDispatch, AppThunk } from "../types";

export type TIncreaseIngredient = {
  readonly type: typeof INCREASE_INGREDIENT;
  readonly id: string;
}

export type TDecreaseIngredient = {
  readonly type: typeof DECREASE_INGREDIENT;
  readonly id: string;
}

export type TIncreaseBun = {
  readonly type: typeof INCREASE_BUN;
  readonly id: string;
}

export type TGetIngredientsRequest = {
  readonly type: typeof GET_INGRIDIENTS_REQUEST;
}

export type TGetIngredientsSucces = {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export type TGetIngredientsFailed = {
  readonly type: typeof GET_INGRIDIENTS_FAILED;
}

export type TSetMenuTab = {
  readonly type: typeof SET_MENU_TAB;
  readonly tab: string;
}

export type TMenuActions = TIncreaseIngredient
  | TDecreaseIngredient
  | TIncreaseBun
  | TGetIngredientsRequest
  | TGetIngredientsFailed
  | TGetIngredientsSucces
  | TSetMenuTab;

export const increaseIngredient = (id: string): TIncreaseIngredient => ({
  type: INCREASE_INGREDIENT,
  id
});

export const decreaseIngredient = (id: string): TDecreaseIngredient => ({
  type: DECREASE_INGREDIENT,
  id
});

export const increaseBun = (id: string): TIncreaseBun => ({
  type: INCREASE_BUN,
  id
});

export const getIngredients = (ingredients: TIngredient[]): TGetIngredientsSucces => ({
  type: GET_INGRIDIENTS_SUCCESS,
  ingredients
});

export const setMenuTab = (tab: string): TSetMenuTab => ({
  type: SET_MENU_TAB,
  tab
});

export const getIngredientsByRequest: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGRIDIENTS_REQUEST });
  getIngredientsRequest().then(res => {
    if (res && res.success) {
      dispatch(getIngredients(res.data));
    } else {
      dispatch({ type: GET_INGRIDIENTS_FAILED });
    }
  })
  .catch(errorText => console.log(`Ошибка: ${errorText}`));
};
