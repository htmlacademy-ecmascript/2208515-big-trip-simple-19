import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const humanizePointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizePointTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';
const humanizePointDateTime = (dateTime) => dateTime ? dayjs(dateTime).format(DATE_TIME_FORMAT) : '';

export {getRandomArrayElement, getRandomPositiveInteger, humanizePointDate, humanizePointDateTime, humanizePointTime};
