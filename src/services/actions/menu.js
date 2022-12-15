import { getIngridientsRequest } from "../api";

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const INCREASE_BUN = 'INCREASE_BUN';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

export const SET_MENU_TAB = 'SET_MENU_TAB';

export function getIngridients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    });
    getIngridientsRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGRIDIENTS_SUCCESS,
          ingridients: res.data
        });
      } else {
        dispatch({
          type: GET_INGRIDIENTS_FAILED
        });
      }
    })
    .catch(errorText => console.log(`Ошибка: ${errorText}`));
  };
}
