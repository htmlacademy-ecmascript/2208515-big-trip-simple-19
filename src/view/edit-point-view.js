import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizePointDateTime} from '../utils/task.js';
import {mockDestinations, mockOffers} from '../mock/point.js';

function createDestinationListTemplate (destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createDestinationName (currentDestination) {
  if (currentDestination !== null) {
    return mockDestinations.find(({id}) => currentDestination === id)?.name;
  } else {
    return '';
  }
}

function createDestinationDescription (currentDestination) {
  if (currentDestination !== null) {
    return mockDestinations.find(({id}) => currentDestination === id)?.description;
  } else {
    return '';
  }
}

function createPointEditTemplate(point) {
  const {dateTo, dateFrom, basePrice, type, destination, offers, id} = point;

  const pointStartDateTime = humanizePointDateTime(dateFrom);
  const pointEndDateTime = humanizePointDateTime(dateTo);

  function offersTemplate(checkingOffers, currentType) {
    const pointTypeOffer = mockOffers.find((offer) => offer.type === currentType);
    return pointTypeOffer.offers.map((offer) =>
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${offer.id}" type="checkbox" name=event-offer-${offer.title} ${checkingOffers.includes(offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offer.type}-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
        `).join('');
  }

  const offersByType = mockOffers
    .map((offer) =>
      `<div class="event__type-item">
        <input id="event-type-${offer.type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
        <label class="event__type-label  event__type-label--${offer.type.toLowerCase()}" for="event-type-${offer.type.toLowerCase()}-1">${offer.type}</label>
      </div>
    `).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${offersByType}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${createDestinationName(destination)}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${createDestinationListTemplate(mockDestinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${pointStartDateTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${pointEndDateTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersTemplate(offers, type)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${createDestinationDescription(destination)}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormClick = null;

  constructor({point, onFormSubmit, onFormClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClick = onFormClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeToggleHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationToggleHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formClickHandler = () => this.#handleFormClick();

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: [],
      type: evt.target.value,
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    let valueDestinationId = null;
    mockDestinations.map((destination) => {
      if (destination.name === evt.target.value) {
        valueDestinationId = destination.id;
      }
    });

    this.updateElement({
      destination: valueDestinationId,
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }
}
