var gameEngine = require('./game-engine');
var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderGameObject = require('./render-game-object');
var GameField = require('./game-field');
var settings = require('./settings');

function Bomberman() {
  GameObject.apply(this, arguments);

  this._gameField = gameEngine.getGameObject(GameField);

  this._maxBombs = 1;
  this._bombs = 0;

  this._actionPause = 0.2;
  this._toNextAction = 0;

  this.addComponent(Transform);
  this.addComponent(RenderGameObject);

  this.Render.getElement().addClass('game-field__bomberman');
}

Bomberman.prototype = Object.create(GameObject.prototype);
Bomberman.prototype.constructor = Bomberman;

$.extend(Bomberman.prototype, {
  getBombsCount: function () {
    return this._bombs;
  },
  increaseBombsCount: function () {
    this._bombs++;
    this._bombs = this._bombs >= 0 ? this._bombs : 0;
    this._bombs = this._bombs <= this._maxBombs ? this._bombs : 0;
  },
  decreaseBombsCount: function () {
    this._bombs--;
    this._bombs = this._bombs >= 0 ? this._bombs : 0;
    this._bombs = this._bombs <= this._maxBombs ? this._bombs : 0;
  },
  getMaxBombs: function () {
    return this._maxBombs;
  },
  setMaxBombs: function (newMaxBombs) {
    this._maxBombs = newMaxBombs && newMaxBombs > 0 ? newMaxBombs : 1;
  },
  kill: function () {
    this.destroy();
  }
});

module.exports = Bomberman;
