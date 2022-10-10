import { formSubmit } from './fetch.js';
import { closeEdition } from './editor.js';

const uploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

const onSuccess = () => {
  const successNotification = successTemplate.cloneNode('true');
  successFragment.appendChild(successNotification);

  const successButton = successNotification.querySelector('.success__button');
  
  successButton.addEventListener('click', ()=> {
    successFragment.removeChild(successNotification);
  })

}

const onError = () => {
  const errorNotification = errorTemplate.cloneNode('true');
  errorFragment.appendChild(errorNotification);

  const errorButton = errorNotification.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    errorFragment.removeChild(errorNotification);
  })
}

uploadForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  formSubmit(uploadForm);
  closeEdition();
})

export {onSuccess, onError}
