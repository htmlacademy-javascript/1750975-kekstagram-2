import { EFFECTS, SCALE_STEP } from '../constants.js';

const uploadPictureContainer = document.querySelector('.img-upload__wrapper');
const previewPicture = uploadPictureContainer.querySelector('.img-upload__preview img');
const smallerButton = uploadPictureContainer.querySelector('.scale__control--smaller');
const biggerButton = uploadPictureContainer.querySelector('.scale__control--bigger');
const scaleValue = uploadPictureContainer.querySelector('.scale__control--value');
const uploadPictureControl = uploadPictureContainer.querySelector('.img-upload__input ');
const effectLevelValue = uploadPictureContainer.querySelector('.effect-level__value');
const effectLevel = uploadPictureContainer.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadPictureContainer.querySelector('.effect-level__slider');

let currentEffect = 'none';

/**
 * Текущий масштаб изображения в процентах (от 25 до 100, по умолчанию 100%)
 * @type {number}
 */
let percent = 100;

/**
 * Функция обновляет значение поля масштаба и применяет трансформацию к изображению
 * @returns {void}
 */
const updateScale = () => {
  percent = Math.max(25, Math.min(100, percent));

  scaleValue.value = `${percent}%`;

  const fraction = percent / 100;
  previewPicture.style.transform = `scale(${fraction})`;
};

/**
 * Обработчик клика на кнопку «Уменьшить» масштаб
 * @param {MouseEvent} event - событие клика по кнопке
 * @returns {void}
 */
const onSmallerButtonClick = () => {
  percent -= SCALE_STEP;
  updateScale();
};

/**
 * Обработчик клика на кнопку «Увеличить» масштаб
 * @param {MouseEvent} event - событие клика по кнопке
 * @returns {void}
 */
const onBiggerButtonClick = () => {
  percent += SCALE_STEP;
  updateScale();
};

/**
 * Инициализирует обработчики кнопок масштабирования
 * @returns {void}
 */
export const initScale = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
};

/**
 * Сбрасывает обработчики кнопок масштабирования
 * @returns {void}
 */
export const resetScale = () => {
  previewPicture.style.transform = 'scale(1)';
  percent = 100;
  scaleValue.value = '100%';
  uploadPictureControl.value = '';

  smallerButton.removeEventListener('click', onSmallerButtonClick);
  biggerButton.removeEventListener('click', onBiggerButtonClick);
};

/**
 * Инициализирует слайдер noUiSlider для эффектов
 * @returns {void}
 */
export const initEffectSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = String(Number(effectLevelSlider.noUiSlider.get()));
    previewPicture.style.filter = EFFECTS[currentEffect]?.style(effectLevelValue.value) ?? 'none';
  });
};

effectLevel.classList.add('hidden'); // По умолчанию скрыт

/**
 * Обработчик изменения эффекта фильтра,
 * скрывает/показывает слайдер, обновляет его опции и применяет эффект
 * @param {Event} evt - Событие change от радиокнопки
 * @returns {void}
 */
export const onEffectChange = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    previewPicture.style.filter = 'none';
  } else {
    const { min, max, step, style } = EFFECTS[currentEffect];

    effectLevelSlider.noUiSlider.updateOptions({
      range: { min, max },
      start: max,
      step,
    });

    effectLevelValue.value = max;
    effectLevel.classList.remove('hidden');
    previewPicture.style.filter = style(max.toString());
  }
};

/**
 * Сбрасывает состояние слайдера эффекта
 * @returns {void}
 */
export const resetSlider = () => {
  effectLevel.classList.add('hidden');
  previewPicture.className = 'img-upload__preview effects__preview--none';

  previewPicture.style.filter = '';
  effectLevelValue.value = 0;
};
