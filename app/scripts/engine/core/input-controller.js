var GameObject = require('./game-object');
var settings = require('./settings');

function InputController() {
  GameObject.apply(this, arguments);

  this._gameField = settings.gameField;

  this._inputs = [];
  this._keyMap = {
    UP: ['W'.charCodeAt(0), 38],
    RIGHT: ['D'.charCodeAt(0), 39],
    DOWN: ['S'.charCodeAt(0), 40],
    LEFT: ['A'.charCodeAt(0), 37],
    SPACE: [' '.charCodeAt(0)]
  };
  this._bindEvents();
}

InputController.prototype = Object.create(GameObject.prototype);
InputController.prototype.constructor = InputController;

$.extend(InputController.prototype, {
  getKey: function (keyName) {
    var self = this;
    keyName = keyName || '';
    var codes = this._keyMap[keyName.toUpperCase()];
    return codes && codes.length > 0 ? codes.find(function (code) { return self._inputs[code]; }) ? 1 : 0 : 0;
  },
  _bindEvents: function () {
    var bindedKeyboardEventHandler = this._keyboardEventHandler.bind(this);
    this._gameField.on('keydown', bindedKeyboardEventHandler);
    this._gameField.on('keyup', bindedKeyboardEventHandler);
  },
  _keyboardEventHandler: function (e) {
    e = e || event;
    this._inputs[e.keyCode || e.which] = e.type === 'keydown';
    e.preventDefault();
  }
});

var inputController = new InputController();

module.exports = inputController;
