import SiteMenuView from '../view/site-menu-view';
import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import SiteSortingView from '../view/site-sorting-view';
import {remove, render, RenderPosition, replace} from '../render';
import EmptyPointListView from '../view/emptyPointListView';
import TripListView from '../view/trip-list-view';
import TripPointView from '../view/trip-point-view';
import PointEditFormView from '../view/point-edit-form-view';

export default class TripPresenter {
  #menuContainer = null;
  #filterContainer = null;
  #tripInfoContainer = null;
  #tripContainer = null;

  #menuComponent = new SiteMenuView();
  #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #sortingComponent = new SiteSortingView();
  #noPointsComponent = new EmptyPointListView();
  #tripListComponent = new TripListView();

  #tripPoints = [];

  constructor(menuContainer, filterContainer, tripInfoContainer, tripContainer) {
    this.#menuContainer = menuContainer;
    this.#filterContainer = filterContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    this.#renderTrip();
  }

  #renderMenu = () => {
    render(this.#menuContainer, this.#menuComponent);
  }

  #renderFilter = () => {
    render(this.#filterContainer, this.#filterComponent);
  }

  #renderTripInfo = () => {
    render(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #renderSorting = () => {
    render(this.#tripContainer, this.#sortingComponent);
  }

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent);
  }

  #renderTripPoint = (tripPoint) => {
    const tripPointComponent = new TripPointView(tripPoint);
    const tripPointEditComponent = new PointEditFormView(tripPoint);

    const replaceCardToForm = () => {
      replace(tripPointEditComponent, tripPointComponent);
    };

    const replaceFormToCard = () => {
      replace(tripPointComponent, tripPointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    tripPointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    tripPointEditComponent.setEditClickHandler(() => {
      replaceFormToCard();
    });

    tripPointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
    });

    tripPointEditComponent.setDeleteClickHandler(() => {
      remove(tripPointEditComponent);
    });

    render(this.#tripListComponent, tripPointComponent);
  }

  #renderTripPoints = () => {
    this.#tripPoints.forEach((point) => this.#renderTripPoint(point));
  }

  #renderTrip = () => {
    this.#renderMenu();
    this.#renderFilter();
    this.#renderTripInfo();
    this.#renderSorting();
    render (this.#tripContainer, this.#tripListComponent);

    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderTripPoints();
  }
}
