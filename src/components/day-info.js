import {generateStrDate} from "./../utils/utils.js";
import {generateDate} from "./../mock/day-info";

export const createDayInfo = (numDay) => {
  return `<div class="day__info">
      <span class="day__counter">${numDay + 1}</span>
      <time class="day__date" datetime="${generateDate()[numDay]}">${generateStrDate(numDay, true)}</time>
    </div>`;
};
