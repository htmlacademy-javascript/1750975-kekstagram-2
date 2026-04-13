import { sendData } from '../utils/api.js';
import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { findTemplate, showErrorMessage } from '../utils/utils.js';
import { appendNotification } from '../utils/notification-module.js';
import { initScale, onEffectChange, resetScale, resetSlider } from './editor-effects-slider.js';
import { createValidator } from './form-validation.js';

const submitButtonText = { IDLE: 'Опубликовать', SENDING: 'Публикую...', };
const form = document.querySelector('.img-upload__form');
const editingModal = form.querySelector('.img-upload__overlay');
const editingModalResetButton = form.querySelector('.img-upload__cancel');
const formSubmitButton = form.querySelector('.img-upload__submit');
const effectsList = form.querySelector('.effects__list');
const uploadFileControl = form.querySelector('.img-upload__input');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const successTemplate = findTemplate('success');
const errorTemplate = findTemplate('error');

const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/avif',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/x-icon'
];

let validator = null;

// Сохраняем исходное состояние preview или null, если изначально пусто
const originalPreviewSrc = previewImage.src || null;

// Обработчик изменения эффекта на списке эффектов
effectsList.addEventListener('change', onEffectChange);

/**
 * Блокирует кнопку отправки и меняет текст
 * @param {string} text - Текст кнопки
*/
const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

/**
 * Разблокирует кнопку отправки и меняет текст
 * @param {string} text - Текст кнопки
*/
const enableButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;
};

/**
 * Проверяет фокус на текстовых полях формы
 * @returns {boolean} true если фокус на полях хэштегов или описания
 */
const isOnTextInputs = () => [hashtagInput, commentInput].includes(document.activeElement);

/**
 * Обработчик нажатия клавиши Escape на документе,
 * если фокус находится в поле хэштегов или комментария, форма не закрывается
 * @param {KeyboardEvent} evt - событие keydown
 * @returns {void}
*/
function onEscapeKeydown (evt) {
  if (!isEscapeKey(evt)) {
    return;
  }

  if (!isOnTextInputs()) {
    evt.preventDefault();
    closePictureEditor();
  }
}

/**
 * Сбрасывает blob-URL и превью эффектов для изображения
 * @returns {void}
 */
const resetImagePreview = () => {
  if (!previewImage) {
    return;
  }

  if (previewImage.src && previewImage.src.startsWith('blob:')) {
    URL.revokeObjectURL(previewImage.src);
  }

  previewImage.src = originalPreviewSrc || '';

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = '';
  });
};

/**
 * Полностью сбрасывает состояние формы редактирования изображения,
 * включая изображение и превью эффектов
 * @returns {void}
 */
const resetFormState = () => {
  resetScale();
  resetSlider();

  if (validator) {
    validator.resetValidation();
  } else {
    form.reset();
  }

  resetImagePreview();
};

/**
 * Обработчик сброса формы - закрывает модальное окно редактирования,
 * убирает остатки загруженного изображения
 */
form.addEventListener('reset', () => {
  toggleModalClasses(editingModal, false);
  document.removeEventListener('keydown', onEscapeKeydown);

  resetImagePreview();
});

/**
 * Отправляет данные формы на сервер
 * @async
 * @param {HTMLFormElement} formElement - Форма для отправки
 * @returns {Promise<void>}
*/
const sendFormData = async (formElement) => {
  const isValid = validator.validate();

  if (!isValid) {
    return;
  }

  const normalizeHashtags = (value) => {
    const clean = value.trim();
    return clean === '' ? '' : clean.replaceAll(/\s+/g, ' ');
  };
  hashtagInput.value = normalizeHashtags(hashtagInput.value);

  disabledButton(submitButtonText.SENDING);

  try {
    await sendData(new FormData(formElement));
    appendNotification(successTemplate, () => resetFormState());
  } catch (error) {
    appendNotification(errorTemplate);
  } finally {
    enableButton(submitButtonText.IDLE);
  }
};

/**
 * Обработчик отправки формы
 * @param {SubmitEvent} evt - Событие отправки формы
*/
const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

/**
 * Обработчик клика по кнопке закрытия модального окна редактирования изображения
 * @param {MouseEvent} evt - событие клика
 * @returns {void}
 */
function onEditingModalResetButtonClick(evt) {
  evt.preventDefault();
  closePictureEditor();
}

/**
 * Закрывает форму редактирования изображения
 * @returns {void}
*/
function closePictureEditor () {
  toggleModalClasses(editingModal, false);
  resetFormState();

  editingModalResetButton.removeEventListener('click', onEditingModalResetButtonClick);
  document.removeEventListener('keydown', onEscapeKeydown);
}

/**
 * Обработчик выбора файла - открывает модальное окно редактирования изображения
 * @returns {void}
 */
const onUploadPictureChange = () => {
  const file = uploadFileControl.files[0];

  if (!file) {
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    showErrorMessage('Можно загружать только изображения');
    uploadFileControl.value = '';
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  if (previewImage) {
    if (previewImage.src && previewImage.src.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage.src);
    }

    previewImage.src = imageUrl;

    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${imageUrl})`;
    });
  }

  toggleModalClasses(editingModal, true);
  initScale();

  editingModalResetButton.addEventListener('click', onEditingModalResetButtonClick);
  document.addEventListener('keydown', onEscapeKeydown);
};

/**
 * Инициализирует модальное окно загрузки и редактирования изображения
 * @returns {void}
*/
export const initUploadModal = () => {
  validator = createValidator(form);
  validator.addValidators(hashtagInput, commentInput);

  form.addEventListener('submit', onFormSubmit);
  uploadFileControl.addEventListener('change', onUploadPictureChange);
};
