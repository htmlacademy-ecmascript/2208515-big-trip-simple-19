import {getRandomPoint} from '../mock/point';

const POINTS_COUNT = 10;

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }
}
