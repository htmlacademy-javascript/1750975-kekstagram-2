import { renderThumbnails } from './thumbnails.js';
import { debounce } from '../utils/utils.js';
import { FILTER, SORTFUNC, DEBOUNCE_DELAY, MAX_PICTURE_COUNT, ACTIVE_BUTTON_CLASS } from '../constants.js';

let pictures = [];
let currentFilter = FILTER.default;

const filterBox = document.querySelector('.img-filters');

/**
 * Очищает контейнер и рендерит новые фото,
 * @param filteredPictures - Отфильтрованный массив
 */
const renderWithClear = (filteredPictures) => {
  document.querySelector('.pictures').querySelectorAll('a.picture').forEach((item) => item.remove());

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
    return picturesData.toSorted(SORTFUNC.sortRandom).slice(0, MAX_PICTURE_COUNT);
  }

  if (currentFilter === FILTER.discussed) {
    return picturesData.toSorted(SORTFUNC.sortDiscussed);
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

  activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);

  targetButton.setAttribute('aria-pressed', 'true');
  activeButton.setAttribute('aria-pressed', 'false');

  currentFilter = targetButton.id;
  debounceRender(applyFilter(pictures));
};

/**
 * Инициализирует фильтры после загрузки данных с сервера,
 * @param picturesData - Массив фотографий с сервера
 */
export const initFilter = (picturesData) => {
  pictures = picturesData;
  filterBox.classList.remove('img-filters--inactive');
  filterBox.addEventListener('click', onFilterChange);

  // Первичный рендер
  debounceRender(applyFilter(pictures));
};
