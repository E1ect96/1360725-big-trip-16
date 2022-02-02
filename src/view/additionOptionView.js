import SmartView from './smart-view';

const createAdditionOptionTemplate = (option) => `<li class="event__offer">
    <span class="event__offer-title">${option.type}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${option.price}</span>
  </li>`;

export default class AdditionOptionView extends SmartView {
  #option = null;

  constructor(option) {
    super();
    this.#option = option;
  }

  get template() {
    return createAdditionOptionTemplate(this.#option);
  }
}
