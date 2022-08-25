import {checkMaxLength, isEscEvent} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const PATTERN = /#[0-9A-Za-zА-Яа-яё]+/g;

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

hashtagInput.addEventListener('input', () => {
  let hashtags = hashtagInput.value.toLowerCase().trim().split(' ');

  if (hashtags.length - 1 >= HashtagSettings.HASHTAGS_AMOUNT) {
    hashtagInput.setCustomValidity('Не более 5 хэштегов.');
  }


  for (const hashtag of hashtags) {

    if(!hashtag.startsWith('#')) {
      hashtagInput.setCustomValidity('Хэштег должен начинаться с #.');
    } else if (hashtag.length <= HashtagSettings.MIN) {
      hashtagInput.setCustomValidity('Хэштег не может состоять только из #.');
    } else if (!checkMaxLength(hashtag, HashtagSettings.MAX)) {
      hashtagInput.setCustomValidity(`Длина хэштега не более ${HashtagSettings.MAX}.`);
    } else if (!PATTERN.test(hashtag)) {
      hashtagInput.setCustomValidity('Хэштег должен содержать только буквы и числа');
    }
    else {
      hashtagInput.setCustomValidity('');
    }
  }


  for(let i = 0; i < hashtags.length; i++) {
    for (let j = i +1 ; j < hashtags.length; j++) {
      if(hashtags[i] === hashtags[j]) {
        hashtagInput.setCustomValidity('Хэштеги не должны повторяться.');
      }
    }
  }

  hashtagInput.reportValidity();
});

hashtagInput.addEventListener('keydown', preventExit);

commentField.addEventListener('input', ()=> {

  if(!checkMaxLength(commentField.value, MAX_COMMENT_LENGTH)) {
    commentField.setCustomValidity(`Длина комментария превышена на ${commentField.value.length - MAX_COMMENT_LENGTH}`);
  } else {
    commentField.setCustomValidity('');
  }

  commentField.reportValidity();
});

commentField.addEventListener('keydown', preventExit);

export {hashtagInput};
