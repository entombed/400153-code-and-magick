'use strict';
var wizardsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardsSunames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardsCoatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardsEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var numbersWizards = 4;
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var keyCodes = {
  escape: 27,
  enter: 13
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (event) {
  if (event.keyCode === keyCodes['escape']) {
    setup.classList.add('hidden');
  }
};

var onPopupEnterPress = function (event) {
  if (event.keyCode === keyCodes['enter']) {
    if (setup.classList.contains('hidden')) {
      setup.classList.remove('hidden');
    } else {
      setup.classList.add('hidden');
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', onPopupEnterPress);

var closePopup = function () {
  setup.classList.add('hidden');
};

setupClose.addEventListener('click', closePopup);
setupClose.addEventListener('keydown', onPopupEnterPress);

setupSubmit.addEventListener('click', closePopup);
setupSubmit.addEventListener('keydown', onPopupEnterPress);

var createFillColor = function (selector, cssClass, array) {
  selector.querySelector(cssClass).style.fill = getRandomParameter(array);
};

var createBackgroundColor = function (selector, cssClass, array) {
  selector.querySelector(cssClass).style.background = getRandomParameter(array);
};

var onPopupChangeWizardCoat = function () {
  createFillColor(setupWizard, '.wizard-coat', wizardsCoatsColors);
};

var onPopupChangeWizardEyes = function () {
  createFillColor(setupWizard, '.wizard-eyes', wizardsEyesColors);
};

var onPopupChangeWizardFireball = function () {
  createBackgroundColor(document, '.setup-fireball-wrap', fireballColors);
};

setupWizardCoat.addEventListener('click', onPopupChangeWizardCoat);
setupWizardEyes.addEventListener('click', onPopupChangeWizardEyes);
setupWizardFireball.addEventListener('click', onPopupChangeWizardFireball);

/**
 * Создание массива объктов содержащие информацию о волшебниках
 *
 * @param {array} names массив имен
 * @param {array} sunames масиив фамилий
 * @param {array} coatsColor масиив цвет плащей
 * @param {array} eyesColor массив цвет глаз
 * @return
 */

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

/**
 * Выбирает случайный элемент из масиива
 *
 * @param {array} arrayParameters
 * @return случайный элемент
 */

var getRandomParameter = function (arrayParameters) {
  var arrayLength = arrayParameters.length;
  var arrayItem = Math.floor(Math.random() * arrayLength);
  return arrayParameters[arrayItem];
};


/**
 * Создает объект для вставки в HTML
 *
 * @param {obj} wizard
 * @return
 */

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard['name'] + ' ' + wizard['suname'];
  wizardElement.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard['eyeColor'];
  return wizardElement;
};

var wizards = createWizardsPararameters(wizardsNames, wizardsSunames, wizardsCoatsColors, wizardsEyesColors);
/* var setup = document.querySelector('.setup'); */
/* userDialog.classList.remove('hidden');*/
setup.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
