const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const errorMessageComment = `Превышено допустимое количество символов в комментарии - ${MAX_COMMENT_LENGTH}`;

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
const validateHashtag = (value) => {
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

/**
 * Проверяет, что комментарий пустой или его длина не превышает допустимое количество символов
 * @param {string} value - значение поля комментария
 * @returns {boolean} true, если значение валидно, иначе false
 */
export const validateCommentLength = (value) => {
  if (!value) {
    return true; // комментарий не обязателен
  }
  return value.length <= MAX_COMMENT_LENGTH;
};

/**
 * Создаёт фабрику валидатора формы Pristine для загрузки изображения,
 * возвращает объект с экземпляром Pristine, функцией добавления валидаторов
 * и методом validate, который запускает валидацию всей формы
 * @template {HTMLInputElement} HashtagInput
 * @template {HTMLTextAreaElement} CommentInput
 * @param {HTMLFormElement} form - DOM‑элемент формы, который необходимо валидировать
 * @returns {{
 *   pristine: Pristine;
 *   addValidators: (hashtagInput: HashtagInput, commentInput: CommentInput) => void;
 *   reset: () => void;
 *   validate: () => boolean;
 * }}
 */
export const createValidator = (form) => {
  /**
   * Экземпляр валидатора формы Pristine
   * @type {Pristine}
   */
  const pristine = new Pristine(form, {
    classTo: 'img-upload__form',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  const addValidators = (hashtagInput, commentInput) => {
    pristine.addValidator(hashtagInput, validateHashtag, error, 1, false);
    pristine.addValidator(commentInput, validateCommentLength, errorMessageComment, 2, false);

    commentInput.addEventListener('input', () => {
      pristine.validate();
    });
  };

  const resetValidation = () => {
    pristine.reset();
    form.reset();
  };

  return {
    pristine,
    addValidators,
    resetValidation,
    validate: () => pristine.validate()
  };
};
