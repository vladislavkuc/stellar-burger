import { sendOrderRequest } from "../api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function sendOrder(orderData) {
  return function(dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });
    sendOrderRequest(orderData).then(res => {
      if (res && res.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          order: res.order
        });
      } else {
        dispatch({
          type: SEND_ORDER_FAILED
        });
      }
    })
    .catch(errorText => console.log(`Ошибка: ${errorText}`));
  };
}
