import { isEscapeKey } from './utils/dom.js';
import { error, isHashtagsValid, errorMessageComment, isValidCommentLength } from './validate-hashtags-and-comment.js';

const SCALE_STEP = 25;

const uploadPictureForm = document.querySelector('.img-upload__form');

const uploadFileControl = uploadPictureForm.querySelector('.img-upload__input');
const pictureEditorForm = uploadPictureForm.querySelector('.img-upload__overlay');
const pictureEditorResetButton = uploadPictureForm.querySelector('.img-upload__cancel');
const smallerButton = uploadPictureForm.querySelector('.scale__control--smaller');
const biggerButton = uploadPictureForm.querySelector('.scale__control--bigger');
const scaleValue = uploadPictureForm.querySelector('.scale__control--value');
const previewPicture = uploadPictureForm.querySelector('.img-upload__preview img');

const hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
const commentInput = uploadPictureForm.querySelector('.text__description');

/**
 * Текущий масштаб изображения в процентах (от 25 до 100, по умолчанию 100%)
 * @type {number}
 */
let percent = 100;

/**
 * Функция обновляет значение поля масштаба и применяет трансформацию к изображению
 * @returns {void}
 */
const updateScale = () => {
  percent = Math.max(25, Math.min(100, percent));

  scaleValue.value = `${percent}%`;

  const fraction = percent / 100;
  previewPicture.style.transform = `scale(${fraction})`;
};

/**
 * Обработчик клика на кнопку «Уменьшить» масштаб
 * @param {MouseEvent} event - событие клика по кнопке
 * @returns {void}
 */
const onSmallerButtonClick = () => {
  percent -= SCALE_STEP;
  updateScale();
};

/**
 * Обработчик клика на кнопку «Увеличить» масштаб
 * @param {MouseEvent} event - событие клика по кнопке
 * @returns {void}
 */
const onBiggerButtonClick = () => {
  percent += SCALE_STEP;
  updateScale();
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

// Валидатор хэштегов
pristine.addValidator(hashtagInput, isHashtagsValid, error, 1, false);

// Валидатор длины комментария
pristine.addValidator(commentInput, isValidCommentLength, errorMessageComment, 2, false);

/**
 * Обработчик нажатия клавиши Escape на документе,
 * если фокус находится в поле хэштегов или комментария, форма не закрывается
 * @param {KeyboardEvent} evt - событие keydown
 * @returns {void}
*/
function onEscapeKeydown (evt) {
  if (isEscapeKey(evt) && (evt.target === hashtagInput || evt.target === commentInput)) {
    evt.preventDefault();
    return;
  }

  if (isEscapeKey(evt)) {
    closePictureEditor();
  }
}

/**
 * Обработчик отправки формы загрузки изображения,
 * предотвращает стандартную отправку, запускает валидацию через Pristine,
 * при успехе нормализует хэштеги (лишние пробелы → один пробел) и отправляет форму.
 * @param {SubmitEvent} evt - событие submit формы
 * @returns {void}
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadPictureForm.submit();
  }
};

/**
 * Закрывает форму редактирования изображения
 * @returns {void}
*/
function closePictureEditor () {
  uploadPictureForm.reset();

  pictureEditorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  smallerButton.removeEventListener('click', onSmallerButtonClick);
  biggerButton.removeEventListener('click', onBiggerButtonClick);
  pictureEditorResetButton.removeEventListener('click', closePictureEditor);
  document.removeEventListener('keydown', onEscapeKeydown);
}

/**
 * Открывает форму редактирования изображения
 * @returns {void}
*/
const onUploadPictureChange = () => {
  pictureEditorForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  pictureEditorResetButton.addEventListener('click', closePictureEditor);
  document.addEventListener('keydown', onEscapeKeydown);
  uploadPictureForm.addEventListener('submit', onFormSubmit);
};

/**
 * Инициализирует модальное окно загрузки и редактирования изображения
 * @returns {void}
 */
export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', onUploadPictureChange);
};
