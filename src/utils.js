import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const tripFullDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
export const tripDate = (date) => dayjs(date).format('MMM DD');
export const tripTime = (date) => dayjs(date).format('HH:MM');

dayjs.extend(duration);
export const durationEvent = (startTime, endTime) => dayjs.duration(dayjs(endTime).diff(dayjs(startTime))).format('HH MM');

export const calculateTotalCost = (Points) => {
  let totalCost = 0;
  Points.forEach((element) => {totalCost = totalCost + element.price;});
  return totalCost;
};
