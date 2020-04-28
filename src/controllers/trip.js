import TripInfo from "../components/info.js";
import DayInfo from "../components/day-info.js";
import PointController from "./point.js";
import {createWayPoint} from "../components/event.js";
import {SortType} from "../components/sorting.js";
import {createDataInfo} from "../components/info.js";
import {render, RenderPosition} from "../../src/utils/render.js";

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
const generateDays = (maxDay, events, days, main, sort, noPoins, siteControls, filters, controls, allPoints, onDataChange) => {
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

      const point = new PointController(siteTripEventsList, onDataChange);

      point.render(points[j], allPoints);

      sumPrice += points[j].price;
    }
  }

  render(main, new TripInfo(createDataInfo(arrStartNamePoint, sumPrice, maxDay)), RenderPosition.AFTERBEGIN);

  render(siteControls, filters, RenderPosition.AFTERBEGIN);
  render(siteControls, controls, RenderPosition.AFTERBEGIN);

  if (maxDay > 0) {
    render(events, sort, RenderPosition.AFTERBEGIN);
  } else {
    render(events, noPoins, RenderPosition.AFTERBEGIN);
  }
  return result;
};

// Функция сортировки точек
const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedTasks = showingTasks.sort((a, b) => (a.data.city < b.data.city) ? -1 : 1);
      break;
    case SortType.TIME:
      sortedTasks = showingTasks.sort((a, b) => b.data.time[0].elapsedTime(true) - a.data.time[0].elapsedTime(true));
      break;
    case SortType.PRICE:
      sortedTasks = showingTasks.sort((a, b) => b.data.price - a.data.price);
      break;
  }

  return sortedTasks.slice(from, to);
};

// Класс TripController
export default class TripController {
  constructor(events, days, main, sort, noPoins, siteControls, filters, controls, allPoints, tripEventsList) {
    this.events = events;
    this.days = days;
    this.main = main;
    this.sort = sort;
    this.noPoins = noPoins;
    this.siteControls = siteControls;
    this.filters = filters;
    this.controls = controls;
    this.allPoints = allPoints;
    this.tripEventsList = tripEventsList;
  }

  _onDataChange(point) {
    point.favorite = (!point.favorite) ? true : false;
  }

  render(maxDay) {
    generateDays(maxDay, this.events, this.days, this.main, this.sort, this.noPoins, this.siteControls, this.filters, this.controls, this.allPoints, this._onDataChange);


    this.sort.setSortTypeChangeHandler((sortType) => {
      const showingTasksCount = this.allPoints.length;
      const sortedTasks = getSortedTasks(this.allPoints, sortType, 0, showingTasksCount);
      const siteTripDaysItem = document.createElement(`li`);
      const siteDayInfo = document.createElement(`div`);

      this.days.innerHTML = ``;
      siteDayInfo.classList.add(`day__info`);
      siteTripDaysItem.classList.add(`trip-days__item`);
      siteTripDaysItem.classList.add(`day`);
      siteTripDaysItem.appendChild(siteDayInfo);
      siteTripDaysItem.appendChild(this.tripEventsList);
      this.days.appendChild(siteTripDaysItem);


      sortedTasks.slice(0, showingTasksCount)
      .forEach((task) => {
        render(this.tripEventsList, task, RenderPosition.BEFOREEND);
      });
    });
  }
}
