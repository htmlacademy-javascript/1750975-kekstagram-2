'Use strict';

// Функция для проверки длины строки: true, если строка меньше или равна указанной длине, false, если строка длиннее
const isStringLengthValid = (string = '', maxSymbols = 1) => string.length <= maxSymbols;

// Функция для проверки, является ли строка палиндромом
const isPalindrome = (string = '') => {
  const normalizeString = string.replace(/\s+/g, '').toLowerCase();
  if (normalizeString.length === 0) {
    return false;
  }
  return normalizeString === normalizeString.split('').reverse().join('');
}

// Функция извлекает из строки цифры и возвращает их в виде целого положительного числа
const extractNumber = (input = '') => {
  const string = String(input);
  return Math.abs(parseInt(string.replace(/\D+/g, ''), 10));
}
