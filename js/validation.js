import {checkMaxLength, isEscEvent} from './util.js';

const MAX_COMMENT = 140;

const HashtagSettings = {
  HASHTAGS_AMOUNT: 5,
  MIN: 1,
  MAX: 20,
}

const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const preventExit = (evt) => {
  if(isEscEvent(evt)){
    evt.preventDefault();
    evt.stopPropagation();
  }
}

hashtagInput.setAttribute('pattern', '#[A-Za-zА-Яа-яЁё0-9]');

hashtagInput.addEventListener('input', () => {
  let hashtags = hashtagInput.value.split(' ');

  if (hashtags.length - 1 >= HashtagSettings.HASHTAGS_AMOUNT) {
    hashtagInput.setCustomValidity('Не более 5 хэштегов.');
  }

  for (const hashtag of hashtags) {
    if(!hashtag.startsWith('#') && hashtag != '' ) {
      hashtagInput.setCustomValidity('Хэштег должен начинаться с #.');
    } else if (hashtag.length <= HashtagSettings.MIN && hashtag != '') {
      hashtagInput.setCustomValidity('Хэштег не может состоять только из #.');
    } else if (!checkMaxLength(hashtag, HashtagSettings.MAX)) {
      hashtagInput.setCustomValidity(`Длина хэштега не более ${HashtagSettings.MAX}.`);
    } else {
      hashtagInput.setCustomValidity('');
      return;
    }

    // не работает нихрена блин
    const isPatternInvalid = hashtag.validity.patternmismatch;
    if(isPatternInvalid) {
      hashtagInput.setCustomValidity('Хэштег должен содержать только цифры и числа');
    }

  }

  hashtagInput.reportValidity();
});

// Идея класс, но не работает
// hashtagInput.onfocus = (evt) => {
//   preventExit(evt);
// }

hashtagInput.addEventListener('keydown', preventExit);

commentField.addEventListener('input', ()=> {
  hashtagInput.setCustomValidity('');
  if(!checkMaxLength(commentField.value, MAX_COMMENT)) {
    commentField.setCustomValidity(`Длина комментария превышена на ${commentField.value.length - MAX_COMMENT}`);
  }

  commentField.reportValidity();
});

commentField.addEventListener('keydown', preventExit);

export {hashtagInput};
