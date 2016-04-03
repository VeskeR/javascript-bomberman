var inputController = require('./input-controller');
var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var settings = require('./settings');

function Bomberman() {
  GameObject.apply(this, arguments);

  this._maxBombs = 1;
  this._bombs = 0;

  this._movePause = 0.1;
  this._toNextMove = 0;

  new Transform(this);
  new RenderBomberman(this, settings.gameField);
}

Bomberman.prototype = Object.create(GameObject.prototype);
Bomberman.prototype.constructor = Bomberman;

$.extend(Bomberman.prototype, {
  getMaxBombs: function () {
    return this._maxBombs;
  },
  setMaxBombs: function (newMaxBombs) {
    this._maxBombs = newMaxBombs && newMaxBombs > 0 ? newMaxBombs : 1;
  },
  placeBomb: function () {
    if (this._bombs < this._maxBombs) {
      this._bombs++;
    }
  },
  update: function () {
    this._update();
    this._toNextMove -= this.getSecondsFromLastUpdate();
    if (this._toNextMove <= 0) {
      this._tryMove();
    }
  },
  _tryMove: function () {
    var moveVector = {
      x: inputController.getKey('RIGHT') ? 1 : inputController.getKey('LEFT') ? -1 : 0,
      y: inputController.getKey('UP') ? -1 : inputController.getKey('DOWN') ? 1 : 0
    }
    moveVector.y = moveVector.x ? 0 : moveVector.y;

    if (moveVector.x || moveVector.y) {
      this.Transform.move(moveVector);
      this._toNextMove = this._movePause;
    }
  }
});

module.exports = Bomberman;
