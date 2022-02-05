import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';

const POINT_COUNT = 6;

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

const pointsModel = new PointsModel();
pointsModel.points = tripPoints;


const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteMenuElement, siteFilterElement, siteTripInfo, siteTripEvents, pointsModel);

tripPresenter.init(tripPoints);
