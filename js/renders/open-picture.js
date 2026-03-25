import { renderGroup, isEscapeKey } from '../utils/dom.js';
import { pictures } from './thumbnails.js';

const pictureElement = document.querySelector('.big-picture');
const pictureImage = pictureElement.querySelector('.big-picture__img img');
const pictureCaption = pictureElement.querySelector('.social__caption');
const pictureLikes = pictureElement.querySelector('.likes-count');
const pictureCloseBtn = pictureElement.querySelector('.big-picture__cancel');

const commentsContainer = pictureElement.querySelector('.social__comments');
const commentTemplate = pictureElement.querySelector('.social__comment');
const commentsCounter = pictureElement.querySelector('.social__comment-count');
const commentsLoader = pictureElement.querySelector('.comments-loader');

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

/**
 * Закрывает модальное окно с полноразмерной фотографией
 * @returns {void}
 */
function closePicture () {
  pictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pictureCloseBtn.removeEventListener('click', closePicture);
  document.removeEventListener('keydown', onEscapeKeydown);
}

/**
 * Создаёт DOM‑элемент одного комментария по данным
 * @param {Object} data - данные комментария
 * @param {string} data.avatar - URL аватарки комментатора
 * @param {string} data.message - текст комментария
 * @param {string} data.name - имя комментатора (для атрибута alt)
 * @returns {HTMLLIElement} клонированный элемент .social__comment
 */
const createPictureComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const socialUser = commentElement.querySelector('.social__picture');
  const socialUserText = commentElement.querySelector('.social__text');

  socialUser.src = avatar;
  socialUser.alt = name;
  socialUserText.textContent = message;

  return commentElement;
};

/**
 * Открывает модальное окно с полноразмерной фотографией
 * @param {string|number} pictureId - идентификатор фотографии (как строка или число)
 * @returns {void}
 */
export const openPicture = (pictureId) => {
  const currentPicture = pictures.find((picture) => picture.id === Number(pictureId));
  const {url, description, likes, comments} = currentPicture;

  pictureImage.src = url;
  pictureImage.alt = description;
  pictureCaption.textContent = description;
  pictureLikes.textContent = likes;

  commentsContainer.innerHTML = '';
  renderGroup(comments, createPictureComment, commentsContainer);

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  pictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  pictureCloseBtn.addEventListener('click', closePicture);
  document.addEventListener('keydown', onEscapeKeydown);
};
