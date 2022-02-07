import TripPointView from '../view/trip-point-view';
import PointEditFormView from '../view/point-edit-form-view';
import {remove, render, replace} from '../utils/render';
import {UpdateType, UserAction} from '../utils/const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripPointContainer = null;
  #changeData = null;
  #changeMode = null;
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

    this.#tripPointComponent.setEditClickHandler(this.#handleCardEditClick);
    this.#tripPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#tripPointEditComponent.setEditClickHandler(this.#handleFormEditClick);
    this.#tripPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#tripPointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    /*    this.#tripPointEditComponent.setOptionClickHandler(this.#handleOptionClick);*/

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
    document.addEventListener('keydown', this.#EscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#tripPointComponent, this.#tripPointEditComponent);
    document.removeEventListener('keydown', this.#EscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #EscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#tripPointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#EscKeyDownHandler);
    }
  };

  #handleCardEditClick = () => {
    this.#replaceCardToForm();
  }

  #handleFormEditClick = () => {
    this.#tripPointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MAJOR,
      point,
    );
    this.#replaceFormToCard();
  }

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  }

  #handleOptionClick = () => {

  }
}
