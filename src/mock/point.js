import {nanoid} from 'nanoid';
import {getRandomArrayElement, getRandomPositiveInteger} from '../utils/common.js';
import {EVENT_TYPES, CITIES, DESCRIPTIONS} from '../const';

const mockDestinations = [
  {
    id: 1,
    description: Array.from({length: getRandomPositiveInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTIONS)),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=100',
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: 'https://loremflickr.com/248/152?random=101',
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  },
  {
    id: 2,
    description: Array.from({length: getRandomPositiveInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTIONS)),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=200',
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: 'https://loremflickr.com/248/152?random=155',
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  },
  {
    id: 3,
    description: Array.from({length: getRandomPositiveInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTIONS)),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: 'https://loremflickr.com/248/152?random=200',
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  },
  {
    id: 4,
    description: Array.from({length: getRandomPositiveInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTIONS)),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  },
  {
    id: 5,
    description: Array.from({length: getRandomPositiveInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTIONS)),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  },
  {
    id: 6,
    description: Array.from({length: getRandomPositiveInteger(1, 5)}, () => getRandomArrayElement(DESCRIPTIONS)),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=300',
        description: getRandomArrayElement(DESCRIPTIONS),
      }
    ]
  },
];

const mockOffers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 100
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 3,
        title: 'Upgrade to a business class',
        price: 120
      },
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 100
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 3,
        title: 'Upgrade to a business class',
        price: 120
      },
    ]
  },
  {
    type:   'Flight',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 110
      },
      {
        id: 2,
        title: 'Add lunch',
        price: 180
      },
      {
        id: 3,
        title: 'Add dinner',
        price: 150
      },
    ]
  },
  {
    type:   'Sightseeing',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 110
      },
      {
        id: 2,
        title: 'Add lunch',
        price: 180
      },
      {
        id: 3,
        title: 'Add dinner',
        price: 150
      },
    ]
  },
  {
    type:   'Restaurant',
    offers: [
      {
        id: 1,
        title: 'Drink wine',
        price: 110
      },
      {
        id: 2,
        title: 'Exclusive dishes',
        price: 180
      },
      {
        id: 3,
        title: 'Try national dishes',
        price: 150
      },
    ]
  },
  {
    type:   'Train',
    offers: [
      {
        id: 1,
        title: 'Drink wine',
        price: 110
      },
      {
        id: 2,
        title: 'Exclusive dishes',
        price: 180
      },
      {
        id: 3,
        title: 'Try national dishes',
        price: 150
      },
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 100
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 3,
        title: 'Upgrade to a business class',
        price: 120
      },
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 100
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 3,
        title: 'Upgrade to a business class',
        price: 120
      },
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a comfort class',
        price: 100
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 120
      },
    ]
  },
];

const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: '2022-07-10T22:55:56.845Z',
    dateTo: '2022-07-11T11:22:13.375Z',
    destination: getRandomPositiveInteger(1, 6),
    offers: [1, 2, 3],
    type: getRandomArrayElement(EVENT_TYPES),
  },
  {
    basePrice: 1300,
    dateFrom: '2023-01-04T01:55:56.845Z',
    dateTo: '2023-01-04T01:22:13.375Z',
    destination: getRandomPositiveInteger(1, 6),
    offers: [1, 2, 3],
    type: getRandomArrayElement(EVENT_TYPES),
  },
  {
    basePrice: 1500,
    dateFrom: '2018-09-10T22:55:56.845Z',
    dateTo: '2018-09-11T11:22:13.375Z',
    destination: getRandomPositiveInteger(1, 6),
    offers: [2, 3],
    type: getRandomArrayElement(EVENT_TYPES),
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomPoint, mockDestinations, mockOffers};
