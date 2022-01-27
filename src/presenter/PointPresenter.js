import TripPointView from '../view/trip-point-view';
import PointEditFormView from '../view/point-edit-form-view';
import {remove, render, replace} from '../render';

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

    this.#tripPointComponent = new TripPointView(point);
    this.#tripPointEditComponent = new PointEditFormView(point);

    this.#tripPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripPointEditComponent.setEditClickHandler(this.#handleEditClick);
    this.#tripPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripPointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#tripPointContainer, this.#tripPointComponent);
  }

  #replaceCardToForm = () => {
    replace(this.#tripPointEditComponent, this.#tripPointComponent);
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

  #handleEditClick = () => {
    this.#replaceCardToForm();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  }

  #handleDeleteClick = () => {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }
}
