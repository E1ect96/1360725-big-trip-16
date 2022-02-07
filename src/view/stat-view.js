import SmartView from './smart-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {makeItemsUniq, sortUpToDown} from '../utils/utils';
import {countDurationSumByType, countPointsByType, countPriceSumByType} from '../utils/statistics';
import {convertDurationTime} from '../utils/convertor-time-duration';


const BAR_HEIGHT = 55;

const renderMoneyChat = (moneyCtx, points) => {
  // получаем массив типов маршрута
  const pointsTypes = points.map((point) => point.type);
  // получаем массив уникальных типов маршрута
  const uniqTypes = makeItemsUniq(pointsTypes);
  // получаем массив массивов из двух значений [тип, цена], сортируем его по убыванию
  const priceByTypes = uniqTypes.map((uniqType) => countPriceSumByType(points, uniqType)).sort(sortUpToDown);
  // получаем массив для labels
  const types = priceByTypes.map(([type]) => type.toUpperCase());
  // получаем массив для data
  const pricesData = priceByTypes.map(([, price]) => price);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: pricesData,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChat = (typeCtx, points) => {
  // получаем массив типов маршрута
  const pointsTypes = points.map((point) => point.type);
  // получаем массив уникальных типов маршрута
  const uniqTypes = makeItemsUniq(pointsTypes);
  // получаем массив массивов из двух значений [тип, колличество раз], сортируем его по убыванию
  const countByTypes = uniqTypes.map((uniqType) => countPointsByType(points, uniqType)).sort(sortUpToDown);
  // получаем массив для labels
  const types = countByTypes.map(([type]) => type.toUpperCase());
  // получаем массив для data
  const countedTypes = countByTypes.map(([, countedType]) => countedType);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: countedTypes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  // получаем массив типов маршрута
  const pointsTypes = points.map((point) => point.type);
  // получаем массив уникальных типов маршрута
  const uniqTypes = makeItemsUniq(pointsTypes);
  // получаем массив массивов из двух значений [тип, продолжительность], сортируем его по убыванию
  const durationByTypes = uniqTypes.map((uniqType) => countDurationSumByType(points, uniqType)).sort(sortUpToDown);
  // получаем массив для labels
  const types = durationByTypes.map(([type]) => type.toUpperCase());
  // получаем массив для data
  const durationData = durationByTypes.map(([ , duration]) => duration);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [
        {
          data: durationData,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 80,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${(convertDurationTime(val))}`,
        },
        responsive: false,
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

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
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(points) {
    super();

    this._data = points;
    this.#setCharts();
  }

  get template() {
    return createStatisticsViewTemplate();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  };

  restoreHandlers = () => {
    this.#setCharts();
  };

  #setCharts = () => {
    const points = this._data;
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this.#moneyChart = renderMoneyChat(moneyCtx, points);
    this.#timeChart = renderTimeChart(timeCtx, points);
    this.#typeChart = renderTypeChat(typeCtx, points);
  };
}
