import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';

const humanizePointDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizePointTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';
const humanizePointDateTime = (dateTime) => dateTime ? dayjs(dateTime).format(DATE_TIME_FORMAT) : '';

function isPointPlanned(dateFrom) {
  return dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortDay(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function ucFirst(str) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

export {humanizePointDate, humanizePointDateTime, humanizePointTime, isPointPlanned, sortDay, sortPrice, isDatesEqual, ucFirst};
