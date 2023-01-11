const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const userPreview = document.querySelector('.img-upload__preview > img');


fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((format) => {
    return fileName.endsWith(format);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      userPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
