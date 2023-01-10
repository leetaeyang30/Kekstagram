import { isEscEvent } from './util.js';

const INITIAL_COMMENTS = 5;

const fullPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const cancelButton = fullPhoto.querySelector('.big-picture__cancel');
const commentsCountDisplay = fullPhoto.querySelector('.social__comment-count');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const commentsBlock = fullPhoto.querySelector('.social__comments');
const commentTemplate = fullPhoto.querySelector('#comment').content.querySelector('.social__comment');

const onPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    fullPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openFullPhoto = () => {
  fullPhoto.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPhotoEscKeydown);
};

const createComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

let commentsCount = INITIAL_COMMENTS;

const onShowMoreCommentsBtnClick = (comments) => {
  return () => renderComments(comments);
}

const renderComments = (comments) => {
  commentsCount = (commentsCount > comments.length) ? comments.length : commentsCount;
  commentsCountDisplay.innerHTML = `${commentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;

  const commentsListFragment = document.createDocumentFragment();
  let commentsToShow = comments.slice(0, commentsCount);
  commentsToShow.forEach( (comment) => {
    commentsListFragment.appendChild(createComment(comment));
  });
  commentsBlock.innerHTML = '';

  commentsBlock.appendChild(commentsListFragment);

  if (commentsCount === comments.length) {
    commentsLoader.classList.add('hidden');
  } else (
    commentsLoader.addEventListener('click', onShowMoreCommentsBtnClick(comments), {once: true})
  )

  commentsCount += INITIAL_COMMENTS;
};

const renderPhoto = (picture) => {
  fullPhoto.querySelector('.big-picture__img > img').src = picture.url;
  fullPhoto.querySelector('.likes-count').textContent = picture.likes;
  fullPhoto.querySelector('.social__caption').textContent = picture.description;

  renderComments(picture.comments);
};

const clearCommentsList = () => {
  commentsBlock.innerHTML = '';
  commentsCount = INITIAL_COMMENTS;
}


const closeFullPhoto = () => {
  clearCommentsList();
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoEscKeydown);
};

cancelButton.addEventListener('click', closeFullPhoto);

export {
  openFullPhoto,
  renderPhoto
};
