'use strict';
(function () {
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

  var generateName = function () {
    var firstName = window.utils.getRandomElement(firstNames);
    var secondName = window.utils.getRandomElement(secondNames);
    if (Math.round(Math.random())) {
      return firstName + ' ' + secondName;
    } else {
      return secondName + ' ' + firstName;
    }
  };

  var generateCharacter = function () {
    var character = {};
    character.name = generateName();
    character.coatColor = window.utils.getRandomElement(coatColors);
    character.eyesColor = window.utils.getRandomElement(eyesColors);

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

  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
  var fireball = setupWizardForm.querySelector('.setup-fireball-wrap');

  var changeEyesColor = function () {
    wizardEyes.style.fill = window.utils.getRandomElement(eyesColors);
    setupWizardForm.elements['eyes-color'].value = wizardEyes.style.fill;
  };

  var changeFireballColor = function () {
    fireball.style.backgroundColor = window.utils.getRandomElement(fireballColors);
    setupWizardForm.elements['fireball-color'].value = window.utils.convertRgb2Hex(fireball.style.backgroundColor);
  };

  wizardEyes.addEventListener('click', changeEyesColor);
  fireball.addEventListener('click', changeFireballColor);
})();

