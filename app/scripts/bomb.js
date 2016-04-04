var gameEngine = require('./game-engine');
var GameField = require('./game-field');
var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var settings = require('./settings');

function Bomb() {
  GameObject.apply(this, arguments);
}

Bomb.prototype = Object.create(GameObject.prototype);
Bomb.prototype.constructor = Bomb;

$.exted(Bomb.prototype, {
  update: function () {
    this._update();
  }
});

module.exports = Bomb;
