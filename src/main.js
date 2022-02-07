import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import SiteMenuView from './view/site-menu-view';
import ButtonAddEventView from './view/add-new-event-button-view';
import {render, RenderPosition} from './utils/render';
import {MenuItem} from './utils/const';

const POINT_COUNT = 6;

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

const pointsModel = new PointsModel();
pointsModel.points = tripPoints;
const filterModel = new FilterModel();


const siteBodyElement = document.querySelector('.page-body');
const siteMenuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const siteTripInfo = siteBodyElement.querySelector('.trip-main');
const siteTripEvents = siteBodyElement.querySelector('.trip-events');

const siteMenu = new SiteMenuView();
const newEventButton = new ButtonAddEventView();

render(siteMenuElement, siteMenu);
render(siteTripInfo, newEventButton, RenderPosition.BEFOREEND);


const tripPresenter = new TripPresenter(siteMenuElement, siteFilterElement, siteTripInfo, siteTripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      // Показать фильтры
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.TASKS:
      // Показать фильтры
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      // Скрыть фильтры
      // Скрыть доску
      // Показать статистику
      break;
  }
};

tripPresenter.init();
filterPresenter.init();

siteMenu.setMenuNavigationClickHandler(handleSiteMenuClick);
newEventButton.setNewEventClickHandler(handleSiteMenuClick);

/*
document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createTripPoint();
});
*/
