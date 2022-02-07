import {MIN_TWO_DIGIT_VALUE, HOUR_VALUE, DAY_VALUE} from './const';

const convertMinutes = (time) => {
  let minutes = `${time}M`;
  if (time < MIN_TWO_DIGIT_VALUE) {
    minutes = `0${time}M`;
  }
  return minutes;
};

const convertHoursAndMinutes = (time) => {
  let hours = `${Math.floor(time / HOUR_VALUE)}H`;
  const minutes = `${convertMinutes(time % HOUR_VALUE)}`;
  if (Math.floor(time / HOUR_VALUE) < MIN_TWO_DIGIT_VALUE) {
    hours = `0${Math.floor(time / HOUR_VALUE)}H`;
  }
  return `${hours} ${minutes}`;
};

const convertDayHoursAndMinutes = (time) => {
  let days = `${Math.floor(time / DAY_VALUE)}D`;
  const hoursMinutes = convertHoursAndMinutes(time % DAY_VALUE);
  if (Math.floor(time / DAY_VALUE) < MIN_TWO_DIGIT_VALUE) {
    days = `0${Math.floor(time / DAY_VALUE)}D`;
  }
  return `${days} ${hoursMinutes}`;
};

const convertDurationTime = (timeInMinutes) => {
  let duration = convertMinutes(timeInMinutes);
  if (timeInMinutes > HOUR_VALUE && timeInMinutes < DAY_VALUE) {
    duration = convertHoursAndMinutes(timeInMinutes);
  }
  if (timeInMinutes >= DAY_VALUE) {
    duration = convertDayHoursAndMinutes(timeInMinutes);
  }
  return duration;
};

export {convertDurationTime};
