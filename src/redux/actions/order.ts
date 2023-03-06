import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS
} from '../constants/order'

import { TOrder, TOrderPayload } from '../../services/types'
import { sendOrderRequest } from '../../services/api';
import { AppDispatch, AppThunk } from '../types';

export type TSendOrderRequest = {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export type TSendOrderSuccess = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly order: TOrder;
}

export type TSendOrderFailed = {
  readonly type: typeof SEND_ORDER_FAILED;
}

export type TOrderActions = TSendOrderRequest
  | TSendOrderSuccess
  | TSendOrderFailed;

export const sendOrderSuccess = (order: TOrder): TSendOrderSuccess => ({
  type: SEND_ORDER_SUCCESS,
  order
});

export const sendOrder: AppThunk = (orderData: TOrderPayload) => (dispatch: AppDispatch) => {
    dispatch({ type: SEND_ORDER_REQUEST });
    sendOrderRequest(orderData).then(res => {
      if (res && res.success) {
        dispatch(sendOrderSuccess(res.order));
      } else {
        dispatch({ type: SEND_ORDER_FAILED });
      }
    })
    .catch((errorText: string) => console.log(`Ошибка: ${errorText}`));
  };
