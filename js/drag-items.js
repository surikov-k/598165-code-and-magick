'use strict';

(function () {

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
})();

