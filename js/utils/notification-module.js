import { isEscapeKey } from '../utils/modal-windows.js';

const body = document.body;
let notifListenersAttached = false;

/**
 * Обработчик закрытия уведомления (success/error)
 * @param {MouseEvent | KeyboardEvent} evt - Событие клика или нажатия клавиши
 * @returns {void}
 */
const closeNotification = (evt) => {
  evt.stopPropagation();

  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (!existElement) {
    return;
  }

  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

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
    body.addEventListener('click', closeNotification);
    body.addEventListener('keydown', closeNotification);
    notifListenersAttached = true;
  }
};
