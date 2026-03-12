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
 * Парсит строку времени в объект { hours, minutes }
 * функция *не гарантирует* валидность, а лишь парсит первые две части
 * @param {string} timeStr - Время в формате чч:мм (8:5, 10:30).
 * @returns {hours: number, minutes: number} Объект с часами и минутами, могут быть NaN/undefined
 */
export const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
};

/**
 * Проверяет, является ли объект с часами и минутами корректным
 * @param {hours: number, minutes: number} timeObj - Объект с ключами `hours` и `minutes`
 * @returns {boolean} `true`, если объект существует и значения в допустимых диапазонах
 */
export const isValidTimeObject = (timeObj) => {
  if (!timeObj || typeof timeObj !== 'object') {
    return false;
  }
  const { hours, minutes } = timeObj;
  return (
    Number.isInteger(hours) && hours >= 0 && hours <= 23 &&
    Number.isInteger(minutes) && minutes >= 0 && minutes <= 59
  );
};

/**
 * Переводит объект времени в минуты от начала суток
 * функция не валидирует, что hours и minutes числа
 * @param {{hours: number, minutes: number}} timeObj - Объект с ключами `hours` и `minutes`
 * @returns {number} Количество минут от 00:00, при некорректных аргументах вернётся NaN
 */
export const toMinutes = ({ hours, minutes }) => hours * 60 + minutes;

/**
 * Функция, проверяющая укладывается ли встреча в рабочий день
 * @param {string} workStart - Начало рабочего дня (например, "08:00", "8:5")
 * @param {string} workEnd - Конец рабочего дня (например, "18:00", "17:30")
 * @param {string} meetingStart - Начало встречи (например, "14:00", "8:0")
 * @param {number} meetingDuration - Продолжительность встречи в минутах
 * @returns {boolean} true, если встреча полностью в пределах рабочего дня
 */

export const isMeetingInWorkingHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartTime = parseTime(workStart);
  const workEndTime = parseTime(workEnd);
  const meetingStartTime = parseTime(meetingStart);

  if (!isValidTimeObject(workStartTime) ||
      !isValidTimeObject(workEndTime) ||
      !isValidTimeObject(meetingStartTime)
  ) {
    return null;
  }

  const workStartMinutes = toMinutes(workStartTime);
  const workEndMinutes = toMinutes(workEndTime);
  const meetingStartMinutes = toMinutes(meetingStartTime);
  const meetingDurationMinutes = meetingStartMinutes + meetingDuration;

  if ((workEndMinutes < workStartMinutes) || (meetingDuration < 0)) {
    return null;
  }
  return (workStartMinutes <= meetingStartMinutes) && (meetingDurationMinutes <= workEndMinutes);
};
