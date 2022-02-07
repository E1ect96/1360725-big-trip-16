import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomType = () => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateRandomDestination = () => {
  const cities = [
    'Berlin',
    'Moscow',
    'Tokyo',
    'Amsterdam',
    'Dresden',
    'Hamburg',
    'Paris',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateRandomDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  let description = '';
  for (let i = 0; i < getRandomInteger(1,5); i++) {
    description = `${description + descriptions[getRandomInteger(0, descriptions.length - 1)]  } `;
  }
  return description;
};

const generateRandomDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(1, maxDaysGap);
  const startDate = dayjs().add(daysGap, 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0,59), 'minute');
  const endDate = startDate.add(getRandomInteger(0, 12), 'hour');
  return {
    start: startDate.toDate(),
    end: endDate.toDate(),
  };
};

const generateRandomPrice = () => (
  getRandomInteger(1, 60) * 10
);

const tossACoin = () => {
  const coinResults = [true, false];
  return coinResults[getRandomInteger(0, 1)];
};

const generateAdditionalOption = () => ({
  id: nanoid(),
  type: generateRandomType(),
  price: (generateRandomPrice() / 10),
  isActive: tossACoin(),
});

const generateAdditionalOptions = (optionCount) => Array.from({length: optionCount}, generateAdditionalOption);

export const generateTripPoint = () => ({
  id: nanoid(),
  type: generateRandomType(),
  time: generateRandomDate(),
  price: generateRandomPrice(),
  additionalOptions: generateAdditionalOptions(getRandomInteger(0, 3)),
  destinationInfo: {
    description: generateRandomDescription(),
    name: generateRandomDestination(),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${  getRandomInteger(0, 255)}`,
        description: 'Chamonix parliament building',
      },
    ],
  },
  isFavorite: tossACoin(),
});


