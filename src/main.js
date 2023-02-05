import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view';
import PointListPresenter from './presenter/points-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const mainEventElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const pointListPresenter = new PointListPresenter({
  listContainer: siteMainElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, mainEventElement);

filterPresenter.init();
pointListPresenter.init();
