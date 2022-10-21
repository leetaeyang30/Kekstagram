const URLS = {
  getDataLink: 'https://23.javascript.pages.academy/kekstagram/data',
  sendDataLink: 'https://23.javascript.pages.academy/kekstagram',
};

const getData = (success, error) => {
  fetch (URLS.getDataLink)
    .then((response) => response.json())
    .then((pictures) => success(pictures))
    .catch((err) => error(err));
};


const sendData = (body, success, error)=> {
  fetch(URLS.sendDataLink, {
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data',
    },
    body: body,
  })
    .then((response) => success(response))
    .catch(() => error());
}

export {sendData, getData}
