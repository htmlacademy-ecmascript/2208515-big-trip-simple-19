import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointListPresenter from './presenter/points-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import PointsApiService from './api/point-api-service.js';
import OffersApiService from './api/offers-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';

const AUTHORIZATION = 'Basic er643jdvbaw';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple/';

const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const filterModel = new FilterModel();

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const pointListPresenter = new PointListPresenter({
  listContainer: tripEventsElement,
  pointsModel,
  filterModel,
  destinationsModel,
  offersModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.removeAttribute('disabled');
}

function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonComponent.element.setAttribute('disabled', 'disabled');
}

filterPresenter.init();
pointListPresenter.init();
offersModel.init();
destinationsModel.init();

pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMainElement);
  });
