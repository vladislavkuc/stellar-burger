import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "../constants/wsActions";

import { TOrdersPayload } from "../../services/types";

export type TWsSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly wsUrl: string;
};

export type TWsError = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

export type TWsStart = {
  readonly type: typeof WS_CONNECTION_START;
};

export type TWsStop = {
  readonly type: typeof WS_CONNECTION_STOP;
};

export type TWsClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrdersPayload;
};

export type TWsSendMessage = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: TOrdersPayload;
};

export type TWsActions = TWsSuccess
  | TWsError
  | TWsStart
  | TWsStop
  | TWsClosed
  | TWsGetMessage
  | TWsSendMessage;

export const wsConnectionSuccess = (wsUrl: string): TWsSuccess => ({
  type: WS_CONNECTION_SUCCESS,
  wsUrl
});

export const wsConnectionError = (): TWsError => ({
  type: WS_CONNECTION_ERROR
});

export const wsConnectionClosed = (): TWsClosed => ({
  type: WS_CONNECTION_CLOSED
});

export const wsGetMessage = (payload: TOrdersPayload): TWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload
});

export const wsSendMessage = (payload: TOrdersPayload): TWsSendMessage => ({
  type: WS_SEND_MESSAGE,
  payload
});
