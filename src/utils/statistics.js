import {durationEvent} from './utils';

export const countPriceSumByType = (points, eventType) => {
  const pricesSumByType = points.filter(({type}) => type === eventType).map(({price}) => price).reduce((a, b) => a + b);
  return [eventType, pricesSumByType];
};
export const countPointsByType = (points, eventType) => {
  const typesSumByType = points.filter(({ type }) => type === eventType).length;
  return [eventType, typesSumByType];
};

export const countDurationSumByType = (points, eventType) => {
  const durationsSumByType = points.filter(({ type }) => type === eventType).map(({time}) => durationEvent(time.start, time.end)).reduce((a, b) => a + b);
  return [eventType, durationsSumByType];
};
