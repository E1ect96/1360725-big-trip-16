import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {generateTripPoint} from './mock/trip-point';

const POINT_COUNT = 6;

export const tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

export const tripFullDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
export const tripDate = (date) => dayjs(date).format('MMM DD');
export const tripTime = (date) => dayjs(date).format('HH:MM');

dayjs.extend(duration);
export const durationEvent = (startTime, endTime) => dayjs.duration(dayjs(endTime).diff(dayjs(startTime))).format('HH MM');

export const isPointFavorit = (favorit) => favorit
  ? 'event__favorite-btn--active'
  : '';

export const calculateTotalCost = (Points) => {
  let totalCost = 0;
  Points.forEach((element) => {totalCost = totalCost + element.price;});
  return totalCost;
};
