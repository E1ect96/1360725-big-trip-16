import {createElement} from '../render';

const createEmptyPointListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyPointListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createEmptyPointListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
