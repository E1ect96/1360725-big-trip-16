import SiteMenuView from '../view/site-menu-view';
import TripInfoView from '../view/trip-info-view';
import SiteSortingView from '../view/site-sorting-view';
import {remove, render, RenderPosition} from '../utils/render';
import EmptyPointListView from '../view/empty-point-list-view';
import TripListView from '../view/trip-list-view';
import PointPresenter from './point-presenter';
import {FilterType, SortType, UpdateType, UserAction} from '../utils/const';
import {sortByPrice, sortByTime} from '../mock/trip-point';
import {filter} from '../utils/filters';

export default class TripPresenter {
  #menuContainer = null;
  #filterContainer = null;
  #tripInfoContainer = null;
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #menuComponent = new SiteMenuView();
  #tripInfoComponent = new TripInfoView();
  #noPointsComponent = null;
  #tripListComponent = new TripListView();
  #sortingComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor(menuContainer, filterContainer, tripInfoContainer, tripContainer, pointsModel, filterModel) {
    this.#menuContainer = menuContainer;
    this.#filterContainer = filterContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
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
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  }

  #renderMenu = () => {
    render(this.#menuContainer, this.#menuComponent);
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
    this.#noPointsComponent = new EmptyPointListView(this.#filterType);
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

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortingComponent);
    remove(this.#menuComponent);
    remove(this.#tripInfoComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTrip = () => {
    const points = this.points;
    const pointsCount = points.length;

    this.#renderMenu();
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
