import AbstractComponent from "./abstract-component.js";

// Функция создания разметки
export const createNoPoins = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

// Класс TripInfo
export default class NoPoins extends AbstractComponent {
  getTemplate() {
    return createNoPoins();
  }
}
