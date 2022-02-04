import AbstractView from './abstract-view';

const createAdditionOptionEditTemplate = (option) => `
   <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.type}-1" type="checkbox" name="event-offer-${option.type}" ${option.isActive ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${option.type}-1">
      <span class="event__offer-title">${option.type}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${option.price}</span>
    </label>
  </div>`;

export default class AdditionOptionEditView extends AbstractView {
  #option = null;

  constructor(option) {
    super();
    this.#option = option;
  }

  get template() {
    return createAdditionOptionEditTemplate(this.#option);
  }
}
