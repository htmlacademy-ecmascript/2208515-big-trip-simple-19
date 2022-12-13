import {render} from './render';
import FilterView from './view/filter-view';
import PointListPresenter from './presenter/points-list-presenter';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointListPresenter = new PointListPresenter({listContainer: siteMainElement});

render(new FilterView(), siteHeaderElement);
pointListPresenter.init();
