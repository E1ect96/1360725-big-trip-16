import {RenderPosition, render} from './render.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import SiteSortingView from './view/site-sorting-view.js';
/*import PointAddFormView from './view/point-add-form-view.js';*/
import PointEditFormView from './view/point-edit-form-view.js';
import TripPointView from './view/trip-point-view.js';
import {generateTripPoint} from './mock/trip-point.js';

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

  tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  tripPointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  tripPointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(TripListElement, tripPointComponent.element, RenderPosition.BEFOREEND);
};

render(siteMenuElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView().element, RenderPosition.BEFOREEND);
render(siteTripInfo, new TripInfoView().element, RenderPosition.AFTERBEGIN);
render(siteTripEvents, new SiteSortingView().element, RenderPosition.AFTERBEGIN);

/*for (let i = 0; i < POINT_COUNT; i++) {
  render(siteTripList, new TripPointView(tripPoints[i]).element, RenderPosition.BEFOREEND);
}*/

tripPoints.forEach((point) => renderTripPoint(siteTripList, point));
/*
render(siteTripList, new PointAddFormView(tripPoints[tripPoints.length-1]).element, RenderPosition.BEFOREEND);
render(siteTripList, new PointEditFormView(tripPoints[0]).element, RenderPosition.AFTERBEGIN);*/
