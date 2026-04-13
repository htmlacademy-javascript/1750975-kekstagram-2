import { isEscapeKey } from '../utils/modal-windows.js';

const body = document.body;
let notifListenersAttached = false;

/**
 * Обработчик клика по документу для закрытия уведомления
 * @param {MouseEvent} evt — объект события клика
*/
const onNotificationcloseButtonClick = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  if (!existElement) {
    return;
  }

  const closeButton = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeButton) {
    closeNotification(existElement);
  }
};

/**
 * Обработчик нажатия клавиши Escape для закрытия уведомления
 * @param {KeyboardEvent} evt — объект события нажатия клавиши
*/
const onNotificationEscapeKeydown = (evt) => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (!existElement) {
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    closeNotification(existElement);
  }
};

/**
 * Закрывает уведомление: удаляет элемент из DOM,
 * удаляет обработчики клика и нажатия клавиши Escape,
 * сбрасывает флаг notifListenersAttached
 */
function closeNotification (element) {
  element.remove();
  body.removeEventListener('click', onNotificationcloseButtonClick);
  body.removeEventListener('keydown', onNotificationEscapeKeydown);
  notifListenersAttached = false;
}

/**
 * Вставляет уведомление в DOM на основе шаблона и подписывает его на события закрытия
 * @param {HTMLTemplateElement} template - Шаблон уведомления (success или error)
 * @param {Function} [trigger] - Необязательная функция, вызывается сразу после
 * вставки уведомления (н-р, для сброса формы или изменения состояния)
 * @returns {void}
 */
export const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);

  if (!notifListenersAttached) {
    body.addEventListener('click', onNotificationcloseButtonClick);
    body.addEventListener('keydown', onNotificationEscapeKeydown);
    notifListenersAttached = true;
  }
};
