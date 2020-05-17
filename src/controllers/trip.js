import TripInfo from "../components/info.js";
import DayInfo from "../components/day-info.js";
import PointController, {
  Mode as PointControllerMode,
  EmptyPoint
} from "./point.js";
import {
  SortType
} from "../components/sorting.js";
import {
  createDataInfo
} from "../components/info.js";
import {
  render,
  RenderPosition
} from "../../src/utils/render.js";
import {
  generateAllPoints
} from "../../src/utils/common.js";

const NUMBER_POINTS = 5;
let arrStartNamePoint = [];
let sumPrice = 0;

// Функция рендеринга точек точек
const renderPoints = (pointListElement, points, onDataChange, onViewChange) => {
  return points.map((task) => {
    const pointController = new PointController(pointListElement, onDataChange, onViewChange);
    pointController.render(task);

    return pointController;
  });
};

// Функция сортировки точек
const getSortedTasks = (tasks, sortType, from, to) => {

  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedTasks = showingTasks.sort((a, b) => (a.city < b.city) ? -1 : 1);
      break;
    case SortType.TIME:
      sortedTasks = showingTasks.sort((a, b) => b.time[0].elapsedTime(true) - a.time[0].elapsedTime(true));
      break;
    case SortType.PRICE:
      sortedTasks = showingTasks.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedTasks.slice(from, to);
};

// Класс TripController
export default class TripController {
  constructor(events, days, main, sort, noPoins, siteControls, filters, controls, tripEventsList, pointsModel, maxDay) {
    this.events = events;
    this.days = days;
    this.main = main;
    this.sort = sort;
    this.noPoins = noPoins;
    this.siteControls = siteControls;
    this.filters = filters;
    this.controls = controls;
    this.tripEventsList = tripEventsList;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showedPointControllers = [];
    this._pointsModel = pointsModel;
    this._creatingPoint = null;
    this._showingPointsCount = 0;
    this._maxDay = maxDay;
  }

  _onDataChange(pointController, oldData, newData) {
    const id = oldData.data.id;

    if (oldData === EmptyPoint) {
      this._creatingTask = null;
      if (newData === null) {
        PointController.destroy();
        this._updatePoints(this._showingPointsCount);
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
        this._showingPointsCount = this._showedPointControllers.length;
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(id);
      this._updatePoints(this._showingTasksCount);
    } else {
      const isSuccess = this._pointsModel.updatePoint(id, newData);

      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _renderPoints(points) {
    for (let i = 0; i < this._maxDay; i++) {
      const siteTripDaysItem = document.createElement(`li`);
      const siteTripEventsList = document.createElement(`ul`);
      const newPoints = renderPoints(siteTripEventsList, points[i], this._onDataChange, this._onViewChange);

      arrStartNamePoint.push(points[i][0].city);
      siteTripDaysItem.classList.add(`trip-days__item`);
      siteTripDaysItem.classList.add(`day`);
      siteTripEventsList.classList.add(`trip-events__list`);
      this.events.appendChild(this.days);
      this.days.appendChild(siteTripDaysItem);
      siteTripDaysItem.appendChild(siteTripEventsList);
      render(siteTripDaysItem, new DayInfo(i), RenderPosition.AFTERBEGIN);
      this._showedPointControllers = this._showedPointControllers.concat(newPoints);

      for (let j = 0; j < NUMBER_POINTS; j++) {
        sumPrice += points[i][j].price;
      }
    }

    this._showingPointCount = this._showedPointControllers.length;
  }

  _removePoints() {
    this._showedPointControllers.forEach((taskController) => taskController.destroy());
    this._showedPointControllers = [];
  }

  _updatePoints(count) {
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints().slice(0, count));
  }

  render() {
    const points = this._pointsModel.getPoints();

    this._renderPoints(points);
    render(this.main, new TripInfo(createDataInfo(arrStartNamePoint, sumPrice, this._maxDay)), RenderPosition.AFTERBEGIN);
    render(this.siteControls, this.filters, RenderPosition.AFTERBEGIN);
    render(this.siteControls, this.controls, RenderPosition.AFTERBEGIN);

    if (this._maxDay > 0) {
      render(this.events, this.sort, RenderPosition.AFTERBEGIN);
    } else {
      render(this.events, this.noPoins, RenderPosition.AFTERBEGIN);
    }

    this.sort.setSortTypeChangeHandler((sortType) => {
      let allPoints = generateAllPoints(points);
      const showingTasksCount = allPoints.length;
      const sortedTasks = getSortedTasks(allPoints, sortType, 0, showingTasksCount);
      const siteTripDaysItem = document.createElement(`li`);
      const siteDayInfo = document.createElement(`div`);

      this.days.innerHTML = ``;
      siteDayInfo.classList.add(`day__info`);
      siteTripDaysItem.classList.add(`trip-days__item`);
      siteTripDaysItem.classList.add(`day`);
      siteTripDaysItem.appendChild(siteDayInfo);
      siteTripDaysItem.appendChild(this.tripEventsList);
      this.days.appendChild(siteTripDaysItem);
      this.tripEventsList.innerHTML = ``;

      renderPoints(this.tripEventsList, sortedTasks, this._onDataChange, this._onViewChange);
    });
  }
}
