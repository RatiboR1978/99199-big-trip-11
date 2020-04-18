import TripInfo from "./components/info.js";
import DayInfo from "./components/day-info.js";
import TripControls from "./components/controls.js";
import TripFilters from "./components/filters.js";
import TripSort from "./components/sorting.js";
import TripEvent from "./components/event.js";
import TripEventEdit from "./components/event-edit.js";
import {createWayPoint} from "./components/event.js";
import {getRandomIntegerNumber} from "./../src/utils/utils.js";
import {createDataInfo} from "./components/info.js";
import {render, RenderPosition} from "./../src/utils/utils.js";

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
    render(siteTripDaysItem, new DayInfo(i).getElement(), RenderPosition.AFTERBEGIN);
    for (let j = 0; j < NUMBER_POINTS; j++) {
      const tripEventEdit = new TripEventEdit(points[j]);
      const tripEvent = new TripEvent(points[j]);
      const evenBtn = tripEvent.getElement().querySelector(`.event__rollup-btn`);
      const editForm = tripEventEdit.getElement().querySelector(`form`);

      const onEditButtonClick = () => {
        siteTripEventsList.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
      };

      const onEditFormSubmit = (evt) => {
        evt.preventDefault();
        siteTripEventsList.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
      };

      evenBtn.addEventListener(`click`, onEditButtonClick);
      editForm.addEventListener(`submit`, onEditFormSubmit);

      render(siteTripEventsList, tripEvent.getElement(), RenderPosition.BEFOREEND);
      sumPrice += points[j].price;
    }
  }

  render(siteTripMain, new TripInfo(createDataInfo(arrStartNamePoint, sumPrice, max)).getElement(), RenderPosition.AFTERBEGIN);

  return result;
};

const siteTripMain = document.querySelector(`.trip-main`);
const siteTripControls = siteTripMain.querySelector(`.trip-controls`);
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
render(siteTripControls, new TripFilters().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControls, new TripControls().getElement(), RenderPosition.AFTERBEGIN);
render(siteTripEvents, new TripSort().getElement(), RenderPosition.AFTERBEGIN);


