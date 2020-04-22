import AbstractComponent from "./abstract-component.js";

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
export default class TripEvent extends AbstractComponent {
  constructor(name, price, index, checked) {
    super();
    this.name = name;
    this.price = price;
    this.index = index;
    this.checked = checked;
  }

  getTemplate() {
    return createOfferItem(this.name, this.price, this.index, this.checked);
  }
}
