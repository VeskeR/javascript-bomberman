var GameObject = require('./game-object');
var GameField = require('./game-field');
var Bomberman = require('./bomberman');

function GameManager() {
  GameObject.apply(this, arguments);

  this._gameField = null;
}

GameManager.prototype = Object.create(GameObject.prototype);
GameManager.prototype.constructor = GameManager;

$.extend(GameManager.prototype, {

});

var gameManager = new GameManager();

module.exports = gameManager;
