import {findTemplate, renderGroup} from './utils/dom.js';

/** @type {HTMLAnchorElement} */
const pictureTemplate = findTemplate('picture');
const pictureContainer = document.querySelector('.pictures');

/**
 * Создаёт миниатюру фото из объекта photo
 * @param {{id: string|number, url: string, description: string, comments: any[], likes: number}} - Объект
 * с данными фото - типизирован в data.js как массив объектов PicturePost
 * @returns {HTMLAnchorElement} Готовая миниатюра
 * @throws {Error} Если шаблон или контейнер недоступны
 */
const createThumbnail = ({id, url, description, likes, comments}) => {
  if (!pictureTemplate) {
    throw new Error('Picture template not found');
  }

  /** @type {HTMLAnchorElement} */
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.href = url;
  thumbnail.dataset.id = String(id);

  const image = thumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

/**
 * Рендерит миниатюры фото в контейнер.
 * @param {Photo[]} photos - Массив данных фото.
 * @throws {Error} Если контейнер недоступен.
 */
export const renderThumbnails = (photos) => renderGroup(photos, createThumbnail, pictureContainer);
