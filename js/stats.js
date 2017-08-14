'use strict';

window.renderStatistics = function (ctx, names, times) {
  var resultWindows = {
    'posX': 100,
    'posY': 10,
    'widght': 420,
    'height': 270,
    'frontColor': 'rgba(0, 0, 0, 0.7)',
    'backColor': 'rgba(256, 256, 256, 1.0)'
  };

  var histogramParams = {
    'histogramHeigth': 150,
    'posX': resultWindows['posX'] + 50,
    'posY': resultWindows['posY'] + 230,
    'barWidth': 40,
    'indent': 50,
    'paddingTop': 15,
    'currentPlayer': 'вы'
  };

  var docolorSaturation = function () {
    var colorSaturation = [0.3, 0.5, 0.7, 0.9, 1];
    var colorSaturationLength = colorSaturation.length;
    var saturation = Math.floor(Math.random() * colorSaturationLength);
    return colorSaturation[saturation];
  };

  var doColorFillStyle = function (playerTime, myNames) {
    var colorCurrentUser = 'rgba(255, 0, 0, 1)';
    var playerName = myNames[playerTime].toLowerCase();
    return playerName === histogramParams['currentPlayer'] ? colorCurrentUser : 'rgba(0, 0, 255,' + docolorSaturation() + ')';
  };

  var findMaxPlayerTime = function (myTimes) {
    var max = -1;
    var timesLength = myTimes.length;
    for (var playerResult = 0; playerResult < timesLength; playerResult++) {
      var time = myTimes[playerResult];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  var doWindow = function (myCtx, posX, posY, widght, height, color) {
    myCtx.fillStyle = color;
    myCtx.strokeRect(posX, posY, widght, height);
    doFillRect(ctx, posX, posY, widght, height);
  };

  var doFillText = function (myCtx, text, posX, posY) {
    myCtx.fillText(text, posX, posY);
  };

  var doFillRect = function (myCtx, posX, posY, widght, height) {
    myCtx.fillRect(posX, posY, widght, height);
  };

  doWindow(ctx, resultWindows['posX'] + 10, resultWindows['posY'] + 10, resultWindows['widght'], resultWindows['height'], resultWindows['frontColor']);
  doWindow(ctx, resultWindows['posX'], resultWindows['posY'], resultWindows['widght'], resultWindows['height'], resultWindows['backColor']);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  doFillText(ctx, 'Ура вы победили!', resultWindows['posX'] + 30, resultWindows['posY'] + 30);
  doFillText(ctx, 'Список результатов:', resultWindows['posX'] + 30, resultWindows['posY'] + 50);

  var max = findMaxPlayerTime(times);
  var histogramHeigth = histogramParams['histogramHeigth'];
  var step = histogramHeigth / (max - 0);
  var timesLength = times.length;

  ctx.textBaseline = 'baseline';
  for (var playerTime = 0; playerTime < timesLength; playerTime++) {
    ctx.fillStyle = doColorFillStyle(playerTime, names);
    doFillText(ctx, parseInt(times[playerTime], 10), histogramParams['posX'] + (histogramParams['barWidth'] + histogramParams['indent']) * playerTime, histogramParams['posY'] + (times[playerTime] * (-step)) - (histogramParams['paddingTop'] - 10));
    doFillRect(ctx, histogramParams['posX'] + (histogramParams['barWidth'] + histogramParams['indent']) * playerTime, histogramParams['posY'], histogramParams['barWidth'], times[playerTime] * (-step));
    doFillText(ctx, names[playerTime], histogramParams['posX'] + (histogramParams['barWidth'] + histogramParams['indent']) * playerTime, histogramParams['posY'] + histogramParams['paddingTop']);
  }
};
