import {createElement} from "./../utils/utils.js";

export const createOfferItem = (name, price, index, checked) => {

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" ${checked}>
    <label class="event__offer-label" for="event-offer-luggage-${index}">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};


// Класс TripEvent
export default class TripEvent {
  constructor(name, price, index, checked) {
    this.name = name;
    this.price = price;
    this.index = index;
    this.checked = checked;
    this._element = null;
  }

  getTemplate() {
    return createOfferItem(this.name, this.price, this.index, this.checked);
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
