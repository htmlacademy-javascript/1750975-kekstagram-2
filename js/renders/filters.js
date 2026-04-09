import { renderThumbnails } from './thumbnails.js';
import { debounce } from '../utils/utils.js';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const DEBOUNCE_DELAY = 500;
const MAX_PICTURE_COUNT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

let pictures = [];
let currentFilter = FILTER.default;

const filterBox = document.querySelector('.img-filters');

/**
 * Очищает контейнер и рендерит новые фото,
 * @param filteredPictures - Отфильтрованный массив
 */
const renderWithClear = (filteredPictures) => {
  const pictureContainer = document.querySelector('.pictures');
  pictureContainer.querySelectorAll('a.picture').forEach((item) => item.remove());
  renderThumbnails(filteredPictures);
};

// Debounced-версия renderWithClear: рендерит миниатюры не чаще, чем раз в 500мс
const debounceRender = debounce(renderWithClear, DEBOUNCE_DELAY);

/**
 * Применяет активный фильтр к фотографиям,
 * @param picturesData - Исходный массив
 * @returns Отфильтрованный массив
 */
const applyFilter = (picturesData) => {
  if (currentFilter === FILTER.random) {
    return picturesData.toSorted(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
  }

  if (currentFilter === FILTER.discussed) {
    return picturesData.toSorted(SORTFUNC.discussed);
  }

  return picturesData;
};

/**
 * Обработчик клика по фильтрам,
 * @param evt - MouseEvent
 */
const onFilterChange = (evt) => {
  const targetButton = evt.target;
  if (!targetButton.matches('button')) {
    return;
  }

  const activeButton = filterBox.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButton === targetButton) {
    return;
  }

  activeButton?.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);

  targetButton.setAttribute('aria-pressed', 'true');
  activeButton?.setAttribute('aria-pressed', 'false');

  currentFilter = targetButton.id;
  debounceRender(applyFilter(pictures));
};

/**
 * Инициализирует фильтры после загрузки данных с сервера,
 * @param picturesData - Массив фотографий с сервера
 */
export const configFilter = (picturesData) => {
  pictures = picturesData;
  filterBox?.classList.remove('img-filters--inactive');
  filterBox?.addEventListener('click', onFilterChange);

  // Первичный рендер
  debounceRender(applyFilter(pictures));
};
