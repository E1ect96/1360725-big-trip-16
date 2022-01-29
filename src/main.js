import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/TripPresenter';

const POINT_COUNT = 6;

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteMenuElement, siteFilterElement, siteTripInfo, siteTripEvents);

tripPresenter.init(tripPoints);
