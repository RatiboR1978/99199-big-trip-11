import TripEvent from "../components/event.js";
import TripEventEdit from "../components/event-edit.js";
import {render, RenderPosition, replace} from "../../src/utils/render.js";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
  }

  render(point, arrPoints) {
    this._pointComponent = new TripEvent(point);
    this._pointEditComponent = new TripEventEdit(point);

    arrPoints.push(this._pointComponent);

    this._pointComponent.setClickHandler(() => {
      this._replaceTripEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTripEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setFavoriteHandler(() => {
      this._onDataChange(point);
    });

    render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replaceTripEventToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceEditToTripEvent() {
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
