/**
 * Функция для проверки длины строки
 * @param {string} string - строка, которую нужно проверить
 * @param {number} maxSymbols - максимально допустимая длина строки
 * @returns {boolean} возвращает true, если строка меньше или равна параметру максимальной длины
*/

export const isStringLengthValid = (string = '', maxSymbols = -1) => string.length <= maxSymbols;

/**
 * Функция проверки, является ли строка палиндромом
 * @param {string} string - строка, которую нужно проверить
 * @returns {boolean}
*/

export const isPalindrome = (string = '') => {
  const normalizeString = string.replace(/\s+/g, '').toLowerCase();
  if (normalizeString.length === 0) {
    return false;
  }
  return normalizeString === normalizeString.split('').reverse().join('');
};

/**
 * Функция принимает строку и извлекает содержащиеся в ней цифры от 0 до 9
 * @param {string} input - значение, которое нужно проверить
 * @returns {number} возвращает извлеченные цифры в виде целого положительного числа
*/

export const extractNumber = (input = '') => {
  const string = String(input);
  return parseInt(string.replace(/\D+/g, ''), 10);
};
