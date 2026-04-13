import { getData } from './utils/api.js';
import { initFilter } from './renders/filters.js';
import { initUploadModal } from './loading-new-picture/loading-module.js';
import { showErrorMessage } from './utils/utils.js';
import { initEffectSlider } from './loading-new-picture/editor-effects-slider.js';

/**
 * Инициализирует загрузку данных при старте приложения,
 * рендерит превью с фильтрами, настраивает модальное окно
 * @async
 * @returns {Promise<void>}
*/
const initApp = async () => {
  try {
    initUploadModal();
    initEffectSlider();
    const picturesData = await getData(); // Загрузка реальных данных
    initFilter(picturesData); // ← Фильтры + первичный рендер
  } catch (error) {
    showErrorMessage(error.message);
  }
};

initApp();
