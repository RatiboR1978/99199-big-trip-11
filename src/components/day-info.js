import {generateStrDate} from "./../utils/common.js";
import {generateDate} from "./../mock/day-info";
import AbstractComponent from "./abstract-component.js";

export const createDayInfo = (numDay) => {
  return `<div class="day__info">
      <span class="day__counter">${numDay + 1}</span>
      <time class="day__date" datetime="${generateDate()[numDay]}">${generateStrDate(numDay, true)}</time>
    </div>`;
};

// Класс DayInfo
export default class DayInfo extends AbstractComponent {
  constructor(data) {
    super();
    this.data = data;
  }

  getTemplate() {
    return createDayInfo(this.data);
  }
}

