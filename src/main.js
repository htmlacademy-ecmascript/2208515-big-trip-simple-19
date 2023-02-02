import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import PointListPresenter from './presenter/points-list-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const pointListPresenter = new PointListPresenter({
  listContainer: siteMainElement,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteHeaderElement);
pointListPresenter.init();
