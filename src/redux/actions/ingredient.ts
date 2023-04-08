import { TIngredient } from "../../services/types";
import {
  SET_DISPLAYED_INGREDIENT,
  DELETE_DISPLAYED_INGREDIENT
} from "../constants/ingredient";

export type TSetDisplayedIngredient = {
  readonly type: typeof SET_DISPLAYED_INGREDIENT;
  readonly ingredient: TIngredient;
}

export type TDeleteDisplayedIngredient = {
  readonly type: typeof DELETE_DISPLAYED_INGREDIENT;
}

export type TIngredientActions = TSetDisplayedIngredient
  | TDeleteDisplayedIngredient;

export const setDisplayedIngredient = (ingredient: TIngredient): TSetDisplayedIngredient => ({
  type: SET_DISPLAYED_INGREDIENT,
  ingredient
});
