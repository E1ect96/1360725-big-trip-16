import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const tripFullDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
export const tripDate = (date) => dayjs(date).format('MMM DD');
export const tripTime = (date) => dayjs(date).format('HH:MM');

export const isPointFuture = (dateStart) => dateStart && dayjs().isBefore(dateStart);
export const isPointPast = (dateStart) => dateStart && dayjs().isAfter(dateStart);

dayjs.extend(duration);
export const durationEvent = (startTime, endTime) => dayjs.duration(dayjs(endTime).diff(dayjs(startTime))).format('HH MM');

export const calculateTotalCost = (Points) => {
  let totalCost = 0;
  Points.forEach((element) => {
    totalCost = totalCost + element.price;
    element.additionalOptions.forEach((option) => {
      if (option.isActive) {
        totalCost = totalCost + option.price;
      }
    });
  });

  return totalCost;
};

export const defaultPoint = () => ({
  id: 0,
  type: 'train',
  time: {
    start: new Date(),
    end: new Date(),
  },
  price: '',
  additionalOptions: [],
  destinationInfo: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
});
