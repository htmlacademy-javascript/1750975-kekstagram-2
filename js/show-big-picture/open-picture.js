import { isEscapeKey } from '../utils/modal-windows.js';
import { clearComments, renderComments } from '../renders/comments.js';
import { pictures } from '../renders/thumbnails.js';

const pictureElement = document.querySelector('.big-picture');
const pictureImage = pictureElement.querySelector('.big-picture__img img');
const pictureCaption = pictureElement.querySelector('.social__caption');
const pictureLikes = pictureElement.querySelector('.likes-count');
const pictureCloseBtn = pictureElement.querySelector('.big-picture__cancel');

/**
 * Обработчик нажатия клавиши Escape на документе
 * @param {KeyboardEvent} evt - событие keydown
 * @returns {void}
 */
function onEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    closePicture();
  }
}

// Обработчик клика на кнопке закрытия модального окна
const onPictureCloseBtnClick = () => {
  closePicture();
};

/**
 * Закрывает модальное окно с полноразмерной фотографией
 * @returns {void}
 */
function closePicture () {
  clearComments();

  pictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pictureCloseBtn.removeEventListener('click', onPictureCloseBtnClick);
  document.removeEventListener('keydown', onEscapeKeydown);
}

/**
 * Открывает модальное окно с полноразмерной фотографией
 * @param {string|number} pictureId - идентификатор фотографии (как строка или число)
 * @returns {void}
 */
export const openPicture = (pictureId) => {
  clearComments();

  const currentPicture = pictures.find((picture) => picture.id === Number(pictureId));
  const {url, description, likes, comments} = currentPicture;

  pictureImage.src = url;
  pictureImage.alt = description;
  pictureCaption.textContent = description;
  pictureLikes.textContent = likes;

  renderComments(comments);

  pictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  pictureCloseBtn.addEventListener('click', onPictureCloseBtnClick);
  document.addEventListener('keydown', onEscapeKeydown);
};
