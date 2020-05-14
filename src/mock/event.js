import {createStrTime} from "./../utils/common.js";
import {createStrTimeEditPoint} from "./../utils/common.js";
import {getRandomIntegerNumber} from "./../utils/common.js";

const maxPhoto = 5;
const minPhoto = 1;
export const arrOffers = [
  {
    "type": `taxi`,
    "offers": [
      {
        "title": `Upgrade to a business class`,
        "price": 120
      }, {
        "title": `Choose the radio station`,
        "price": 60
      }
    ]
  },
  {
    "type": `bus`,
    "offers": [
      {
        "title": `Add breakfast`,
        "price": 130
      }, {
        "title": `Lunch in city`,
        "price": 20
      }
    ]
  },
  {
    "type": `train`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 10
      }, {
        "title": `Book tickets`,
        "price": 80
      }
    ]
  },
  {
    "type": `ship`,
    "offers": [
      {
        "title": `Switch to comfort`,
        "price": 170
      }, {
        "title": `Rent a car`,
        "price": 30
      }
    ]
  },
  {
    "type": `transport`,
    "offers": [
      {
        "title": `Lunch in city`,
        "price": 120
      }, {
        "title": `Book tickets`,
        "price": 60
      }
    ]
  },
  {
    "type": `drive`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 140
      }, {
        "title": `Rent a car`,
        "price": 30
      }
    ]
  },
  {
    "type": `flight`,
    "offers": [
      {
        "title": `Add breakfast`,
        "price": 120
      }, {
        "title": `Add luggage`,
        "price": 10
      }
    ]
  },
  {
    "type": `check-in`,
    "offers": [
      {
        "title": `Book tickets`,
        "price": 1200
      }, {
        "title": `Switch to comfort`,
        "price": 600
      }
    ]
  },
  {
    "type": `sightseeing`,
    "offers": [
      {
        "title": `Rent a car`,
        "price": 12000
      }, {
        "title": `Add luggage `,
        "price": 6780
      }
    ]
  },
  {
    "type": `restaurant`,
    "offers": [
      {
        "title": `Lunch in city`,
        "price": 12450
      }, {
        "title": `Book tickets`,
        "price": 6012
      }
    ]
  }
];

// Генератор типа offer
export const generateOffer = (type) => {
  let result;
  arrOffers.forEach((item) => {
    if (item.type === type) {
      result = item.offers;
    }
  });
  return result;
};

// Генератор типа точек
export const generatePointType = () => {
  return [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
};

// Генератор городов
export const generateCityInfo = () => {
  return [
    {
      "name": `Valencia`,
      "desc": `Valencia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
    {
      "name": `Havana`,
      "desc": `Havana. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
    {
      "name": `Dakar`,
      "desc": `Dakar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
    {
      "name": `Geneva`,
      "desc": `Geneva. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
    {
      "name": `Zagreb`,
      "desc": `Zagreb. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
    {
      "name": `Jerusalem`,
      "desc": `Jerusalem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
    {
      "name": `Kawasaki`,
      "desc": `Kawasaki. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    },
  ];
};

// Генератор информации о маршруте
export const generateDestinationInformation = () => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(/[\.!\?]+/);
};

// Генератор времени маршрута
export const generateTime = (startTime, finishTime) => {
  return {
    startDate: startTime,
    finishDate: finishTime,
    startTime() {
      return `${createStrTime(this.startDate)}`;
    },
    finishTime() {
      return `${createStrTime(this.finishDate)}`;
    },
    elapsedTime(flag) {
      const start = Date.parse(this.startDate);
      const finish = Date.parse(this.finishDate);
      const difference = finish - start;
      const date = new Date(difference);
      return (flag) ? date.getTime() : `${date.getMinutes()}M`;
    },
    startTimeEditPoint() {
      return `${createStrTimeEditPoint(this.startDate)}`;
    },
    finishTimeEditPoint() {
      return `${createStrTimeEditPoint(this.finishDate)}`;
    },
  };
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
    <span class="event__offer-title">${item.title}</span>
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
