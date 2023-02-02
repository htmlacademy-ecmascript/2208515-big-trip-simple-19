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

export {humanizePointDate, humanizePointDateTime, humanizePointTime, isPointPlanned};
