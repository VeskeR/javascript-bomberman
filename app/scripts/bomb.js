var gameEngine = require('./game-engine');
var GameField = require('./game-field');
var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var settings = require('./settings');

function Bomb(bomberman, x, y) {
  GameObject.apply(this, arguments);

  this._bomberman = bomberman;
  this._bomberman.increaseBombsCount();

  this._lifeTime = 2;
  this._leftTime = this._lifeTime;

  new Transform(this);
  this.Transform.setPosition({ x: x, y: y });
  new RenderBomberman(this);
}

Bomb.prototype = Object.create(GameObject.prototype);
Bomb.prototype.constructor = Bomb;

$.extend(Bomb.prototype, {
  update: function () {
    this._update();
    this._leftTime -= this.getSecondsFromLastUpdate();
    if (this._leftTime <= 0) {
      this.explode();
    }
  },
  explode: function () {
    this.destroy();
    console.log('exploded');
    this._bomberman.decreaseBombsCount();
  }
});

module.exports = Bomb;
