import {FilterType} from './const';
import {isPointFuture, isPointPast} from './utils';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.time.start)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.time.start)),
};
