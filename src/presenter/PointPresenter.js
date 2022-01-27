import TripPointView from '../view/trip-point-view';
import PointEditFormView from '../view/point-edit-form-view';
import {remove, render, replace} from '../utils/render';

export default class PointPresenter {
  #tripPointContainer = null;

  #tripPointComponent = null;
  #tripPointEditComponent = null;

  #point = null;

  constructor(tripPointContainer) {
    this.#tripPointContainer = tripPointContainer;
  }

  init = (point) => {
    this.#point = point;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointEditComponent = this.#tripPointEditComponent;

    this.#tripPointComponent = new TripPointView(point);
    this.#tripPointEditComponent = new PointEditFormView(point);

    this.#tripPointComponent.setEditClickHandler(this.#handleCardEditClick);
    this.#tripPointEditComponent.setEditClickHandler(this.#handleFormEditClick);
    this.#tripPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripPointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this.#tripPointContainer, this.#tripPointComponent);
      return;
    }

    if (this.#tripPointContainer.element.contains(prevTripPointComponent.element)) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#tripPointContainer.element.contains(prevTripPointEditComponent.element)) {
      replace(this.#tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy = () => {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }

  #replaceCardToForm = () => {
    replace(this.#tripPointEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#tripPointComponent, this.#tripPointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    }
  };

  #handleCardEditClick = () => {
    this.#replaceCardToForm();
  }

  #handleFormEditClick = () => {
    this.#replaceFormToCard();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }
}
