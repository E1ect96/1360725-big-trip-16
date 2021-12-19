import {renderTemplate, RenderPosition} from './render.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createSiteSortingTepmlate} from './view/site-sorting-view.js';
import {createPointAddFormTemplate} from './view/point-add-form-view.js';
import {createPointEditFormTemplate} from './view/point-edit-form-view.js';
import {createTripPointTemplate} from './view/trip-point-view.js';
import {generateTripPoint} from './mock/trip-point.js';

const POINT_COUNT = 20;

const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');

const siteTripList = document.createElement('ul');
siteTripList.classList.add('trip-events__list');
siteTripEvents.appendChild(siteTripList);

renderTemplate(siteMenuElement, createSiteMenuTemplate());
renderTemplate(siteFilterElement, createFilterTemplate());
renderTemplate(siteTripInfo, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteTripEvents, createSiteSortingTepmlate(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(siteTripList, createTripPointTemplate(tripPoints[i]));
}

renderTemplate(siteTripList, createPointAddFormTemplate());
renderTemplate(siteTripList, createPointEditFormTemplate(tripPoints[0]), RenderPosition.AFTERBEGIN);

generateTripPoint();
