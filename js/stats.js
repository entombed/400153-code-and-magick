'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var playerResult = 0; playerResult < times.length; playerResult++) {
    var time = times[playerResult];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeigth = 150;
  var step = histogramHeigth / (max - 0);
  var barWidth = 40;
  var indent = 50;
  var initialX = 100;
  var initialY = 250;
  var colorFillStyle;
  var colorSaturation = [0.3, 0.5, 0.7, 0.9, 1];
  var saturation;
  var stepColumn = indent;
  var paddingTop = 15;
  var colorCurrentUser = 'rgba(255, 0, 0, 1)';

  ctx.textBaseline = 'baseline';
  for (var playerTime = 0; playerTime < times.length; playerTime++) {
    if (names[playerTime] === 'Вы') {
      colorFillStyle = colorCurrentUser;
    } else {
      saturation = Math.floor(Math.random() * colorSaturation.length);
      colorFillStyle = 'rgba(0, 0, 255,' + colorSaturation[saturation] + ')';
    }
    ctx.fillStyle = colorFillStyle;
    ctx.fillText(parseInt(times[playerTime], 10), initialX + stepColumn, initialY + (times[playerTime] * (-step)) - (paddingTop - 10));
    ctx.fillRect(initialX + stepColumn, initialY, barWidth, times[playerTime] * (-step));
    ctx.fillText(names[playerTime], initialX + stepColumn, initialY + paddingTop);
    stepColumn += barWidth + indent;
  }
};
