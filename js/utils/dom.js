/**
 * Функция поиска шаблона в HTML-разметке по ID
 * Должен содержать только один дочерний элемент
 * @param {string} id - ID шаблона
 * @returns {HTMLElement|null} Первый дочерний элемент шаблона или null если шаблон недоступен
 * * @throws {Error} Если элемент найден, но не является HTMLTemplateElement или пустой
 */
export const findTemplate = (id) => {
  const template = document.getElementById(id);

  if(!template) {
    return null;
  }

  if(!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a template: ${id}`);
  }

  const firstChild = template.content.firstElementChild;
  if (!firstChild) {
    throw new Error(`Template ${id} has no child elements`);
  }

  return firstChild;
};

/**
 * Функция рендеринга группы елементов в контейнер
 * @param {Array} items - Массив данных для рендера
 * @param {function} makeElement - Функция, создающая DOM-элемент из элемента данных
 * @param {HTMLElement} container - Контейнер для вставки созданных элементов
 * @throws {Error} Если container отсутствует или не HTMLElement
 */
export const renderGroup = (items, makeElement, container) => {
  if (!container) {
    throw new Error('Container not found');
  }

  if (!(container instanceof HTMLElement)) {
    throw new Error('Invalid container');
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(makeElement(item)));

  container.appendChild(fragment);
};
