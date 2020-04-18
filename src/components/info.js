import {generateStrDate} from "./../utils/utils.js";
import {createElement} from "./../utils/utils.js";


// Создаем объект с данными для info
export const createDataInfo = (arr, sum, max) => {
  return {
    arrStartNamePoint: arr,
    sumPrice: sum,
    maxDays: max
  };
};

// Создаем строку с городами маршрута
const strCity = (arr) => {
  let result = ``;
  arr.forEach(function (item, index) {
    result += (index === 0) ? item : ` — ${item}`;
  });
  return result;
};

// Функция создания разметки
export const createTripInfo = (obj) => {
  return (obj.maxDays !== 0) ?
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${strCity(obj.arrStartNamePoint)}</h1>
  
          <p class="trip-info__dates">${generateStrDate(0, true)}&nbsp;&mdash;&nbsp;${generateStrDate(obj.maxDays)}</p>
        </div>
  
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${obj.sumPrice}</span>
        </p>
      </section>` : `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title"></h1>

        <p class="trip-info__dates"></p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    </section>`;
};

// Класс TripInfo
export default class TripInfo {
  constructor(data) {
    this.data = data;
    this._element = null;
  }

  getTemplate() {
    return createTripInfo(this.data);
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
