const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;

/** @type {string} Сообщение об ошибке валидации хэштегов */
let errorMessage = '';

/**
 * Возвращает текущее сообщение об ошибке валидации хэштегов
 * @returns {string}
 */
export const error = () => errorMessage;

/**
 * Функция проверки корректности строки с хэштегами,
 * при первой найденной ошибке модифицирует переменную errorMessage
 * @param {string} value - значение поля хэштегов
 * @returns {boolean} true, если хэштеги валидны, иначе false
 */
export const isHashtagsValid = (value) => {
  errorMessage = '';
  // Хэштеги не обязательны
  if (!value || value.trim() === '') {
    return true;
  }

  const tags = value.trim().toLowerCase().split(' ').filter((tag) => tag !== '');

  const seen = new Set();
  let hasError = false;

  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      errorMessage = 'Хэштег должен начинаться с символа \'#\'';
      hasError = true;
      break;
    }

    if (tag === '#') {
      errorMessage = 'Хэштег не может состоять только из символа \'#\'';
      hasError = true;
      break;
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      errorMessage = `Превышена максимальная длина одного хэштега - ${MAX_HASHTAG_LENGTH}`;
      hasError = true;
      break;
    }

    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
      errorMessage = 'Строка после решётки должна состоять только из букв и чисел';
      hasError = true;
      break;
    }

    if (seen.has(tag)) {
      errorMessage = 'Хэштеги не должны повторяться';
      hasError = true;
      break;
    }

    seen.add(tag);
  }

  if (!hasError && tags.length > MAX_HASHTAGS) {
    errorMessage = `Превышено допустимое количество хэштегов - ${MAX_HASHTAGS}`;
    hasError = true;
  }

  return !hasError;
};
