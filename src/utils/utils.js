import {createOfferItem} from "./../components/offer-item.js";

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

