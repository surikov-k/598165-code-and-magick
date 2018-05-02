'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;

  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 90;
  var SHADOW_OFFSET = 10;
  var PADDING_BOTTOM = 12;
  var PADDING_LEFT = 54;
  var LINE_HEIGHT = 18;
  var BAR_WIDTH = 40;
  var MAX_BAR_HEIGHT = 150;
  var TITLE_Y_ORIGIN = 60;

  var textXOrigin = CLOUD_X + PADDING_LEFT + BAR_WIDTH / 2;
  var textYOrigin = CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM;

  var barInitXOrigin = CLOUD_X + PADDING_LEFT;
  var barInitYOrigin = CLOUD_Y + CLOUD_HEIGHT - PADDING_BOTTOM - LINE_HEIGHT;

  var renderCloud = function (ctx, xOrigin, yOrigin, color) {

    var xScale = CLOUD_WIDTH / 420;
    var yScale = CLOUD_HEIGHT / 270;

    var x = function (abscissa) {
      return (abscissa + xOrigin) * xScale;
    };

    var y = function (ordinate) {
      return (ordinate + yOrigin) * yScale;
    };

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x(0), y(147));

    ctx.bezierCurveTo(x(0), y(125), x(8), y(127), x(17), y(126));
    ctx.bezierCurveTo(x(19), y(111), x(30), y(98), x(45), y(96));
    ctx.bezierCurveTo(x(35), y(74), x(63), y(37), x(97), y(59));
    ctx.bezierCurveTo(x(101), y(46), x(118), y(33), x(138), y(38));
    ctx.bezierCurveTo(x(155), y(15), x(180), y(0), x(210), y(0));
    ctx.bezierCurveTo(x(242), y(0), x(268), y(17), x(282), y(42));
    ctx.bezierCurveTo(x(302), y(25), x(341), y(36), x(338), y(73));
    ctx.bezierCurveTo(x(345), y(74), x(353), y(80), x(357), y(87));
    ctx.bezierCurveTo(x(387), y(79), x(407), y(106), x(401), y(126));
    ctx.bezierCurveTo(x(412), y(127), x(420), y(136), x(420), y(147));
    ctx.lineTo(x(420), y(250));
    ctx.bezierCurveTo(x(420), y(260), x(410), y(270), x(400), y(270));
    ctx.lineTo(x(21), y(270));
    ctx.bezierCurveTo(x(10), y(270), x(0), y(260), x(0), y(250));
    ctx.lineTo(x(0), y(147));

    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.stroke();
  };

  var getMaxElement = function (array) {
    var maxElement = array.length ? 0 : array[0];

    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {

    renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

    ctx.fillStyle = '#000';
    ctx.font = '16px "PT Mono"';
    ctx.textAlign = 'center';

    ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + TITLE_Y_ORIGIN);
    ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + TITLE_Y_ORIGIN + LINE_HEIGHT);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var time = Math.round(times[i]);
      var barHeight = MAX_BAR_HEIGHT * time / maxTime;
      var barXOrigin = barInitXOrigin + GAP * i;
      var barYOrigin = barInitYOrigin - barHeight;

      ctx.fillStyle = '#000';
      ctx.fillText(names[i], textXOrigin + GAP * i, textYOrigin);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var shadeOfBlue = Math.floor(Math.random() * 100);
        ctx.fillStyle = 'hsl(234, ' + shadeOfBlue + '%, 40%)';
      }

      ctx.fillRect(barXOrigin, barYOrigin, BAR_WIDTH, barHeight);
      ctx.fillStyle = '#fff';
      ctx.fillText(time, textXOrigin + GAP * i, textYOrigin - barHeight);
    }
  };
})();
