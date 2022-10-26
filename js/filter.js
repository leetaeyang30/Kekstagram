// import { userPhotoData } from './main.js';
// import { getRandomArrayElement } from './util';

const ACTIVE_FILTER_BUTTON = 'img-filters__button--active';
// const NUMBER_OF_RANDOM = 10;
// const DEBOUNCE_TIMER = 500;

const filterSection = document.querySelector('.img-filters');
const filterButtons = document.getElementById('filter-buttons');
const defaultFilter = document.querySelector('#filter-default');
const randomtFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

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
  'default': console.log('hop'),
  'random': console.log('hey'),
  'discussed': console.log('lala ley'),
}

// const clearUsersPhotos = () => {

// }


// переключатель фильтров

filterButtons.addEventListener('click', (evt) => {
  if (evt.target.classList.contains(ACTIVE_FILTER_BUTTON)) {
    return;
  }
  resetActiveFilter();
  evt.target.classList.add(ACTIVE_FILTER_BUTTON);

  // if(evt.target === defaultFilter) FILTERS_MODES.default;
  // if(evt.target === randomFilter) FILTERS_MODES.random;
  // if(evt.target === discussedFilter) FILTERS_MODES.discussed;
})




export {showFilters};
