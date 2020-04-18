import {createElement} from "./../utils/utils.js";

// Функция создания разметки
export const createNoPoins = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

// Класс TripInfo
export default class NoPoins {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoPoins();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
