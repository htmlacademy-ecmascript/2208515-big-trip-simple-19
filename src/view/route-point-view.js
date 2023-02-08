import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, humanizePointTime} from '../utils/task.js';

function getCurrentOffers(selectedOffers, type, offersModel) {
  const typeInLowerCase = type.toLowerCase();
  const offersByType = offersModel.find((offer) =>offer.type.toLowerCase() === typeInLowerCase);
  return offersByType ? selectedOffers.map((id) => offersByType.offers.find((offer) => id === offer.id)) : '';
}

function createOffersTemplate(selectedOffers, type, offersModel) {
  const currentOffers = getCurrentOffers(selectedOffers, type, offersModel);

  return currentOffers.length !== 0 ? currentOffers.map((offer) => offer !== undefined ?
    `<li class="event__offer">
     <span class="event__offer-title">${offer.title}</span>
     &plus;&euro;&nbsp;
     <span class="event__offer-price">${offer.price}</span>
   </li>` : '').join('') :
    `<li class="event__offer">
     <span class="event__offer-title">No additional offers</span>
   </li>`;
}

function getCurrentDestination(point, destinationsModel) {
  return destinationsModel.find((destination) => destination.id === point.destination);
}

function createPointRouteTemplate (point, offersModel, destinationsModel) {
  const {dateFrom, dateTo, offers, type, basePrice} = point;
  const currentDestination = getCurrentDestination(point, destinationsModel);
  const pointDate = humanizePointDate(dateFrom);
  const pointStartTime = humanizePointTime(dateFrom);
  const pointEndTime = humanizePointTime(dateTo);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${pointDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${currentDestination ? currentDestination.name : ''}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${pointStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${pointEndTime}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${createOffersTemplate(offers, type, offersModel)}</ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}


export default class PointRouteView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;

  constructor({point, offers, destinations, onEditClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointRouteTemplate(this.#point, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
