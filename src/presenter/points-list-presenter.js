import PointListView from '../view/points-list-view';
import PointRouteView from '../view/route-point-view';
import PointEditView from '../view/edit-point-view';
import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import {render} from '../render';

export default class PointListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new PointListView();

  #listPoints = [];

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    if (!this.#listPoints.length) {
      render(new NoPointView(), this.#listContainer);
    } else {
      render(new SortView(), this.#listContainer);
      render(this.#listComponent, this.#listContainer);
      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i]);
      }
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointRouteView({point});
    const pointEditComponent = new PointEditView(point);

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#listComponent.element);
  }
}
