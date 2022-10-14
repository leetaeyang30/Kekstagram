import { formSubmit } from './fetch.js';
import { isEscEvent } from './util.js';
import { closeEdition } from './editor.js';
import { resetEffect, imagePreview } from './effects.js';
import { hashtagInput, commentField } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const closeEscNotification = (notification) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      body.removeChild(notification);
    }
  })
}

const closeClickNotification = (notification) => {
  document.onclick = (evt) => {
    if (evt.target.className != notification) {
      body.removeChild(notification);
    }
  }
}

const onSuccess = () => {
  const successNotification = successTemplate.cloneNode('true');
  body.appendChild(successNotification);

  const successButton = successNotification.querySelector('.success__button');

  successButton.addEventListener('click', ()=> {
    body.removeChild(successNotification);
  })

  closeEscNotification(successNotification);
  closeClickNotification(successNotification);
}

const onError = () => {
  const errorNotification = errorTemplate.cloneNode('true');
  body.appendChild(errorNotification);

  const errorButton = errorNotification.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    body.removeChild(errorNotification);
  })

  closeEscNotification(errorNotification);
  closeClickNotification(errorNotification);
}

uploadForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  formSubmit(uploadForm);
  closeEdition();
  imagePreview.removeAttribute('class');
  resetEffect();
  hashtagInput.value = '';
  commentField.value = '';
})

export {onSuccess, onError}
