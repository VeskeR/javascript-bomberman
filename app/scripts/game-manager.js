var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman = require('./bomberman');
var settings = require('./settings');

function GameManager() {
  GameObject.apply(this, arguments);

  this._gameFieldElement = settings.gameField;

  this._fieldWidth = settings.gameFieldWidth;
  this._fieldHeight = settings.gameFieldHeight;

  this._gameField = new GameField(this._gameFieldElement);
  this._player = new Bomberman();

  this._gameField.generateField(this._fieldHeight, this._fieldWidth);
}

GameManager.prototype = Object.create(GameObject.prototype);
GameManager.prototype.constructor = GameManager;

$.extend(GameManager.prototype, {
  getGameField: function () {
    return this._gameField;
  },
  getPlayer: function () {
    return this._player;
  },
  update: function () {
    GameObject.prototype._update.apply(this, arguments);
  }
});

var gameManager = new GameManager();

module.exports = gameManager;
