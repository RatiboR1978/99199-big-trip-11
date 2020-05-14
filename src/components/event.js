import {getRandomIndexArr, getRandomIntegerNumber} from "./../utils/common.js";
import {generatePointType, generateOffer, generateTime, createOffers, generatePhoto, generateCityInfo} from "./../mock/event.js";
import AbstractComponent from "./abstract-component.js";

// Создает объект с данными точки
export const createWayPoint = () => {
  const object = {};
  const pointTypes = generatePointType();
  const cities = generateCityInfo();
  const indexCity = getRandomIndexArr(cities);

  object.id = ``;
  object.favorite = false;
  object.pointType = pointTypes[getRandomIndexArr(pointTypes)];
  object.offers = generateOffer(object.pointType);
  object.city = cities[indexCity].name;
  object.information = {
    description: cities[indexCity].desc,
    photo: generatePhoto()
  };
  object.startDate = `2019-07-10T22:55:56.845Z`;
  object.finishDate = `2019-07-11T11:22:13.375Z`;
  object.time = generateTime(object.startDate, object.finishDate);
  object.price = getRandomIntegerNumber(10, 100);

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
              <time class="event__start-time" datetime="${obj.time.startDate}">${obj.time.startTime()}</time>
              &mdash;
              <time class="event__end-time" datetime="${obj.time.finishDate}">${obj.time.finishTime()}</time>
            </p>
            <p class="event__duration">${obj.time.elapsedTime()}</p>
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
