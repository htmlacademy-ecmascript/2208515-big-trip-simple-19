import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, humanizePointTime} from '../utils/task.js';
import {mockDestinations, mockOffers} from '../mock/point.js';

function createPointRouteTemplate(point) {
  const {dateTo, dateFrom, basePrice, type, destination, offers} = point;

  const pointDate = humanizePointDate(dateFrom);
  const pointStartTime = humanizePointTime(dateFrom);
  const pointEndTime = humanizePointTime(dateTo);
  const pointDestination = mockDestinations.find((item) => destination === item.id);
  const pointTypeOffer = mockOffers.find((offer) => offer.type === type);
  const pointOffers = pointTypeOffer.offers
    .filter((offer) => offers.includes(offer.id));

  const offersTemplate = () => {
    if (!pointOffers.length) {
      return `<li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
      </li>`;
    } else {
      const template = pointOffers.map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
      return template;
    }
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${pointDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${pointStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${pointEndTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            ${offersTemplate()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointRouteView extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointRouteTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
