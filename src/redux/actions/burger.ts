import { TIngredient } from '../../services/types';

import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  CLEAR_INGREDIENTS,
} from '../constants/burger';

export type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
};

export type TDeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly index: number;
};

export type TSortIngredients = {
  readonly type: typeof SORT_INGREDIENT;
  readonly dropTargetIndex: number;
  readonly dragTargetIndex: number;
};

export type TClearIngredient = {
  readonly type: typeof CLEAR_INGREDIENTS;
};

export type TBurgerActions = TAddIngredient
  | TDeleteIngredient
  | TSortIngredients
  | TClearIngredient;

export const addIngredient = (ingredient: TIngredient): TAddIngredient => ({
  type: ADD_INGREDIENT,
  ingredient
});

export const deleteIngredient = (index: number): TDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  index
});

export const sortIngredients = (dropTargetIndex: number, dragTargetIndex: number): TSortIngredients => ({
  type: SORT_INGREDIENT,
  dropTargetIndex,
  dragTargetIndex
});
