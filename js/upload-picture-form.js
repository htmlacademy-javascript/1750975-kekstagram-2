import { isEscapeKey } from './utils/dom.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const uploadPictureForm = document.querySelector('.img-upload__form');

const uploadFileControl = uploadPictureForm.querySelector('.img-upload__input');
const pictureEditorForm = uploadPictureForm.querySelector('.img-upload__overlay');
const pictureEditorResetButton = uploadPictureForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
const commentInput = uploadPictureForm.querySelector('.text__description');

/**
 * Обработчик нажатия клавиши Escape на документе,
 * если фокус находится в поле хэштегов или комментария, форма не закрывается
 * @param {KeyboardEvent} evt - событие keydown
 * @returns {void}
*/
function onEscapeKeydown (evt) {
  if (isEscapeKey(evt) && evt.target === hashtagInput || evt.target === commentInput) {
    evt.preventDefault();
    return;
  }

  if (isEscapeKey(evt)) {
    closePictureEditor();
  }
}

/**
 * Закрывает форму редактирования изображения
 * @returns {void}
*/
function closePictureEditor () {
  uploadPictureForm.reset();

  pictureEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pictureEditorResetButton.removeEventListener('click', closePictureEditor);
  document.removeEventListener('keydown', onEscapeKeydown);
}

/**
 * Открывает форму редактирования изображения
 * @returns {void}
*/
export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    pictureEditorForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  pictureEditorResetButton.addEventListener('click', closePictureEditor);
  document.addEventListener('keydown', onEscapeKeydown);
};

/**
 * Экземпляр валидатора формы Pristine
 * @type {Pristine}
 */
const pristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

/** @type {string} Сообщение об ошибке валидации хэштегов */
let errorMessage = '';

/**
 * Возвращает текущее сообщение об ошибке валидации хэштегов
 * @returns {string}
 */
const error = () => errorMessage;

/**
 * Функция проверки корректности строки с хэштегами,
 * при первой найденной ошибке модифицирует переменную errorMessage
 * @param {string} value - значение поля хэштегов
 * @returns {boolean} true, если хэштеги валидны, иначе false
 */
const isHashtagsValid = (value) => {
  errorMessage = '';
  // Хэштеги не обязательны
  if (!value || value.trim() === '') {
    return true;
  }

  const tags = value.trim().toLowerCase().split(' ').filter((tag) => tag !== '');

  const seen = new Set();
  let hasError = false;

  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      errorMessage = 'Хэштег должен начинаться с символа \'#\'';
      hasError = true;
      break;
    }

    if (tag === '#') {
      errorMessage = 'Хэштег не может состоять только из символа \'#\'';
      hasError = true;
      break;
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      errorMessage = `Превышена максимальная длина одного хэштега - ${MAX_HASHTAG_LENGTH}`;
      hasError = true;
      break;
    }

    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
      errorMessage = 'Строка после решётки должна состоять только из букв и чисел';
      hasError = true;
      break;
    }

    if (seen.has(tag)) {
      errorMessage = 'Хэштеги не должны повторяться';
      hasError = true;
      break;
    }

    seen.add(tag);
  }

  if (!hasError && tags.length > MAX_HASHTAGS) {
    errorMessage = `Превышено допустимое количество хэштегов - ${MAX_HASHTAGS}`;
    hasError = true;
  }

  return !hasError;
};

// Валидатор хэштегов
pristine.addValidator(hashtagInput, isHashtagsValid, error, 1, false);

// Валидатор длины комментария
pristine.addValidator(commentInput, (value) => {
  if(!value) {
    return true;
  }
  return value.length <= MAX_COMMENT_LENGTH;
}, `Превышено допустимое количество символов в комментарии - ${MAX_COMMENT_LENGTH}`, 1, false);

/**
 * Обработчик отправки формы загрузки изображения,
 * предотвращает стандартную отправку, запускает валидацию через Pristine,
 * при успехе нормализует хэштеги (лишние пробелы → один пробел) и отправляет форму.
 * @param {SubmitEvent} evt - событие submit формы
 * @returns {void}
 */
uploadPictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadPictureForm.submit();
  }
});
