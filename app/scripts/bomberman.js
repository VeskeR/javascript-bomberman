var GameObject = require('./game-object');

function Bomberman(settings) {
  GameObject.apply(this, arguments);

  settings = settings || {};

  this._maxBombs = settings.maxBombs || 1;
  this._bombs = 0;
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
    GameObject.prototype.update.apply(this, arguments);
  }
});

module.exports = Bomberman;
