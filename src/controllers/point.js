import TripEvent from "../components/event.js";
import TripEventEdit from "../components/event-edit.js";
import {
  arrOffers,
  generateTime
} from "./../mock/event.js";
import {
  createStringeTimeFormat
} from "./../utils/common.js";
import {
  render,
  RenderPosition,
  replace
} from "../../src/utils/render.js";

// Создание новой точки после изменения пользователем
const createNewPoint = (evt, id) => {
  const object = {};
  const form = evt.target;
  const favorite = form.querySelector(`.event__favorite-checkbox`).checked ? true : false;
  const pointType = form.querySelector(`.event__type-output`).textContent.trim();
  const city = form.querySelector(`.event__input--destination`).value.trim();
  const price = form.querySelector(`.event__input--price`).value.trim();
  const descriptionText = form.querySelector(`.event__destination-description`).textContent.trim();
  const descriptionPhoto = form.querySelector(`.event__photos-tape`).innerHTML.trim();
  const startDate = form.querySelector(`#event-start-time-1`).value.trim();
  const finishDate = form.querySelector(`#event-end-time-1`).value.trim();

  object.id = id;
  object.favorite = favorite;
  object.pointType = pointType.split(` `)[0];
  object.offers = arrOffers.filter(function (item) {
    return item.type === object.pointType;
  })[0].offers;
  object.city = city;
  object.information = {
    description: descriptionText,
    photo: descriptionPhoto
  };
  object.startDate = createStringeTimeFormat(startDate);
  object.finishDate = createStringeTimeFormat(finishDate);
  object.time = generateTime(object.startDate, object.finishDate);
  object.price = price;

  return object;
};

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripEvent(point);
    this._pointEditComponent = new TripEventEdit(point);

    this._pointComponent.setClickHandler(() => {
      this._replaceTripEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTripEvent();
      const newPoint = createNewPoint(evt, this._pointComponent.data.id);

      this._onDataChange(this, this._pointComponent.data.id, newPoint);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    
    if (oldPointComponent && oldPointEditComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
    } else {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTripEvent();
    }
  }

  _replaceTripEventToEdit() {
    this._onViewChange();
    this._mode = Mode.EDIT;
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceEditToTripEvent() {
    this._mode = Mode.DEFAULT;
    replace(this._pointComponent, this._pointEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTripEvent();
    }
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
