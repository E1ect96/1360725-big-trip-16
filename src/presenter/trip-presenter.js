import SiteMenuView from '../view/site-menu-view';
import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import SiteSortingView from '../view/site-sorting-view';
import {remove, render, RenderPosition} from '../utils/render';
import EmptyPointListView from '../view/empty-point-list-view';
import TripListView from '../view/trip-list-view';
import PointPresenter from './point-presenter';
import {SortType, UpdateType, UserAction} from '../utils/const';
import {sortByPrice, sortByTime} from '../mock/trip-point';

export default class TripPresenter {
  #menuContainer = null;
  #filterContainer = null;
  #tripInfoContainer = null;
  #tripContainer = null;
  #pointsModel = null;

  #menuComponent = new SiteMenuView();
  #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #noPointsComponent = new EmptyPointListView();
  #tripListComponent = new TripListView();
  #sortingComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(menuContainer, filterContainer, tripInfoContainer, tripContainer, pointsModel) {
    this.#menuContainer = menuContainer;
    this.#filterContainer = filterContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
    }

    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripPointList();
        this.#renderTripPoints(this.points);
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderTrip();
        break;
    }
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripPointList();
    remove(this.#sortingComponent);
    this.#renderTripPoints(this.points);
    this.#renderSorting();
  }

  #renderSorting = () => {
    this.#sortingComponent = new SiteSortingView(this.#currentSortType);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#tripContainer, this.#sortingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent);
  }

  #renderTripPoint = (tripPoint) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(tripPoint);
    this.#pointPresenter.set(tripPoint.id, pointPresenter);
  }

  #renderTripPoints = (points) => {
    points.forEach((point) => this.#renderTripPoint(point));
  }

  #clearTripPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortingComponent);
    remove(this.#noPointsComponent);
    remove(this.#menuComponent);
    remove(this.#filterComponent);
    remove(this.#tripInfoComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTrip = () => {
    const points = this.points;
    const pointsCount = points.length;

    this.#renderMenu();
    this.#renderFilter();
    this.#renderTripInfo();
    this.#renderSorting();
    render (this.#tripContainer, this.#tripListComponent);

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderTripPoints(this.points);
  }
}
