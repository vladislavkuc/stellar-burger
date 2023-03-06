import { url } from './constants';
import { TOrderPayload   } from './types';
import { getCookie, setCookie } from './utils';

type THeaders = {
  [name: string]: string;
};

type TPayload = {
  headers?: THeaders;
  method?: string;
  body?: string;
};

const headers: {} = { 'Content-Type': 'application/json' }

const makeRequest = (subUrl: string, payload: TPayload, errorText: string = 'Произошла ошибка') => {
  return fetch(`${url}${subUrl}`, {...payload})
  .then(res => {
    try  { return res.json() }
    catch (e) { Promise.reject(errorText)}
  })
};


export const getNewAccessToken = ( data: {token: string | null} ) => {
  if (data.token !== null){
    return makeRequest('/auth/token', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }, 'Не удалось обновить токен');
  } else {
    return Promise.reject('Refresh Token не обнаружен')
  }
};


const makeRequestWithRefresh = (subUrl: string, payload: TPayload, errorText: string) => {
  if (!getCookie('token')) {
    getNewAccessToken({ token: localStorage.getItem('refreshToken')})
      .then(res => {
        setCookie('token', res.accessToken.split('Bearer ')[1], { expires: 1200 });
        localStorage.setItem('refreshToken', res.refreshToken);
    })
  }
  return makeRequest(subUrl, payload, errorText)
};


export const getUserInfo = () => {
  return makeRequestWithRefresh('/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }} , 'Не удалось получить данные пользователя');
};


export const getIngredientsRequest = () => {
  return makeRequest('/ingredients', {method: 'GET'});
};


export const sendOrderRequest = (orderData: TOrderPayload) => {
  return makeRequestWithRefresh('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify(orderData)
  }, 'Не удалось отправить данные заказа');
};


export const sendForgotPasswordResquest = (payload: {email: string}) => {
  return makeRequest('/password-reset', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }, 'Не удалось отправить email для восстановления пароля');
};


export const sendResetPasswordResquest = (payload: {token: string, password: string, error: string}) => {
  return makeRequest('/password-reset/reset', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }, 'Не удалось восстановить пароль');
};


export const sendRegisterRequest = (payload: {email: string, password: string, name: string}) => {
  return makeRequest('/auth/register', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }, 'Не удалось зарегистрировать аккаунт');
};


export const sendLoginRequest = (payload: {email: string, password: string}) => {
  return makeRequest('/auth/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }, 'Не удалось авторизоваться');
};


export const sendLogoutRequest = (payload: {token: string}) => {
  return makeRequest('/auth/logout', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }, 'Не удалось выйти из учетной записи');
};


export const updateUserInfo = (payload: { name: string, email: string}) => {
  return makeRequestWithRefresh('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify(payload)
  } , 'Не удалось обновить данные пользователя');
};

