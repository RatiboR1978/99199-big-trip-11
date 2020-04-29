import TripControls from "./components/controls.js";
import TripFilters from "./components/filters.js";
import TripSort from "./components/sorting.js";
import NoPoins from "./components/no-poins.js";
import {getRandomIntegerNumber} from "./../src/utils/common.js";
import TripController from "./../src/controllers/trip.js";

const MIN_DAY = 1;
const MAX_DAY = 5;

// Количество дней в поездке
let maxDayEvent = getRandomIntegerNumber(MIN_DAY, MAX_DAY);

const siteTripMain = document.querySelector(`.trip-main`);
const siteTripControls = siteTripMain.querySelector(`.trip-controls`);
const siteTripEvents = document.querySelector(`.trip-events`);
const siteTripDays = document.createElement(`ul`);
const siteTripDaysItem = document.createElement(`li`);
const siteTripEventsList = document.createElement(`ul`);
const tripFilters = new TripFilters();
const tripControls = new TripControls();
const tripSort = new TripSort();
const noPoins = new NoPoins();


siteTripDays.classList.add(`trip-days`);
siteTripDaysItem.classList.add(`trip-days__item`);
siteTripDaysItem.classList.add(`day`);
siteTripEventsList.classList.add(`trip-events__list`);
siteTripEvents.appendChild(siteTripDays);
siteTripDays.appendChild(siteTripDaysItem);
siteTripDaysItem.appendChild(siteTripEventsList);

const tripController = new TripController(siteTripEvents, siteTripDays, siteTripMain, tripSort, noPoins, siteTripControls, tripFilters, tripControls, [], siteTripEventsList, maxDayEvent);

tripController.render();
