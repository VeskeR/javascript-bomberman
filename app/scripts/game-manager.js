var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman = require('./bomberman');

function GameManager() {
  GameObject.apply(this, arguments);

  this._fieldTarget = $('.game-field-wrapper');

  this._gameField = new GameField(this._fieldTarget);
  this._player = new Bomberman();

  this._gameField.generateField(15, 15);
  this._gameField.appendFieldToTarget();
}

GameManager.prototype = Object.create(GameObject.prototype);
GameManager.prototype.constructor = GameManager;

$.extend(GameManager.prototype, {
  update: function () {
    GameObject.prototype._update.apply(this, arguments);
  }
});

var gameManager = new GameManager();

module.exports = gameManager;
