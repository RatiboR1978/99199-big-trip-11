import {createStrTime} from "./../utils/common.js";
import {createStrTimeEditPoint} from "./../utils/common.js";
import {getRandomIntegerNumber} from "./../utils/common.js";

const maxPhoto = 5;
const minPhoto = 1;

// Генератор типа точек
export const generatePointType = () => {
  return [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];
};

// Генератор городов
export const generateCity = () => {
  return [`Valencia`, `Havana`, `Dakar`, `Geneva`, `Zagreb`, `Jerusalem`, `Kawasaki`];
};

// Генератор дополнительных опций
export const generateOffer = () => {
  return [
    {
      nameOffer: `Rent a car`,
      price: 200,
      checked: (Math.random() > 0.5) ? `checked` : ``
    },
    {
      nameOffer: `Book tickets`,
      price: 40,
      checked: (Math.random() > 0.5) ? `checked` : ``
    },
    {
      nameOffer: `Lunch in city`,
      price: 30,
      checked: (Math.random() > 0.5) ? `checked` : ``
    },
    {
      nameOffer: `Add luggage`,
      price: 50,
      checked: (Math.random() > 0.5) ? `checked` : ``
    },
    {
      nameOffer: `Switch to comfort`,
      price: 80,
      checked: (Math.random() > 0.5) ? `checked` : ``
    },
    {
      nameOffer: `Add breakfast`,
      price: 50,
      checked: (Math.random() > 0.5) ? `checked` : ``
    }
  ];
};

// Генератор информации о маршруте
export const generateDestinationInformation = () => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(/[\.!\?]+/);
};

// Генератор времени маршрута

export const generateTime = () => {
  return [{
    startDate: `2019-03-18T10:30`,
    finishDate: `2019-03-18T11:00`,
    startTime() {
      return `${createStrTime(this.startDate)}`;
    },
    finishTime() {
      return `${createStrTime(this.finishDate)}`;
    },
    elapsedTime() {
      const start = Date.parse(this.startDate);
      const finish = Date.parse(this.finishDate);
      const difference = finish - start;
      const date = new Date(difference);
      return `${date.getMinutes()}M`;
    },
    startTimeEditPoint() {
      return `${createStrTimeEditPoint(this.startDate)}`;
    },
    finishTimeEditPoint() {
      return `${createStrTimeEditPoint(this.finishDate)}`;
    },
  }];
};

// Генерит общую цену
export const price = (arr) => {
  let sum = 0;
  for (const item of arr) {
    sum += item.price;
  }
  return sum;
};

// Генерит доп.опции
export const createOffers = (arr) => {
  let str = ``;
  for (const item of arr) {
    str += `<li class="event__offer">
    <span class="event__offer-title">${item.nameOffer}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
   </li>`;
  }
  return str;
};

// Генерит фото

export const generatePhoto = () => {
  let max = getRandomIntegerNumber(minPhoto, maxPhoto);
  let result = ``;

  for (let i = 0; i < max; i++) {
    result += `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`;
  }
  return result;
};
