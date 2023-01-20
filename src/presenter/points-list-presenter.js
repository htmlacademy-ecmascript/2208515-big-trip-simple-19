import PointListView from '../view/points-list-view.js';
import PointRouteView from '../view/route-point-view.js';
import PointEditView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import {render} from '../framework/render.js';

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointRouteView({
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClick: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm () {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceFormToPoint () {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
