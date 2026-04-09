import { REMOVE_MESSAGE_TIMEOUT } from '../constants.js';

const body = document.body;

/**
 * Функция поиска шаблона в HTML-разметке по ID
 * Должен содержать только один дочерний элемент
 * @param {string} id - ID шаблона
 * @returns {HTMLElement|null} Первый дочерний элемент шаблона или null,
 *  если шаблон недоступен или некорректен
 */
export const findTemplate = (id) => {
  const template = document.getElementById(id);
  if(!template || !(template instanceof HTMLTemplateElement)) {
    return null;
  }

  const firstChild = template.content.firstElementChild;
  if (!firstChild) {
    return null;
  }

  return firstChild;
};

/**
 * Функция рендеринга группы элементов в контейнер
 * @param {Array} items - Массив данных для рендера
 * @param {function} makeElement - Функция, создающая DOM-элемент из элемента данных
 * @param {HTMLElement} container - Контейнер для вставки созданных элементов
 * @returns {HTMLElement|null} Заполненный элементами контейнер или null,
 *  если контейнер не найден
 */
export const renderGroup = (items, makeElement, container) => {
  if (!container) {
    // eslint-disable-next-line no-console
    console.error('Контейнер не найден');
    return null;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = makeElement(item);
    if (element !== null) {
      fragment.appendChild(element);
    }
  });

  container.appendChild(fragment);
};

/**
 * Шаблон блока ошибки загрузки данных.
 * @type {HTMLTemplateElement}
 */
const errorLoadDataTemplate = findTemplate('data-error');

/**
 * Удаляет элемент ошибки из DOM
 * @function
 * @returns {void}
 */
const errorRemover = () => {
  const errorLoadDataArea = body.querySelector('.data-error');
  if (errorLoadDataArea) {
    errorLoadDataArea.remove();
  }
};

/**
 * Показывает сообщение об ошибке с автоматическим удалением через таймаут,
 * клонирует шаблон ошибки, заполняет текстом и добавляет в body
 * @param {string} [message] Текст ошибки для отображения
 */
export const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }

  body.append(errorArea);

  setTimeout(errorRemover, REMOVE_MESSAGE_TIMEOUT);
};

/**
 * Создаёт debounced-версию функции: выполняет колбэк только после паузы в вызовах
 * @param {Function} callback - Функция-колбэк для отложенного выполнения
 * @param {number} timeoutDelay - Задержка в миллисекундах перед вызовом
 * @returns {Function} Новая функция
 */
export const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);
  };
};
