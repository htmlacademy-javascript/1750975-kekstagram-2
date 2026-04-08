import { renderThumbnails } from './renders/thumbnails.js';
import { initUploadModal } from './loading-new-picture/loading-module.js';
import { showErrorMessage } from './utils/utils.js';
import { initEffectSlider } from './loading-new-picture/editor-effects-slider.js';

/**
 * Инициализирует загрузку данных при старте приложения,
 * рендерит превью, вызывает модальное окно загрузки изображений
 * @async
 * @function initialLoading
 * @returns {Promise<void>} Промис, который завершается после инициализации
 */
const initApp = async () => {
  try {
    renderThumbnails();
    initUploadModal();
    initEffectSlider();
  } catch (error) {
    showErrorMessage(error.message);
  }
};

initApp();
