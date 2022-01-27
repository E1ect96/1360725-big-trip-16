import {RenderPosition, render, replace, remove} from './render.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import SiteSortingView from './view/site-sorting-view.js';
/*import PointAddFormView from './view/point-add-form-view.js';*/
import PointEditFormView from './view/point-edit-form-view.js';
import TripPointView from './view/trip-point-view.js';
import {generateTripPoint} from './mock/trip-point.js';
import EmptyPointListView from './view/emptyPointListView';
import TripListView from './view/trip-list-view';

const POINT_COUNT = 6;

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');
const siteTripList = new TripListView();

const renderTripPoint = (TripListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const tripPointEditComponent = new PointEditFormView(tripPoint);

  const replaceCardToForm = () => {
    replace(tripPointEditComponent, tripPointComponent);
  };

  const replaceFormToCard = () => {
    replace(tripPointComponent, tripPointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripPointEditComponent.setEditClickHandler(() => {
    replaceFormToCard();
  });

  tripPointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
  });

  tripPointEditComponent.setDeleteClickHandler(() => {
    remove(tripPointEditComponent);
  });

  render(TripListElement, tripPointComponent);
};

render(siteMenuElement, new SiteMenuView());
render(siteFilterElement, new FilterView());
render(siteTripInfo, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripEvents, new SiteSortingView(), RenderPosition.AFTERBEGIN);
render(siteTripEvents, siteTripList);

tripPoints.forEach((point) => renderTripPoint(siteTripList, point));

if (tripPoints.length ===0 ) {
  render(siteTripList, new EmptyPointListView());
}

/*
render(siteTripList, new PointAddFormView(tripPoints[tripPoints.length-1]).element);
*/
