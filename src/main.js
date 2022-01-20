import {renderTemplate, RenderPosition, renderElement} from './render.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import SiteSortingView from './view/site-sorting-view.js';
import {createPointAddFormTemplate} from './view/point-add-form-view.js';
import {createPointEditFormTemplate} from './view/point-edit-form-view.js';
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

renderElement(siteMenuElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
renderElement(siteFilterElement, new FilterView().element, RenderPosition.BEFOREEND);
renderElement(siteTripInfo, new TripInfoView().element, RenderPosition.AFTERBEGIN);
renderElement(siteTripEvents, new SiteSortingView().element, RenderPosition.AFTERBEGIN);

for (let i = 1; i < POINT_COUNT - 1; i++) {
  renderElement(siteTripList, new TripPointView(tripPoints[i]).element, RenderPosition.BEFOREEND);
}

renderTemplate(siteTripList, createPointAddFormTemplate(tripPoints[tripPoints.length-1]));
renderTemplate(siteTripList, createPointEditFormTemplate(tripPoints[0]), RenderPosition.AFTERBEGIN);
