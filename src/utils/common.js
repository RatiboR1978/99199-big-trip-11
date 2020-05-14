import {createOfferItem} from "./../components/offer-item.js";
import {generateDate} from "./../mock/day-info";

// Генератор случайного индекса массива
export const getRandomIndexArr = (arr) => {
  const max = Math.floor(arr.length - 1);
  return Math.floor(Math.random() * (max + 1));
};

// Генератор случайного числа
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Генератор массива (разная длинна, перемешивает)
export const getRandomArr = (arr, max) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const length = getRandomIntegerNumber(0, max);
  const result = [];
  for (let i = 0; i <= length; i++) {
    result.push(arr[i]);
  }
  return result;
};

// Функция вывода строки со временем
export const createStrTime = (time) => {
  const date = new Date(Date.parse(time));
  const hour = `${(date.getHours() < 10) ? String(`0` + date.getHours()) : date.getHours()}`;
  const minutes = `${(date.getMinutes() < 10) ? String(`0` + date.getMinutes()) : date.getMinutes()}`;
  return `${hour}:${minutes}`;
};

// Функция вывода строки со временем для редактирования точки
export const createStrTimeEditPoint = (time) => {
  const date = new Date(Date.parse(time));
  const year = `${date.getFullYear()}`;
  const month = `${(date.getMonth() < 10) ? String(`0` + date.getMonth()) : date.getMonth()}`;
  const day = `${(date.getDate() < 10) ? String(`0` + date.getDate()) : date.getDate()}`;
  const hour = `${(date.getHours() < 10) ? String(`0` + date.getHours()) : date.getHours()}`;
  const minutes = `${(date.getMinutes() < 10) ? String(`0` + date.getMinutes()) : date.getMinutes()}`;
  return `${year.substr(2)}/${month}/${day} ${hour}:${minutes}`;
};

// Функция создания списка опций
export const createListOffer = (arr) => {
  let result = ``;
  for (const [key, item] of arr.entries()) {
    result += createOfferItem(item.title, item.price, key, item.checked);
  }
  return result;
};

// Генерит строку даты для day-info
export const generateStrDate = (num, bul) => {
  const arrMonths = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`];
  const date = new Date(Date.parse(generateDate()[num]));
  return (bul) ? `${arrMonths[date.getMonth()]} ${date.getDate()}` : `${date.getDate() - 1}`;
};

// Функция собирает все элементы вложеных массивов в один
export const generateAllPoints = (arr) => {
  let result = [];
  arr.forEach((item) => {
    item.forEach((it) => result.push(it));
  });
  return result;
};

// Функция приведения времени к формату `2019-07-10T22:55:56.845Z`
export const createStringeTimeFormat = (str) => {
  const re = /\//gi;
  const newstr = str.replace(re, `-`);
  const arr = newstr.split(` `);
  return `20${arr[0]}T${arr[1]}Z`;
};
