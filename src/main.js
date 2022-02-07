import {generateTripPoint} from './mock/trip-point.js';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import SiteMenuView from './view/site-menu-view';
import ButtonAddEventView from './view/add-new-event-button-view';
import {remove, render, RenderPosition} from './utils/render';
import {MenuItem} from './utils/const';
import StatisticsView from './view/stat-view';
import ApiService from './api-service';

const POINT_COUNT = 6;
const AUTHORIZATION = 'Basic e1ect96';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

console.log('Референс', tripPoints);

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
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


const tripPresenter = new TripPresenter(siteTripInfo, siteTripEvents, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel);

const handleNewEventFormClose = () => {
  newEventButton.element.disabled = false;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      remove(statisticsComponent);
      // Показать фильтры
      filterPresenter.destroy();
      filterPresenter.init();
      // Показать eventbox
      tripPresenter.destroy();
      tripPresenter.init();
      // Показать форму добавления новой задачи
      tripPresenter.createTripPoint(handleNewEventFormClose);
      // Заблокировать конопки добавления
      newEventButton.setMenuItem();
      break;
    case MenuItem.TABLE:
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      // Скрыть статистику
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      filterPresenter.destroy();
      tripPresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(siteTripEvents, new StatisticsView(pointsModel.points));
      break;
  }
};

tripPresenter.init();
filterPresenter.init();

siteMenu.setMenuNavigationClickHandler(handleSiteMenuClick);
newEventButton.setNewEventClickHandler(handleSiteMenuClick);
