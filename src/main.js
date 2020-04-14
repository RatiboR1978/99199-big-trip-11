import {createTripInfo} from "./components/info.js";
import {createTripControls} from "./components/controls.js";
import {createTripFilters} from "./components/filters.js";
import {createTripSort} from "./components/sorting.js";
import {createTripEvent} from "./components/event.js";
import {createTripEventEdit} from "./components/event-edit.js";
import {createDayInfo} from "./components/day-info.js";
import {createWayPoint} from "./components/event.js";

const NUMBER_POINTS = 15;

// Создает массив с объектами данных точек
const createPoints = () => {
  const arr = [];
  for (let i = 0; i < NUMBER_POINTS; i++) {
    arr.push(createWayPoint());
  }
  return arr;
};

const points = createPoints();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripMain = document.querySelector(`.trip-main`);
const siteTripControls = siteTripMain.querySelectorAll(`.trip-controls h2`);
const siteTripEvents = document.querySelector(`.trip-events`);
const siteTripDays = document.createElement(`ul`);
const siteTripDaysItem = document.createElement(`li`);
const siteTripEventsList = document.createElement(`ul`);

siteTripDays.classList.add(`trip-days`);
siteTripDaysItem.classList.add(`trip-days__item`);
siteTripDaysItem.classList.add(`day`);
siteTripEventsList.classList.add(`trip-events__list`);
siteTripEvents.appendChild(siteTripDays);
siteTripDays.appendChild(siteTripDaysItem);
siteTripDaysItem.appendChild(siteTripEventsList);
render(siteTripMain, createTripInfo(), `afterbegin`);
render(siteTripControls[0], createTripControls(), `afterend`);
render(siteTripControls[1], createTripFilters(), `afterend`);
render(siteTripEvents, createTripSort(), `afterbegin`);
render(siteTripDaysItem, createDayInfo(), `afterbegin`);
render(siteTripEventsList, createTripEventEdit(points[0]), `afterbegin`);

for (let i = 0; i < NUMBER_POINTS; i++) {
  render(siteTripEventsList, createTripEvent(points[i]), `beforeend`);
}
