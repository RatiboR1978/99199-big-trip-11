import TripInfo from "../components/info.js";
import DayInfo from "../components/day-info.js";
import TripEvent from "../components/event.js";
import TripEventEdit from "../components/event-edit.js";
import {createWayPoint} from "../components/event.js";
import {createDataInfo} from "../components/info.js";
import {render, RenderPosition, replace} from "../../src/utils/render.js";

const NUMBER_POINTS = 5;
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
const generateDays = (maxDay, events, days, main) => {
  let result = ``;

  for (let i = 0; i < maxDay; i++) {
    const points = createPoints();
    arrStartNamePoint.push(points[0].city);
    const siteTripDaysItem = document.createElement(`li`);
    const siteTripEventsList = document.createElement(`ul`);
    siteTripDaysItem.classList.add(`trip-days__item`);
    siteTripDaysItem.classList.add(`day`);
    siteTripEventsList.classList.add(`trip-events__list`);
    events.appendChild(days);
    days.appendChild(siteTripDaysItem);
    siteTripDaysItem.appendChild(siteTripEventsList);
    render(siteTripDaysItem, new DayInfo(i), RenderPosition.AFTERBEGIN);
    for (let j = 0; j < NUMBER_POINTS; j++) {
      const tripEventEdit = new TripEventEdit(points[j]);
      const tripEvent = new TripEvent(points[j]);

      const replaceTripEventToEdit = () => {
        replace(tripEventEdit, tripEvent);
      };
      const replaceEditToTripEvent = () => {
        replace(tripEvent, tripEventEdit);
      };

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
          replaceEditToTripEvent();
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      };

      const onEditButtonClick = () => {
        replaceTripEventToEdit();
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const onEditFormSubmit = (evt) => {
        evt.preventDefault();
        replaceEditToTripEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      };

      tripEvent.setClickHandler(onEditButtonClick);
      tripEventEdit.setSubmitHandler(onEditFormSubmit);

      render(siteTripEventsList, tripEvent, RenderPosition.BEFOREEND);
      sumPrice += points[j].price;
    }
  }

  render(main, new TripInfo(createDataInfo(arrStartNamePoint, sumPrice, maxDay)), RenderPosition.AFTERBEGIN);

  return result;
};

// Класс TripController
export default class TripController {
  constructor(events, days, main) {
    this.events = events;
    this.days = days;
    this.main = main;
  }

  render(maxDay) {
    generateDays(maxDay, this.events, this.days, this.main);
  }
}
