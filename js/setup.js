'use strict';
var wizardsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardsSunames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardsCoatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardsEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var numbersWizards = 4;
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var keyCodes = {
  ESC: 27,
  ENTER: 13
};

var setupWindow = document.querySelector('.setup');
var setupSimilar = setupWindow.querySelector('.setup-similar');

var setupButton = document.querySelector('.setup-open');
var setupCloseButton = setupWindow.querySelector('.setup-close');
var setupUserName = setupWindow.querySelector('.setup-user-name');
var setupSubmit = setupWindow.querySelector('.setup-submit');
var icon = setupButton.querySelector('.setup-open-icon');
var inFocusNameField = false;
var setupWizardEyes = setupWindow.querySelector('.wizard-eyes');
var setupWizardCoat = setupWindow.querySelector('.wizard-coat');
var setupFireballWrap = setupWindow.querySelector('.setup-fireball-wrap');
/**
 * Создание массива объктов содержащие информацию о волшебниках
 *
 * @param {any} names
 * @param {any} sunames
 * @param {any} coatsColor
 * @param {any} eyesColor
 * @returns
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

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

//+++++++++++++++++++++++++++++++++++++++++++++++

/**
 * убираем класс cssClass из HTML элементов содержащихся в массиве array
 *
 * @param {any} array
 * @param {any} cssClass
 * @returns
 */

function showSetupWindow(array, cssClass) {
  var length = array.length;
  return function () {
    for (i = 0; i < length; i++) {
      array[i].classList.remove(cssClass);
    }
  };
}

/**
 * Закрашивает цветом область (глаза, плащ, фаербол мага в окне настройки)
 * в param передается строка (fill, background)
 * @param {array} array массив цветов
 * @param {obj} selector селектор HTML элемента
 * @param {string} param HTML атрибут
 */
var createColorElement = function (array, selector, param) {
  selector.style[param] = getRandomParameter(array);
};
/** дабавляем class hidden при нажатии ESC
 *
 *
 * @param {any} event
 */

function closeSetupHendler(event) {
  if ((event.keyCode === keyCodes.ESC || event.target === setupCloseButton) && !inFocusNameField) {
    setupWindow.classList.add('hidden');
  }
}

/**
 * добавляем атрибуты к HTML элементам
 *
 */
function initPage() {
  icon.setAttribute('tabindex', '0');
  setupCloseButton.setAttribute('tabindex', '0');
  setupUserName.setAttribute('maxlength', '25');
  setupUserName.setAttribute('minlength', '2');
}

/**
 * убираем class hidden при нажатии ENTER
 *
 * @param {any} event
 */

function enterPressHandler(event) {
  if (event.keyCode === keyCodes.ENTER) {
    setupWindow.classList.remove('hidden');
  }
}

/**
 * обрабатываем клик мышки на блоке setup
 *
 * @param {any} event
 */

function setupClickHendler(event) {
  switch (event.target) {
    case setupCloseButton:
      closeSetupHendler(event);
      break;
    case setupSubmit:
      closeSetupHendler(event);
      break;
    case setupWizardEyes:
      createColorElement(wizardsEyesColors, setupWizardEyes, 'fill');
      break;
    case setupFireballWrap.children[0]:
      createColorElement(fireballColors, setupFireballWrap, 'background');
      break;
    case setupWizardCoat:
      createColorElement(wizardsCoatsColors, setupWizardCoat, 'fill');
      break;
  }
}

/**
 * обрабатываем нажатие клавиш
 *
 * @param {any} event
 */
function setupKeyDownHendler(event) {
  if (event.keyCode === keyCodes.ENTER) {
    switch (event.target) {
      case setupCloseButton:
        closeSetupHendler(event);
        break;
      case setupSubmit:
        closeSetupHendler(event);
        break;
    }
  }
}

initPage();
setupButton.addEventListener('click', showSetupWindow([setupWindow, setupSimilar], 'hidden'));
/* слушатель событий для иконки */
icon.addEventListener('keydown', enterPressHandler);
/* слушатель для проверки поле ввода имени в фокусе */
setupUserName.addEventListener('focus', function () {
  inFocusNameField = true;
});
/* слушатель для проверки поле ввода имени НЕ в фокусе */
setupUserName.addEventListener('blur', function () {
  inFocusNameField = false;
});
/* слушатель нажатия клавиши мыши */
setupWindow.addEventListener('click', setupClickHendler);
/* слушатель нажатий клавиш */
setupWindow.addEventListener('keydown', setupKeyDownHendler);
document.addEventListener('keydown', closeSetupHendler);
