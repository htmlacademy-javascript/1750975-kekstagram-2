const EFFECTS = {
  none: { min: 0, max: 100, step: 1, style: () => 'none' },
  chrome: { min: 0, max: 1, step: 0.1, style: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, style: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, style: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, style: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, style: (value) => `brightness(${value})` },
};

const uploadPictureContainer = document.querySelector('.img-upload__wrapper');
export const previewPicture = uploadPictureContainer.querySelector('.img-upload__preview img');
const effectLevelValue = uploadPictureContainer.querySelector('.effect-level__value');
const effectLevel = uploadPictureContainer.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadPictureContainer.querySelector('.effect-level__slider');

let currentEffect = 'none';

/**
 * Инициализирует слайдер noUiSlider для эффектов
 * @returns {void}
 */
const initEffectSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    previewPicture.style.filter = EFFECTS[currentEffect]?.style(effectLevelValue.value) ?? 'none';
  });
};

initEffectSlider();
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
    effectLevel.classList.remove('hidden');

    effectLevelSlider.noUiSlider.updateOptions({
      range: { min, max },
      start: max,
      step,
    });

    effectLevelValue.value = max;
    previewPicture.style.filter = style(max.toString());
  }
};
