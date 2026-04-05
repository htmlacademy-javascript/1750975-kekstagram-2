import { createIdGenerator } from '../utils/utils.js';
import { getRandomInt, getRandomArrayElement } from '../utils/random-values.js';
import { NAMES, DESCRIPTIONS, MESSAGES } from './constants.js';

/**
 * @typedef {Object} Comment
 * @property {number} id - Уникальный идентификатор комментария, сгенерированный функцией generateCommentId().
 * @property {string} avatar - Путь к изображению аватара в формате photos/NN.jpg, где NN - случайное число от INITIAL_NUMBER_AVATAR до FINAL_NUMBER_AVATAR.
 * @property {string} message - Текст комментария, выбранный случайно из массива MESSAGES.
 * @property {string} name - Имя автора комментария, выбранное случайно из массива NAMES.
 */
/**
 * @typedef {Object} PicturePost
 * @property {number} id - Уникальный идентификатор описания, сгенерированный функцией generatePictureId().
 * @property {string} url - URL пути к изображению в формате photos/NN.jpg, где NN соответствует id.
 * @property {string} description - Описание фотографии, выбранное случайно из массива DESCRIPTIONS.
 * @property {number} likes - Количество лайков, случайное число от MIN_LIKES до MAX_LIKES включительно.
 * @property {Comment[]} comments - Вложенный массив комментариев к фотографии. Типизирован выше как массив объектов Comment.
 */

const INITIAL_NUMBER_AVATAR = 1;
const FINAL_NUMBER_AVATAR = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const SIMILAR_PICTURE_COUNT = 25;

export const generatePictureId = createIdGenerator(1);
export const generateCommentId = createIdGenerator(1);

/**
 * Создает новый комментарий со случайными данными.
 * @returns {Comment} Объект комментария.
 */
export const createComment = () => ({
  id: generateCommentId(),
  avatar: `photos/${getRandomInt(INITIAL_NUMBER_AVATAR, FINAL_NUMBER_AVATAR)}.jpg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

/**
 * Генерирует описание фотографии, опубликованной пользователем.
 * @returns {PicturePost} Объект описания изображения.
 */
export const generatePicturePost = () => {
  const pictureId = generatePictureId();
  return {id: pictureId,
    url: `photos/${pictureId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInt(MIN_COMMENTS, MAX_COMMENTS)}, createComment)
  };
};

/**
 * Массив объектов описания фотографий.
 * Создается с помощью Array.from, где:
 * - длина массива равна константе SIMILAR_PICTURE_COUNT
 * - каждый элемент генерируется функцией generatePicturePost()
 * @type {PicturePost[]} - типизирован выше как массив объектов PicturePost.
 * @constant - Неизменяемая константа.
 */
export const createPictures = () => Array.from({length: SIMILAR_PICTURE_COUNT}, generatePicturePost);
