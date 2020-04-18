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
    result += createOfferItem(item.nameOffer, item.price, key, item.checked);
  }
  return result;
};

// Генерит строку даты для day-info
export const generateStrDate = (num, bul) => {
  const arrMonths = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`];
  const date = new Date(Date.parse(generateDate()[num]));
  return (bul) ? `${arrMonths[date.getMonth()]} ${date.getDate()}` : `${date.getDate() - 1}`;
};

// Вспомогательная функциz для создания DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция позиционирования вставки элемента
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Функция рендеринга элемента
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

