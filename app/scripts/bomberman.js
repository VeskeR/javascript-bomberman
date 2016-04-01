var GameObject = require('./game-object');
var Transform = require('./transform');

function Bomberman(settings) {
  GameObject.apply(this, arguments);

  settings = settings || {};

  this._maxBombs = settings.maxBombs || 1;
  this._bombs = 0;

  new Transform(this);
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
