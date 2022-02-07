import AbstractView from './abstract-view';
import {MenuItem} from '../utils/const';

const createButtonAddEventTemplate = () =>
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" id="${MenuItem.ADD_NEW_POINT}">
  New event
  </button>`;

export default class ButtonAddEventView extends AbstractView {
  get template() {
    return createButtonAddEventTemplate();
  }

  setNewEventClickHandler = (callback) => {
    this._callback.newEventClick = callback;
    this.element.addEventListener('click', this.#newEventClickHandler);
  };

  setMenuItem = () => {
    const item = this.element;

    if (item !== null) {
      item.disabled = true;
    }
  };

  #newEventClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.newEventClick(evt.target.id);
  };
}
