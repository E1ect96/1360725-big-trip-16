import TripPointView from '../view/trip-point-view';
import PointEditFormView from '../view/point-edit-form-view';
import {remove, render, replace} from '../utils/render';
import AdditionOptionView from '../view/addition-option-view';
import AdditionOptionEditView from '../view/addition-option-edit-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripPointContainer = null;
  #changeData = null;
  #changeMode = null;
  #tripAdditionOptionsContainer = null;
  #tripAdditionOptionsEditContainer = null;
  #tripAdditionOptionComponent = null;
  #tripAdditionOptionEditComponent = null;
  #tripPointComponent = null;
  #tripPointEditComponent = null;

  #point = null;
  #options = null;
  #mode = Mode.DEFAULT;

  constructor(tripPointContainer, changeData, changeMode) {
    this.#tripPointContainer = tripPointContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    this.#options = point.additionalOptions;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointEditComponent = this.#tripPointEditComponent;

    this.#tripPointComponent = new TripPointView(point);
    this.#tripPointEditComponent = new PointEditFormView(point);

    this.#tripAdditionOptionsContainer = this.#tripPointComponent.element.querySelector('.event__selected-offers');
    this.#renderPointOptions();
    this.#tripAdditionOptionsEditContainer = this.#tripPointEditComponent.element.querySelector('.event__available-offers');
    this.#renderEditPointOptions();

    this.#tripPointComponent.setEditClickHandler(this.#handleCardEditClick);
    this.#tripPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#tripPointEditComponent.setEditClickHandler(this.#handleFormEditClick);
    this.#tripPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripPointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this.#tripPointContainer, this.#tripPointComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy = () => {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripPointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    replace(this.#tripPointEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#tripPointComponent, this.#tripPointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#tripPointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleCardEditClick = () => {
    this.#replaceCardToForm();
  }

  #handleFormEditClick = () => {
    this.#replaceFormToCard();
  }

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #renderPointOption = (option) => {
    if (option.isActive) {
      this.#tripAdditionOptionComponent = new AdditionOptionView(option);
      render(this.#tripAdditionOptionsContainer, this.#tripAdditionOptionComponent);
    }
  }

  #renderPointOptions = () => {
    this.#options.forEach((option) => this.#renderPointOption(option));
  }

  #renderEditPointOption = (option) => {
    this.#tripAdditionOptionEditComponent = new AdditionOptionEditView(option);
    render(this.#tripAdditionOptionsEditContainer, this.#tripAdditionOptionEditComponent);
  }

  #renderEditPointOptions = () => {
    if (this.#options.length === 0) {
      this.#tripPointEditComponent.element.querySelector('.event__section--offers').classList.add('visually-hidden');
    } else {
      this.#options.forEach((option) => this.#renderEditPointOption(option));
    }
  }
}
