import PointListView from '../view/points-list-view';
import PointRouteView from '../view/route-point-view';
import PointEditView from '../view/point-edit-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';
import {render} from '../render';

export default class PointListPresenter {
  listComponent = new PointListView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new PointEditView(this.listPoints[1]), this.listComponent.getElement());
    render(new PointView, this.listComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointRouteView({point: this.listPoints[i]}), this.listComponent.getElement());
    }
  }
}
