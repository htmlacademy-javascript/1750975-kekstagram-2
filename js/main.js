import { getData } from './utils/api.js';
import { configFilter } from './renders/filters.js';
import { initUploadModal } from './loading-new-picture/loading-module.js';
import { showErrorMessage } from './utils/utils.js';
import { initEffectSlider } from './loading-new-picture/editor-effects-slider.js';

/**
 * Инициализирует приложение после загрузки данных с сервера,
 * @param {Array} picturesData - Массив фотографий с сервера
 */
const initAfterDataLoad = (picturesData) => {
  configFilter(picturesData); // ← Фильтры + первичный рендер
  initUploadModal();
  initEffectSlider();
};

/**
 * Инициализирует загрузку данных при старте приложения,
 * рендерит превью с фильтрами, настраивает модальное окно
 * @async
 * @returns {Promise<void>}
 */
const initApp = async () => {
  try {
    const picturesData = await getData(); // Загрузка реальных данных
    initAfterDataLoad(picturesData);
  } catch (error) {
    showErrorMessage(error.message);
  }
};


initApp();
