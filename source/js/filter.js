import {shuffle} from './util.js';
import _ from 'lodash';

const ACTIVE_FILTER_BUTTON = 'img-filters__button--active';
const AMOUNT_OF_RANDOM = 10;
const DEBOUNCE_DELAY = 500;

const filterSection = document.querySelector('.img-filters');
const filterButtons = document.getElementById('filter-buttons');


// показать секцию фильтров

const showFilters = () => {
  filterSection.classList.remove('img-filters--inactive');
};

// сброс активного фильтра

const resetActiveFilter = () => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  activeFilterButton.classList.remove('img-filters__button--active');
};

// отбор фотографий
const filterModes = {
  'filter-default': (pictures) => pictures,
  'filter-random': (pictures) => {
    const copy = pictures.slice();
    return shuffle(copy).slice(0, AMOUNT_OF_RANDOM);
  },
  'filter-discussed': (pictures) => {
    const photos = pictures.slice();
    const compareComments = (photoA, photoB) => {
      return photoB.comments.length - photoA.comments.length;
    }
    return photos.sort(compareComments);

  },
}

const sortPhotos = _.debounce((clear, render, pictures, mode) => {
  clear();
  const sortFunction = filterModes[mode];
  render(sortFunction(pictures));
}, DEBOUNCE_DELAY);

// переключатель сортировки

const onSortClick = (pictures, render, clear) => {
  filterButtons.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(ACTIVE_FILTER_BUTTON)) {
      return;
    }
    resetActiveFilter();
    evt.target.classList.add(ACTIVE_FILTER_BUTTON);
    let id = evt.target.id;
    sortPhotos(clear, render, pictures, id);
  })
}




export {showFilters, onSortClick};
