import {render} from '../utils/render';
import AdditionOptionEditView from '../view/addition-option-edit-view';

export default class OptionEditPresenter {
  #optionsContainer = null;
  #optionComponent = null;

  #option = null;

  constructor (optionsContainer) {
    this.#optionsContainer = optionsContainer;
  }

  init = (option) => {
    this.#option = option;

    this.#optionComponent = new AdditionOptionEditView(this.#option);
    render(this.#optionsContainer, this.#optionComponent);
  }
}
