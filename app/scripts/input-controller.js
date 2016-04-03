var GameObject = require('./game-object');

function InputController() {
  GameObject.apply(this, arguments);

  this._inputs = [];
  this._bindEvents();
}

InputController.prototype = Object.create(GameObject.prototype);
InputController.prototype.constructor = InputController;

$.extend(InputController.prototype, {
  update: function () {
    this._update();
  },
  _bindEvents: function () {
    var bindedKeyboardEventHandler = this._keyboardEventHandler.bind(this);
    window.addEventListener('keydown', bindedKeyboardEventHandler);
    window.addEventListener('keyup', bindedKeyboardEventHandler);
  },
  _keyboardEventHandler: function (e) {
    e = e || event;
    this._inputs[e.keyCode || e.which] = e.type === 'keydown';
  }
});

var inputController = new InputController();

module.exports = inputController;
