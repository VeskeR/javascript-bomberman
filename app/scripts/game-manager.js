var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman = require('./bomberman');
var settings = require('./settings');

function GameManager() {
  GameObject.apply(this, arguments);

  this._fieldTarget = settings.gameFieldTarget;

  this._gameField = new GameField(this._fieldTarget);
  this._player = new Bomberman();

  this._gameField.generateField(21, 21);
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
