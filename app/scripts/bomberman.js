var GameObject = require('./game-object');
var Transform = require('./transform');
var RenderBomberman = require('./render-bomberman');
var settings = require('./settings');

function Bomberman(maxBombs) {
  GameObject.apply(this, arguments);

  this._maxBombs = maxBombs || 1;
  this._bombs = 0;

  new Transform(this);
  new RenderBomberman(this, settings.gameField);
}

Bomberman.prototype = Object.create(GameObject.prototype);
Bomberman.prototype.constructor = Bomberman;

$.extend(Bomberman.prototype, {
  placeBomb: function () {
    if (this._bombs < this._maxBombs) {
      this._bombs++;
    }
  },
  update: function () {
    GameObject.prototype._update.apply(this, arguments);
  }
});

module.exports = Bomberman;
