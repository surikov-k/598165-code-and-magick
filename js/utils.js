'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    convertRgb2Hex: function (rgb) {
      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
      function hex(x) {
        return ('0' + parseInt(x, 10).toString(16)).slice(-2);
      }
      return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
  };
})();
