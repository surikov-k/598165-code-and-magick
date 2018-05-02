'use strict';
(function () {
  var dialogHandle = window.setupBlock.querySelector('.upload');
  var fileInput = window.setupBlock.querySelector('input[type=file]');

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

      window.setupBlock.style.top = (window.setupBlock.offsetTop - shift.y) + 'px';
      window.setupBlock.style.left = (window.setupBlock.offsetLeft - shift.x) + 'px';

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
})();
