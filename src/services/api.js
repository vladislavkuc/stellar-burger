import { url } from './../utils/constants';

const headers = { 'Content-Type': 'application/json' }

const makeRequest = (errorText, subUrl, body) => {
  return fetch(`${url}${subUrl}`, {...body})
  .then(res => res.ok ? res.json() : Promise.reject(errorText))
};

export const getIngridientsRequest = () => {
  return makeRequest('Не удалось загрузить данные ингридиентов', '/ingredients', {method: 'GET'});
};

export const sendOrderRequest = (orderData) => {
  return makeRequest('Не удалось отправить данные заказа', '/orders', {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData)
  });
};
