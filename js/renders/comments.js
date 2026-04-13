import { renderGroup } from '../utils/utils.js';
import { COMMENT_COUNT_STEP } from '../constants.js';

/**
 * @typedef {Object} CommentData
 * @property {string} avatar - URL аватарки комментатора
 * @property {string} message - текст комментария
 * @property {string} name - имя комментатора
 */

let currentComments = [];
let currentCount = 0;

const pictureElement = document.querySelector('.big-picture');
const commentsContainer = pictureElement.querySelector('.social__comments');
const commentTemplate = pictureElement.querySelector('.social__comment');
const commentsShownCounter = pictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCounter = pictureElement.querySelector('.social__comment-total-count');
const commentsLoader = pictureElement.querySelector('.comments-loader');

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
 * Обработчик клика по кнопке загрузки комментариев,
 * отрисовывает следующую порцию комментариев (один шаг),
 * добавляет в DOM количество комментариев, равное COUNT_STEP,
 * обновляет счетчики и прячет кнопку загрузки, если все комментарии показаны
 * @param {MouseEvent} evt - событие клика по кнопке загрузки
 * @returns {void}
*/
const onCommentsLoaderClick = () => {
  if (currentComments.length === 0) {
    return;
  }

  const renderedComments = currentComments.slice(currentCount, currentCount + COMMENT_COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderGroup(renderedComments, createPictureComment, commentsContainer);

  commentsShownCounter.textContent = `${renderedCommentsLength}`;
  commentsTotalCounter.textContent = currentComments.length;

  if (renderedCommentsLength >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COMMENT_COUNT_STEP;
};

/**
 * Инициализирует отрисовку комментариев для текущей фотографии,
 * сбрасывает текущий счётчик, сохраняет массив комментариев,
 * отрисовывает первую порцию и навешивает обработчик на кнопку загрузки
 * @param {CommentData[]} comments - массив комментариев фотографии, типизирован выше
 * @returns {void}
 */
export const renderComments = (comments) => {
  currentComments = Array.isArray(comments) ? comments : [];
  onCommentsLoaderClick(null); // рендерим первую порцию

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

/**
 * Очищает всё состояние и DOM связанные с комментариями,
 * удаляет уже отрисованные комментарии, сбрасывает внутренние счётчики,
 * убирает обработчик с кнопки загрузки новых комментариев
 * @returns {void}
 */
export const clearComments = () => {
  currentCount = 0;
  currentComments = [];

  commentsContainer.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};
