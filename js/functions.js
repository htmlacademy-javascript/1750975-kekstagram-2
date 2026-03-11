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

/**
 * Парсит строку времени в минуты
 * @param {string} timeStr - Время в формате чч:мм (8:5, 10:30).
 * @returns {number} Минуты или -1 при ошибке.
 */
export const parseTime = (timeStr) => {
  const parts = timeStr.split(':');
  if (parts.length !== 2) {
    return -1;
  }

  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);

  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
    return -1;
  }

  return h * 60 + m;
};

/**
 * Функция, проверяющая укладывается ли встреча в рабочий день
 * @param {string} startWork - Начало рабочего дня (например, "08:00", "8:5").
 * @param {string} endWork - Конец рабочего дня (например, "18:00", "17:30").
 * @param {string} startMeeting - Начало встречи (например, "14:00", "8:0").
 * @param {number} durationMeeting - Продолжительность встречи в минутах.
 * @returns {boolean} true, если встреча полностью в пределах рабочего дня.
 */

export const isMeetingInWorkingHours = (startWork, endWork, startMeeting, durationMeeting) => {
  const startWorkMin = parseTime(startWork);
  const endWorkMin = parseTime(endWork);
  const startMeetingMin = parseTime(startMeeting);

  if (startWorkMin === -1 || endWorkMin === -1 || startMeetingMin === -1) {
    return false;
  }

  const endMeetingMin = startMeetingMin + durationMeeting;
  return startWorkMin <= startMeetingMin && endMeetingMin <= endWorkMin;
};
