import { isEscEvent } from './util.js';
import { resetEffect} from './effects.js';
import { hashtagInput, commentField } from './validation.js';
import { sendData } from './api.js';


const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  INITIAL: '100%',
};

const body = document.querySelector('body');
const uploading = document.querySelector('#upload-file');
const editionOfPhoto = document.querySelector('.img-upload__overlay');
const closeEditionButton = document.querySelector('.img-upload__cancel');
const scaleInput = document.querySelector('.scale__control--value');

const onEditionEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    editionOfPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  }
}

const openEdition = ()=>{
  editionOfPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleInput.value = Scale.INITIAL;
  resetEffect();
  imagePreview.style.transform = `scale(${Scale.MAX/100})`;
  hashtagInput.focus();

  document.addEventListener('keydown', onEditionEscKeydown);
};

uploading.addEventListener('change', openEdition);

const closeEdition = () => {
  editionOfPhoto.classList.add('hidden');
  uploading.value = '';
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEditionEscKeydown);
};

closeEditionButton.addEventListener('click', closeEdition);

// Масштабирование

const smallerScaleControl = document.querySelector('.scale__control--smaller');
const biggerScaleControl = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview > img');

smallerScaleControl.addEventListener('click', () =>{
  let scaleValue = parseFloat(scaleInput.value, 10);
  scaleValue -= Scale.STEP;

  if(scaleValue <= Scale.MIN) {
    scaleValue = Scale.MIN;
  }

  scaleInput.value = scaleValue + '%';
  imagePreview.style.transform = `scale(${scaleValue/100})`;
});

biggerScaleControl.addEventListener('click', () =>{
  let scaleValue = parseFloat(scaleInput.value, 10);
  scaleValue += Scale.STEP;

  if(scaleValue >= Scale.MAX) {
    scaleValue = Scale.MAX;
  }

  scaleInput.value = scaleValue + '%';
  imagePreview.style.transform = `scale(${scaleValue/100})`
});

// Закрытие формы

const uploadForm = document.querySelector('.img-upload__form');

const setFormSubmit = (success, fail) => {
  uploadForm.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      success,
      fail,
    );
    closeEdition();
    imagePreview.removeAttribute('class');
    resetEffect();
    hashtagInput.value = '';
    commentField.value = '';
  })
}

export {setFormSubmit}
