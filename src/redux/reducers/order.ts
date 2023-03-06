import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS
} from '../constants/order'

import { TOrderActions } from '../actions/order';
import { TOrder } from '../../services/types';

type TOrderState = {
  order: TOrder;
  ordersRequest: boolean;
  ordersFailed: boolean;
};

const initialState: TOrderState = {
  order: {
    name: '',
    order: { number: 0 },
    success: false
  },
  ordersRequest: false,
  ordersFailed: false
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        ordersRequest: true
      };
    }
    case SEND_ORDER_SUCCESS: {
      return { ...state, ordersFailed: false, order: action.order, ordersRequest: false };
    }
    case SEND_ORDER_FAILED: {
      return { ...state, ordersFailed: true, ordersRequest: false };
    }
    default: {
      return state;
    }
  }
};
