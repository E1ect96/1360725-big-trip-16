import SmartView from './smart-view';

const createStatisticsViewTemplate = () => `
  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>
`;

export default class StatisticsView extends SmartView {

  constructor(points) {
    super();

    this._data = points;
  }

  get template() {
    return createStatisticsViewTemplate();
  }

}
