import AbstractView from './abstract-view';
import {MenuItem} from '../utils/const';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
     <a class="trip-tabs__btn  trip-tabs__btn--active" href="" id="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
     <a class="trip-tabs__btn" href="" id="${MenuItem.STATS}">${MenuItem.STATS}</a>
   </nav>`
);

export default class SiteMenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }

  setMenuNavigationClickHandler = (callback) => {
    this._callback.menuNavigationClick = callback;
    this.element.addEventListener('click', this.#menuNavigationClickHandler);
  };

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[id=${menuItem}]`);

    if (item !== null) {
      item.classList.toggle('trip-tabs__btn--active');
    }
  };

  #menuNavigationClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuNavigationClick(evt.target.id);
  };
}
