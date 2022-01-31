import AbstractView from './abstract-view';

const createAdditionOptionTemplate = (option) => `<li class="event__offer">
    <span class="event__offer-title">${option.type}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${option.price}</span>
  </li>`;

export default class AdditionOptionView extends AbstractView {
  #option = null;

  constructor(option) {
    super();
    this.#option = option;
  }

  get template() {
    return createAdditionOptionTemplate(this.#option);
  }
}
