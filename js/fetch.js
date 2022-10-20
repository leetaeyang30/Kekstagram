import {usersPhotos} from './pictures.js';
import {serverError} from './util.js';
import {onSuccess, onError} from './form-submit.js';

fetch ('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => usersPhotos(pictures))
  .catch((err) => serverError(err));


const formSubmit = (form)=> {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data',
    },
    body: new FormData(form),
  })
    .then((response) => onSuccess(response))
    .catch(() => onError());
}

export {formSubmit}
