const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkMaxLength = (string, maxLength) => {
  let stringLength = string.trim().length;

  return stringLength <= maxLength;
};

export {
  getRandomNumber,
  checkMaxLength
}
