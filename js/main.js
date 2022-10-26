import './editor.js';
import './effects.js';
import './validation.js';
import {usersPhotos} from './pictures.js';
import {getData} from './api.js'
import {setFormSubmit} from './editor.js';
import {onSuccess, onError, serverError} from './messages.js'

getData(
  (pictures) => usersPhotos(pictures),
  serverError,
);

setFormSubmit(
  () => onSuccess(),
  () => onError(),
);


