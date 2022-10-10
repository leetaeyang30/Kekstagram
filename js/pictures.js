import { openFullPhoto, renderPhoto } from './full-photo.js';

const userPictureList = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const usersPhotos = (users) => {

  const userPicturesFragment = document.createDocumentFragment();

  users.forEach( (picture) => {
    const userElement = userPictureTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = picture.url;
    userElement.querySelector('.picture__likes').textContent = picture.likes;
    userElement.querySelector('.picture__comments').textContent = picture.comments.length;
    userPicturesFragment.appendChild(userElement);

    userElement.addEventListener('click', () => {
      openFullPhoto();
      renderPhoto(picture);
    });
  });

  userPictureList.appendChild(userPicturesFragment);

}


export {usersPhotos};

