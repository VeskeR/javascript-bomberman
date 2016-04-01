var GameObject = require('./game-object');

function GameField(target) {
  GameObject.apply(this, arguments);

  this._target = target || $('body');
  this._field = [];
  this._$field = null;
}

GameField.prototype = Object.create(GameObject.prototype);
GameField.prototype.constructor = GameField;

$.extend(GameField.prototype, {
  generateField: function (n, m) {

  },
  appendFieldToTarget: function () {
    this._target.append(this._$field);
  }
});

module.exports = GameField;
