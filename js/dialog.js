'use strict';

(function () {

  window.setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setupBlock.querySelector('.setup-close');
  var onPopupEscPress = function (evt) {
    if (document.activeElement.name !== 'username') {
      window.utils.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    window.setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.setupBlock.classList.add('hidden');
    window.setupBlock.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);

  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });


  setupOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });
})();
