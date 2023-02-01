import PointListView from '../view/points-list-view.js';
import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, RenderPosition} from '../framework/render.js';

export default class PointListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #listComponent = new PointListView();
  #sortComponent = new SortView();
  #noTaskComponent = new NoPointView();
  #pointPresenter = new Map();

  #listPoints = [];

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    this.#renderPointsList();
  }

  #renderSort() {
    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noTaskComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(from, to) {
    this.#listPoints
      .slice(from, to)
      .forEach((task) => this.#renderPoint(task));
  }

  #renderPointsList() {
    if (!this.#listPoints.length) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      render(this.#listComponent, this.#listContainer);
      this.#renderPoints();
    }
  }

  #clearPointsList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
