import { SEND_ORDER_FAILED, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS } from "../actions/order";

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        ordersRequest: true
      };
    }
    case SEND_ORDER_SUCCESS: {
      return { ...state, ordersFailed: false, order: action.order, orderRequest: false };
    }
    case SEND_ORDER_FAILED: {
      return { ...state, ordersFailed: true, ordersRequest: false };
    }
    default: {
      return state;
    }
  }
};
