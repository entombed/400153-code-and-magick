'use strict';

var colorCurrentUser = 'rgba(255, 0, 0, 1)';
var colorFillStyle;
var stepColumn;
var max;
var histogramHeigth;
var step;
var timesLength;
var resultWindows = {
  'posX': 110,
  'posY': 20,
  'widght': 420,
  'height': 270
};
var histogramParams = {
  'histogramHeigth': 150,
  'posX': resultWindows['posX'] - 10,
  'posY': resultWindows['posY'] + 230,
  'barWidth': 40,
  'indent': 50,
  'paddingTop': 15
};

var docolorSaturation = function () {
  var colorSaturation = [0.3, 0.5, 0.7, 0.9, 1];
  var colorSaturationLength = colorSaturation.length;
  var saturation = Math.floor(Math.random() * colorSaturationLength);
  return colorSaturation[saturation];
};
var doColorFillStyle = function (playerTime, names) {
  if (names[playerTime] === 'Вы') {
    colorFillStyle = colorCurrentUser;
  } else {
    colorFillStyle = 'rgba(0, 0, 255,' + docolorSaturation() + ')';
  }
  return colorFillStyle;
};

var findMaxPlayerTime = function (times) {
  max = -1;
  timesLength = times.length;
  for (var playerResult = 0; playerResult < timesLength; playerResult++) {
    var time = times[playerResult];
    if (time > max) {
      max = time;
    }
  }
  return max;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(resultWindows['posX'], resultWindows['posY'], resultWindows['widght'], resultWindows['height']);
  ctx.fillRect(resultWindows['posX'], resultWindows['posY'], resultWindows['widght'], resultWindows['height']);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(resultWindows['posX'] - 10, resultWindows['posY'] - 10, resultWindows['widght'], resultWindows['height']);
  ctx.fillRect(resultWindows['posX'] - 10, resultWindows['posY'] - 10, resultWindows['widght'], resultWindows['height']);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', resultWindows['posX'] + 20, resultWindows['posY'] + 20);
  ctx.fillText('Список результатов:', resultWindows['posX'] + 20, resultWindows['posY'] + 40);

  max = findMaxPlayerTime(times);
  histogramHeigth = histogramParams['histogramHeigth'];
  step = histogramHeigth / (max - 0);
  timesLength = times.length;
  stepColumn = histogramParams['indent'];

  ctx.textBaseline = 'baseline';
  for (var playerTime = 0; playerTime < timesLength; playerTime++) {
    ctx.fillStyle = doColorFillStyle(playerTime, names);
    ctx.fillText(parseInt(times[playerTime], 10), histogramParams['posX'] + stepColumn, histogramParams['posY'] + (times[playerTime] * (-step)) - (histogramParams['paddingTop'] - 10));
    ctx.fillRect(histogramParams['posX'] + stepColumn, histogramParams['posY'], histogramParams['barWidth'], times[playerTime] * (-step));
    ctx.fillText(names[playerTime], histogramParams['posX'] + stepColumn, histogramParams['posY'] + histogramParams['paddingTop']);
    stepColumn += histogramParams['barWidth'] + histogramParams['indent'];
  }
};
