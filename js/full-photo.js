import { isEscEvent } from './util.js';

const fullPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const cancelButton = fullPhoto.querySelector('.big-picture__cancel');
const commentCount = fullPhoto.querySelector('.social__comment-count');
const commentLoader = fullPhoto.querySelector('.comments-loader');
const commentsBlock = fullPhoto.querySelector('.social__comments');
const commentTemplate = fullPhoto.querySelector('#comment').content.querySelector('.social__comment');

const onPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    fullPhoto.classList.add('hidden');
    commentCount.classList.remove('hidden');
    commentLoader.classList.remove('hidden');
    body.classList.remove('modal-open');
  }
};

const openFullPhoto = () => {
  fullPhoto.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPhotoEscKeydown);
};

const renderComments = (comments) => {
  comments.forEach( (comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsBlock.appendChild(commentElement);
  })
};

const renderPhoto = (picture) => {
  fullPhoto.querySelector('.big-picture__img > img').src = picture.url;
  fullPhoto.querySelector('.likes-count').textContent = picture.likes;
  fullPhoto.querySelector('.comments-count').textContent = picture.comments.length;
  fullPhoto.querySelector('.social__caption').textContent = picture.description;

  renderComments(picture.comments);
};

const clearCommentsList = () => {
  commentsBlock.innerHTML = '';
}


const closeFullPhoto = () => {
  clearCommentsList();
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onPhotoEscKeydown);

};

cancelButton.addEventListener('click', closeFullPhoto);

export {
  openFullPhoto,
  renderPhoto,
  closeFullPhoto
};
