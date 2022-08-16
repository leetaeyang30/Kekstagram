const INITIAL_EFFECT = 'effects__preview--none';

const Effects = {
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: 'grayscale',
    MEASURE: '',
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: 'sepia',
    MEASURE: '',
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    FILTER: 'invert',
    MEASURE: '%',
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    FILTER: 'blur',
    MEASURE: 'px',
  },
  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    FILTER: 'brightness',
    MEASURE: '',
  },
};

const effectsGallery = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview > img');
const rangeSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const rangeElement = document.querySelector('.img-upload__effect-level');

// создание ползунка

window.noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Оригинал фото

const resetEffect = () => {
  imagePreview.classList.add(INITIAL_EFFECT);
  imagePreview.style.filter = '';
  rangeElement.classList.add('hidden');
}

const setRangeSetting = (effect) => {
  rangeSlider.noUiSlider.updateOptions({
    range: {
      min: Effects[effect.value].MIN,
      max: Effects[effect.value].MAX,
    },
    start: Effects[effect.value].MAX,
    step: Effects[effect.value].STEP,
  })
};

const setFilter = (filterName, level) => {
  if (filterName === 'none') {
    imagePreview.style.filter = '';
    return;
  }

  imagePreview.style.filter = `${Effects[filterName].FILTER}(${level}${Effects[filterName].MEASURE})`;
};

for (let effect of effectsGallery) {
  effect.addEventListener('change', () => {
    imagePreview.className = `effects__preview--${effect.value}`;
    if (effect.value === 'none') {
      resetEffect();
    } else {
      rangeElement.classList.remove('hidden');
      setRangeSetting(effect);
      effectLevelInput.setAttribute('step', Effects[effect.value].STEP);
    }
    rangeSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelInput.value = values[handle];
      setFilter(effect.value, effectLevelInput.value);
    });
  });
}

export {
  resetEffect
};
