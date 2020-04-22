import {getRandomIndexArr, getRandomArr} from "./../utils/common.js";
import {generatePointType, generateCity, generateOffer, generateDestinationInformation, generateTime, price, createOffers, generatePhoto} from "./../mock/event.js";
import AbstractComponent from "./abstract-component.js";

// Создает объект с данными точки
export const createWayPoint = () => {
  const object = {};
  const pointTypes = generatePointType();
  const cities = generateCity();
  const maxOffers = 5;
  const maxDestinationsInformation = 5;
  const offersData = generateOffer();
  const destinationsInformation = generateDestinationInformation();
  const arrOffers = getRandomArr(offersData, maxOffers);

  object.pointType = pointTypes[getRandomIndexArr(pointTypes)];
  object.city = cities[getRandomIndexArr(cities)];
  object.offers = arrOffers;
  object.information = {
    description: getRandomArr(destinationsInformation, maxDestinationsInformation).map((it) => (it) ? `${it}.` : ``).join(``),
    photo: generatePhoto()
  };
  object.time = generateTime();
  object.price = price(arrOffers);

  return object;
};


export const createTripEvent = (obj) => {
  return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${obj.pointType.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${obj.pointType} to ${obj.city}</h3>
  
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${obj.time[0].startDate}">${obj.time[0].startTime()}</time>
              &mdash;
              <time class="event__end-time" datetime="${obj.time[0].finishDate}">${obj.time[0].finishTime()}</time>
            </p>
            <p class="event__duration">${obj.time[0].elapsedTime()}</p>
          </div>
  
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${obj.price}</span>
          </p>
  
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
          ${createOffers(obj.offers)}
          </ul>
  
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`;
};

// Класс TripEvent
export default class TripEvent extends AbstractComponent {
  constructor(data) {
    super();
    this.data = data;
  }

  getTemplate() {
    return createTripEvent(this.data);
  }

  setClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }
}
