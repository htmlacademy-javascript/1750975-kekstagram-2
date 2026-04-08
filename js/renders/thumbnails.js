import { findTemplate, renderGroup } from '../utils/utils.js';
import { openPicture } from '../show-big-picture/open-picture.js';

/**@type {HTMLAnchorElement | null}*/
const thumbnailTemplate = findTemplate('picture');
const pictureContainer = document.querySelector('.pictures');

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
 * Массив загруженных фотографий
 * @type {Array}
 */
export const pictures = [];

/**
 * Рендерит миниатюры в контейнер, очищает перед рендером
 * @param {Array} photos - Массив данных фото
 */
export const renderThumbnails = (photos = pictures) => {
  pictures.push(...photos);
  return renderGroup(photos, createThumbnail, pictureContainer);
};

/**
 * Обработчик клика по контейнеру с миниатюрами загруженных изображений,
 * открывает полноэкранное изображение при клике на миниатюру
 * @param {MouseEvent} evt - Событие клика мыши
 */
pictureContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('a.picture');

  if (picture) {
    evt.preventDefault();
    openPicture(picture.dataset.id);
  }
});
