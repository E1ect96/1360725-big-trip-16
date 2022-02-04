import SiteMenuView from '../view/site-menu-view';
import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import SiteSortingView from '../view/site-sorting-view';
import {render, RenderPosition} from '../utils/render';
import EmptyPointListView from '../view/empty-point-list-view';
import TripListView from '../view/trip-list-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common';
import {SortType} from '../utils/const';
import {sortByPrice, sortByTime} from '../mock/trip-point';

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
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTripPoints = [];

  constructor(menuContainer, filterContainer, tripInfoContainer, tripContainer) {
    this.#menuContainer = menuContainer;
    this.#filterContainer = filterContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    this.#sourcedTripPoints = [...tripPoints];

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
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

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearTripPointList();
    this.#renderTrip();
  }

  #renderSorting = () => {
    render(this.#tripContainer, this.#sortingComponent);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent);
  }

  #renderTripPoint = (tripPoint) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(tripPoint);
    this.#pointPresenter.set(tripPoint.id, pointPresenter);
  }

  #renderTripPoints = () => {
    this.#tripPoints.forEach((point) => this.#renderTripPoint(point));
  }

  #clearTripPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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
