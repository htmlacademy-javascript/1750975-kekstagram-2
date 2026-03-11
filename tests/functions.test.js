import { describe, it, expect } from 'vitest';
import { isStringLengthValid, isPalindrome, extractNumber, parseTime, isMeetingInWorkingHours } from '../js/functions';

describe('Does the isStringLengthValid function check for a valid maximum length', () => {
  it('A string of multiple characters, with a length parameter greater than the number of characters', () => {
    expect(isStringLengthValid('проверяемая строка', 20)).toBe(true);
  });
  it('A string of multiple characters, with a length parameter equal to the number of characters', () => {
    expect(isStringLengthValid('проверяемая строка', 18)).toBe(true);
  });
  it('A string of several characters, with a length parameter that is less than the number of characters', () => {
    expect(isStringLengthValid('проверяемая строка', 10)).toBe(false);
  });
  it('An empty string is received', () => {
    expect(isStringLengthValid('')).toBe(false);
  });
});

describe('Does the isPalindrome function check if a string is a palindrome', () => {
  it('A string of several characters is a palindrome', () => {
    expect(isPalindrome('топот')).toBe(true);
  });
  it('A string of several words is a palindrome', () => {
    expect(isPalindrome('Лёша на полке клопа нашёл')).toBe(true);
  });
  it('A string of several words is a palindrome, and spaces at the beginning of the string are ignored', () => {
    expect(isPalindrome('  Лёша на полке клопа нашёл')).toBe(true);
  });
  it('A string of multiple characters in different cases is a palindrome', () => {
    expect(isPalindrome('ДовОд')).toBe(true);
  });
  it('A string of several words is not a palindrome', () => {
    expect(isPalindrome('Это не палиндром')).toBe(false);
  });
});

describe('Does the extractNumber function extract numbers from a string and return them as a positive integer', () => {
  it('Received a string with numbers', () => {
    expect(extractNumber('2023 год')).toBe(2023);
  });
  it('A string with numbers and spaces at the beginning is received', () => {
    expect(extractNumber(' ECMAScript 2022')).toBe(2022);
  });
  it('A string with fractional numbers is obtained', () => {
    expect(extractNumber('1 кефир, 0.5 батона')).toBe(105);
  });
  it('A string with leading zeros before the number is received', () => {
    expect(extractNumber('агент 007')).toBe(7);
  });
  it('Received a string without numbers', () => {
    expect(extractNumber('а я томат')).toBeNaN();
  });
  it('An empty string is received', () => {
    expect(extractNumber('')).toBeNaN();
  });
  it('A string containing only spaces was received', () => {
    expect(extractNumber('  ')).toBeNaN();
  });
  it('The number is received as an argument', () => {
    expect(extractNumber(2023)).toBe(2023);
  });
  it('Zero is received as an argument', () => {
    expect(extractNumber(0)).toBe(0);
  });
  it('A negative number is received as an argument', () => {
    expect(extractNumber(-1)).toBe(1);
  });
  it('A fractional number is received as an argument', () => {
    expect(extractNumber(1.5)).toBe(15);
  });
  it('A negative fractional number is taken as an argument', () => {
    expect(extractNumber(-10.5)).toBe(105);
  });
});

describe('Should the parseTime function ', () => {
  it('when the standard time format is in the argument', () => {
    // GIVEN: корректное время
    const input = '08:05';

    // WHEN: вызов функции
    const result = parseTime(input);

    // THEN: возвращает минуты
    expect(result).toBe(8 * 60 + 5);
  });

  it('when the time format has no leading zeros in the argument', () => {
    // GIVEN: форматы без ведущих нулей
    const inputs = ['8:5', '08:5', '9:0'];

    // WHEN & THEN
    expect(parseTime(inputs[0])).toBe(8 * 60 + 5);
    expect(parseTime(inputs[1])).toBe(8 * 60 + 5);
    expect(parseTime(inputs[2])).toBe(9 * 60 + 0);
  });

  it('when the time format in the argument is incorrect', () => {
    // GIVEN: некорректные строки
    const invalid = ['abc', '25:00', '9:60', '9', '09:xx'];

    // WHEN & THEN
    invalid.forEach((el) => expect(parseTime(el)).toBe(-1));
  });
});

describe('Should the isMeetingInWorkingHours function check whether the meeting time is within the working day', () => {
  it('when is the meeting during business hours', () => {
    // GIVEN: стандартный день 9-18, встреча c 10:00 на 30 мин

    // WHEN & THEN
    expect(isMeetingInWorkingHours('09:00', '18:00', '10:00', 30)).toBe(true);
  });

  it('when the time format in the argument is incorrect', () => {
    // GIVEN: некорректный формат

    // WHEN & THEN
    expect(isMeetingInWorkingHours('abc', '18:00', '10:00', 30)).toBe(false);
  });

  it('when are the boundary cases', () => {
    // GIVEN: встреча за пределами рабочего дня, форматы без ведущих нулей

    // WHEN & THEN
    expect(isMeetingInWorkingHours('09:00', '18:00', '17:45', 20)).toBe(false);
    expect(isMeetingInWorkingHours('8:5', '17:30', '8:05', 60)).toBe(true);
    expect(isMeetingInWorkingHours('09:00', '18:00', '18:00', 0)).toBe(true);
  });
});
