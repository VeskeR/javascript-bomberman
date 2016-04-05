var gameEngine = require('../engine/game-engine');
var Transform = require('../engine/components/transform');
var GameObject = require('../engine/core/game-object');

var Bomb = require('../bomb/bomb');

var RenderGameObject = require('../components/render-game-object');

var GameField = require('../controls/game-field');
var settings = require('../controls/settings');

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
  update: function () {
    this._update();
    this._toNextAction -= this.getSecondsFromLastUpdate();
    if (this._toNextAction <= 0) {
      this.doNextAction();
    }
  },
  doNextAction: function () {
    // Impelement this method in inherited class to perform bomberman's actions
  },
  move: function (moveVector) {
    moveVector.y = moveVector.x ? 0 : moveVector.y;
    var currentPosition = this.Transform.getPosition();
    var newPosition = {};

    newPosition.x = currentPosition.x + moveVector.x;
    newPosition.y = currentPosition.y + moveVector.y;

    if (this._gameField.getCellTypeNameAt(newPosition.x, newPosition.y) === 'GRASS') {
      this.Transform.moveTo(newPosition);
      this._toNextAction = this._actionPause;
    }
  },
  placeBomb: function () {
    if (this._bombs < this._maxBombs) {
      new Bomb(this, this.Transform.getPosition().x, this.Transform.getPosition().y);
    }
    this._toNextAction = this._actionPause;
  },
  kill: function () {
    this.destroy();
  }
});

module.exports = Bomberman;
