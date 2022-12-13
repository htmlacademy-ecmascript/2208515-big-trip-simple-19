import PointListView from '../view/points-list-view';
import PointRouteView from '../view/route-point-view';
import PointEditView from '../view/point-edit-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';
import {render} from '../render';

export default class PointListPresenter {
  listComponent = new PointListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new PointEditView(), this.listComponent.getElement());
    render(new PointView, this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointRouteView(), this.listComponent.getElement());
    }
  }
}
