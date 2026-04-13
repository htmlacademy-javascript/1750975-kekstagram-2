/** @constant @type {string} Базовый URL API сервера */
export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

/**
 * Маршруты API эндпоинтов
 * @constant @enum {string}
 */
export const Route = {
  GET_DATA: '/data', // Получение списка фотографий
  SEND_DATA: '/', // Отправка новой фотографии
};

/**
 * HTTP-методы для запросов
 * @constant @enum {string}
 */
export const Method = {
  GET: 'GET',
  POST: 'POST',
};

/** @constant @type {number} Таймаут автудаления сообщений об ошибках (мс) */
export const REMOVE_MESSAGE_TIMEOUT = 5000;
/** @constant @type {number} Задержка debounce (мс) */
export const DEBOUNCE_DELAY = 500;

// Форма загрузки
/** @constant @type {number} Шаг загрузки комментариев в модалке */
export const COMMENT_COUNT_STEP = 5;
/** @constant @type {number} Шаг изменения масштаба (%) */
export const SCALE_STEP = 25;
/** @constant @type {number} Максимум хэштегов */
export const MAX_HASHTAGS = 5;
/** @constant @type {number} Максимальная длина хэштега (с #) */
export const MAX_HASHTAG_LENGTH = 20;
/** @constant @type {number} Максимальная длина комментария */
export const MAX_COMMENT_LENGTH = 140;

/**
 * CSS-фильтры эффектов
 * @constant @type {Object.<string, {min: number, max: number, step: number, style: function(string): string}>}
 */
export const EFFECTS = {
  none: { min: 0, max: 100, step: 1, style: () => 'none' },
  chrome: { min: 0, max: 1, step: 0.1, style: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, style: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, style: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, style: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, style: (value) => `brightness(${value})` },
};

/**
 * Фильтры сортировки фотографий (id кнопок)
 * @constant @enum {string}
 */
export const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

/**
 * Функции сортировки для фильтров
 * @constant @type {Object.<string, function>}
 */
export const SORTFUNC = {
  sortRandom: () => 0.5 - Math.random(),
  sortDiscussed: (a, b) => b.comments.length - a.comments.length,
};

/** @constant @type {number} Максимум фото в случайном фильтре */
export const MAX_PICTURE_COUNT = 10;
/** @constant @type {string} CSS-класс активной кнопки фильтра */
export const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
