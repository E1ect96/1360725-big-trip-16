import {render} from '../utils/render';
import AdditionOptionView from '../view/addition-option-view';

export default class OptionPresenter {
  #optionsContainer = null;
  #optionComponent = null;

  #option = null;

  constructor (optionsContainer) {
    this.#optionsContainer = optionsContainer;
  }

  init = (option) => {
    this.#option = option;

    this.#optionComponent = new AdditionOptionView(this.#option);
    render(this.#optionsContainer, this.#optionComponent);
  }
}
