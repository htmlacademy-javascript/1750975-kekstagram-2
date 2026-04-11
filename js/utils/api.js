import { BASE_URL, Route, Method } from '../constants.js';

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [Method.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

/**
 * Функция для выполнения HTTP запросов к API
 * @async
 * @param {string} route - Путь API эндпоинта
 * @param {string} [method='GET'] - HTTP метод
 * @param {string|null} [body=null] - Тело запроса для POST
 * @returns {Promise<any>} Промис с данными ответа или ошибкой
 * @throws {Object} Объект ошибки с message и status
 */
const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });

  return response.ok ? response.json()
    : Promise.reject({ message: ErrorText[method], status: response.status });
};

/**
 * Загружает данные фотографий с сервера
 * @async
 * @returns {Promise<Array>} Массив объектов фотографий
 */
export const getData = () => load(Route.GET_DATA);

/**
 * Отправляет новую фотографию на сервер
 * @async
 * @param {string|FormData} body - Данные формы для отправки
 * @returns {Promise<Object>} Ответ сервера
 */
export const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);
