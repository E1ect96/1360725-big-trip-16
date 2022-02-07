import PointAddFormView from '../view/point-add-form-view';
import {remove, render, RenderPosition} from '../utils/render';
import {UpdateType, UserAction} from '../utils/const';
import {nanoid} from 'nanoid';

export default class NewPointPresenter {
  #tripPointContainer = null;
  #changeData = null;
  #pointAddComponent = null;
  #destroyCallback = null;

  constructor(tripPointContainer, changeData) {
    this.#tripPointContainer = tripPointContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new PointAddFormView();
    this.#pointAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#tripPointContainer, this.#pointAddComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#EscKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointAddComponent === null) {
      return;
    }

    this.#destroyCallback?.();
    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener('keydown', this.#EscKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #EscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
