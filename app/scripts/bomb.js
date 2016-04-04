var gameEngine = require('./game-engine');
var GameField = require('./game-field');
var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var settings = require('./settings');

function Bomb(x, y) {
  GameObject.apply(this, arguments);

  new Transform(this);
  this.Transform.setPosition({ x: x, y: y });
  new RenderBomberman(this);
}

Bomb.prototype = Object.create(GameObject.prototype);
Bomb.prototype.constructor = Bomb;

$.extend(Bomb.prototype, {
  update: function () {
    this._update();
  }
});

module.exports = Bomb;
