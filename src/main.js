import {RenderPosition, render} from './render.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import SiteSortingView from './view/site-sorting-view.js';
/*import PointAddFormView from './view/point-add-form-view.js';*/
import PointEditFormView from './view/point-edit-form-view.js';
import TripPointView from './view/trip-point-view.js';
import {generateTripPoint} from './mock/trip-point.js';
import EmptyPointListView from './view/emptyPointListView';

const POINT_COUNT = 6;

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');

const siteTripList = document.createElement('ul');
siteTripList.classList.add('trip-events__list');
siteTripEvents.appendChild(siteTripList);

const renderTripPoint = (TripListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const tripPointEditComponent = new PointEditFormView(tripPoint);

  const replaceCardToForm = () => {
    TripListElement.replaceChild(tripPointEditComponent.element, tripPointComponent.element);
  };

  const replaceFormToCard = () => {
    TripListElement.replaceChild(tripPointComponent.element, tripPointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  tripPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  tripPointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(TripListElement, tripPointComponent.element);
};

render(siteMenuElement, new SiteMenuView().element);
render(siteFilterElement, new FilterView().element);
render(siteTripInfo, new TripInfoView().element, RenderPosition.AFTERBEGIN);
render(siteTripEvents, new SiteSortingView().element, RenderPosition.AFTERBEGIN);

tripPoints.forEach((point) => renderTripPoint(siteTripList, point));

if (!siteTripList.firstElementChild) {
  render(siteTripList, new EmptyPointListView().element);
}

/*
render(siteTripList, new PointAddFormView(tripPoints[tripPoints.length-1]).element);
*/
