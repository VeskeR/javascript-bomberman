var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var settings = require('./settings');

function Bomberman() {
  GameObject.apply(this, arguments);

  this._maxBombs = 1;
  this._bombs = 0;

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
  }
});

module.exports = Bomberman;
