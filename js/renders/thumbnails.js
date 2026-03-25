import { createPictures } from '../mocks/data.js';
import { findTemplate, renderGroup } from '../utils/dom.js';
import { openPicture } from '../renders/open-picture.js';

/**@type {HTMLAnchorElement | null}*/
const thumbnailTemplate = findTemplate('picture');
const pictureContainer = document.querySelector('.pictures');
export const pictures = createPictures();

/**
 * Создаёт миниатюру фото из объекта photo
 * @param {{id: string|number, url: string, description: string, comments: any[], likes: number}} - Объект
 * с данными фото - типизирован в data.js как массив объектов PicturePost
 * @returns {HTMLAnchorElement | null} Готовая миниатюра или null, если не удалось найти шаблон
*/
const createThumbnail = ({id, url, description, likes, comments}) => {
  if (!thumbnailTemplate) {
    // eslint-disable-next-line no-console
    console.error('Шаблон не найден или некорректен');
    return null;
  }

  /** @type {HTMLAnchorElement} */
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const pictureComments = thumbnail.querySelector('.picture__comments');
  const pictureLikes = thumbnail.querySelector('.picture__likes');
  const image = thumbnail.querySelector('.picture__img');

  thumbnail.href = url;
  thumbnail.dataset.id = String(id);

  image.src = url;
  image.alt = description;

  pictureComments.textContent = comments.length;
  pictureLikes.textContent = likes;

  return thumbnail;
};

/**
 * Рендерит миниатюры фото в контейнер
 * @param {Photo[]} photos - Массив данных фото
 */
export const renderThumbnails = () => renderGroup(pictures, createThumbnail, pictureContainer);

/**
 * Обработчик клика по контейнеру с миниатюрами загруженных изображений,
 * открывает полноэкранное изображение при клике на миниатюру
 * @param {MouseEvent} evt - Событие клика мыши
 */
pictureContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openPicture(currentPicture.dataset.id);
  }
});
