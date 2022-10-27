import './editor.js';
import './effects.js';
import './validation.js';
import {renderUsersPhotos, clearUsersPhotos} from './pictures.js';
import {getData} from './api.js';
import {setFormSubmit} from './editor.js';
import {onSuccess, onError, serverError} from './messages.js';
import {showFilters, onSortClick} from './filter.js';

getData(
  (pictures) => {
    renderUsersPhotos(pictures),
    showFilters(),
    onSortClick(pictures, renderUsersPhotos, clearUsersPhotos)
  },
  serverError,
);

setFormSubmit(
  () => onSuccess(),
  () => onError(),
);


