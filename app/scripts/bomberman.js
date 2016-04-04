var gameEngine = require('./game-engine');
var inputController = require('./input-controller');
var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var GameField = require('./game-field');
var Bomb = require('./bomb');
var settings = require('./settings');

function Bomberman() {
  GameObject.apply(this, arguments);

  this._gameField = gameEngine.getGameObject(GameField);

  this._maxBombs = 1;
  this._bombs = 0;

  this._actionPause = 0.2;
  this._toNextAction = 0;

  new Transform(this);
  new RenderBomberman(this);
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
  update: function () {
    this._update();
    this._toNextAction -= this.getSecondsFromLastUpdate();
    if (this._toNextAction <= 0) {
      this._tryDoAction();
    }
  },
  _tryDoAction: function () {
    var action = {
      space: inputController.getKey('SPACE') ? 1 : 0,
      x: inputController.getKey('RIGHT') ? 1 : inputController.getKey('LEFT') ? -1 : 0,
      y: inputController.getKey('UP') ? -1 : inputController.getKey('DOWN') ? 1 : 0
    };

    if (action.space) {
      this._placeBomb();
      this._toNextAction = this._actionPause;
    }
    if (action.x || action.y) {
      this._move(action);
    }
  },
  _move: function (moveVector) {
    moveVector.y = moveVector.x ? 0 : moveVector.y;
    var currentPosition = this.Transform.getPosition();
    var newPosition = {};

    newPosition.x = currentPosition.x + moveVector.x;
    newPosition.y = currentPosition.y + moveVector.y;

    if (this._gameField.getCellTypeAt(newPosition.y, newPosition.x) === 'GRASS') {
      this.Transform.moveTo(newPosition);
      this._toNextAction = this._actionPause;
    }
  },
  _placeBomb: function () {
    if (this._bombs < this._maxBombs) {
      new Bomb(this, this.Transform.getPosition().x, this.Transform.getPosition().y);
    }
  },
});

module.exports = Bomberman;
