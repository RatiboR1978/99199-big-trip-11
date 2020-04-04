import {componentTripInfo} from "./components/info.js";
import {componentTripControls} from "./components/controls.js";
import {componentTripFilters} from "./components/filters.js";
import {componentTripSort} from "./components/sorting.js";
import {componentTripEvent} from "./components/event.js";
import {componentTripEventEdit} from "./components/event-edit.js";
import {componentDayInfo} from "./components/day-info.js";

const NUMBER_POINTS = 3;

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
render(siteTripMain, componentTripInfo(), `afterbegin`);
render(siteTripControls[0], componentTripControls(), `afterend`);
render(siteTripControls[1], componentTripFilters(), `afterend`);
render(siteTripEvents, componentTripSort(), `afterbegin`);
render(siteTripDaysItem, componentDayInfo(), `afterbegin`);
render(siteTripEventsList, componentTripEventEdit(), `afterbegin`);

for (let i = 0; i < NUMBER_POINTS; i++) {
  render(siteTripEventsList, componentTripEvent(), `beforeend`);
}
