const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const checkMaxLength = (string, maxLength) => {
  return string.trim().length <= maxLength;
};

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

const isEscEvent = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
};



export {
  getRandomNumber,
  getRandomArrayElement,
  checkMaxLength,
  isEscEvent
}
