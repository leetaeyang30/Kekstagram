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

const shuffle = (arr) => {
  let j;
  let temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

export {
  getRandomNumber,
  getRandomArrayElement,
  checkMaxLength,
  isEscEvent,
  shuffle
}
