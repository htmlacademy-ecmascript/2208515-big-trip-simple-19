import {render} from './render';
import FilterView from './view/filter-view';
import PointListPresenter from './presenter/points-list-presenter';
import PointsModel from './model/points-model';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const pointListPresenter = new PointListPresenter({
  listContainer: siteMainElement,
  pointsModel,
});

render(new FilterView(), siteHeaderElement);
pointListPresenter.init();
