import {FilterType} from '../const.js';
import {isPointPlanned} from './task.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointPlanned(point.dateFrom)),
};

export {filter};
