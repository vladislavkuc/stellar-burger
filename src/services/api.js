import { url } from './constants';
import { getCookie, setCookie } from './utils';

const headers = { 'Content-Type': 'application/json' }

const makeRequest = (subUrl, body, errorText = 'Произошла ошибка') => {
  return fetch(`${url}${subUrl}`, {...body})
  .then(res => {
    try  { return res.json() }
    catch (e) { Promise.reject(errorText)}
  })
};


export const getNewAccessToken = (data) => {
  return makeRequest('/auth/token', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }, 'Не удалось обновить токен');
};


const makeRequestWithRefresh = (subUrl, body, errorText) => {
  if (!getCookie('token')) {
    getNewAccessToken(localStorage.getItem('refreshToken'))
      .then(res => {
        setCookie('token', res.accessToken.split('Bearer ')[1], { expires: 1200 });
        localStorage.setItem('refreshToken', res.refreshToken);
      })
  }
  return makeRequest(subUrl, body, errorText)
};


export const getUserInfo = () => {
  return makeRequestWithRefresh('/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }} , 'Не удалось получить данные пользователя');
};


export const getIngridientsRequest = () => {
  return makeRequest('/ingredients', {method: 'GET'});
};


export const sendOrderRequest = (orderData) => {
  return makeRequest('/orders', {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData)
  }, 'Не удалось отправить данные заказа');
};


export const sendForgotPasswordResquest = (email) => {
  return makeRequest('/password-reset', {
    method: 'POST',
    headers,
    body: JSON.stringify(email)
  }, 'Не удалось отправить email для восстановления пароля');
};


export const sendResetPasswordResquest = (data) => {
  return makeRequest('/password-reset/reset', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }, 'Не удалось восстановить пароль');
};


export const sendRegisterRequest = (data) => {
  return makeRequest('/auth/register', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }, 'Не удалось зарегистрировать аккаунт');
};


export const sendLoginRequest = data => {
  return makeRequest('/auth/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }, 'Не удалось авторизоваться');
};


export const sendLogoutRequest = (data) => {
  return makeRequest('/auth/logout', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }, 'Не удалось выйти из учетной записи');
};


export const updateUserInfo = (data) => {
  return makeRequestWithRefresh('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify(data)
  } , 'Не удалось обновить данные пользователя');
};

