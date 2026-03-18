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
 * Функция рендеринга группы елементов
 * @template Item
 * @param {Item[]} items - Массив элементов для рендера
 * @param {(item: Item) => HTMLElement} makeElement - Функция создания HTMLElement из элемента
 * @param {HTMLElement} container - Контейнер для вставки
 * @throws {Error} Если container не HTMLElement
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
