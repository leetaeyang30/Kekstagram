import {getRandomNumber} from './util.js';

const  PHOTO_QTY = 25;

const COMMENT_TEMPLATES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Петр',
  'Николай',
  'Агафья',
  'Джон',
  'Ким Чен Ын',
  'Наттавин Сарават',
];

const DESCRIPTIONS = [
  'Наслаждаюсь красотами города.',
  'No filter.',
  'Я старался',
  'Не знаю зачем, но пусть будет',
  'Воспоминания',
];

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 1,
  MAX: 6,
};

const IdComments = {
  MIN: 1,
  MAX: 999,
};

// генерация комментариев

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

let commentsId = [];

const getCommentId = () => {
  let id = getRandomNumber(IdComments.MIN, IdComments.MAX);
  if (commentsId.includes(id)) {
    return getCommentId();
  }
  commentsId.push(id);
  return id;
};

const createComment = () => {
  return {
    id: getCommentId(),
    avatar: 'img/avatar-'+ getRandomNumber(Comments.MIN, Comments.MAX) +'.svg',
    message: getRandomArrayElement(COMMENT_TEMPLATES),
    name: getRandomArrayElement(NAMES),
  };
};

const createListOfComments = () => {
  const listOfComments = new Array();
  for (let i = 0; i <= getRandomNumber(Comments.MIN, Comments.MAX); i++) {
    listOfComments.push(createComment());
  }

  return listOfComments;
}


// создание коллекции фотографий

const createPhotoAlbum = () => {
  let album = [];
  for (let i = 1; i <= PHOTO_QTY; i++) {
    album.push({
      id: i,
      url: 'photos/'+ i +'.jpg',
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: createListOfComments(),
    });
  }

  return album;
};

export {createPhotoAlbum};
