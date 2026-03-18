/**
 * Функция поиска шаблона в HTML-разметке по ID
 * Должен содержать только один дочерний элемент
 * @param {string} id - ID шаблона
 * @returns {HTMLElement} Первый дочерний элемент шаблона
 */
export const findTemplate = (id) => {
  const template = document.getElementById(id);

  if(!template) {
    throw new Error(`Template not found: ${id}`);
  }

  if(!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a template: ${id}`);
  }

  return template.content.firstElementChild;
};

/**
 * Функция рендеринга группы елементов
 * @template Item
 * @param {Item[]} items - Массив элементов для рендера
 * @param {(item: Item) => HTMLElement} makeElement - Функция создания HTMLElement из элемента
 * @param {HTMLElement} container - Контейнер для вставки
 * @throws {Error} Если container не HTMLElement
 */
export const renderGroup = (items, makeElement, container) => {
  if (!(container instanceof HTMLElement)) {
    throw new Error('Invalid container');
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(makeElement(item)));
  container.appendChild(fragment);
};
