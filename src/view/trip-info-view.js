import {calculateTotalCost} from '../utils/utils';
import AbstractView from './abstract-view';
import PointsModel from '../model/points-model';

const createTripInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalCost(PointsModel.points)}</span>
    </p>
  </section>`
);

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
