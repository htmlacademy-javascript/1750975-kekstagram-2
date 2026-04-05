/**
 * Проверяет, является ли нажатая клавиша клавишей Escape
 * @param {KeyboardEvent} evt - cобытие клавиатуры
 * @returns {boolean} true, если клавиша Escape, иначе false
 */
export const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Переключает состояние модального окна и фона
 * @param {HTMLElement} wrapper - Элемент модального окна (.img-upload__overlay)
 * @param {boolean} [willBeOpened=true] - Будет ли модальное окно открыто:
 *   - true: убирает 'hidden' у wrapper и добавляет 'modal-open' к body,
 *   - false: добавляет 'hidden' к wrapper и убирает 'modal-open' с body.
 * @returns {void}
 */
export const toggleModalClasses = (wrapper, willBeOpened = true) => {
  wrapper.classList.toggle('hidden', !willBeOpened);
  document.body.classList.toggle('modal-open', willBeOpened);
};
