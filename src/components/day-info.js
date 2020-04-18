import {generateStrDate} from "./../utils/utils.js";
import {generateDate} from "./../mock/day-info";
import {createElement} from "./../utils/utils.js";

export const createDayInfo = (numDay) => {
  return `<div class="day__info">
      <span class="day__counter">${numDay + 1}</span>
      <time class="day__date" datetime="${generateDate()[numDay]}">${generateStrDate(numDay, true)}</time>
    </div>`;
};

// Класс DayInfo
export default class DayInfo {
  constructor(data) {
    this.data = data;
    this._element = null;
  }

  getTemplate() {
    return createDayInfo(this.data);
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

