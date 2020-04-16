import {createTripInfo} from "./components/info.js";
import {createTripControls} from "./components/controls.js";
import {createTripFilters} from "./components/filters.js";
import {createTripSort} from "./components/sorting.js";
import {createTripEvent} from "./components/event.js";
import {createTripEventEdit} from "./components/event-edit.js";
import {createDayInfo} from "./components/day-info.js";
import {createWayPoint} from "./components/event.js";
import {getRandomIntegerNumber} from "./../src/utils/utils.js";
import {createDataInfo} from "./components/info.js";

const NUMBER_POINTS = 5;
const MIN_DAY = 1;
const MAX_DAY = 5;
let arrStartNamePoint = [];
let sumPrice = 0;


// Создает массив с объектами данных точек
const createPoints = () => {
  const arr = [];
  for (let i = 0; i < NUMBER_POINTS; i++) {
    arr.push(createWayPoint());
  }
  return arr;
};

// Генерит количество дней в маршруте
const generateDays = () => {
  let max = getRandomIntegerNumber(MIN_DAY, MAX_DAY);
  let result = ``;

  for (let i = 0; i < max; i++) {
    const points = createPoints();
    arrStartNamePoint.push(points[0].city);
    const siteTripDaysItem = document.createElement(`li`);
    const siteTripEventsList = document.createElement(`ul`);
    siteTripDaysItem.classList.add(`trip-days__item`);
    siteTripDaysItem.classList.add(`day`);
    siteTripEventsList.classList.add(`trip-events__list`);
    siteTripEvents.appendChild(siteTripDays);
    siteTripDays.appendChild(siteTripDaysItem);
    siteTripDaysItem.appendChild(siteTripEventsList);
    render(siteTripDaysItem, createDayInfo(i), `afterbegin`);
    if (i === 0) {
      render(siteTripEventsList, createTripEventEdit(points[0]), `afterbegin`);
      sumPrice += points[0].price;
    }
    for (let j = 0; j < NUMBER_POINTS; j++) {
      render(siteTripEventsList, createTripEvent(points[j]), `beforeend`);
      sumPrice += points[j].price;
    }
  }

  render(siteTripMain, createTripInfo(createDataInfo(arrStartNamePoint, sumPrice, max)), `afterbegin`);

  return result;
};


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripMain = document.querySelector(`.trip-main`);
const siteTripControls = siteTripMain.querySelectorAll(`.trip-controls h2`);
const siteTripEvents = document.querySelector(`.trip-events`);
const siteTripDays = document.createElement(`ul`);
const siteTripDaysItem = document.createElement(`li`);
const siteTripEventsList = document.createElement(`ul`);

generateDays();

siteTripDays.classList.add(`trip-days`);
siteTripDaysItem.classList.add(`trip-days__item`);
siteTripDaysItem.classList.add(`day`);
siteTripEventsList.classList.add(`trip-events__list`);
siteTripEvents.appendChild(siteTripDays);
siteTripDays.appendChild(siteTripDaysItem);
siteTripDaysItem.appendChild(siteTripEventsList);
render(siteTripControls[0], createTripControls(), `afterend`);
render(siteTripControls[1], createTripFilters(), `afterend`);
render(siteTripEvents, createTripSort(), `afterbegin`);


