import SiteMenuView from '../view/site-menu-view';
import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import SiteSortingView from '../view/site-sorting-view';

export default class TripPresenter {
  #menuContainer = null;
  #filterContainer = null;
  #tripInfoContainer = null;
  #tripContainer = null;
  #tripPointsContainer = null;

  #menuComponent = new SiteMenuView();
  #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #sortingComponent = new SiteSortingView();

  #tripPoints = [];

  constructor(menuContainer, filterContainer, tripInfoContainer, tripContainer) {
    this.#menuContainer = menuContainer;
    this.#filterContainer = filterContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
  }

  #renderMenu = () => {

  }

  #renderFilter = () => {

  }

  #renderTripInfo = () => {

  }

  #renderSorting = () => {

  }

  #renderTripPoint = () => {

  }

  #renderTripPoints = () => {

  }
}
