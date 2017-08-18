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

  var font = '16px PT Mono';
  var style = '#000';

  var getRandomColor = function (min, max) {
    var color = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    return 'rgba(0, ' + color + ', 189, 1)';
  };

  var doColorFillStyle = function (playerTime, localNames) {
    var colorCurrentUser = 'rgba(255, 0, 0, 1)';
    var playerName = localNames[playerTime].toLowerCase();
    return playerName === histogramParams['currentPlayer'] ? colorCurrentUser : getRandomColor(0, 150);
  };

  var getMaxPlayerTime = function (localTimes) {
    var max = -1;
    var timesLength = localTimes.length;
    for (var playerResult = 0; playerResult < timesLength; playerResult++) {
      var time = localTimes[playerResult];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  var doWindow = function (localCtx, posX, posY, widght, height, color) {
    localCtx.fillStyle = color;
    localCtx.strokeRect(posX, posY, widght, height);
    doFillRect(ctx, posX, posY, widght, height);
  };

  var doFillText = function (localCtx, text, posX, posY, localStyle, localFont) {
    localCtx.fillStyle = localStyle;
    localCtx.font = localFont;
    localCtx.fillText(text, posX, posY);
  };

  var doFillRect = function (localCtx, posX, posY, widght, height) {
    localCtx.fillRect(posX, posY, widght, height);
  };

  doWindow(ctx, resultWindows['posX'] + 10, resultWindows['posY'] + 10, resultWindows['widght'], resultWindows['height'], resultWindows['frontColor']);
  doWindow(ctx, resultWindows['posX'], resultWindows['posY'], resultWindows['widght'], resultWindows['height'], resultWindows['backColor']);

  doFillText(ctx, 'Ура вы победили!', resultWindows['posX'] + 30, resultWindows['posY'] + 30, style, font);
  doFillText(ctx, 'Список результатов:', resultWindows['posX'] + 30, resultWindows['posY'] + 50, style, font);

  var max = getMaxPlayerTime(times);
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
