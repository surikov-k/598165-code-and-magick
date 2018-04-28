'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupBlock = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateName = function () {
  var firstName = getRandomElement(firstNames);
  var secondName = getRandomElement(secondNames);
  if (Math.round(Math.random())) {
    return firstName + ' ' + secondName;
  } else {
    return secondName + ' ' + firstName;
  }
};

var generateCharacter = function () {
  var character = {};
  character.name = generateName();
  character.coatColor = getRandomElement(coatColors);
  character.eyesColor = getRandomElement(eyesColors);

  return character;
};

var wizardsData = [];
for (var i = 0; i < 4; i++) {
  wizardsData[i] = generateCharacter();
}

var template = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var similarList = document.querySelector('.setup-similar-list');

var generateWizards = function () {
  var generatedWizards = [];
  for (i = 0; i < wizardsData.length; i++) {
    generatedWizards[i] = template.cloneNode(true);
    generatedWizards[i].querySelector('.setup-similar-label').textContent = wizardsData[i].name;
    generatedWizards[i].querySelector('.wizard-coat').style.fill = wizardsData[i].coatColor;
    generatedWizards[i].querySelector('.wizard-eyes').style.fill = wizardsData[i].eyesColor;
  }
  return generatedWizards;
};

var generateFragment = function () {

  var generatedWizards = generateWizards();
  var fragment = document.createDocumentFragment();

  for (i = 0; i < generatedWizards.length; i++) {
    fragment.appendChild(generatedWizards[i]);
  }
  return fragment;
};

similarList.appendChild(generateFragment());
document.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE
      && document.activeElement.name !== 'username') {
    closePopup();
  }
};

var openPopup = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupBlock.classList.add('hidden');
  setupBlock.removeAttribute('style');
  document.removeEventListener('keydown', onPopupEscPress);

};

setupOpen.addEventListener('click', function () {
  openPopup();
});


setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var setupWizardForm = document.querySelector('.setup-wizard-form');
var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
var fireball = setupWizardForm.querySelector('.setup-fireball-wrap');

var changeEyesColor = function () {
  wizardEyes.style.fill = getRandomElement(eyesColors);
  setupWizardForm.elements['eyes-color'].value = wizardEyes.style.fill;
};

function convertRgb2Hex(rgb) {
  rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
  function hex(x) {
    return ('0' + parseInt(x, 10).toString(16)).slice(-2);
  }
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

var changeFireballColor = function () {
  fireball.style.backgroundColor = getRandomElement(fireballColors);
  setupWizardForm.elements['fireball-color'].value = convertRgb2Hex(fireball.style.backgroundColor);
};

wizardEyes.addEventListener('click', changeEyesColor);
fireball.addEventListener('click', changeFireballColor);


var dialogHandle = setupBlock.querySelector('.upload');
var fileInput = setupBlock.querySelector('input[type=file]');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {

    fileInput.style.display = 'none';
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
    setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    fileInput.style.display = 'block';

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);


  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target.cloneNode(true);
    evt.dataTransfer.setData('text/plain', evt.target.alt);
    artifactsElement.style.outline = '2px dashed red';
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('dragstart', function (evt) {
  draggedItem = evt.target;
  evt.dataTransfer.setData('text/plain', evt.target.alt);
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';
  artifactsElement.removeAttribute('style');
  if (evt.target.tagName.toLowerCase() !== 'img') {
    evt.target.appendChild(draggedItem);
  }
  evt.preventDefault();
});

shopElement.addEventListener('dragend', function (evt) {
  artifactsElement.removeAttribute('style');
  evt.preventDefault();
});

artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});
