import { isEscEvent } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const closeEscNotification = (notification) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      body.removeChild(notification);
    }
  })
}

const closeClickNotification = (notification) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.className === notification.className && body.contains(notification)) {
      body.removeChild(notification);
    }
  })
}

const onSuccess = () => {
  const successNotification = successTemplate.cloneNode('true');
  body.appendChild(successNotification);

  const successButton = successNotification.querySelector('.success__button');

  successButton.addEventListener('click', ()=> {
    body.removeChild(successNotification);
  })

  closeEscNotification(successNotification);
  closeClickNotification(successNotification);
}

const onError = () => {
  const errorNotification = errorTemplate.cloneNode('true');
  body.appendChild(errorNotification);

  const errorButton = errorNotification.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    body.removeChild(errorNotification);
  })

  closeEscNotification(errorNotification);
  closeClickNotification(errorNotification);
}

const serverError = () => {
  let container = document.createElement('div');
  container.classList.add('server-error');
  let title = document.createElement('h2');
  container.appendChild(title);
  title.textContent = 'Ошибка сервера. Повторите позднее.';
  document.body.appendChild(container);
}

export {
  onSuccess,
  onError,
  serverError}
