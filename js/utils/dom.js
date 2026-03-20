/**
 * Функция поиска шаблона в HTML-разметке по ID
 * Должен содержать только один дочерний элемент
 * @param {string} id - ID шаблона
 * @returns {HTMLElement|null} Первый дочерний элемент шаблона или null,
 *  если шаблон недоступен или некорректен
 */
export const findTemplate = (id) => {
  const template = document.getElementById(id);

  if(!template || !(template instanceof HTMLTemplateElement)) {
    return null;
  }

  const firstChild = template.content.firstElementChild;

  if (!firstChild) {
    return null;
  }

  return firstChild;
};

/**
 * Функция рендеринга группы елементов в контейнер
 * @param {Array} items - Массив данных для рендера
 * @param {function} makeElement - Функция, создающая DOM-элемент из элемента данных
 * @param {HTMLElement} container - Контейнер для вставки созданных элементов
 * @returns {HTMLElement|null} Заполненный элементами контейнер или null,
 *  если контейнер не найден
 */
export const renderGroup = (items, makeElement, container) => {
  if (!container) {
    // eslint-disable-next-line no-console
    console.error('Контейнер не найден');
    return null;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = makeElement(item);
    if (element !== null) {
      fragment.appendChild(element);
    }
  });

  container.appendChild(fragment);
};
