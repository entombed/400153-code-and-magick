'use strict';
var wizardsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardsSunames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardsCoatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardsEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var numbersWizards = 4;

var createWizardsPararameters = function (names, sunames, coatsColor, eyesColor) {
  var wizardsParameters = [];
  for (var i = 0; i < numbersWizards; i++) {
    wizardsParameters[i] = {
      'name': getRandomParameter(names),
      'suname': getRandomParameter(sunames),
      'coatColor': getRandomParameter(coatsColor),
      'eyeColor': getRandomParameter(eyesColor)
    };
  }
  return wizardsParameters;
};

var getRandomParameter = function (arrayParameters) {
  var arrayLength = arrayParameters.length;
  var arrayItem = Math.floor(Math.random() * arrayLength);
  return arrayParameters[arrayItem];
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.suname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
};

var wizards = createWizardsPararameters(wizardsNames, wizardsSunames, wizardsCoatsColors, wizardsEyesColors);
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
