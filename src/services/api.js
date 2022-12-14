import { url } from './../utils/constants';

const headers = { 'Content-Type': 'application/json' }

const sendFetch = (errorText, subUrl, body) => {
  return fetch(`${url}${subUrl}`, {...body})
  .then(res => res.ok ? res.json() : Promise.reject(errorText))
  .catch(error => console.log(`Ошибка: ${error}`));
};

export const getIngridientsRequest = () => {
  return sendFetch('Не удалось загрузить данные ингридиентов', '/ingredients', {method: 'GET'});
};

export const sendOrderRequest = (orderData) => {
  return sendFetch('Не удалось отправить данные заказа', '/orders', {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData)
  });
};
