import { describe, it, expect } from 'vitest';
import { isStringLengthValid, isPalindrome, extractNumber, parseTime, isValidTimeObject, toMinutes, isMeetingInWorkingHours } from '../js/functions';

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

describe('Should the parseTime function return an object of numbers from a time string', () => {
  it('when the standard time format is in the argument', () => {
    expect(parseTime('14:34')).toEqual({ hours: 14, minutes: 34 });
  });

  it('when invalid time values are specified in the argument', () => {
    const inputs = ['', '1234', '10:ab', '7:33:4a'];
    expect(parseTime(inputs[0])).toEqual({ hours: 0, minutes: undefined });
    expect(parseTime(inputs[1])).toEqual({ hours: 1234, minutes: undefined });
    expect(parseTime(inputs[2])).toEqual({ hours: 10, minutes: NaN });
    expect(parseTime(inputs[3])).toEqual({ hours: 7, minutes: 33 });
  });

  it('when are the boundary cases', () => {
    const inputs = ['09:00:05', '8:5', ' 08 : 5'];
    expect(parseTime(inputs[0])).toEqual({ hours: 9, minutes: 0 });
    expect(parseTime(inputs[1])).toEqual({ hours: 8, minutes: 5 });
    expect(parseTime(inputs[2])).toEqual({ hours: 8, minutes: 5 });
  });
});

describe('Should the isValidTimeObject function check whether an object with hours and minutes is valid', () => {
  it('when valid values are accepted', () => {
    expect(isValidTimeObject({ hours: 8, minutes: 30 })).toBe(true);
    expect(isValidTimeObject({ hours: 23, minutes: 59 })).toBe(true);
  });

  it('when invalid values are accepted', () => {
    expect(isValidTimeObject({})).toBe(false);
    expect(isValidTimeObject({ hours: 0, minutes: undefined })).toBe(false);
    expect(isValidTimeObject({ hours: NaN, minutes: 10 })).toBe(false);
    expect(isValidTimeObject({ hours: 8 })).toBe(false);
    expect(isValidTimeObject({ hours: 8, minutes: 30.5 })).toBe(false);
    expect(isValidTimeObject('8:30')).toBe(false);
    expect(isValidTimeObject(null)).toBe(false);
  });

  it('when are the boundary cases', () => {
    expect(isValidTimeObject({ hours: 24, minutes: 0 })).toBe(false);
    expect(isValidTimeObject({ hours: 8, minutes: 60 })).toBe(false);
    expect(isValidTimeObject({ hours: 0, minutes: 0 })).toBe(true);
  });
});

describe('Should the toMinutes function return time in minutes', () => {
  it('when the standard time format is in the argument', () => {
    expect(toMinutes({ hours: 8, minutes: 15 })).toBe(495);
  });

  it('when the time format in the argument is incorrect', () => {
    expect(toMinutes({})).toBeNaN();
    expect(toMinutes({ hours: 8 })).toBeNaN();
    expect(toMinutes({ hourse: undefined, minutes: 30 })).toBeNaN();
    expect(toMinutes('8:30')).toBeNaN();
    expect(toMinutes([8, 30])).toBeNaN();
  });

  it('when are the boundary cases', () => {
    expect(toMinutes({ hours: 0, minutes: 0 })).toBe(0);
    expect(toMinutes({ hours: 23, minutes: 59 })).toBe(1439);
  });
});

describe('Should the isMeetingInWorkingHours function check whether the meeting time is within the working day', () => {
  it('when is the meeting during business hours', () => {
    expect(isMeetingInWorkingHours('09:00', '18:00', '10:00', 30)).toBe(true);
  });

  it('when the time format in the argument is incorrect', () => {
    expect(isMeetingInWorkingHours('18:00', '09:00', '10:00', 30)).toBe(null);
    expect(isMeetingInWorkingHours('abc', '18:00', '10:00', 30)).toBe(null);
    expect(isMeetingInWorkingHours('10:00', '11:00', '10:00', -10)).toBe(null);
  });

  it('when are the boundary cases', () => {
    expect(isMeetingInWorkingHours('9:00', '18:00', '8:45', 20)).toBe(false);
    expect(isMeetingInWorkingHours('09:00', '18:00', '17:45', 20)).toBe(false);
    expect(isMeetingInWorkingHours('09:00', '18:00', '18:00', 0)).toBe(true);
    expect(isMeetingInWorkingHours('8:5', '17:30', '8:05', 60)).toBe(true);
  });
});
