import {renderTemplate, RenderPosition} from './render.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createFilterTemplate} from './view/filter-view.js';
import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createSiteSortingTepmlate} from './view/site-sorting-view.js';
import {createPointAddFormTemplate} from './view/point-add-form-view.js';
import {createPointEditFormTemplate} from './view/point-edit-form-view.js';
import {createTripPointTemplate} from './view/trip-point-view.js';

const POINT_COUNT = 3;

const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');

const siteTripList = document.createElement('ul');
siteTripList.classList.add('trip-events__list');
siteTripEvents.appendChild(siteTripList);

renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteTripInfo, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteTripEvents, createSiteSortingTepmlate(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(siteTripEvents, createTripPointTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(siteTripList, createPointAddFormTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteTripList, createPointEditFormTemplate(), RenderPosition.AFTERBEGIN);

