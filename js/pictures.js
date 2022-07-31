import { createPhotoAlbum } from './data.js';

const userPictureList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const userPhotos = createPhotoAlbum();

const userPicturesFragment = document.createDocumentFragment();

userPhotos.forEach( ({url, likes, comments}) => {
  const userElement = userPictureTemplate.cloneNode(true);
  userElement.querySelector('.picture__img').src = url;
  userElement.querySelector('.picture__likes').textContent = likes;
  userElement.querySelector('.picture__comments').textContent = comments.length;
  userPicturesFragment.appendChild(userElement);
});

userPictureList.appendChild(userPicturesFragment);

