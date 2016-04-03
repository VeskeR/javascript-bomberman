var GameObject = require('./game-object');

function InputController() {
  GameObject.apply(this, arguments);
}

InputController.prototype = Object.create(GameObject.prototype);
InputController.prototype.constructor = InputController;

$.extend(InputController.prototype, {
  update: function () {
    this._update();
  }
});

var inputController = new InputController();

module.exports = inputController;
